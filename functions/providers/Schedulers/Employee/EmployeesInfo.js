const { admin, db } = require("../../../utils/admin")
const { _array_to_object } = require("../../../providers/CustomJSutils")
const { emailSender } = require("../../Email")

function FormatHtml(active, inactive, suspended) {
    const placeInactive = inactive.map((user) => {
        return ` <tr>
                <td style="padding: 15px; text-align: left;"> ${user.email} </td>
            </tr>`
    })
    return `
          <div>
                    <div>
                    <table style="border: 1px solid black; border-collapse: collapse;">
                        <tr Style="background-color: black; color: white;">
                            <td style="padding: 15px; text-align: left;"><b>Employee type</b></td>
                            <td style="padding: 15px; text-align: left;"><b>Count</b></td>
                        </tr>
                        <tbody>
                            <tr>
                                <td style="padding: 15px; text-align: left;">Active</td>
                                <td style="padding: 15px; text-align: left;">${active.length}</td>
                            </tr>
                            <tr>
                                <td style="padding: 15px; text-align: left;">Inactive</td>
                                <td style="padding: 15px; text-align: left;">${inactive.length}</td>
                            </tr>
                            <tr>
                                <td style="padding: 15px; text-align: left;">Suspended</td>
                                <td style="padding: 15px; text-align: left;">${suspended.length}</td>
                            </tr>
                        </tbody>
                    </table>               
                    </div>
                    <hr>
                    <div>
                    <h2><u>List of Inactive employee's</u></h2>
                    <table style="border: 1px solid black; border-collapse: collapse;">
                        <tr Style="background-color: black; color: white;">
                            <td style="padding: 15px; text-align: left;"><b>Employee</b></td>
                        </tr>
                        <tbody>
                            ${placeInactive}
                        </tbody>
                    </table>  
                    </div>
                </div>
            </div>
        </div>
    `
}

function SendEmployeeStats() {
    let body;
    return db.collection(`EMPLOYEES`)
        .where("isExist", "==", true)
        .get()
        .then(snap => {
            const data = snap.docs.map(doc => doc.data())
            const active = data.filter(user => user.status === "active")
            const inactive = data.filter(user => user.status === "inactive")
            const suspended = data.filter(user => user.status === "suspended")
            body = FormatHtml(active, inactive, suspended)
            return db.collection("COMPANY_CONFIG").doc("details").get()
        }).then(doc => {
            const recipients = doc.data().contactDetails.hrMailId
            const subject = `Employee Stats`
            return emailSender.openMail(recipients, subject, body)
        }).catch(err => {
            console.error(err);
        })
}

module.exports = SendEmployeeStats