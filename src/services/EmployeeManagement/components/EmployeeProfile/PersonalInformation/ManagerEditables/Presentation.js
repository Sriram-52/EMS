import React, { useContext, useState } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import "semantic-ui-css/semantic.min.css"
import { Collapse } from "reactstrap"
import { makeStyles } from "@material-ui/core/styles"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Paper from "@material-ui/core/Paper"
import TextField from "@material-ui/core/TextField"
import Grid from "@material-ui/core/Grid"
import FormControl from "@material-ui/core/FormControl"
import Checkbox from "@material-ui/core/Checkbox"
import Select from "@material-ui/core/Select"
import InputLabel from "@material-ui/core/InputLabel"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import FormHelperText from "@material-ui/core/FormHelperText"
import MenuItem from "@material-ui/core/MenuItem"
import Button from "@material-ui/core/Button"
import Fab from "@material-ui/core/Fab"
// import { DataContext } from '../../../../contexts/data'
import { configuration } from "../../../../../config/companyConfig"
import DateFnsUtils from "@date-io/date-fns"
import EditIcon from "@material-ui/icons/Edit"
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers"
import validate from "../../../../../shared/validation"
import MetaInfo from "../../../../../shared/getMetaInfo"
import useStyles from "../../../styles/managerEditablesStyles"

