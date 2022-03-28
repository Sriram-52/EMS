import React from 'react'
import { SwipeableDrawer, makeStyles, Tooltip, Fab } from '@material-ui/core'
import clsx from 'clsx'
import { Settings as SettingsIcon } from '@material-ui/icons'
import { Link } from 'react-router-dom'
import Items from '../Items'

const useSwipableStyles = makeStyles({
	list: {
		width: 'auto',
	},
	fullList: {
		width: 'auto',
	},
})

export default function Presentation(props) {
	const { projectId } = props

	const swipableClasses = useSwipableStyles()

	const [swipableState, setSwipableState] = React.useState({
		top: false,
		left: false,
		bottom: false,
		right: false,
	})

	const toggleDrawer = (anchor, open) => (event) => {
		if (
			event &&
			event.type === 'keydown' &&
			(event.key === 'Tab' || event.key === 'Shift')
		) {
			return
		}

		setSwipableState({ ...swipableState, [anchor]: open })
	}

	const DrawerItems = ({ anchor }) => (
		<div
			className={clsx(swipableClasses.list, {
				[swipableClasses.fullList]: anchor === 'top' || anchor === 'bottom',
			})}
			role='presentation'
		>
			<Items projectId={projectId} />
		</div>
	)

	return ['left'].map((anchor) => (
		<React.Fragment key={anchor}>
			<Tooltip title='Project Settings'>
				<Fab
					onClick={toggleDrawer(anchor, true)}
					size='medium'
					className='ml-2'
					color='secondary'
				>
					<SettingsIcon />
				</Fab>
			</Tooltip>

			<SwipeableDrawer
				anchor={anchor}
				open={swipableState[anchor]}
				onClose={toggleDrawer(anchor, false)}
				onOpen={toggleDrawer(anchor, true)}
			>
				<DrawerItems anchor={anchor} />
			</SwipeableDrawer>
		</React.Fragment>
	))
}
