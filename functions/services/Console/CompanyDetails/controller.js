const CompanyCustomisation = require("./model")
const express = require("express")
const router = express.Router()
const { closedEnd } = require("../../../endpoints")

router.put("/edit", closedEnd, (req, res) => {
  const inputs = req.body
  const companyObj = new CompanyCustomisation(req.user)
  return companyObj
    ._edit_company_details(inputs)
    .then(() => {
      return res.status(200).json({ message: `Updated Company Details` })
    })
    .catch((err) => {
      console.error(err)
      return res
        .status(500)
        .json({ message: `Can't updated company details right now`, ...err })
    })
})

module.exports = router
