import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { submitCompanyDetails } from '../../../middleware'
import Presentation from './Presentation'

export default function Container() {
	const { data } = useSelector((appState) => appState.console.companyDetails)

	useEffect(() => {
		setCompanyDetails({
			companyName: data.companyName,
			ein_Number: data.ein_Number,
			e_VerifyNumber: data.e_VerifyNumber,
		})

		setContactDetails(data.contactDetails)

		setInvoiceDetails({
			invoiceAutoGenerate: data.invoiceDetails.invoiceAutoGenerate,
			invoiceAutoSend: data.invoiceDetails.invoiceAutoSend,
			payableTo: data.invoiceDetails.payableTo,
		})

		setInvoiceNumberFormat(data.invoiceDetails.invoiceNumberFormat)

		setImages(data.images)
	}, [])

	const [companyDetails, setCompanyDetails] = useState({
		companyName: '',
		ein_Number: '',
		e_VerifyNumber: '',
	})

	const [contactDetails, setContactDetails] = useState({
		address: '',
		phoneno: '',
		mailId: '',
		hrMailId: '',
		accountsMailId: '',
		immigrationMailId: '',
	})

	const [invoiceDetails, setInvoiceDetails] = useState({
		invoiceAutoGenerate: false,
		invoiceAutoSend: false,
		payableTo: '',
	})

	const [invoiceNumberFormat, setInvoiceNumberFormat] = useState({
		beginFrom: '',
		invoicePrefix: '',
		seperator: '',
	})

	const [images, setImages] = useState({
		waterMark: '',
		companyLogo: '',
	})

	const handleCompanyDetails = (e) => {
		const { name, value } = e.target
		setCompanyDetails((prevState) => ({ ...prevState, [name]: value }))
	}

	const handleContactDetails = (e) => {
		const { name, value } = e.target
		console.log({ name, value })
		setContactDetails((prevState) => ({ ...prevState, [name]: value }))
	}

	const handleInvoiceDetails = (e) => {
		const { name, value } = e.target
		setInvoiceDetails((prevState) => ({ ...prevState, [name]: value }))
	}

	const handleInvoiceNumberFormat = (e) => {
		const { name, value } = e.target
		setInvoiceNumberFormat((prevState) => ({ ...prevState, [name]: value }))
	}

	const handleImages = (e) => {
		const { name, value } = e.target
		setImages((prevState) => ({ ...prevState, [name]: value }))
	}

	const dispatch = useDispatch()

	const handleSubmit = (e) => {
		e.preventDefault()
		const payload = {
			...companyDetails,
			contactDetails,
			invoiceDetails: {
				...invoiceDetails,
				invoiceNumberFormat,
			},
			images,
		}
		dispatch(submitCompanyDetails(payload))
		console.log({ payload })
	}

	return (
		<div>
			<Presentation
				companyDetails={{
					...companyDetails,
					contactDetails,
					invoiceDetails: {
						...invoiceDetails,
						invoiceNumberFormat,
					},
					images,
				}}
				handleSubmit={handleSubmit}
				handleCompanyDetails={handleCompanyDetails}
				handleContactDetails={handleContactDetails}
				handleImages={handleImages}
				handleInvoiceDetails={handleInvoiceDetails}
				handleInvoiceNumberFormat={handleInvoiceNumberFormat}
			/>
		</div>
	)
}
