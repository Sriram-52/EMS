const express = require('express');
const router = express.Router();
const { closedEnd } = require("../../../endpoints")
const Task = require("./model")
const TaskUTILS = require("./utils")

router.post("/:projectId/tasks/new", closedEnd, (req, res) => {
  console.log("createTask")
  const inputs = req.body
  const { projectId } = req.params
  const task = {
    type: inputs.type,
    title: inputs.title,
    startdate: inputs.startdate,
    enddate: inputs.enddate,
    priority: inputs.priority,
    assignee: inputs.assignee,
    status: inputs.status,
    description: inputs.description,
    setReminder: inputs.setReminder,
    reminderDate: inputs.reminderDate,
    category: inputs.category,
    labels: inputs.labels,
  }

  if (inputs.category === "subtask") {
    task["taskId"] = inputs.taskId
  }

  if (!projectId) {
    console.error("Invalid inputs")
    return res.status(422).json({ message: `Invalid inputs` })
  }

  const taskObj = new Task(req.user)
  return taskObj
    ._create_task(task, projectId)
    .then((taskCode) => {
      return res.json({ message: `Task(${taskCode}) created successfully` })
    })
    .catch((err) => {
      console.error(err)
      if (err.toString().match("no-project-exists"))
        return res
          .status(404)
          .json({ message: `A active project does not exists` })

      return res.status(500).json({ message: `Failed to create task` })
    })
})

router.put("/:projectId/tasks/:taskId/update", closedEnd, (req, res) => {
  const inputs = req.body
  const { projectId, taskId } = req.params
  const task = TaskUTILS.acceptable_task_inputs(inputs)
  const taskObj = new Task(req.user)
  return taskObj._update_task(task, projectId, taskId)
    .then((taskCode) => {
      return res.json({ message: `Task(${taskCode}) updated successfully` })
    }).catch(err => {
      console.error(err)
      if (err.toString().match("no-project-exists"))
        return res.status(404).json({ message: `A active project does not exists` })
      else if (err.toString().match("no-task-exists"))
        return res.status(404).json({ message: `A active task does not exists` })
      return res.status(500).json({ message: `Failed to update task` })
    })
})

router.delete("/:projectId/tasks/:taskId/delete", closedEnd, (req, res) => {
  const { projectId, taskId } = req.params
  const taskObj = new Task(req.user)
  return taskObj._delete_task(projectId, taskId)
    .then((taskCode) => {
      return res.json({ message: `Task(${taskCode}) deleted successfully` })
    }).catch(err => {
      console.error(err)
      if (err.toString().match("no-project-exists"))
        return res.status(404).json({ message: `A active project does not exists` })
      else if (err.toString().match("no-task-exists"))
        return res.status(404).json({ message: `A active task does not exists` })
      return res.status(500).json({ message: `Failed to delete task` })
    })
})

router.post("/:projectId/tasks/:taskId/comments/new", closedEnd, (req, res) => {
  const inputs = req.body
  const { text } = inputs
  const { projectId, taskId } = req.params

  const comment = {
    text: text
  }
  const taskObj = new Task(req.user)
  return taskObj._comment_on_task(comment, projectId, taskId)
    .then(taskCode => {
      return res.json({ message: `Commented on task(${taskCode}) successfully` })
    }).catch(err => {
      console.error(err)
      if (err.toString().match("no-project-exists"))
        return res.status(404).json({ message: `A active project does not exists` })
      else if (err.toString().match("no-task-exists"))
        return res.status(404).json({ message: `A active task does not exists` })
      return res.status(500).json({ message: `Failed to comment on task` })
    })
})

