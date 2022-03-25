import { getDay } from 'date-fns'
import format from 'date-fns/format'
import { configuration } from '../../config'
import { DateUtils } from 'react-day-picker'
import dateFnsParse from 'date-fns/parse'

class CalendarFormatter {
	standardDateFormat(date) {
		const d1 = new Date(date)
		if (!isNaN(Date.parse(d1))) return format(d1, configuration.dateformatter)
		return null
	}

	customDateFormat(date, formatType) {
		if (!formatType) return 'invalid format type'
		const d = new Date(date)
		console.log(
			`CalendarFormatter.customDateFormat() : ${date} - ${formatType}`
		)
		return format(d, formatType)
	}

	parseDate(str) {
		// use this for mostly material ui keyboard date pickers
		const parsed = dateFnsParse(str, configuration.dateformatter, new Date())
		if (DateUtils.isDate(parsed)) {
			console.log(CalendarFormatter.standardDateFormat(parsed))
			return CalendarFormatter.standardDateFormat(parsed)
		}
		return undefined
	}

	getDayFromDate(date) {
		const d = new Date(date)
		const dayIndex = getDay(d)
		switch (dayIndex) {
			case 0:
				return 'Sunday'

			case 1:
				return 'Monday'

			case 2:
				return 'Tuesday'

			case 3:
				return 'Wednesday'

			case 4:
				return 'Thursday'

			case 5:
				return 'Friday'

			case 6:
				return 'Saturday'

			default:
				return ''
		}
	}
}

export default new CalendarFormatter()
