const { admin, db } = require("../../../utils/admin")

async function countOverDueProjects() {
  const idRef = db.collection("ID_TRACKER").doc("task_management")
  return db
    .collection("PROJECTS")
    .get()
    .then((snap) => {
      const projects = snap.docs.map((doc) => doc.data())
      const overdueProjects = projects.filter(
        (project) =>
          project.isExist &&
          project.status === "Open" &&
          new Date(project.enddate) < new Date() &&
          new Date(project.startdate) < new Date()
      )
      return idRef.set({ projects_tracker: { OverDue: overdueProjects.length } }, { merge: true })
    })
    .catch((err) => {
      console.error(err)
    })
}

module.exports = { countOverDueProjects }