router.put("/:projectId/tasks/:taskId/comments/:commentId/update", closedEnd, (req, res) => {
  const inputs = req.body
  const { text } = inputs
  const { projectId, taskId, commentId } = req.params

  const comment = {
    text: text
  }
  const taskObj = new Task(req.user)
  return taskObj._update_comment_in_task(comment, projectId, taskId, commentId)
    .then(taskCode => {
      return res.json({ message: `Comment updated on task(${taskCode}) successfully` })
    }).catch(err => {
      console.error(err)
      if (err.toString().match("no-project-exists"))
        return res.status(404).json({ message: `A active project does not exists` })
      else if (err.toString().match("no-task-exists"))
        return res.status(404).json({ message: `A active task does not exists` })
      else if (err.toString().match("no-comment-exists"))
        return res.status(404).json({ message: `A active comment does not exists` })
      return res.status(500).json({ message: `Failed to update the comment in task` })
    })
})

router.delete("/:projectId/tasks/:taskId/comments/:commentId/delete", closedEnd, (req, res) => {
  const { projectId, taskId, commentId } = req.params
  const taskObj = new Task(req.user)
  return taskObj._delete_comment_in_task(projectId, taskId, commentId)
    .then(taskCode => {
      return res.json({ message: `Comment deleted from the task(${taskCode}) successfully` })
    }).catch(err => {
      console.error(err)
      if (err.toString().match("no-project-exists"))
        return res.status(404).json({ message: `A active project does not exists` })
      else if (err.toString().match("no-task-exists"))
        return res.status(404).json({ message: `A active task does not exists` })
      else if (err.toString().match("no-comment-exists"))
        return res.status(404).json({ message: `A active comment does not exists` })
      return res.status(500).json({ message: `Failed to delete the comment in task` })
    })
})

router.put("/:projectId/tasks/link", closedEnd, (req, res) => {
  const parentTaskId = req.body.parentTaskId
  const tasksToBeLinked = req.body.tasksToBeLinked
  const projectId = req.body.projectId
  if (tasksToBeLinked.length < 1)
    throw new Error('empty-list')
  const taskObj = new Task(req.user)
  taskObj._link_tasks(projectId, parentTaskId, tasksToBeLinked)
    .then(() => {
      return res.json({
        message: `Linked the tasks as subtasks successfully`,
      })
    }).catch(err => {
      console.error(err)
      if (err.toString().match('empty-list'))
        return res.status(422).json({
          error: `No items to unlink`,
          status: false
        })
      else if (err.toString().match('remove-tasks-having-subtasks'))
        return res.status(422).json({
          error: `Make sure that the tasks you are linking doesn't contain any subtasks`,
          status: false
        })
      else if (err.toString().match('cannot-link-to-subtask'))
        return res.status(422).json({
          error: `Cannot link the tasks to a subtask`,
          status: false
        })
      return res.status(500).json({
        error: `Failed to link the tasks as subtasks`,
        status: false
      })
    })
})

router.put("/:projectId/tasks/unlink", closedEnd, (req, res) => {
  console.log(req.body)
  const parentTaskId = req.body.parentTaskId
  const tasksToBeUnlinked = req.body.tasksToBeUnlinked
  const projectId = req.body.projectId
  if (tasksToBeUnlinked.length < 1) throw new Error("empty-list")
  const taskObj = new Task(req.user)
  taskObj
    ._unlink_tasks(projectId, tasksToBeUnlinked)
    .then(() => {
      return res.json({
        message: `Unlinked the subtasks successfully!`,
      })
    })
    .catch((err) => {
      console.error(err)
      if (err.toString().match("empty-list"))
        return res.status(422).json({
          message: `No items to unlink`,
        })
      else if (err.toString().match("remove-tasks-having-subtasks"))
        return res.status(422).json({
          message: `Make sure that the tasks you are linking doesn't contain any subtasks`,
        })
      else if (err.toString().match("cannot-link-to-subtask"))
        return res.status(422).json({
          message: `Cannot link the tasks to a subtask`,
        })
      return res.status(500).json({
        message: `Failed to link the tasks as subtasks`,
      })
    })
})

module.exports = router