const { db } = require("../utils/admin")

class MetaInfo {
  static async getEmployeeDetails(employeeID) {
    return db
      .collection("EMPLOYEES")
      .where("uid", "==", employeeID)
      .where("isExist", "==", true)
      .get()
      .then((snap) => {
        if (snap.size < 1) throw new Error("no-employee-found")
        return snap.docs[0].data()
      })
  }

  static async getClientDetails(clientID) {
    console.log(clientID)
    return db
      .collection("CLIENTS")
      .where("id", "==", clientID)
      .where("isExist", "==", true)
      .get()
      .then((snap) => {
        if (snap.size < 1) throw new Error("no-client-found")
        return snap.docs[0].data()
      })
  }

  static async getCompanyDetails() {
    return db
      .collection("COMPANY_CONFIG")
      .doc("details")
      .get()
      .then((doc) => {
        if (!doc.exists) throw new Error("no-company-details-found")
        return doc.data()
      })
  }
}

module.exports = MetaInfo
