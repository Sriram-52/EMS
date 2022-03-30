import React, { useState } from 'react'
import { Fab, Grid, Button } from '@material-ui/core'
import { Edit as EditIcon } from '@material-ui/icons'
import CommonDiaglog from '../../../../../utils/components/commonDialog'
import SunEditor from 'suneditor-react'
import {
	CheckBoxInput,
	FileInput,
	PhoneInput,
	TextInput,
} from '../../../../../utils/components/formFields'

function Presentation(props) {
	const [open, setOpen] = useState(false)
	const handleOpen = () => setOpen(true)
	const handleClose = () => setOpen(false)

	const {
		companyDetails,
		handleCompanyDetails,
		handleContactDetails,
		handleImages,
		handleInvoiceDetails,
		handleInvoiceNumberFormat,
		handleSubmit,
	} = props

	console.log({ companyDetails })

	return (
		<div>
			<div className='text-right'>
				<Fab size='medium' color='primary' onClick={handleOpen}>
					<EditIcon />
				</Fab>
			</div>
			<CommonDiaglog
				open={open}
				handleClose={handleClose}
				title='Edit Company Details'
				maxWidth='md'
			>
				<form onSubmit={handleSubmit}>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6}>
							<TextInput
								label='Company Name'
								name='companyName'
								onChange={handleCompanyDetails}
								required={true}
								value={companyDetails.companyName}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextInput
								label='EIN-Number'
								name='ein_Number'
								onChange={handleCompanyDetails}
								required={true}
								value={companyDetails.ein_Number}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextInput
								label='E-Verify Number'
								name='e_VerifyNumber'
								onChange={handleCompanyDetails}
								required={true}
								value={companyDetails.e_VerifyNumber}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextInput
								label='Mail Id'
								name='mailId'
								onChange={handleContactDetails}
								required={true}
								value={companyDetails.contactDetails.mailId}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextInput
								label='HR Mail Id'
								name='hrMailId'
								onChange={handleContactDetails}
								required={true}
								value={companyDetails.contactDetails.hrMailId}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextInput
								label='Accounts Mail Id'
								name='accountsMailId'
								onChange={handleContactDetails}
								required={true}
								value={companyDetails.contactDetails.accountsMailId}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextInput
								label='Immigration Mail Id'
								name='immigrationMailId'
								onChange={handleContactDetails}
								required={true}
								value={companyDetails.contactDetails.immigrationMailId}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextInput
								label='Phone No'
								name='phoneno'
								onChange={handleContactDetails}
								required={true}
								value={companyDetails.contactDetails.phoneno}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextInput
								label='Invoice Begin From'
								name='beginFrom'
								onChange={handleInvoiceNumberFormat}
								required={true}
								value={
									companyDetails.invoiceDetails.invoiceNumberFormat.beginFrom
								}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextInput
								label='Invoice Prefix'
								name='invoicePrefix'
								onChange={handleInvoiceNumberFormat}
								required={true}
								value={
									companyDetails.invoiceDetails.invoiceNumberFormat
										.invoicePrefix
								}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextInput
								label='Invoice Seperator'
								name='seperator'
								onChange={handleInvoiceNumberFormat}
								required={true}
								value={
									companyDetails.invoiceDetails.invoiceNumberFormat.seperator
								}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<Grid container spacing={1}>
								<Grid item xs={12} sm={4}>
									<CheckBoxInput
										label='Auto Generate'
										name='invoiceAutoGenerate'
										value={companyDetails.invoiceDetails.invoiceAutoGenerate}
										handleChange={handleInvoiceDetails}
									/>
								</Grid>
								<Grid item xs={12} sm={4}>
									<CheckBoxInput
										label='Auto Send'
										name='invoiceAutoSend'
										value={companyDetails.invoiceDetails.invoiceAutoSend}
										handleChange={handleInvoiceDetails}
									/>
								</Grid>
								<Grid item xs={12} sm={4}>
									<CheckBoxInput
										label='Auto Fill payable to'
										name='autoFillPayableTo'
										value={companyDetails.invoiceDetails.autoFillPayableTo}
										handleChange={handleInvoiceDetails}
									/>
								</Grid>
							</Grid>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextInput
								label='Address'
								name='address'
								onChange={handleContactDetails}
								required={true}
								value={companyDetails.contactDetails.address}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<SunEditor
								onChange={(d) =>
									handleInvoiceDetails({
										target: {
											name: 'payableTo',
											value: d,
										},
									})
								}
								placeholder='Payable To'
								name='payableTo'
								setContents={companyDetails.invoiceDetails.payableTo}
								setOptions={{
									buttonList: [
										[
											'undo',
											'redo',
											'font',
											'fontSize',
											'formatBlock',
											'paragraphStyle',
											'blockquote',
											'bold',
											'underline',
											'italic',
											'strike',
											'subscript',
											'superscript',
											'fontColor',
											'hiliteColor',
											'textStyle',
											'removeFormat',
											'outdent',
											'indent',
											'align',
											'horizontalRule',
											'list',
											'lineHeight',
											'table',
											'link',
											'image',
											'video',
											'fullScreen',
											'showBlocks',
											'codeView',
											'preview',
											'print',
											'save',
											'template',
										],
									],
									mode: 'Balloon-always',
								}}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<FileInput
								label='Logo'
								name='companyLogo'
								filePath={`CompanyDetails`}
								handleChange={handleImages}
								value={companyDetails.images.companyLogo}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<FileInput
								label='Water Mark'
								name='waterMark'
								filePath={`CompanyDetails`}
								handleChange={handleImages}
								value={companyDetails.images.waterMark}
							/>
						</Grid>
					</Grid>
					<br />
					<div className='text-center'>
						<Button type='submit' color='secondary' variant='contained'>
							Update
						</Button>
					</div>
				</form>
			</CommonDiaglog>
		</div>
	)
}

export default Presentation
