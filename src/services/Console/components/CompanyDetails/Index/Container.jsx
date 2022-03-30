import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Presentation from './Presentation'
import Loader from '../../../../../utils/components/loader'
import parser from 'html-react-parser'

export default function Container(props) {
	const [companyDetailsInformation, setcompanyDetailsInformation] = useState({})
	const [contactDetailsInformation, setcontactDetailsInformation] = useState({})
	const [invoiceDetailsInformation, setinvoiceDetailsInformation] = useState({})
	const [logo, setLogo] = useState('')
	const [waterMark, setWaterMark] = useState('')

	const { loading, data, error } = useSelector(
		(appState) => appState.console.companyDetails
	)

	const handleCompanyDetails = () => {
		setcompanyDetailsInformation({
			'Company Name': data.companyName,
			'Web-URL': data.web_url,
			'E-Verify Number': data.e_VerifyNumber,
			'EIN-Number': data.ein_Number,
		})
	}

	const handleImages = () => {
		setWaterMark(data.images.waterMark)
		setLogo(data.images.companyLogo)
	}

	const handleContactDetails = () => {
		const contactDetails = {
			Address: '',
			Phone: '',
			'Mail-Id': '',
			'Accounts Mail-Id': '',
			'HR Mail-Id': '',
			'Immigration Mail Id': '',
		}

		Object.entries(data.contactDetails).forEach(([key, value]) => {
			if (key === 'accountsMailId') contactDetails['Accounts Mail-Id'] = value
			else if (key === 'address') contactDetails.Address = value
			else if (key === 'phoneno') contactDetails.Phone = value
			else if (key === 'mailId') contactDetails['Mail-Id'] = value
			else if (key === 'hrMailId') contactDetails['HR Mail-Id'] = value
			else if (key === 'immigrationMailId')
				contactDetails['Immigration Mail Id'] = value
		})
		setcontactDetailsInformation(contactDetails)
	}

	const handleInvoiceDetails = () => {
		const invoiceDetails = {
			'Invoice Prefix': '',
			Seperator: '',
			'Begin From': '',
			'Auto-fill Payable To': false,
			'Payable To': '',
			'Invoice Auto Send': false,
			'Invoice Auto Generate': false,
		}
		Object.entries(data.invoiceDetails).forEach(([key, value]) => {
			if (key === 'invoiceAutoGenerate')
				invoiceDetails['Invoice Auto Generate'] = value
			else if (key === 'invoiceAutoSend')
				invoiceDetails['Invoice Auto Send'] = value
			else if (key === 'payableTo') invoiceDetails['Payable To'] = parser(value)
			else if (key === 'invoiceNumberFormat') {
				const { beginFrom, invoicePrefix, seperator } = value
				invoiceDetails['Begin From'] = beginFrom
				invoiceDetails['Invoice Prefix'] = invoicePrefix
				invoiceDetails.Seperator = seperator
			} else if (key === 'autoFillPayableTo')
				invoiceDetails['Auto-fill Payable To'] = value
		})
		setinvoiceDetailsInformation(invoiceDetails)
	}

	useEffect(() => {
		if (!loading) {
			handleCompanyDetails()
			handleImages()
			handleContactDetails()
			handleInvoiceDetails()
		}
	}, [JSON.stringify(data), loading])

	if (loading) return <Loader />

	if (error) return <p>{JSON.stringify(err)}</p>

	return (
		<Presentation
			companyDetailsInformation={companyDetailsInformation}
			contactDetailsInformation={contactDetailsInformation}
			invoiceDetailsInformation={invoiceDetailsInformation}
			logo={logo}
			waterMark={waterMark}
		/>
	)
}
