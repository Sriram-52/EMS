const express = require('express');
const router = express.Router();
const { closedEnd } = require("../../../endpoints")
const Project = require("./model")

router.post("/newproject", closedEnd, (req, res) => {
    // TODO: inputs validations
    console.log(`${req.user.uid} REQUESTED TO CREATE NEW PROJECT`)
    const inputs = req.body
    const assignLevels = (Users) => {
        let objList = {}
        Users.forEach(user => {
            objList[user] = {
                uid: user,
                create: true,
                update: true,
                read: true,
                delete: false
            }
        })
        return objList
    }
    /* 
    const defaultLabels = ["Timesheets", "General", "Payroll", "W4/W2/ADP Access", "Invoice", "Onboarding (New Hire)", "Immigration", "New Project", "Vendors", "Clients", "I-983's", "Expenses", "End dates"]
    const colorCodes = ["#0366d6", "#cfd3d7", "#0e8a16", "#06035e", "#8bf9f8", "#fca902", "#15db8f", "#c91cc3", "#0075ca", "#487ef2", "#c5def5", "#db76a7", "#1a9985"]
    const labels = defaultLabels.map((label, index) => {
        // here v4() generates unique id
        return {
            name: label,
            colorCode: colorCodes[index],
            id: v4(),
            createdAt: new Date().toISOString(),
            createdBy: createdBy
        }
    })
    const reqFields = {
        title: req.body.title,
        status: req.body.status,
        startdate: req.body.startdate,
        cid: req.body.cid
    }
    let errCount = 0
    console.log('VALIDATING INPUTS')
    console.log(reqFields)
    Object.entries(reqFields).forEach(([key, value]) => {
        if (key === "startdate" && isNaN(Date.parse(value))) {
            console.log(key, value)
            errCount++
        }
        else if (value.trim() === "") {
            console.log(key, value)
            errCount++
        }
    })
    if (errCount > 0){
        console.error("INVALID INPUTS")
        return res.status(422).json({ message: `Invalid inputs` })
    }
    console.log('INPUTS VALIDATED')
    */

    const newProjectInfo = {
        title: inputs.title.charAt(0).toUpperCase() + inputs.title.slice(1),
        status: inputs.status,
        startdate: inputs.startdate,
        enddate: inputs.enddate,
        useLabels: inputs.useLabels,
        useTimeline: inputs.useTimeline,
        cid: inputs.cid.toUpperCase(),
        Users: assignLevels(inputs.Users),
        labels: {}
    }


    const projectObj = new Project(req.user)
    return projectObj._new_project(newProjectInfo)
        .then(() => {
            return res.json({ message: `New project created successfully` })
        }).catch(err => {
            console.error(err)
            if (err.toString().match("title-already-exists"))
                return res.status(422).json({ message: `A project with the given title already exists` })
            else if (err.toString().match("cid-already-exists"))
                return res.status(422).json({ message: `A project with the given project id already exists` })
            return res.status(500).json({ message: `Failed to create new project` })
        })
})

router.put("/:projectId/updateproject", closedEnd, (req, res) => {
    // TODO: inputs validations
    const inputs = req.body
    const { projectId } = req.params
    const project = {
        title: inputs.title,
        status: inputs.status,
        startdate: inputs.startdate,
        enddate: inputs.enddate,
        useLabels: inputs.useLabels,
        useTimeline: inputs.useTimeline,
    }

    const projectObj = new Project(req.user)
    projectObj._update_project(project, projectId, inputs.cid)
        .then(() => {
            return res.json({ message: `Project updated successfully` })
        }).catch(err => {
            console.error(err)
            if (err.toString().match("title-already-exists"))
                return res.status(422).json({ message: `A project with the given title already exists` })
            else if (err.toString().match("cid-already-exists"))
                return res.status(422).json({ message: `A project with the given project id already exists` })
            return res.status(500).json({ message: `Failed to update the project` })
        })
})

router.delete("/:projectId/deleteproject", closedEnd, (req, res) => {
    const { projectId } = req.params
    const projectObj = new Project(req.user)
    projectObj._delete_project(projectId)
        .then(() => {
            return res.json({ message: `Deleted the project successfully` })
        }).catch(err => {
            console.error(err)
            if (err.toString().match("no-project-exists"))
                return res.status(404).json({ message: `A active project does not exists` })
            return res.status(500).json({ message: `Failed to delete project` })
        })
})

router.post("/:projectId/addemployee", closedEnd, (req, res) => {
    // TODO: inputs validations
    console.log("addMemberToProject")
    const { employees } = req.body
    const { projectId } = req.params
    if (employees.length < 1) {
        console.error('empty-array-of-employee')
        return res.status(422).json({ message: `Please provide valid entries` })
    }
    const projectObj = new Project(req.user)
    projectObj._add_member_to_project(employees, projectId)
        .then(() => {
            return res.json({ message: `Added to the project successfully` })
        }).catch(({ err, acceptedEmployees, rejectedEmployees }) => {
            console.error(err)
            if (err.toString().match("no-project-exists"))
                return res.status(404).json({ message: `A active project does not exists` })
            return res.status(500).json({ message: `Failed to add employee to the project`, acceptedEmployees, rejectedEmployees })
        })
})

router.put("/:projectId/removeemployee", closedEnd, (req, res) => {
  // TODO: inputs validations
  console.log("removeMemberFromProject")
  const { employees } = req.body
  const { projectId } = req.params
  const projectObj = new Project(req.user)
  console.log(req.body)
  if (employees.length < 1) {
    console.error("empty-array-of-employee")
    return res.status(422).json({ message: `Please provide valid entries` })
  }
  projectObj
    ._remove_member_from_project(employees, projectId)
    .then(() => {
      return res.json({ message: `Removed from the project successfully` })
    })
    .catch(({ err, acceptedEmployees, rejectedEmployees }) => {
      console.error(err)
      if (err.toString().match("no-project-exists"))
        return res
          .status(404)
          .json({ message: `A active project does not exists` })
      else if (err.toString().match("emp-already-removed"))
        return res
          .status(404)
          .json({ message: `Employee already removed or not found` })
      return res
        .status(500)
        .json({
          message: `Failed to remove employee from the project`,
          acceptedEmployees,
          rejectedEmployees,
        })
    })
})

router.put("/:projectId/updatepermissions", closedEnd, (req, res) => {
    // TODO: inputs validations
    const { projectId } = req.params
    const { uid, create, update, read } = req.body.permissionLevels
    const level = {
        uid: uid,
        create,
        update,
        read,
        delete: req.body.permissionLevels.delete
    }
    const projectObj = new Project(req.user)
    projectObj._update_project_permission_levels(level, projectId)
        .then(() => {
            return res.json({ message: `Updated permission levels successfully` })
        }).catch(err => {
            console.error(err)
            if (err.toString().match("no-project-exists"))
                return res.status(404).json({ message: `A active project does not exists` })
            else if (err.toString().match("emp-not-found"))
                return res.status(404).json({ message: `Employee not found in the project` })
            return res.status(500).json({ message: `Failed to update permission levels` })
        })
})

module.exports = router