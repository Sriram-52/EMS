const { admin, db } = require("../../../utils/admin")
const { logToHistory, logToTaskTimeline } = require("../../../providers/EventLogger")
const { emailSender } = require("../../../providers/Email")
const ProjectUTILS = require("../Project/utils")
const TaskUTILS = require("./utils")

class Task {
  constructor(user) {
    this.actionPerformer = user
  }

  async _create_task(inputs, projectId) {
    const taskRef = db.collection("PROJECTS").doc(projectId).collection("TASKS").doc()
    const idRef = db.collection("ID_TRACKER").doc("projects")
    let customID, taskCode, projectInfo;
    return ProjectUTILS._check_project_exists(projectId)
      .then(project => {
        projectInfo = project
        return idRef.get()
      }).then(doc => {
        const info = doc.data()
        const FieldValue = admin.firestore.FieldValue
        const check = info.tasks_tracker.hasOwnProperty(projectId)
        if (!check)
          customID = 1
        else
          customID = info.tasks_tracker[projectId]
        taskCode = `${projectInfo.cid}-${customID}`

        return idRef.set({
          tasks_tracker: {
            [projectId]: FieldValue.increment(check ? 1 : 2)
          }
        }, { merge: true })

      }).then(() => {
        return taskRef.set({
          ...inputs,
          id: taskRef.id,
          cid: customID,
          projectId: projectId,
          isExist: true,
          createdBy: this.actionPerformer.uid,
          createdAt: new Date().toISOString()
        })
      }).then(() => {
        const log = {
          subject: {
            pid: projectId,
            tid: taskRef.id
          },
          actionBy: this.actionPerformer.uid,
          createdAt: new Date().toISOString(),
          type: "createTask",
          eventDetails: {
            before: {},
            after: inputs
          }
        }

        logToHistory(log)
        logToTaskTimeline(log)
        const users = inputs.assignee
        const subject = `Task(${taskCode}) Assigned to you`
        const body = `${this.actionPerformer.name} assigned you a task <b>${inputs.title}</b>`
        emailSender.closedMail(users, subject, body)
        return taskCode
      }).catch(err => {
        throw err
      })
  }

  async _update_task(inputs, projectId, taskId) {
    const projectRef = db.collection("PROJECTS").doc(projectId)
    const taskRef = projectRef.collection("TASKS").doc(taskId)
    let taskInfo, taskCode, projectInfo;
    return ProjectUTILS._check_project_exists(projectId)
      .then(project => {
        projectInfo = project
        return TaskUTILS._check_task_exists(projectId, taskId)
      }).then(task => {
        taskInfo = task
        taskCode = `${projectInfo.cid}-${task.cid}`
        return taskRef.set(inputs, { merge: true })
      }).then(() => {
        const log = {
          subject: {
            pid: projectId,
            tid: taskId
          },
          actionBy: this.actionPerformer.uid,
          createdAt: new Date().toISOString(),
          type: "updateTask",
          eventDetails: {
            before: taskInfo,
            after: {
              ...taskInfo,
              ...inputs
            }
          }
        }

        logToHistory(log)
        logToTaskTimeline(log)
        const users = inputs.assignee.filter(uid => this.actionPerformer.uid !== uid)
        const subject = `Task(${taskCode}) updated`
        const body = `${this.actionPerformer.name} made changes to the task <b>${inputs.title}</b> on which you are assigned on`
        emailSender.closedMail(users, subject, body)
        return taskCode
      }).catch(err => {
        throw err
      })
  }

