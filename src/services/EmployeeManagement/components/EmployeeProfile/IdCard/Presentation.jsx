import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActionArea from '@material-ui/core/CardActionArea'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Badge from '@material-ui/core/Badge'
import Button from '@material-ui/core/Button'
import { FaPen } from 'react-icons/fa'
import Divider from '@material-ui/core/Divider'
import CardMedia from '@material-ui/core/CardMedia'
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined'
import CallOutlinedIcon from '@material-ui/icons/CallOutlined'
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined'
import FacebookProgress from '../../../../../utils/components/customProgress'
import EditIcon from '@material-ui/icons/Edit'
import IconButton from '@material-ui/core/IconButton'

const useStyles = makeStyles((theme) => ({
	root: {
		minWidth: '100%',
		backgroundColor: theme.palette.background.paper,
	},
	avatar: {
		width: theme.spacing(11),
		height: theme.spacing(11),
	},
}))

function RenderPerosonalInfo({ text, icon }) {
	return (
		<ListItem>
			<ListItemIcon>{icon}</ListItemIcon>
			<ListItemText primary={text} />
		</ListItem>
	)
}

export default function Presentation(props) {
	const { handleChange, progress, profile } = props
	const classes = useStyles()
	const {
		personalDetails: { firstName, lastName, middleName, phoneNumber },
		uid,
		email,
		mailingAddress: { line1, line2, city, state, country, zip },
		imageURL,
	} = profile

	return (
		<Card className={classes.root}>
			<CardContent>
				<List dense={true}>
					<ListItem alignItems='center'>
						<ListItemAvatar>
							<Badge
								overlap='circle'
								anchorOrigin={{
									vertical: 'bottom',
									horizontal: 'right',
								}}
								badgeContent={
									<IconButton>
										<EditIcon />
									</IconButton>
								}
							>
								<Avatar
									alt={firstName}
									src={imageURL}
									className={classes.avatar}
								/>
							</Badge>
						</ListItemAvatar>
					</ListItem>
					<ListItem>
						<ListItemText
							primary={
								<h5>
									{firstName} {middleName} {lastName}
								</h5>
							}
						/>
					</ListItem>
					<ListItem>
						<ListItemText primary={<h4>{uid}</h4>} />
					</ListItem>
					<ListItem alignItems='flex-start'>
						<ListItemText primary={<h2>Contact Information</h2>} />
					</ListItem>
					<Divider />
					<RenderPerosonalInfo icon={<EmailOutlinedIcon />} text={email} />
					<RenderPerosonalInfo icon={<CallOutlinedIcon />} text={phoneNumber} />
					<RenderPerosonalInfo
						icon={<HomeOutlinedIcon />}
						text={[line1, line2, city, state, country, zip]
							.filter((item) => item)
							.join(',')}
					/>
				</List>
			</CardContent>
		</Card>
	)
}
