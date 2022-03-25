import React from 'react'
import NumberFormat from 'react-number-format'

export function FederalIdPattern(props) {
	const { inputRef, onChange, ...other } = props
	return (
		<NumberFormat
			{...other}
			getInputRef={inputRef}
			decimalScale={2}
			format='##-#######'
			allowNegative={false}
			onValueChange={(values) => {
				onChange({
					target: {
						name: props.name,
						value: values.value,
					},
				})
			}}
			isNumericString
		/>
	)
}

export function DoubleDigitFormatter(props) {
	const { inputRef, onChange, ...other } = props
	return (
		<NumberFormat
			{...other}
			getInputRef={inputRef}
			decimalScale={2}
			format='##'
			allowNegative={false}
			onValueChange={(values) => {
				onChange({
					target: {
						name: props.name,
						value: values.value,
					},
				})
			}}
			isNumericString
		/>
	)
}

export function NumberFormatCustom(props) {
	const { inputRef, onChange, ...other } = props
	return (
		<NumberFormat
			{...other}
			getInputRef={inputRef}
			decimalScale={2}
			allowNegative={false}
			onValueChange={(values) => {
				onChange({
					target: {
						name: props.name,
						value: values.value,
					},
				})
			}}
			isNumericString
		/>
	)
}

export function MobileNumberFormatter(props) {
	const { inputRef, onChange, ...other } = props
	return (
		<NumberFormat
			{...other}
			getInputRef={inputRef}
			decimalScale={2}
			format='##########'
			allowNegative={false}
			onValueChange={(values) => {
				onChange({
					target: {
						name: props.name,
						value: values.value,
					},
				})
			}}
			isNumericString
		/>
	)
}

export function CurrencyFormatter(props) {
	const { inputRef, onChange, ...other } = props
	return (
		<NumberFormat
			{...other}
			getInputRef={inputRef}
			allowNegative={false}
			onValueChange={(values) => {
				onChange({
					target: {
						name: props.name,
						value: values.value,
					},
				})
			}}
			thousandSeparator
			isNumericString
			prefix='$'
		/>
	)
}
