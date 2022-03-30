import React, { useEffect, useState } from "react"
import { firestoreConnect, isLoaded } from "react-redux-firebase"
import Presentation from "./Presentation"
import { compose } from "redux"
import { updateProfile } from "../../../middleware/index"
import { connect } from "react-redux"
// import Axios from "axios"
// import validate from "../../../../../shared/validation"

function Container(props) {
  console.log(props.profile, "props")
  const { access_modules, loginProfile, names } = props
  const [state, setState] = useState({
    branch: "",
    employeestatus: "",
    jobtitle: "",
    reportingmanager: "",
    department: "",
    dateofjoining: "",
    category: "",
    isSupervisor: false,
  })
  const [profile, setProfile] = useState({
    profile: {},
    personal: {},
  })
  const [state1, setState1] = useState({})
  useEffect(() => {
    setProfile({
      ...profile,
      personal: props.profile.personal,
      profile: props.profile,
    })
    setState({
      ...state,
      branch: props.profile.personal.branch,
      employeestatus: props.profile.personal.employeestatus,
      jobtitle: props.profile.personal.jobtitle,
      reportingmanager: props.profile.personal.reportingmanager,
      department: props.profile.personal.department,
      dateofjoining: props.profile.personal.dateofjoining,
      category: props.profile.personal.category,
      isSupervisor: props.profile.personal.isSupervisor,
    })
  }, [])

  const handleSet = (key, value) => {
    console.log("kye", key, value, state)
  }
  const handleChange = (e) => {
    // const validate = new Validations()
    console.log(e.target.name, e.target.checked)
    if (e.target.name === "isSupervisor")
      setState({
        ...state,
        [e.target.name]: e.target.checked,
      })
    else
      setState({
        ...state,
        [e.target.name]: e.target.value,
      })
  }
  const handleDone = (e) => {
    const { email, updateProfile, profile } = props
    console.log("Enter")
    const personal = {
      branch: state.branch,
      employeestatus: state.employeestatus,
      jobtitle: state.jobtitle,
      reportingmanager: state.reportingmanager,
      department: state.department,
      dateofjoining: state.dateofjoining,
      category: state.category,
      isSupervisor: state.isSupervisor,
    }
    console.log(personal)
    setState({
      ...state,
      personal,
    })

    let finalData = {}
    finalData["personal"] = {
      ...profile.personal,
      ...personal,
    }
    console.log(profile)
    let data = finalData.personal

    let payload = {
      employeeID: profile.employeeID,
      data: data,
      key: "personal",
    }
    updateProfile(payload)

    // props.handleUpdateProfile(
    //   {
    //     category: "employee",
    //     employee: true,
    //   },
    //   {
    //     ...profile.personal,
    //     ...profile.mailingaddress,
    //     ...personal,
    //   }
    // )
  }
  const handleCancel = () => {
    Object.entries(props.profile.personal).forEach(([key, value]) => {
      setState({
        ...state,
        [key]: value,
      })
    })
    Object.entries(props.profile.mailingaddress).forEach(([key, value]) => {
      setState({
        ...state,
        [key]: value,
      })
    })
  }

  const handleDateChange = (key, value) => {
    if (!isNaN(Date.parse(value)))
      setState({
        ...state,
        [key]: new Date(value).toISOString(),
      })
  }
  if (isLoaded(props)) {
    const info = {
      branch: state.branch,
      employeestatus: state.employeestatus,
      jobtitle: state.jobtitle,
      reportingmanager: state.reportingmanager,
      department: state.department,
      dateofjoining: state.dateofjoining,
      category: state.category,
      isSupervisor: state.isSupervisor,
    }
    return (
      <div>
        <Presentation
          info={info}
          loginProfile={loginProfile}
          access_modules={access_modules}
          names={names}
          {...state}
          {...profile}
          isEditing={props.isEditing}
          handleChange={handleChange}
          handleDone={handleDone}
          handleCancel={handleCancel}
          handleDateChange={handleDateChange}
        />
      </div>
    )
  }
  return (
    <div className="spinner">
      <div className="bouncer">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}
const mapStateToProps = (state, ownProps) => {
  return {
    access_modules: state.employee.employeeModules.accessModules,
    loginProfile: state.firebase.profile,
    names: state.firestore.ordered.names[0],
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    updateProfile: (payload) => {
      dispatch(updateProfile(payload))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)
