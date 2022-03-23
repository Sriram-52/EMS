const { admin, db } = require("../../utils/admin")

const allModules = [ 'wiki', "timesheets", "accounts", "immigration", "task-management", "employee-self-services", "discussions", "employees-manager", "console-customization", "wiki-manager", "timesheets-manager", "immigration-manager", "accounts-manager", "task-management-manager", "employee-self-services-manager" ]

class EmployeeManagementUTILS {
  static _check_employee_exists(uid) {
    return db
      .collection("EMPLOYEES")
      .where("uid", "==", uid)
      .where("isExist", "==", true)
      .get()
      .then((snap) => {
        if (snap.size < 1) throw new Error("emp-not-exists")
        return snap.docs[0].data()
      })
      .catch((err) => {
        throw err
      })
  }

  static async _get_employee(uid) {
    return db
      .collection("EMPLOYEES")
      .doc(uid)
      .get()
      .then((doc) => doc.data())
      .catch((err) => {
        throw err
      })
  }

  static _check_module_exists_or_not(modules) {
    return modules.every((module) => allModules.includes(module))
  }

  static _immutable_inputs(inputs) {
    const keys = [
      "createdAt",
      "email",
      "employeeID",
      "isDisabled",
      "isExist",
      "role",
      "status",
      "uid",
    ]
    const acceptableInputs = {}
    Object.entries(inputs).forEach(([key, value]) => {
      if (!keys.includes(key.trim())) {
        acceptableInputs[key] = value
      }
    })
    return acceptableInputs
  }
}

module.exports = EmployeeManagementUTILS