const { admin, db } = require("../../../utils/admin")
const { logToHistory, logToProjectTimeLine } = require("../../../providers/EventLogger")
const { emailSender } = require("../../../providers/Email")
const { v4 } = require("uuid")


class Labels{
    constructor(user){
        this.actionPerformer = user
    }

    async _new_label(projectId, labelName, labelColorCode){
        const projectRef = db.collection("PROJECTS").doc(projectId)
        const labelId = v4();
        const newLabel = {
            [labelId] : {
                name : labelName,
                colorCode : labelColorCode,
                id : labelId,
                createdAt : new Date().toISOString(),
                createdBy : this.actionPerformer.uid,
                isExist: true
            }
        }

        let projectInfo;
        return projectRef.get()
            .then(doc => {
                if(!doc.exists)
                    throw new Error("project-does-not-exists")
                projectInfo = doc.data()
                const labels = Object.values(projectInfo.labels).filter(item => item.isExist === true).map(item => item.name.replace(/ /g,'').toLowerCase())
                if(labels.includes(labelName.replace(/ /g,'').toLowerCase())){
                    throw new Error('label-already-exists')
                }
                const FieldValue = admin.firestore.FieldValue
                return projectRef.set({
                    labels: newLabel
                }, { merge: true })
            }).then(() => {
                const labelDoc = {
                    subject:{
                        name: labelName,
                        labelColorCode: labelColorCode,
                        pid:projectRef.id,
                        labelId: labelId
                    },
                    actionBy:this.actionPerformer.uid,
                    createdAt:new Date().toISOString(),
                    type:"newLabel",
                    eventDetails: {
                        type: 'create',
                        before: {},
                        after: { name: newLabel[labelId].name, colorCode: newLabel[labelId].colorCode }
                    }
                }
                logToHistory(labelDoc)
                logToProjectTimeLine(labelDoc)
                return
            }).catch(err => {
                throw err
            })
    }

    async _update_label(projectId, labelId, labelName, labelColorCode){
        const projectRef = db.collection("PROJECTS").doc(projectId)
        let labelInfo;
        const updateLabel = {
            name : labelName,
            colorCode : labelColorCode
        }

        return projectRef.get()
            .then(doc => {
                if(!doc.exists)
                    throw new Error("project-does-not-exists")
                const projectInfo = doc.data()
                let labels = projectInfo.labels
                labelInfo = labels[labelId]
                delete labels[labelId]
                const excludedLabels = Object.values(projectInfo.labels).filter(item => item.isExist === true && item.id !== labelId).map(item => item.name.replace(/ /g,'').toLowerCase())
                if(excludedLabels.includes(labelName))
                    throw new Error('label-already-exists')     
                return projectRef.set({
                    labels: {
                        [labelId] : {
                            name: updateLabel.name,
                            colorCode: updateLabel.colorCode
                        }
                    }
                }, {merge: true})   
            }).then(() => {
                const labelDoc = {
                    subject:{
                        name: labelName,
                        labelColorCode: labelColorCode,
                        pid:projectRef.id,
                        labelId: labelId
                    },
                    actionBy:this.actionPerformer.uid,
                    createdAt:new Date().toISOString(),
                    type:"updateLabel",
                    eventDetails: {
                        type: 'update',
                        before: {name: labelInfo.name, colorCode: labelInfo.colorCode},
                        after: updateLabel
                    }
                }
                logToHistory(labelDoc)
                logToProjectTimeLine(labelDoc)
                return
            }).catch(err => {
                throw err
            })
    }


    async _delete_label(projectId, labelId){
        const projectRef = db.collection("PROJECTS").doc(projectId)
        let labelInfo;

        return projectRef.get()
        .then(doc => {
            if(!doc.exists)
                throw new Error("project-does-not-exists")
            const projectInfo = doc.data()
            labelInfo = projectInfo.labels[labelId]
            return projectRef.set({
                labels: {
                    [labelId] : {
                        isExist: false
                    }
                }
            }, {merge: true})
        }).then(() => {
            const labelDoc = {
                subject:{
                    name: labelInfo.name,
                    labelColorCode: labelInfo.colorCode,
                    pid:projectRef.id,
                    labelId: labelsRef.id
                },
                actionBy:this.actionPerformer.uid,
                createdAt:new Date().toISOString(),
                type:"deleteLabel",
                eventDetails: {
                    type: 'delete',
                    before: {name: labelInfo.name, colorCode: labelInfo.colorCode},
                    after: {}
                }
            }
            logToHistory(labelDoc)
            logToProjectTimeLine(labelDoc)
            return
        }).catch(err => {
            throw err
        })

    }
}

module.exports = Labels