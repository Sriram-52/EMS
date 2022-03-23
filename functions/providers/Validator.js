const configuration = require("../config.json")
class Validator {
  static params_validator(req, res, next) {
    const params = req.params
    if (Object.values(params).includes("undefined")) {
      console.log(params)
      return res.status(400).json({ message: "Invalid route parameters" })
    }
    return next()
  }

  static currencyFormatterUs(money) {
    try {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(money)
    } catch (error) {
      console.error(error)
      return money
    }
  }

  static checkName(name) {
    const exp = /^[a-zA-Z .]{1,}$/
    return exp.test(name.trim())
  }

  static checkNumber(number) {
    const exp = /\D+/g
    const expForChar = /^\d+$/
    if (!expForChar.test(number.trim())) return false
    let clearNum = number.replace(exp, "")
    return clearNum.length === 10
  }

  static checkZip(number) {
    const exp = /\D+/g
    const expForChar = /^\d+$/
    if (!expForChar.test(number.trim())) return false
    let clearNum = number.replace(exp, "")
    return clearNum.length > 4 && clearNum.length < 9
  }

  static checkFloatNumber(number) {
    const exp = /\D+/g
    const expForChar = /[\d.][\d.]/
    if (!expForChar.test(number.trim())) return false
    let clearNum = number.replace(exp, "")
    return clearNum.length < 5
  }

  static checkDateDiff(startdate, enddate) {
    return new Date(enddate) - new Date(startdate) >= 0 ? true : false
  }

  static checkEmail(email) {
    const exp = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    try {
      return exp.test(email.toLowerCase().trim())
    } catch (error) {
      return false
    }
  }

  static checkWebsite(website) {
    const exp = /(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]/
    try {
      return exp.test(website.toLowerCase().trim())
    } catch (error) {
      return false
    }
  }

  static checkAddress(address) {
    return address.trim().length > 0
  }

  static nameFormatterToUpperCase(name) {
    try {
      let upperCaseFormate = name.toLowerCase().split(" ")
      for (let i = 0; i < upperCaseFormate.length; i++) {
        upperCaseFormate[i] =
          upperCaseFormate[i].charAt(0).toUpperCase() + upperCaseFormate[i].substring(1)
      }
      return upperCaseFormate.join(" ")
    } catch (error) {
      return ""
    }
  }

  static dateFormatter(date) {
    let final = ""
    try {
      final = new Intl.DateTimeFormat(configuration["date-code"], configuration.dateformat).format(
        new Date(date)
      )
    } catch (error) {
      console.error(error);
      final = date
    }
    return final
  }

  static dateWithNoTime(date) {
    let final = ""
    try {
      const year = new Date(date).getFullYear()
      const month = new Date(date).getMonth()
      const day = new Date(date).getDate()
      final = new Date(year, month, day)
    } catch (error) {
      final = date
    }
    return final
  }

  static dateAndTimeFormatter(timestamp) {
    let final = ""
    try {
      final = new Intl.DateTimeFormat(configuration["date-code"], {
        ...configuration.dateformat,
        ...configuration.timeformat,
      }).format(new Date(timestamp))
    } catch (error) {
      final = timestamp
    }
    return final
  }

  static getQueryParameter(param) {
    const urlParams = new URLSearchParams(window.location.search)
    return urlParams.get(param)
  }
}

module.exports = Validator