  async _delete_task(projectId, taskId) {
    const projectRef = db.collection("PROJECTS").doc(projectId)
    const taskRef = projectRef.collection("TASKS").doc(taskId)
    let taskInfo, taskCode, projectInfo;
    return ProjectUTILS._check_project_exists(projectId)
      .then(project => {
        projectInfo = project
        return TaskUTILS._check_task_exists(projectId, taskId)
      }).then(task => {
        taskInfo = task
        taskCode = `${projectInfo.cid}-${task.cid}`
        return taskRef.update({
          isExist: false
        })
      }).then(() => {
        const log = {
          subject: {
            pid: projectId,
            tid: taskId
          },
          actionBy: this.actionPerformer.uid,
          createdAt: new Date().toISOString(),
          type: "deleteTask",
          eventDetails: {
            before: taskInfo,
            after: {}
          }
        }

        logToHistory(log)
        logToTaskTimeline(log)
        const users = taskInfo.assignee.filter(uid => this.actionPerformer.uid !== uid)
        const subject = `Task(${taskCode}) deleted`
        const body = `${this.actionPerformer.name} deleted the task <b>${inputs.title}</b> on which you are assigned on`
        emailSender.closedMail(users, subject, body)
        return taskCode
      }).catch(err => {
        throw err
      })
  }

  async _comment_on_task(inputs, projectId, taskId) {
    const projectRef = db.collection("PROJECTS").doc(projectId)
    const taskRef = projectRef.collection("TASKS").doc(taskId)
    const commentRef = taskRef.collection("TASK_COMMENTS").doc()
    let taskInfo, taskCode, projectInfo;
    return ProjectUTILS._check_project_exists(projectId)
      .then(project => {
        projectInfo = project
        return TaskUTILS._check_task_exists(projectId, taskId)
      }).then(task => {
        taskInfo = task
        taskCode = `${projectInfo.cid}-${task.cid}`
        return commentRef.set({
          ...inputs,
          createdAt: new Date().toISOString(),
          createdBy: this.actionPerformer.uid,
          id: commentRef.id,
          projectId: projectId,
          taskId: taskId,
          isExist: true
        })
      }).then(() => {
        const log = {
          subject: {
            pid: projectId,
            tid: taskId
          },
          actionBy: this.actionPerformer.uid,
          createdAt: new Date().toISOString(),
          type: "newCommentOnTask",
          eventDetails: {
            before: {},
            after: inputs
          }
        }

        logToHistory(log)
        logToTaskTimeline(log)
        const users = taskInfo.assignee.filter(uid => this.actionPerformer.uid !== uid)
        const subject = `${this.actionPerformer.name} --> ${taskCode}`
        const body = `<div>
            ${this.actionPerformer.name} commented:<br>
            ${inputs.text}
          </div>`
        emailSender.closedMail(users, subject, body)
        return taskCode
      })
  }

  async _update_comment_in_task(inputs, projectId, taskId, commentId) {
    const projectRef = db.collection("PROJECTS").doc(projectId)
    const taskRef = projectRef.collection("TASKS").doc(taskId)
    const commentRef = taskRef.collection("TASK_COMMENTS").doc(commentId)
    let taskInfo, taskCode, projectInfo, commentInfo;
    return ProjectUTILS._check_project_exists(projectId)
      .then(project => {
        projectInfo = project
        return TaskUTILS._check_task_exists(projectId, taskId)
      }).then(task => {
        taskInfo = task
        taskCode = `${projectInfo.cid}-${task.cid}`
        return TaskUTILS._check_comment_exists(projectId, taskId, commentId)
      }).then((comment) => {
        commentInfo = comment
        return commentRef.update(inputs)
      }).then(() => {
        const log = {
          subject: {
            pid: projectId,
            tid: taskId
          },
          actionBy: this.actionPerformer.uid,
          createdAt: new Date().toISOString(),
          type: "updateCommentInTask",
          eventDetails: {
            before: commentInfo,
            after: inputs
          }
        }

        logToHistory(log)
        logToTaskTimeline(log)
        const users = taskInfo.assignee.filter(uid => this.actionPerformer.uid !== uid)
        const subject = `${this.actionPerformer.name} --> ${taskCode}`
        const body = `<div>
            ${this.actionPerformer.name} made change to the comment:<br>
            ${inputs.text}
          </div>`
        emailSender.closedMail(users, subject, body)
        return taskCode
      })
  }

