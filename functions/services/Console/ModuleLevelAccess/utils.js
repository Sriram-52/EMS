class ModulesManagmentUTILS {
  static _acceptable_inputs(inputs) {
    const keys = [
      "wiki",
      "timesheets",
      "accounts",
      "immigration",
      "task-management",
      "employee-self-services",
      "discussions",
      "employees-manager",
      "console-customization",
      "wiki-manager",
      "timesheets-manager",
      "immigration-manager",
      "accounts-manager",
      "task-management-manager",
      "employee-self-services-manager",
    ]
    const modules = Array.isArray(inputs.modules) ? inputs.modules : []
    return modules.filter((item) => keys.includes(item))
  }
}

module.exports = ModulesManagmentUTILS
