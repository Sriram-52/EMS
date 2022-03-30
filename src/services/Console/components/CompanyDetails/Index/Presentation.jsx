import React from 'react'
import {
	Grid,
	TableBody,
	TableCell,
	TableRow,
	withStyles,
	Typography,
	makeStyles,
} from '@material-ui/core'
import Edit from '../Edit'

const companyDetailsStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		'& > * + *': {
			marginTop: theme.spacing(2),
		},
		flexGrow: 1,
	},
	paper: {
		padding: theme.spacing(2),
		color: theme.palette.text.secondary,
	},
}))

const MuiTableCell = withStyles({
	root: {
		borderBottom: 'none',
	},
})(TableCell)

function TableFormatter({ source }) {
	return (
		<TableBody>
			{Object.entries(source).map(([name, value]) => (
				<TableRow key={name}>
					<MuiTableCell component='th' scope='row'>
						<Typography variant='body1'>{name}</Typography>
					</MuiTableCell>
					<MuiTableCell>
						<Typography variant='body1'>:</Typography>
					</MuiTableCell>
					{typeof value === 'boolean' ? (
						<MuiTableCell>
							<Typography variant='body1'>
								{value === false ? 'No' : 'Yes'}
							</Typography>
						</MuiTableCell>
					) : (
						<MuiTableCell>
							<Typography variant='body1'>{value}</Typography>
						</MuiTableCell>
					)}
				</TableRow>
			))}
		</TableBody>
	)
}

function Presentation(props) {
	const {
		companyDetailsInformation,
		contactDetailsInformation,
		invoiceDetailsInformation,
		logo,
		waterMark,
	} = props
	const classes = companyDetailsStyles()
	return (
		<div className={classes.root}>
			<Grid container spacing={3}>
				<Grid item xs={12} sm={4}>
					<div className='custom-card'>
						<div className='text-center mt-5'>
							<img src={logo} alt='companyLogo' height='50%' width='60%' />
							<p className='mt-2'>Company Logo</p>
						</div>
						<div className='text-center mt-5'>
							<img
								src={waterMark}
								alt='companyWaterMark'
								height='50%'
								width='60%'
							/>
							<p className='mt-2'>Company Water Mark</p>
						</div>
					</div>
				</Grid>
				<Grid item xs={12} sm={8}>
					<div className='custom-card'>
						<Edit />
						<h3>
							<u>Company Details:</u>
						</h3>
						<TableFormatter source={companyDetailsInformation} />
						<h3>
							<u>Contact Details:</u>
						</h3>
						<TableFormatter source={contactDetailsInformation} />
						<h3>
							<u>Invoice Details:</u>
						</h3>
						<TableFormatter source={invoiceDetailsInformation} />
					</div>
				</Grid>
			</Grid>
		</div>
	)
}

export default Presentation
