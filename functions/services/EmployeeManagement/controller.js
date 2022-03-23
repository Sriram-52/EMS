const express = require("express");
const router = express.Router();
const { closedEnd } = require("../../endpoints");
const EmployeeManagement = require("./model");
const EmployeeManagementUTILS = require("./utils");
const { params_validator } = require("../../providers/Validator");

router.get("/modules", closedEnd, (req, res) => {
  const empMgmtObj = new EmployeeManagement(req.user);
  console.log(`${req.user.uid} REQUESTED MODULES`);
  empMgmtObj
    ._get_employee_modules()
    .then((modules) => {
      return res.json(modules);
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ message: `Failed to get modules` });
    });
});

router.get("/allmodules", closedEnd, (req, res) => {
  const empMgmtObj = new EmployeeManagement(req.user);
  empMgmtObj
    ._get_all_modules()
    .then((modules) => {
      return res.send(modules);
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ message: `Failed to get modules` });
    });
});

router.put("/modules/update", closedEnd, (req, res) => {
  const empMgmtObj = new EmployeeManagement(req.user);
  const uid = req.body.uid;
  const modules = req.body.modules;
  if (!EmployeeManagementUTILS._check_module_exists_or_not(modules))
    return res
      .status(300)
      .json({ message: `Invalid modules are not considered` });
  console.log(`${req.user.uid} REQUESTED TO UPDATE ${uid} MODULES`);
  empMgmtObj
    ._update_employee_modules(uid, modules)
    .then(() => {
      console.log(`${uid} MODULES UPDATED`);
      return res.json({ message: `Updated modules for ${uid} successfully` });
    })
    .catch((err) => {
      console.error(err);
      return res
        .status(500)
        .json({ message: `Failed to update modules for ${uid}` });
    });
});

router.put("/:uid/suspend", closedEnd, (req, res) => {
  const employeeUID = req.params.uid;
  const empMgmtObj = new EmployeeManagement(req.user);
  empMgmtObj
    ._suspend_employee(employeeUID)
    .then(() => {
      return res.json({ message: `Suspended the employee successfully` });
    })
    .catch((err) => {
      console.error(err);
      if (err.toString().match("emp-not-exists"))
        return res.status(404).json({ message: `Employee not found` });
      return res
        .status(500)
        .json({ message: `Failed to suspend the employee` });
    });
});

router.put("/:uid/enable", closedEnd, (req, res) => {
  const employeeUID = req.params.uid;
  const empMgmtObj = new EmployeeManagement(req.user);
  empMgmtObj
    ._enable_employee(employeeUID)
    .then(() => {
      return res.json({ message: `Enabled the employee successfully` });
    })
    .catch((err) => {
      console.error(err);
      if (err.toString().match("emp-not-exists"))
        return res.status(404).json({ message: `Employee not found` });
      return res.status(500).json({ message: `Failed to enable the employee` });
    });
});

router.put("/:uid/deleteInactive", params_validator, closedEnd, (req, res) => {
  const employeeUID = req.params.uid;
  const empMgmtObj = new EmployeeManagement(req.user);
  empMgmtObj
    ._delete_inactive_employee(employeeUID)
    .then(() => {
      return res.json({ message: `Deleted the employee successfully` });
    })
    .catch((err) => {
      console.error(err);
      if (err.toString().match("no-employee-found"))
        return res
          .status(404)
          .json({ message: `Employee not found or already deleted` });
      return res.status(500).json({ message: `Failed to delete the employee` });
    });
});

router.put("/:uid/delete", closedEnd, (req, res) => {
  const employeeUID = req.params.uid;
  const empMgmtObj = new EmployeeManagement(req.user);
  empMgmtObj
    ._delete_employee(employeeUID)
    .then(() => {
      return res.json({ message: `Deleted the employee successfully` });
    })
    .catch((err) => {
      console.error(err);
      if (err.toString().match("emp-not-exists"))
        return res.status(404).json({ message: `Employee not found` });
      return res.status(500).json({ message: `Failed to delete the employee` });
    });
});

router.put("/:uid/updateprofile", params_validator, closedEnd, (req, res) => {
  const inputs = req.body;
  const employeeUID = req.params.uid;
  const empMgmtObj = new EmployeeManagement(req.user);
  const employeeInputs = EmployeeManagementUTILS._immutable_inputs(inputs);
  empMgmtObj
    ._update_profile(employeeUID, employeeInputs)
    .then(() => {
      return res.status(200).json({ message: `Updated profile successfully` });
    })
    .catch((err) => {
      if (err.toString().match("emp-not-exists"))
        return res
          .status(404)
          .json({ message: `Employee-${employeeUID} not found` });
      return res.status(500).json({ message: `Failed to update profile` });
    });
});
router.put("/:uid/holdaccount", closedEnd, (req, res) => {
  const employeeUID = req.params.uid;
  const empMgmtObj = new EmployeeManagement(req.user);
  empMgmtObj
    ._hold_account(employeeUID)
    .then(() => {
      return res.json({ message: `Employee Account is OnHold Successfully` });
    })
    .catch((err) => {
      console.error(err);
      if (err.toString().match("emp-not-exists"))
        return res.status(404).json({ message: `Employee not found` });
      return res
        .status(500)
        .json({ message: `Failed to hold account of the employee` });
    });
});

router.put("/documentignore", (req, res) => {
  const inputs = req.body;
  const empMgmtObj = new EmployeeManagement(req.user);
  empMgmtObj
    ._ignore_document(inputs)
    .then(() => {
      return res.json({ message: `Request Processed successfully` });
    })
    .catch((err) => {
      console.error(err);
      if (err.toString().match("emp-not-exists"))
        return res.status(404).json({ message: `Employee not found` });
      return res.status(500).json({ message: `Failed to do the process` });
    });
});
module.exports = router;