  async _delete_comment_in_task(projectId, taskId, commentId) {
    const projectRef = db.collection("PROJECTS").doc(projectId)
    const taskRef = projectRef.collection("TASKS").doc(taskId)
    const commentRef = taskRef.collection("TASK_COMMENTS").doc(commentId)
    let taskInfo, taskCode, projectInfo, commentInfo;
    return ProjectUTILS._check_project_exists(projectId)
      .then(project => {
        projectInfo = project
        return TaskUTILS._check_task_exists(projectId, taskId)
      }).then(task => {
        taskInfo = task
        taskCode = `${projectInfo.cid}-${task.cid}`
        return TaskUTILS._check_comment_exists(projectId, taskId, commentId)
      }).then((comment) => {
        commentInfo = comment
        return commentRef.update({
          isExist: false
        })
      }).then(() => {
        const log = {
          subject: {
            pid: projectId,
            tid: taskId
          },
          actionBy: this.actionPerformer.uid,
          createdAt: new Date().toISOString(),
          type: "deleteCommentInTask",
          eventDetails: {
            before: commentInfo,
            after: { isExist: false }
          }
        }

        logToHistory(log)
        logToTaskTimeline(log)
        const users = taskInfo.assignee.filter(uid => this.actionPerformer.uid !== uid)
        const subject = `${this.actionPerformer.name} --> ${taskCode}`
        const body = `<div>
            ${this.actionPerformer.name} deleted the comment:<br>
            ${commentInfo.text}
          </div>`
        emailSender.closedMail(users, subject, body)
        return taskCode
      })
  }

  async _link_tasks(projectId, parentTaskId, tasksToBeLinked) {
    const dbNestCheck = db.collection('PROJECTS').doc(projectId).collection('TASKS')
    return db.collection('PROJECTS')
      .doc(projectId)
      .collection('TASKS')
      .where('isExist', '==', true)
      .where('id', '==', parentTaskId)
      .get()
      .then(snapshot => {
        if (snapshot.size < 1)
          throw new Error('no-active-task-exist')
        else if (snapshot.docs[0].data().category === 'subtask')
          throw new Error('cannot-link-to-subtask')
        return db.collection('PROJECTS').doc(projectId).collection('TASKS').get()
      })
      .then(snap => {
        const data = snap.docs.map(doc => doc.data())
        let checkingSubtasks = []
        let promises = []

        if (checkingSubtasks.length > 0 || tasksToBeLinked.includes(parentTaskId))
          throw new Error('remove-tasks-having-subtasks')

        tasksToBeLinked.forEach(id => {
          checkingSubtasks = data.filter(task => task.taskId === id)
          const promise = dbNestCheck.doc(id).set({
            taskId: parentTaskId,
            category: 'subtask'
          }, { merge: true })
          promises.push(promise)
        })
        return Promise.all(promises)
      }).catch(err => {
        throw err
      })
  }

  async _unlink_tasks(projectId, tasksToBeUnlinked) {
    if (tasksToBeUnlinked.length < 1)
      throw new Error('empty-list')
    return db.collection('PROJECTS')
      .doc(projectId)
      .collection('TASKS')
      .where('isExist', '==', true)
      .where('id', 'in', tasksToBeUnlinked)
      .get()
      .then(tasksSnap => {
        if (tasksSnap.size !== tasksToBeUnlinked.length)
          throw new Error('subtasks-no-more')
        let promises = []
        tasksToBeUnlinked.forEach(task => {
          const promise = db
            .collection('PROJECTS')
            .doc(projectId)
            .collection('TASKS')
            .doc(task).set({
              taskId: "",
              category: "task"
            }, { merge: true })
          promises.push(promise)
        })

        return Promise.all(promises)
      }).catch(err => {
        throw err

      })
  }
}



module.exports = Task