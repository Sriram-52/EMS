const { admin, db } = require("../../utils/admin")

async function projectOnCreate(projectData) {
  const { status, cid, title, id } = projectData
  const idRef = db.collection("ID_TRACKER").doc("task_management")
  const metaRef = db.collection("META_INFO").doc("projects")
  const FieldValue = admin.firestore.FieldValue
  return idRef
    .set(
      {
        projects_tracker: {
          [status]: FieldValue.increment(1),
          totalCount: FieldValue.increment(1),
        },
      },
      { merge: true }
    )
    .then(() => {
      return metaRef.set(
        {
          [id]: { cid, title, status, id },
        },
        { merge: true }
      )
    })
    .catch((err) => {
      console.error(err)
    })
}

async function projectOnUpdate(change) {
  const newValue = change.after.data()
  const previousValue = change.before.data()
  const FieldValue = admin.firestore.FieldValue
  const idRef = db.collection("ID_TRACKER").doc("task_management")
  const metaRef = db.collection("META_INFO").doc("projects")
  const batch = db.batch()
  const { id } = newValue
  if (previousValue.status !== newValue.status) {
    batch.set(
      idRef,
      {
        projects_tracker: {
          [previousValue.status]: FieldValue.increment(-1),
          [newValue.status]: FieldValue.increment(1),
        },
      },
      { merge: true }
    )
    batch.set(metaRef, { [id]: { status: newValue.status } }, { merge: true })
  }
  if (previousValue.title !== newValue.title) {
    batch.set(
      idRef,
      {
        projects_tracker: {
          [previousValue.status]: FieldValue.increment(-1),
          [newValue.status]: FieldValue.increment(1),
        },
      },
      { merge: true }
    )
    batch.set(metaRef, { [id]: { title: newValue.title } }, { merge: true })
  }
  return batch.commit().catch((err) => {
    console.error(err)
  })
}

async function taskOnCreate(snap, context) {
  const { projectId } = context.params
  const data = snap.data()
  const idRef = db.collection("ID_TRACKER").doc("task_management")
  const { status, type, priority, assignee, category } = data
  const FieldValue = admin.firestore.FieldValue
  const batch = db.batch()
  assignee.forEach((uid) => {
    batch.set(
      idRef,
      {
        employees_task_tracker: {
          [projectId]: {
            [uid]: {
              [status]: {
                [type]: FieldValue.increment(1),
                [priority]: FieldValue.increment(1),
                count: FieldValue.increment(1),
              },
              totalCount: FieldValue.increment(1),
            },
          },
        },
      },
      { merge: true }
    )
  })
  batch.set(
    idRef,
    {
      tasks_tracker: {
        [projectId]: {
          totalCount: FieldValue.increment(1),
          [status]: {
            [type]: FieldValue.increment(1),
            [priority]: FieldValue.increment(1),
            count: FieldValue.increment(1),
          },
        },
      },
    },
    { merge: true }
  )
  if (category === "subtask") {
    assignee.forEach((uid) => {
      batch.set(
        idRef,
        {
          employees_sub_task_tracker: {
            [projectId]: {
              [data.taskId]: {
                [uid]: {
                  [status]: {
                    [type]: FieldValue.increment(1),
                    [priority]: FieldValue.increment(1),
                    count: FieldValue.increment(1),
                  },
                  totalCount: FieldValue.increment(1),
                },
                subTaskCount: FieldValue.increment(1),
              },
            },
          },
        },
        { merge: true }
      )
    })
    batch.set(
      idRef,
      {
        sub_tasks_tracker: {
          [projectId]: {
            [data.taskId]: {
              totalCount: FieldValue.increment(1),
              [status]: {
                [type]: FieldValue.increment(1),
                [priority]: FieldValue.increment(1),
                count: FieldValue.increment(1),
              },
            },
            subTaskCount: FieldValue.increment(1),
          },
        },
      },
      { merge: true }
    )
  }
  return batch.commit().catch((err) => {
    console.error(err)
  })
}

