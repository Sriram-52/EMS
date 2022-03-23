const { db } = require("../../../utils/admin")


class TaskUTILS {
  static async _check_task_exists(projectId, taskId) {
    return db.collection("PROJECTS").doc(projectId)
      .collection("TASKS")
      .where("id", "==", taskId)
      .where("isExist", "==", true)
      .get()
      .then(snap => {
        if (snap.size < 1)
          throw new Error("no-task-exists")
        return snap.docs[0].data()
      }).catch(err => {
        throw err
      })
  }

  static async _check_comment_exists(projectId, taskId, commentId) {
    return db.collection("PROJECTS").doc(projectId)
      .collection("TASKS")
      .doc(taskId)
      .collection("TASK_COMMENTS")
      .where("id", "==", commentId)
      .where("isExist", "==", true)
      .get()
      .then(snap => {
        if (snap.size < 1)
          throw new Error("no-comment-exists")
        return snap.docs[0].data()
      }).catch(err => {
        throw err
      })
  }

  static acceptable_task_inputs(inputs) {
    const keys = [
      "type",
      "title",
      "startdate",
      "enddate",
      "priority",
      "assignee",
      "status",
      "description",
      "setReminder",
      "reminderDate",
      "category",
      "labels"
    ]

    return Object.keys(inputs).reduce((initial, key) => {
      if (!keys.includes(key))
        delete initial[key]
      return initial
    }, inputs)
  }
}

module.exports = TaskUTILS