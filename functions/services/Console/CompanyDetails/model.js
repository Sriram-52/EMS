const { admin, db } = require("../../../utils/admin")
const { logToHistory } = require("../../../providers/EventLogger")

/* 
    common methods used by the methods in this file are written in utils.js
*/

class CompanyCustomisation {
  constructor(user) {
    this.actionPerformer = user
  }

  async _edit_company_details(inputs) {
    const companyRef = db.collection("COMPANY_CONFIG").doc("details")
    let companyInfo
    return companyRef
      .get()
      .then((doc) => {
        return doc.data()
      })
      .then((data) => {
        companyInfo = data
        return companyRef.set(
          {
            ...inputs,
          },
          { merge: true }
        )
      })
      .then(() => {
        const log = {
          subject: {
            title: "Updated Company Details",
          },
          actionBy: this.actionPerformer.uid,
          createdAt: new Date().toISOString(),
          type: "updateCompanyDetails",
          eventDetails: {
            before: companyInfo,
            after: inputs,
          },
        }

        logToHistory(log)
        return
      })
      .catch((err) => {
        console.error(err)
        throw err
      })
  }
}

module.exports = CompanyCustomisation
