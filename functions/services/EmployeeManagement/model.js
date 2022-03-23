const { admin, db } = require("../../utils/admin")
const { emailSender } = require("../../providers/Email")
const EmployeeManagementUTILS = require("./utils")
const { logToHistory } = require("../../providers/EventLogger")

class EmployeeManagement {
  constructor(user) {
    this.actionPerformer = user;
  }

  async _suspend_employee(uid) {
    const userRef = db.collection("EMPLOYEES").doc(uid);
    const idRef = db.collection(`ID_TRACKER`).doc("employees");
    return EmployeeManagementUTILS._check_employee_exists(uid)
      .then((employee) => {
        return admin.auth().updateUser(uid, {
          disabled: true,
        });
      })
      .then(() => {
        return userRef.update({
          isDisabled: true,
          status: "suspended",
        });
      })
      .then(() => {
        const FieldValue = admin.firestore.FieldValue;
        return idRef.update({
          suspended: FieldValue.increment(1),
          active: FieldValue.increment(-1),
        });
      })
      .then(() => {
        const log = {
          subject: {
            uid: uid,
          },
          actionBy: this.actionPerformer.uid,
          createdAt: new Date().toISOString(),
          type: "disableuser",
          eventDetails: {
            before: { isDisabled: false },
            after: { isDisabled: true },
          },
        };

        logToHistory(log);
        const subject = `You are suspended`;
        const body = `<div>
                    ${this.actionPerformer.name} suspended you.
                </div>`;
        emailSender.closedMail(uid, subject, body);
        return;
      })
      .catch((err) => {
        throw err;
      });
  }
  async _hold_account(uid) {
    const userRef = db.collection("EMPLOYEES").doc(uid);
    return EmployeeManagementUTILS._check_employee_exists(uid)
      .then(() => {
        return userRef.update({
          isHold: true,
          status: "onHold",
        });
      })
      .then(() => {
        const log = {
          subject: {
            uid: uid,
          },
          actionBy: this.actionPerformer.uid,
          createdAt: new Date().toISOString(),
          type: "onHoldAccount",
          eventDetails: {
            before: { isHold: false },
            after: { isHold: true },
          },
        };

        logToHistory(log);
        const subject = `You're Account is on Hold`;
        const body = `<div>
                    ${this.actionPerformer.name} has put your account on hold.
                </div>`;
        emailSender.closedMail(uid, subject, body);
        return;
      })
      .catch((err) => {
        throw err;
      });
  }
  async _ignore_document(inputs) {
    const { EmpId, isIgnored } = inputs;
    const employeeRef = db
      .collection(`EMPLOYEES/${EmpId}/EXPIRED_LIST`)
      .doc("expired_list_data");
    let details;
    return EmployeeManagementUTILS._check_employee_exists(EmpId)
      .then(() => {
        return employeeRef.get();
      })
      .then((doc) => {
        details = doc.data();
        return employeeRef.update({
          isIgnored,
        });
      })
      .then(() => {
        const log = {
          subject: {
            uid: EmpId,
          },
          actionBy: "FLR000001",
          createdAt: new Date().toISOString(),
          type: "updated expired list",
          eventDetails: {
            before: details,
            after: { ...details, ...isIgnored },
          },
        };
        logToHistory(log);
        return;
      })
      .catch((err) => {
        throw err;
      });
  }
  async _enable_employee(uid) {
    const userRef = db.collection("EMPLOYEES").doc(uid);
    return EmployeeManagementUTILS._check_employee_exists(uid)
      .then((employee) => {
        return admin.auth().updateUser(uid, {
          disabled: false,
        });
      })
      .then(() => {
        return userRef.update({
          isDisabled: false,
          status: "active",
        });
      })
      .then(() => {
        const log = {
          subject: {
            uid: uid,
          },
          actionBy: this.actionPerformer.uid,
          createdAt: new Date().toISOString(),
          type: "disableuser",
          eventDetails: {
            before: { isDisabled: true },
            after: { isDisabled: false },
          },
        };

        logToHistory(log);
        const subject = `You are made active`;
        const body = `<div>
                    ${this.actionPerformer.name} made your presence active.
                </div>`;
        emailSender.closedMail(uid, subject, body);
        return;
      })
      .catch((err) => {
        throw err;
      });
  }

