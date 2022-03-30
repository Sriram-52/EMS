const { logToHistory } = require("../../../providers/EventLogger")
const { db } = require("../../../utils/admin")

class ModulesManagment {
  constructor(user) {
    this.actionPerformer = user
  }

  async _get_all_modules() {
    return db
      .collectionGroup("MODULE_LEVEL_ACCESS")
      .get()
      .then((snap) => {
        return snap.docs.map((doc) => doc.data())
      })
      .catch((err) => {
        throw err
      })
  }

  async _update_modules(uid, modules) {
    const employeeRef = db.collection("EMPLOYEES").doc(uid)
    const modulesRef = employeeRef.collection("MODULE_LEVEL_ACCESS").doc("modules")
    let oldData
    return employeeRef
      .get()
      .then((doc) => {
        if (!doc.exists) throw new Error("emp-not-found")
        if (!doc.data().isExist) throw new Error("emp-deleted")
        if (doc.data().status !== "active") throw new Error("inactive-emp")
        return modulesRef.get()
      })
      .then((doc) => {
        oldData = doc.data()
        return modulesRef.set({ accessibles: modules }, { merge: true })
      })
      .then(() => {
        const log = {
          subject: {
            uid: uid,
          },
          actionBy: this.actionPerformer.uid,
          createdAt: new Date().toISOString(),
          type: "updateModules",
          eventDetails: {
            before: oldData,
            after: { ...oldData, accessibles: modules },
          },
        }
        logToHistory(log)
        return
      })
      .catch((err) => {
        throw err
      })
  }
}

module.exports = ModulesManagment
