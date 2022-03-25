import React, { useState } from 'react'
import {
	TextField,
	MenuItem,
	FormControlLabel,
	Checkbox,
	CircularProgress,
	Button,
} from '@material-ui/core'
import {
	MobileNumberFormatter,
	NumberFormatCustom,
} from '../../utils/formatters/numberFormats'
import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker,
} from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import { Autocomplete } from '@material-ui/lab'
import calenderFormatter from '../formatters/calenderFormatter'
import validate from '../functions/validation'
import { configuration } from '../../config'
import { uploadToStorage } from '../functions/fileUploader'

export const TextInput = ({
	label,
	name,
	handleChange,
	required,
	value = '',
	variant = 'outlined',
	...rest
}) => {
	return (
		<TextField
			label={label}
			name={name}
			onChange={handleChange}
			required={required}
			value={value}
			variant={variant}
			size='small'
			fullWidth
			{...rest}
		/>
	)
}

export const AlphaNumericInput = ({
	label,
	name,
	handleChange,
	required,
	value = '',
	variant = 'outlined',
}) => {
	return (
		<TextField
			label={label}
			name={name}
			onChange={(e) =>
				e.target.value.match(/^[a-z0-9]+$/i) || e.target.value.length === 0
					? handleChange(e)
					: () => {}
			}
			required={required}
			value={value}
			variant={variant}
			size='small'
			fullWidth
		/>
	)
}

export const NameInput = ({
	label,
	name,
	handleChange,
	required,
	value = '',
	variant = 'outlined',
}) => {
	return (
		<TextField
			label={label}
			name={name}
			onChange={(e) =>
				validate.checkName(e.target.value) ? handleChange(e) : () => {}
			}
			required={required}
			helperText={
				value.length && !validate.checkName(value) ? 'Enter valid ' + label : ''
			}
			value={value}
			variant={variant}
			size='small'
			fullWidth
		/>
	)
}

export const PhoneInput = ({
	label,
	name,
	handleChange,
	required,
	value = '',
	variant = 'outlined',
}) => {
	return (
		<TextField
			label={label}
			name={name}
			onChange={handleChange}
			helperText={
				value.length && !validate.checkNumber(value)
					? 'Enter valid ' + label
					: ''
			}
			variant={variant}
			size='small'
			required={required}
			value={value}
			fullWidth
			InputProps={{
				inputComponent: MobileNumberFormatter,
			}}
		/>
	)
}

export const EmailInput = ({
	label,
	name,
	handleChange,
	required,
	value = '',
	variant = 'outlined',
	disabled = false,
}) => {
	return (
		<TextField
			label={label}
			name={name}
			disabled={disabled}
			type='email'
			onChange={handleChange}
			helperText={
				value.length && !validate.checkEmail(value)
					? 'Enter valid ' + label
					: ''
			}
			required={required}
			value={value}
			variant={variant}
			size='small'
			fullWidth
		/>
	)
}

export const NumberInput = ({
	label,
	name,
	handleChange,
	required,
	value = '',
	variant = 'outlined',
}) => {
	return (
		<TextField
			label={label}
			name={name}
			onChange={handleChange}
			variant={variant}
			size='small'
			required={required}
			value={value}
			fullWidth
			InputProps={{
				inputComponent: NumberFormatCustom,
			}}
		/>
	)
}

export const SelectInput = ({
	label,
	name,
	handleChange,
	required,
	menuItems,
	value = '',
	variant = 'outlined',
}) => {
	return (
		<TextField
			select
			label={label}
			name={name}
			onChange={handleChange}
			variant={variant}
			size='small'
			required={required}
			value={value}
			fullWidth
		>
			{menuItems.map((item, idx) => (
				<MenuItem key={idx} value={item}>
					{item}
				</MenuItem>
			))}
		</TextField>
	)
}

