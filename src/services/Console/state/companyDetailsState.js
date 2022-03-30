export const initState = {
	data: {
		companyName: '',
		web_url: '',
		e_VerifyNumber: '',
		ein_Number: '',
		contactDetails: {
			address: '',
			phoneno: '',
			mailId: '',
			hrMailId: '',
			accountsMailId: '',
			immigrationMailId: '',
		},
		invoiceDetails: {
			invoiceAutoGenerate: false,
			invoiceAutoSend: false,
			payableTo: '',
			invoiceNumberFormat: {
				beginFrom: '',
				invoicePrefix: '',
				seperator: '',
			},
		},
		images: {
			waterMark: '',
			companyLogo: '',
		},
	},
	loading: true,
	error: null,
}