async function taskOnUpdate(change, context) {
  const { projectId } = context.params
  const previousValues = change.before.data()
  const newValues = change.after.data()
  const idRef = db.collection("ID_TRACKER").doc("task_management")
  const FieldValue = admin.firestore.FieldValue
  const deletePromises = [],
    addPromises = []
  previousValues.assignee.forEach((uid) => {
    const { status, type, priority, category, taskId } = previousValues
    const taskPromise = idRef.set(
      {
        employees_task_tracker: {
          [projectId]: {
            [uid]: {
              [status]: {
                [type]: FieldValue.increment(-1),
                [priority]: FieldValue.increment(-1),
                count: FieldValue.increment(-1),
              },
            },
          },
        },
      },
      { merge: true }
    )
    deletePromises.push(taskPromise)
    if (category === "subtask") {
      previousValues.assignee.forEach((uid) => {
        const subTaskPromise = idRef.set(
          {
            employees_sub_task_tracker: {
              [projectId]: {
                [taskId]: {
                  [uid]: {
                    [status]: {
                      [type]: FieldValue.increment(-1),
                      [priority]: FieldValue.increment(-1),
                      count: FieldValue.increment(-1),
                    },
                    totalCount: FieldValue.increment(-1),
                  },
                  subTaskCount: FieldValue.increment(1),
                },
              },
            },
          },
          { merge: true }
        )
        deletePromises.push(subTaskPromise)
      })
    }
  })
  return Promise.all(deletePromises)
    .then(() => {
      newValues.assignee.forEach((uid) => {
        const { status, type, priority, category, taskId } = previousValues
        const taskPromise = idRef.set(
          {
            employees_task_tracker: {
              [projectId]: {
                [uid]: {
                  [status]: {
                    [type]: FieldValue.increment(1),
                    [priority]: FieldValue.increment(1),
                    count: FieldValue.increment(1),
                  },
                },
              },
            },
          },
          { merge: true }
        )
        addPromises.push(taskPromise)
        if (category === "subtask") {
          newValues.assignee.forEach((uid) => {
            const subTaskPromise = idRef.set(
              {
                employees_sub_task_tracker: {
                  [projectId]: {
                    [taskId]: {
                      [uid]: {
                        [status]: {
                          [type]: FieldValue.increment(-1),
                          [priority]: FieldValue.increment(-1),
                          count: FieldValue.increment(-1),
                        },
                        totalCount: FieldValue.increment(-1),
                      },
                      subTaskCount: FieldValue.increment(1),
                    },
                  },
                },
              },
              { merge: true }
            )
            addPromises.push(subTaskPromise)
          })
        }
      })
      return Promise.all(addPromises)
    })
    .then(() => {
      return idRef.set(
        {
          tasks_tracker: {
            [projectId]: {
              [previousValues.status]: {
                [previousValues.priority]: FieldValue.increment(-1),
                [previousValues.type]: FieldValue.increment(-1),
                count: FieldValue.increment(-1),
              },
            },
          },
        },
        { merge: true }
      )
    })
    .then(() => {
      return idRef.set(
        {
          tasks_tracker: {
            [projectId]: {
              [newValues.status]: {
                [newValues.priority]: FieldValue.increment(1),
                [newValues.type]: FieldValue.increment(1),
                count: FieldValue.increment(1),
              },
            },
          },
        },
        { merge: true }
      )
    })
    .then(() => {
      const promises = []
      if (previousValues.category === "subtask") {
        const promise = idRef.set(
          {
            sub_tasks_tracker: {
              [projectId]: {
                [previousValues.taskId]: {
                  totalCount: FieldValue.increment(-1),
                  [previousValues.status]: {
                    [previousValues.priority]: FieldValue.increment(-1),
                    [previousValues.type]: FieldValue.increment(-1),
                    count: FieldValue.increment(-1),
                  },
                },
                subTaskCount: FieldValue.increment(1),
              },
            },
          },
          { merge: true }
        )
        promises.push(promise)
      }
      if (newValues.category === "subtask") {
        const promise = idRef.set(
          {
            sub_tasks_tracker: {
              [projectId]: {
                [newValues.taskId]: {
                  totalCount: FieldValue.increment(1),
                  [newValues.status]: {
                    [newValues.priority]: FieldValue.increment(1),
                    [newValues.type]: FieldValue.increment(1),
                    count: FieldValue.increment(1),
                  },
                },
                subTaskCount: FieldValue.increment(1),
              },
            },
          },
          { merge: true }
        )
        promises.push(promise)
      }
      return Promise.all(promises)
    })
    .catch((err) => {
      console.error(err)
    })
}

module.exports = { projectOnCreate, projectOnUpdate, taskOnCreate, taskOnUpdate }