function Presentation(props) {
  const classes = useStyles()
  const [isOpen, setIsOpen] = useState(false)
  const {
    info,
    isEditing,
    handleChange,
    personal,
    handleDone,
    handleCancel,
    handleDateChange,
    access_modules,
    loginProfile,
    names,
  } = props
  let namesList = Object.values(names)
  // const [state] = useContext(DataContext)
  const handleStartDateChange = (date) => {
    handleDateChange("dateofjoining", date)
  }

  const formatter = (date) => {
    console.log(date)
    let final = ""
    try {
      final = Intl.DateTimeFormat(
        configuration["date-code"],
        configuration.dateformat
      ).format(new Date(date))
    } catch (error) {
      console.log(error)
      final = date
    }
    return final
  }
  const metaInfo = new MetaInfo()
  const managers = []
  if (
    access_modules.includes("employees-manager") ||
    access_modules.includes("console-customization")
  )
    namesList.forEach((employee) => {
      if (
        (employee.isSupervisor && employee.status === "active") ||
        employee.designation === "admin"
      ) {
        managers.push(employee.uid)
      }
    })
  //managers.push(namesList.filter((name) => name.designation === "admin")[0].uid)

  const handleClickOpen = () => {
    setIsOpen(!isOpen)
  }
  console.log("maangers", managers)
  const branchList = [
    "ATL",
    "NJ",
    "NC",
    "FL",
    "DAL",
    "AUS",
    "SA",
    "VA",
    "STL",
    "MN",
    "CA-N",
    "CA",
    "SFO",
    "OH",
    "GVRM-IND",
  ]

  const departmentList = [
    "Java",
    "DevOps/Cloud",
    "Networking/Security",
    "Python",
    "QA",
    ".Net",
    "Data Science",
    "Big Data",
    "CRM",
    "Legal",
    "HR",
    "Accounts",
    "Bench sales",
  ]

  if (!isEditing) {
    if (isOpen) setIsOpen(!isOpen)
  }
  return (
    <div className="user-emergencycontact mt-3">
      <TableContainer className={classes.table} component={Paper}>
        <Table size="small" aria-label="simple table">
          <TableBody>
            <TableHead>
              <TableRow>
                <TableCell align="left">Branch</TableCell>
                <TableCell align="left">Employee status</TableCell>
                <TableCell width="12%" align="left">
                  Job Title
                </TableCell>
                <TableCell align="left">Reporting manager</TableCell>
                <TableCell width="12%" align="left">
                  Department
                </TableCell>
                <TableCell align="left">Date of joining</TableCell>
                <TableCell width="4%" align="left">
                  Category{" "}
                </TableCell>
                {isEditing &&
                (access_modules.includes("employees-manager") ||
                  access_modules.includes("console-customization")) ? (
                  <TableCell align="right">
                    <Fab
                      variant="contained"
                      className="flairbtn"
                      size="small"
                      onClick={handleClickOpen}
                    >
                      <EditIcon />
                    </Fab>
                  </TableCell>
                ) : null}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell align="left">{personal.branch}</TableCell>
                <TableCell align="left">{personal.employeestatus}</TableCell>
                <TableCell align="left">{personal.jobtitle}</TableCell>
                <TableCell align="left">
                  {!managers.includes(personal.reportingmanager)
                    ? metaInfo.emailToName(
                        namesList.filter(
                          (name) => name.designation === "admin"
                        )[0].uid
                      )
                    : metaInfo.emailToName(personal.reportingmanager)}
                </TableCell>
                <TableCell align="left">{personal.department}</TableCell>
                <TableCell align="left">
                  {formatter(personal.dateofjoining)}{" "}
                </TableCell>
                <TableCell align="left">{personal.category} </TableCell>
              </TableRow>
            </TableBody>
          </TableBody>
        </Table>
      </TableContainer>
      <div>
        <div style={{ marginTop: "10px" }}>
          <Collapse isOpen={isOpen}>
            <Paper style={{ padding: "15px" }}>
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  if (
                    info.branch !== "" &&
                    info.reportingmanager !== "" &&
                    info.department !== "" &&
                    info.category !== "" &&
                    !isNaN(Date.parse(info.dateofjoining)) &&
                    info.jobtitle.trim() !== ""
                  ) {
                    setIsOpen(!isOpen)
                    handleDone(e)
                  }
                }}
              >
                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <FormControl className={classes.formControl}>
                      <InputLabel required>Branch</InputLabel>
                      <Select
                        fullWidth
                        required
                        value={info.branch}
                        label="Branch"
                        name="branch"
                        onChange={handleChange}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        {branchList.map((branch, index) => {
                          return (
                            <MenuItem key={index} value={branch}>
                              {branch}
                            </MenuItem>
                          )
                        })}
                      </Select>
                      <FormHelperText>
                        {info.branch === "" ? "Select branch" : ""}{" "}
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl className={classes.formControl}>
                      <InputLabel required>Employee status</InputLabel>
                      <Select
                        fullWidth
                        required
                        value={info.employeestatus}
                        label="Employee status"
                        name="employeestatus"
                        onChange={handleChange}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value="Bench">Bench</MenuItem>
                        <MenuItem value="Working">Working</MenuItem>
                        <MenuItem value="Training">Training</MenuItem>
                      </Select>
                      <FormHelperText>
                        {info.employeestatus === ""
                          ? "Select employee status"
                          : ""}{" "}
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl className={classes.formControl}>
                      <InputLabel required>Department</InputLabel>
                      <Select
                        fullWidth
                        required
                        value={info.department}
                        label="Department"
                        name="department"
                        onChange={handleChange}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        {departmentList.map((department, index) => {
                          return (
                            <MenuItem key={index} value={department}>
                              {department}
                            </MenuItem>
                          )
                        })}
                      </Select>
                      <FormHelperText>
                        {info.department === "" ? "Select department" : ""}{" "}
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl className={classes.formControl}>
                      <InputLabel required>Reporting manager</InputLabel>
                      <Select
                        required
                        fullWidth
                        value={info.reportingmanager}
                        label="Reporting manager"
                        name="reportingmanager"
                        onChange={handleChange}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        {[...managers].map((manager) => (
                          <MenuItem value={manager}>
                            {metaInfo.emailToName(manager)}
                          </MenuItem>
                        ))}
                      </Select>
                      <FormHelperText>
                        {info.reportingmanager === ""
                          ? "Select reporting manager"
                          : ""}{" "}
                      </FormHelperText>
                    </FormControl>
                  </Grid>

                  <Grid item xs={6}>
                    <FormControl className={classes.formControl}>
                      <InputLabel required>Category</InputLabel>
                      <Select
                        fullWidth
                        required
                        value={info.category}
                        label="Category"
                        name="category"
                        onChange={handleChange}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value="W2">W2</MenuItem>
                        <MenuItem value="C2C">C2C</MenuItem>
                      </Select>
                      <FormHelperText>
                        {info.category === "" ? "Select category" : ""}{" "}
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        required
                        margin="normal"
                        id="date-picker-startdate"
                        label="Date of joining"
                        format="MM/dd/yyyy"
                        maxDate={new Date().toISOString()}
                        helperText={
                          info.dateofjoining
                            ? 
                             (isNaN(Date.parse(info.dateofjoining))
                            ? "Select date of joining"
                            : ""):""
                        }
                        value={info.dateofjoining ? info.dateofjoining : null}
                        onChange={handleStartDateChange}
                        name="dateofjoining"
                        KeyboardButtonProps={{
                          "aria-label": "change date",
                        }}
                      />
                    </MuiPickersUtilsProvider>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Job title"
                      required
                      name="jobtitle"
                      helperText={info.jobtitle === "" ? "Enter jobtitle" : ""}
                      value={info.jobtitle}
                      variant="outlined"
                      size="small"
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={info.isSupervisor}
                          onChange={handleChange}
                          name="isSupervisor"
                        />
                      }
                      label="Supervisor"
                    />
                  </Grid>
                </Grid>
                <br />
                <div className="text-center">
                  <Button variant="contained" type="submit" color="primary">
                    Save
                  </Button>{" "}
                  <Button
                    variant="contained"
                    onClick={() => {
                      setIsOpen(!isOpen)
                      handleCancel()
                    }}
                    color="default"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </Paper>
          </Collapse>
        </div>
      </div>
    </div>
  )
}

export default Presentation