const AutoCompleteInput = ({
	label,
	name,
	handleChange,
	required,
	menuItems,
	value = '',
	variant = 'outlined',
}) => {
	const metainfo = new MetaInfo()

	return (
		<Autocomplete
			options={menuItems}
			getOptionLabel={(option) =>
				option.length >= 9 ? metainfo.emailToName(option) : option
			}
			value={value}
			renderOption={(option) =>
				option.length >= 9 ? metainfo.emailToName(option) : option
			}
			onChange={(e, v) => {
				if (v) {
					handleChange({ target: { value: v } })
				}
			}}
			renderInput={(params) => (
				<TextField {...params} size='small' name={name} label={label} />
			)}
		/>
	)
}

export const DateInput = ({
	label,
	name,
	handleChange,
	required,
	value,
	maxDate = undefined,
	minDate = undefined,
}) => {
	return (
		<MuiPickersUtilsProvider utils={DateFnsUtils}>
			<KeyboardDatePicker
				required={required}
				size='small'
				label={label}
				format={configuration.dateformatter}
				maxDate={maxDate}
				minDate={minDate}
				onChange={(date) =>
					handleChange({
						target: { value: calenderFormatter.standardDateFormat(date), name },
					})
				}
				value={value ? value : null}
				fullWidth
				name={name}
				KeyboardButtonProps={{
					'aria-label': 'change date',
				}}
			/>
		</MuiPickersUtilsProvider>
	)
}

export const FileInput = ({
	label,
	name,
	handleChange,
	required,
	value = '',
	fileName,
	filePath,
	variant = 'outlined',
}) => {
	const [spin, setSpin] = useState(false)
	const [fileURL, setURL] = useState(value)
	const handleFile = (e) => {
		const file = e.target.files[0]
		setSpin(true)
		return uploadToStorage(
			file,
			filePath,
			fileName + '.' + file.name.split('.')[1],
			'file'
		)
			.then((url) => {
				handleChange({ target: { value: url, name } })
				setSpin(false)
				setURL(url)
			})
			.catch((err) => {
				console.log(err)
				// errorMsg('Failed to upload ' + label)
				handleChange({ target: { value: '', name } })
				setSpin(false)
				setURL('')
			})
	}
	return (
		<div className='d-flex'>
			<TextField
				label={label}
				name={name}
				onChange={handleFile}
				required={required}
				type={'file'}
				variant={variant}
				size='small'
				fullWidth
				InputLabelProps={{
					shrink: true,
				}}
			/>
			{spin ? <CircularProgress className='ml-1' /> : null}

			{fileURL ? (
				<a target='_blank' href={fileURL}>
					{'Link'}
				</a>
			) : (
				''
			)}
		</div>
	)
}

const CheckBoxInput = ({
	label,
	name,
	handleChange,
	required,
	value = false,
}) => {
	return (
		<FormControlLabel
			control={
				<Checkbox
					checked={value}
					required={required}
					onChange={(e) =>
						handleChange({ target: { value: e.target.checked } })
					}
					name='checkedA'
				/>
			}
			label={label}
			name={name}
		/>
	)
}

export const CustomButton = ({
	btnText,
	handleClick,
	variant = 'contained',
	color = 'primary',
	disabled = false,
	...rest
}) => {
	return (
		<Button
			fullWidth
			disabled={disabled}
			color={color}
			onClick={handleClick}
			variant={variant}
			{...rest}
		>
			{btnText}
		</Button>
	)
}

export function CustomField(details) {
	switch (details.type) {
		case 'text':
			return <TextInput {...details} />

		case 'name':
			return <NameInput {...details} />

		case 'phone':
			return <PhoneInput {...details} />

		case 'email':
			return <EmailInput {...details} />

		case 'number':
			return <NumberInput {...details} />

		case 'select':
			return <SelectInput {...details} />

		case 'autocomplete':
			return <AutoCompleteInput {...details} />

		case 'checkbox':
			return <CheckBoxInput {...details} />

		case 'date':
			return <DateInput {...details} />

		case 'address':
			return <TextInput {...details} />

		case 'alphanum':
			return <TextInput {...details} />

		case 'file':
			return <FileInput {...details} />

		case 'fromdate':
			return <DateInput {...details} />

		case 'todate':
			return <DateInput {...details} />

		// case 'country':
		// 	return <CountryField {...details} />

		// case 'state':
		// 	return <StateField {...details} />

		case 'alphanumeric':
			return <AlphaNumericInput {...details} />

		default:
			return <div />
	}
}
