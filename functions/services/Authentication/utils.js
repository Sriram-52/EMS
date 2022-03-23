const { admin, db } = require("../../utils/admin")
const JWT = require("../../providers/jwt")

class AuthenticationUTILS {
    static async _check_employee_registered_or_not(employeeEmail) {
        console.log(`CHECKING ${employeeEmail} registered or not`)
        return new Promise((resolve, reject) => {
            return admin.auth().getUserByEmail(employeeEmail)
                .then(() => {
                    console.log(`${employeeEmail} already registered`)
                    throw new Error("already-registered")
                }).catch(err => {
                    return reject(err)
                })
        })
    }

    static async _check_token_expiry(token) {
        return new Promise((resolve, reject) => {
            return db.collection("INVITATIONS").where("latestToken", "==", token).get()
                .then(snap => {
                    if (snap.size < 1)
                        throw new Error("token-not-found")
                    const data = snap.docs[0].data()
                    const tokenInfo = JWT.verifyToken(token)
                    const verify = tokenInfo.status
                    if (!verify) {
                        console.log(`EXPIRED AT: ${new Date(tokenInfo.error.expiredAt)}`)
                        throw new Error('token-expired')
                    }
                    if (tokenInfo.info.email !== data.invitee)
                        throw new Error('invalid-access')
                    return resolve(tokenInfo.info.email.toLowerCase())
                }).catch(err => {
                    return reject(err)
                })
        })
    }

    static _check_email_format(email) {
        const exp = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        try {
            return exp.test(email.toLowerCase().trim())
        } catch (error) {
            return false
        }
    }

    static defaultPayrollSettings() {
        return {
            dealPeriodDetails: {
                rangeType: "",
                rangeValue: 0,
                payAmount: 0,
                dealPeriodStartDate: "",
                cumulativeValue: 0
            },
            deductionDetails: {
                excludeDeductions: false,
                excludeForPayrolls: 0,
                payAmountToBeConsidered: 0
            },
            fixedBenchDetails: {
                rangeType: "",
                rangeValue: 0,
                isBench: false,
                payAmount: 0
            },
            fixedPayDetails: {
                rangeType: "",
                rangeValue: 0,
                fixedPayAmount: 0
            },
            insurance: {
                rangeType: "",
                rangeValue: 0,
                insurancePay: 0
            },
            payBonusDetails: {
                isEnabled: false,
                payAmount: 0,
                cumulativeValue: 0
            },
            additionalInformation: {
                stopPayroll: false,
                payrollsGeneratedTillNow: 0,
                latestPayrollGeneratedFor: "",
                currPayrollEndDate: "",
                payrollAmountGeneratedTillNow: 0
            }
        }
    }
}

module.exports = AuthenticationUTILS