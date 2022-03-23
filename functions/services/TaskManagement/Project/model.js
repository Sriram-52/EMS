const { admin, db } = require("../../../utils/admin")
const { logToHistory, logToProjectTimeLine } = require("../../../providers/EventLogger")
const { emailSender } = require("../../../providers/Email")
const ProjectUTILS = require("./utils")

class Project {
    constructor(user) {
        this.actionPerformer = user
    }

    async _new_project(newProject) {
        const projectRef = db.collection("PROJECTS").doc()
        const idRef = db.collection("ID_TRACKER").doc("projects")

        return ProjectUTILS._to_create_check_project_exists(newProject.title, newProject.cid)
            .then(() => {
                console.log("CREATING PROJECT")
                return projectRef.set({
                    ...newProject,
                    isExist: true,
                    id: projectRef.id,
                    createdAt: new Date().toISOString(),
                    createdBy: this.actionPerformer.uid
                })
            })
            .then(() => {
                return idRef.get()
            })
            .then(doc => {
                if (!doc.exists) {
                    const projectIdDoc = {
                        noOfProjects: 1,
                        open: newProject.status === "Open" ? 1 : 0,
                        closed: newProject.status === "Closed" ? 1 : 0,
                        tasks_tracker: {}
                    }
                    return idRef.set(projectIdDoc)
                }
                const FieldValue = admin.firestore.FieldValue
                return idRef.update({
                    noOfProjects: FieldValue.increment(1),
                    open: newProject.status === "Open" ? FieldValue.increment(1) : FieldValue.increment(0),
                    closed: newProject.status === "Closed" ? FieldValue.increment(1) : FieldValue.increment(0),
                })
            }).then(() => {
                console.log(`${this.actionPerformer.uid} CREATED PROJECT ${newProject.title}`)
                const historyDoc = {
                    subject: {
                        title: newProject.title,
                        pid: projectRef.id,
                    },
                    actionBy: this.actionPerformer.uid,
                    createdAt: new Date().toISOString(),
                    type: "createProject",
                    eventDetails: {
                        before: {},
                        after: newProject
                    }
                }
                logToHistory(historyDoc)
                logToProjectTimeLine(historyDoc)
                const users = Object.entries(newProject.Users).map(
                    ([key, value]) => value.uid
                )
                const subject = `A project assigned to you`
                const body = `<div>
                                ${this.actionPerformer.name} assigned you on the project <b>${newProject.title}</b>
                            </div>
                            `
                emailSender.closedMail(users, subject, body)
                return
            }).catch(err => {
                throw err
            })
    }

    async _update_project(project, id, cid) {
        const projectRef = db.collection("PROJECTS").doc(id)
        return ProjectUTILS._to_update_check_project_exists(id, project.title, cid)
            .then(() => {
                console.log("UPDATING PROJECT")
                return projectRef.set(project, { merge: true })
            }).then(() => {
                const historyDoc = {
                    subject: {
                        title: project.title,
                        pid: projectRef.id,
                    },
                    actionBy: this.actionPerformer.uid,
                    createdAt: new Date().toISOString(),
                    type: "updateProject",
                    eventDetails: project
                }
                logToHistory(historyDoc)
                logToProjectTimeLine(historyDoc)
                // const users = newProject.Users.map(item => item.uid)
                // const subject = `A project assigned to you`
                // const body = `<div>
                //                 ${this.actionPerformer.name} assigned you on the project <b>${newProject.title}</b>
                //             </div>
                //             `
                // emailSender.closedMail(users, subject, body)
                return
            }).catch(err => {
                throw err
            })
    }

    async _delete_project(projectId) {
        const projectRef = db.collection("PROJECTS").doc(projectId)
        let projectInfo;
        return ProjectUTILS._check_project_exists(projectId)
            .then(project => {
                projectInfo = project
                return projectRef.update({
                    isExist: false
                })
            }).then(() => {
                const log = {
                    subject: {
                        title: projectInfo.title,
                        pid: projectRef.id
                    },
                    actionBy: this.actionPerformer.uid,
                    createdAt: new Date().toISOString(),
                    type: "deleteProject",
                    eventDetails: {
                        before: projectInfo,
                        after: {}
                    }
                }

                logToHistory(log)
                logToProjectTimeLine(log)
                const users = Object.keys(projectInfo.Users)
                const subject = `Project Deleted`
                const body = `<div>
                                ${this.actionPerformer.name} deleted the project <b>${projectInfo.title}</b> on which you are assigned on 
                            </div>
                            `
                emailSender.closedMail(users, subject, body)
                return
            }).catch(err => {
                throw err
            })
    }

