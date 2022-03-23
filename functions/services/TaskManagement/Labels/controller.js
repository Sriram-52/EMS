const express = require('express');
const router = express.Router();
const { closedEnd } = require("../../../endpoints")
const Labels = require("./model")

router.post("/:projectId/labels/newlabel", closedEnd, (req, res) => {
    const inputs = req.body
    const { projectId } = req.params
    const { labelName, labelColorCode } = inputs
    const labelObj = new Labels(req.user)
    return labelObj._new_label(projectId, labelName, labelColorCode)
        .then(() => {
            return res.json({ message: `New label created successfully` })
        }).catch(err => {
            console.error(err)
            if (err.toString().match('project-does-not-exists'))
                return res.status(300).json({ message: `A active project does not exists` })
            else if (err.toString().match('label-already-exists'))
                return res.status(300).json({ message: `A label already exists the given name` })
            return res.json({ message: `Failed to create new label` })
        })
})

router.put("/:projectId/labels/:labelId/update", closedEnd, (req, res) => {
    const inputs = req.body
    const { projectId, labelId } = req.params
    const { labelName, labelColorCode } = inputs
    const labelObj = new Labels(req.user)
    return labelObj._update_label(projectId, labelId, labelName, labelColorCode)
        .then(() => {
            return res.json({ message: `Label updated successfully` })
        }).catch(err => {
            console.error(err)
            if (err.toString().match('project-does-not-exists'))
                return res.status(300).json({ message: `A active project does not exists` })
            else if (err.toString().match('label-already-exists'))
                return res.status(300).json({ message: `A label already exists the given name` })
            return res.json({ message: `Failed to update label` })
        })
})

router.delete("/:projectId/labels/:labelId/delete", closedEnd, (req, res) => {
    const inputs = req.body
    const { projectId, labelId } = req.params
    const labelObj = new Labels(req.user)
    return labelObj._delete_label(projectId, labelId)
        .then(() => {
            return res.json({ message: `Label deleted successfully` })
        }).catch(err => {
            console.error(err)
            if (err.toString().match('project-does-not-exists'))
                return res.status(300).json({ message: `A active project does not exists` })
            else if (err.toString().match('label-already-exists'))
                return res.status(300).json({ message: `A label already exists the given name` })
            return res.json({ message: `Failed to delete label` })
        })
})

module.exports = router