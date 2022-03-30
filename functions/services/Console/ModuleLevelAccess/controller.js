const express = require("express")
const router = express.Router()
const { closedEnd } = require("../../../endpoints")
const { params_validator } = require("../../../providers/Validator")
const ModulesManagment = require("./model")
const ModulesManagmentUTILS = require("./utils")

router.get("/allModules", closedEnd, (req, res) => {
  const reqObj = new ModulesManagment(req.user)
  reqObj
    ._get_all_modules()
    .then((modulesData) => {
      return res.status(200).json({ modulesData })
    })
    .catch((err) => {
      console.error(err)
      return res.status(500).json(err)
    })
})

router.put("/:employeeID/updateModules", params_validator, closedEnd, (req, res) => {
  const reqObj = new ModulesManagment(req.user)
  const { employeeID } = req.params
  const modules = ModulesManagmentUTILS._acceptable_inputs(req.body)
  reqObj
    ._update_modules(employeeID, modules)
    .then(() => {
      return res.status(200).json({ message: `Modules updated successfully` })
    })
    .catch((err) => {
      console.error(err)
      if (err.toString().match("emp-not-found"))
        return res.status(300).json({ message: `${employeeID} is not a valid employee code` })
      if (err.toString().match("emp-deleted"))
        return res
          .status(503)
          .json({ message: `Cannot update modules for deleted employee - ${employeeID}` })
      if (err.toString().match("inactive-emp"))
        return res
          .status(501)
          .json({ message: `Make the employee - ${employeeID} active to update modules` })
      return res.status(500).json({ message: `Failed to update the modules` })
    })
})

module.exports = router
