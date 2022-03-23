const { admin, db } = require("../../../utils/admin")
const { emailSender } = require("../../Email")
const { dateFormatter } = require("../../CustomJSutils")

function formattedHTML(task) {
  const taskBody = task.taskInfo.map((item) => {
    return `<tr>
              <td style="padding: 15px; text-align: left;">${dateFormatter(item.duedate)}</td>
              <td style="padding: 15px; text-align: left;">${item.title}</td>
            </tr>`
  })
  return `
    <div>
      <table style="border: 1px solid black; border-collapse: collapse;">
          <tr Style="background-color: black; color: white;">
              <td style="padding: 15px; text-align: left;"><b>Due date</b></td>
              <td style="padding: 15px; text-align: left;"><b>Assignment</b></td>
          </tr>
          <tbody>
              ${taskBody}
          </tbody>
      </table>               
      </div>
      <hr>
  </div>   
  `
}

function SendEmail(overdueList) {
  const promises = overdueList.map((item) => {
    const subject = `List of overdue tasks`
    const body = formattedHTML(item)
    return emailSender.closedMail(item.uid, subject, body)
  })
  return Promise.all(promises)
}

async function countOverDueList() {
  const idRef = db.collection("ID_TRACKER").doc("task_management")
  const FieldValue = admin.firestore.FieldValue
  const deletepromises = [],
    addPromises = []
  let overDueList = []
  return db
    .collectionGroup("TASKS")
    .get()
    .then((tasksData) => {
      console.log(`Filtering ${tasksData.size} tasks`)
      const currDate = Date.parse(new Date().setHours(0, 0, 0, 0))
      const overDueTasks = tasksData.docs
        .map((doc) => {
          return {
            ...doc.data(),
            //startdate: Date.parse(new Date(doc.data().startdate).setHours(0, 0, 0, 0)),
            //enddate: Date.parse(new Date(doc.data().startdate).setHours(0, 0, 0, 0)),
          }
        })
        .filter((task) => {
          return (
            new Date(task.startdate) < new Date() &&
            new Date(task.enddate) < new Date() &&
            task.status !== "Closed" &&
            task.status !== "Completed" &&
            task.status !== "Review"
          )
        })
      overDueList = overDueTasks
      console.log(`Found ${overDueTasks.length} overdue tasks`)
      overDueTasks.forEach((task) => {
        const { type, priority, assignee = [], projectId, status } = task
        console.log(`setting for project ${projectId}`)
        assignee.forEach((uid) => {
          const deleteOverduePromise = idRef.set(
            {
              employees_task_tracker: {
                [projectId]: {
                  [uid]: {
                    Overdue: FieldValue.delete(),
                  },
                },
              },
            },
            { merge: true }
          )
          deletepromises.push(deleteOverduePromise)
        })
        const deleteOverduePromise = idRef.set(
          {
            tasks_tracker: {
              [projectId]: {
                Overdue: FieldValue.delete(),
              },
            },
          },
          { merge: true }
        )
        deletepromises.push(deleteOverduePromise)
      })
      return Promise.all(deletepromises)
    })
    .then((data) => {
      console.log("overdue deleted successfully with " + data.length)
      overDueList.forEach((task) => {
        const { type, priority, assignee = [], projectId, status } = task
        console.log(`setting for project ${projectId}`)
        assignee.forEach((uid) => {
          const addOverduepromise = idRef.set(
            {
              employees_task_tracker: {
                [projectId]: {
                  [uid]: {
                    Overdue: {
                      [status]: {
                        [type]: FieldValue.increment(1),
                        [priority]: FieldValue.increment(1),
                        count: FieldValue.increment(1),
                      },
                      count: FieldValue.increment(1),
                    },
                  },
                },
              },
            },
            { merge: true }
          )
          addPromises.push(addOverduepromise)
        })
        const addOverduepromise = idRef.set(
          {
            tasks_tracker: {
              [projectId]: {
                Overdue: {
                  [status]: {
                    [type]: FieldValue.increment(1),
                    [priority]: FieldValue.increment(1),
                    count: FieldValue.increment(1),
                  },
                  count: FieldValue.increment(1),
                },
              },
            },
          },
          { merge: true }
        )
        addPromises.push(addOverduepromise)
      })
      return Promise.all(addPromises)
    })
    .then((data) => {
      console.log("overdue setted successfully with " + data.length)
      return
    })
    .catch((err) => {
      console.error(err)
    })
}

function ScheduleOverdueList() {
  let employees = []
  let assignees = []
  db.collection("EMPLOYEES")
    .where("status", "==", "Active")
    .where("isExist", "==", true)
    .get()
    .then((snap) => {
      employees = snap.docs.map((doc) => doc.id)
      return db.collection("PROJECTS").where("isExist", "==", true).get()
    })
    .then((snaps) => {
      const projects = snaps.docs.map((doc) => doc.data().id)
      let promises = []
      projects.forEach((project) => {
        const promise = db.collection("PROJECTS/" + project + "/TASKS").get()
        promises.push(promise)
      })
      return Promise.all(promises)
    })
    .then((snapshots) => {
      let tasks = []
      snapshots.forEach((snap) => {
        snap.docs.forEach((doc) => {
          tasks.push(doc.data())
        })
      })
      const overdueTasks = tasks.filter((task) => {
        let currDate = new Date()
        let taskStartdate = new Date(task.startdate)
        let taskEndDate = new Date(task.enddate)
        let taskStartDiff = (taskStartdate.getTime() - currDate.getTime()) / (1000 * 3600 * 24)
        let taskEndDiff = (taskEndDate.getTime() - currDate.getTime()) / (1000 * 3600 * 24)
        return (
          taskStartDiff < 0 &&
          taskEndDiff < 0 &&
          task.status !== "Closed" &&
          task.status !== "Completed"
        )
      })

      let overdueList = []
      overdueTasks.forEach((task) => {
        overdueList = [
          ...overdueList,
          {
            title: task.title,
            id: task.id,
            assignee: task.assignee,
            duedate: task.enddate,
          },
        ]
        assignees = [...assignees, ...task.assignee]
      })
      assignees = [...new Set(assignees)]
      const assigneeIterator = [...assignees]
      assigneeIterator.forEach((assignee, index) => {
        if (!employees.includes(assignee)) assignees.splice(index, 1)
      })
      return overdueList
    })
    .then((overdueList) => {
      let finalList = []

      assignees.forEach((assignee) => {
        let list = []
        overdueList.forEach((task) => {
          if (task.assignee.includes(assignee)) {
            list.push({
              title: task.title,
              duedate: task.duedate,
              id: task.id,
            })
          }
        })
        finalList.push({
          uid: assignee,
          taskInfo: list,
        })
      })
      return SendEmail(finalList)
    })
    .catch((err) => {
      console.log(err)
    })
}

module.exports = { ScheduleOverdueList, countOverDueList }