  async _delete_inactive_employee(email) {
    const userRef = db.collection("EMPLOYEES").doc(email);
    let userInfo = {};
    return userRef
      .get()
      .then((data) => {
        if (!data.exists || !data.data().isExist)
          throw new Error("no-employee-found");
        userInfo = data.data();
        return userRef.set({ isExist: false }, { merge: true });
      })
      .then(() => {
        const log = {
          subject: {
            uid: email,
          },
          actionBy: this.actionPerformer.uid,
          createdAt: new Date().toISOString(),
          type: "deleteInactiveUser",
          eventDetails: {
            before: userInfo,
            after: { ...userInfo, isExist: false },
          },
        };
        logToHistory(log);
        return;
      })
      .catch((err) => {
        throw err;
      });
  }

  async _delete_employee(uid) {
    const userRef = db.collection("EMPLOYEES").doc(uid);
    return EmployeeManagementUTILS._check_employee_exists(uid)
      .then((employee) => {
        return admin.auth().updateUser(uid, {
          disabled: true,
        });
      })
      .then(() => {
        return userRef.update({
          isDisabled: true,
          isExist: false,
        });
      })
      .then(() => {
        const log = {
          subject: {
            uid: uid,
          },
          actionBy: this.actionPerformer.uid,
          createdAt: new Date().toISOString(),
          type: "deleteUser",
          eventDetails: {
            before: { isDisabled: false, isExist: true },
            after: { isDisabled: true, isExist: false },
          },
        };

        logToHistory(log);
        const subject = `You are made active`;
        const body = `<div>
                    ${this.actionPerformer.name} made your presence active.
                </div>`;
        emailSender.closedMail(uid, subject, body);
        return;
      })
      .catch((err) => {
        throw err;
      });
  }

  async _get_employee_modules() {
    return db
      .collection("EMPLOYEES")
      .doc(this.actionPerformer.uid)
      .collection("MODULE_LEVEL_ACCESS")
      .doc("modules")
      .get()
      .then((doc) => {
        return doc.data().accessibles;
      })
      .catch((err) => {
        return err;
      });
  }

  async _update_employee_modules(uid, modules) {
    return db
      .collection("EMPLOYEES")
      .doc(uid)
      .collection("MODULE_LEVEL_ACCESS")
      .doc("modules")
      .set(
        {
          accessibles: modules,
        },
        { merge: true }
      )
      .catch((err) => {
        return err;
      });
  }

  async _get_all_modules() {
    return db
      .collectionGroup("MODULE_LEVEL_ACCESS")
      .get()
      .then((snap) => {
        return snap.docs.map((doc) => doc.data());
      })
      .catch((err) => {
        throw err;
      });
  }

  async _update_profile(uid, inputs) {
    const employeeRef = db.collection("EMPLOYEES").doc(uid);
    console.log(inputs);
    let employeeInfo;
    return EmployeeManagementUTILS._check_employee_exists(uid)
      .then(() => {
        return employeeRef.get();
      })
      .then((doc) => {
        employeeInfo = doc.data();
        return employeeRef.set(inputs, { merge: true });
      })
      .then(() => {
        const log = {
          subject: {
            uid: uid,
          },
          actionBy: this.actionPerformer.uid,
          createdAt: new Date().toISOString(),
          type: "updateProfile",
          eventDetails: {
            before: employeeInfo,
            after: { ...employeeInfo, ...inputs },
          },
        };
        logToHistory(log);
        return;
      })
      .catch((err) => {
        throw err;
      });
  }
}

module.exports = EmployeeManagement