    async _add_member_to_project(employees, projectId) {
        // TODO: verify whether employees are active or in active
        let acceptedEmployees = [], rejectedEmployees = [], projectInfo, usersWithPermissions;
        const projectRef = db.collection("PROJECTS").doc(projectId)
        return ProjectUTILS._check_project_exists(projectId)
            .then(project => {
                projectInfo = project
                const existingUsers = Object.keys(project.Users)
                rejectedEmployees = employees.filter(uid => existingUsers.includes(uid))
                acceptedEmployees = employees.filter(uid => !existingUsers.includes(uid))
                usersWithPermissions = ProjectUTILS._assign_levels(acceptedEmployees)
                return projectRef.set({
                    Users: usersWithPermissions
                }, { merge: true })
            }).then(() => {
                const log = {
                    subject: {
                        title: projectInfo.title,
                        pid: projectRef.id,
                        employees: acceptedEmployees
                    },
                    actionBy: this.actionPerformer.uid,
                    createdAt: new Date().toISOString(),
                    type: "addMemberToProject",
                    eventDetails: {
                        before: { Users: projectInfo.Users },
                        after: { Users: { ...projectInfo.Users, ...usersWithPermissions } }
                    }
                }

                logToHistory(log)
                logToProjectTimeLine(log)
                const users = acceptedEmployees
                const subject = `A project assigned to you`
                const body = `<div>
                                ${this.actionPerformer.name} assigned you on the project <b>${projectInfo.title}</b>
                            </div>
                            `
                emailSender.closedMail(users, subject, body)
                return { acceptedEmployees, rejectedEmployees }
            }).catch(err => {
                const errObj = {
                    err,
                    acceptedEmployees,
                    rejectedEmployees
                }
                throw errObj
            })
    }

    async _remove_member_from_project(employees, projectId) {
        const projectRef = db.collection("PROJECTS").doc(projectId)
        let projectInfo, acceptedEmployees = [], rejectedEmployees = [];

        return ProjectUTILS._check_project_exists(projectId)
            .then(project => {
                projectInfo = project
                const existingUsers = Object.keys(project.Users)
                rejectedEmployees = employees.filter(uid => !existingUsers.includes(uid))
                acceptedEmployees = employees.filter(uid => existingUsers.includes(uid))
                const deleteAction = {}, FieldValue = admin.firestore.FieldValue
                if (acceptedEmployees.length < 1)
                    throw new Error("emp-already-removed")
                acceptedEmployees.forEach(uid => {
                    deleteAction['Users.' + uid] = FieldValue.delete()
                })
                console.log(deleteAction)
                return projectRef.update({
                    ...deleteAction
                })
            }).then(() => {
                const log = {
                    subject: {
                        title: projectInfo.title,
                        pid: projectRef.id,
                        employees: acceptedEmployees
                    },
                    actionBy: this.actionPerformer.uid,
                    createdAt: new Date().toISOString(),
                    type: "deleteProjectMember",
                    eventDetails: {
                        before: { Users: projectInfo.Users },
                        after: { Users: Object.entries(projectInfo).map(([key, value]) => !acceptedEmployees.includes(key)) }
                    }
                }

                logToHistory(log)
                logToProjectTimeLine(log)
                const users = acceptedEmployees
                const subject = `You are removed from the project`
                const body = `<div>
                                ${this.actionPerformer.name} removed you from the project <b>${projectInfo.title}</b>
                            </div>
                            `
                emailSender.closedMail(users, subject, body)
                return { acceptedEmployees, rejectedEmployees }
            }).catch(err => {
                const errObj = {
                    err,
                    acceptedEmployees,
                    rejectedEmployees
                }
                throw errObj
            })
    }

    async _update_project_permission_levels(level, projectId) {
        let projectInfo;
        const projectRef = db.collection("PROJECTS").doc(projectId)
        return ProjectUTILS._check_project_exists(projectId)
            .then(project => {
                projectInfo = project
                if (!Object.keys(projectInfo.Users).includes(level.uid))
                    throw new Error("emp-not-found")
                return projectRef.set({
                    Users: {
                        [level.uid]: level
                    }
                }, { merge: true })
            }).then(() => {
                const log = {
                    subject: {
                        title: projectInfo.title,
                        pid: projectRef.id,
                        employees: [level.uid]
                    },
                    actionBy: this.actionPerformer.uid,
                    createdAt: new Date().toISOString(),
                    type: "updateProjectAccessLevels",
                    eventDetails: {
                        before: { Users: projectInfo.Users },
                        after: { Users: { ...projectInfo.Users, [level.uid]: level } }
                    }
                }

                logToHistory(log)
                logToProjectTimeLine(log)
                const users = [level.uid]
                const subject = `Your permission levels modified`
                const body = `<div>
                                ${this.actionPerformer.name} modified your permission levels on the project <b>${projectInfo.title}</b>
                            </div>
                            `
                emailSender.closedMail(users, subject, body)
                return
            }).catch(err => {
                throw err
            })
    }
}

module.exports = Project