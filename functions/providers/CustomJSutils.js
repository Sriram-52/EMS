const { eachDayOfInterval } = require("date-fns")
const config = require("../config.json")

class JSutils {
  start_letter_to_upper_case(word) {
    // payments --> Payments
    return word[0].toUpperCase() + word.slice(1)
  }

  dateFormatter(date) {
    let final = ''
    try {
      final = Intl.DateTimeFormat(
        config['date-code'],
        config.dateformat
      ).format(new Date(date))
    } catch (error) {
      console.log(error)
      final = date
    }
    return final
  }


  array_of_dates_between(start, end) {
    return eachDayOfInterval({
      start: start,
      end: end
    })
  }

  _array_to_object(array, key) {
    return array.reduce((initial, item) => {
      return {
        ...initial,
        [item[key]]: item
      }
    }, {})
  }

  calcTotalTime(arr) {
    const hours = [],
      minutes = [];
    arr.forEach((item) => {
      const [h, m] = item.split(":");
      hours.push(parseInt(h));
      minutes.push(parseInt(m));
    });
    let totalHours = hours.reduce((a, b) => a + b, 0);
    let totalMinutes = minutes.reduce((a, b) => a + b, 0);
    totalHours = parseInt(totalHours + totalMinutes / 60);
    let remainingMinutes = totalMinutes % 60;
    return (
      totalHours +
      ":" +
      "0".repeat(2 - remainingMinutes.toString().length) +
      remainingMinutes.toString()
    );
  }

  _sum(arr) {
    return arr.reduce((a, b) => a + b, 0)
  }
}

const utilObj = new JSutils()

module.exports = utilObj