const { admin, db } = require("../../../utils/admin")

class ProjectUTILS{

    static async _to_create_check_project_exists(title, cid){
        console.log('CHECKING PROJECT EXISTS OR NOT FOR CREATE')
        const titleRef = db.collection("PROJECTS").where("title", "==", title)
        const cidRef = db.collection("PROJECTS").where("cid", "==", cid)

        return titleRef.get()
            .then(snap => {
                console.log(snap.docs.length > 0)
                if(snap.docs.length > 0)
                    throw new Error("title-already-exists")
                return cidRef.get()
            }).then(snap => {
                console.log(snap.docs.length > 0)
                if(snap.docs.length > 0)
                    throw new Error("cid-already-exists")
                return true    
            }).catch(err => {
                throw err
            })
    }

    static async _to_update_check_project_exists(id, title, cid){
        console.log('CHECKING PROJECT EXISTS OR NOT FOR UPDATE')
        const isTitleMatches = db.collection("PROJECTS").where("title", "==", title).get()
        const isCIDmatches = db.collection("PROJECTS").where("cid", "==", cid).get()

        return Promise.all([
            isTitleMatches,
            isCIDmatches
        ]).then(([titleQuerySnapshot, cidQuerySnapshot]) => {
            if(titleQuerySnapshot.docs.filter(doc => doc.id !== id).length)
                throw new Error("title-already-exists")
            if(cidQuerySnapshot.docs.filter(doc => doc.id !== id).length)
                throw new Error("cid-already-exists") 
            return true    
        }).catch(err => {
            throw err
        })
    }

    static async _check_project_exists(id){
        return db.collection("PROJECTS").where("id", "==", id).where("isExist", "==", true).get()
            .then(snap => {
                if(snap.size < 1)
                    throw new Error("no-project-exists")
                return snap.docs[0].data()    
            }).catch(err => {
                throw err
            })
    }

    static _assign_levels(Users){
        let objList = {}
        Users.forEach(user => {
            objList[user] = {
                uid: user,
                create: true,
                update: true,
                read: true,
                delete: false
            }
        })
        return objList
    }
}

module.exports = ProjectUTILS