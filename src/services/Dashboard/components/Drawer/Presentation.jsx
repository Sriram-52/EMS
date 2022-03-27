import React from 'react'
import clsx from 'clsx'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import {
	Drawer,
	AppBar,
	Toolbar,
	CssBaseline,
	Divider,
	IconButton,
	ListItem,
	ListItemIcon,
	ListItemText,
	MenuItem,
	Avatar,
	Menu,
	Tooltip,
	Typography,
} from '@material-ui/core'
import {
	Menu as MenuIcon,
	ChevronLeft as ChevronLeftIcon,
	ChevronRight as ChevronRightIcon,
} from '@material-ui/icons'
import { Switch, Redirect, Route, Link } from 'react-router-dom'
import { protectedRoutes } from '../../../../routes'
import { modules } from '../../../../modules'
import UnAuthorized from '../../../../utils/components/unAuth'

const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		boxShadow: '0 3px 3px 2px rgb(229,230,230)',
	},
	appBarShift: {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	menuButton: {
		marginRight: 36,
		color: 'white',
	},
	hide: {
		display: 'none',
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
		whiteSpace: 'nowrap',
	},
	drawerOpen: {
		width: drawerWidth,
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	drawerClose: {
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		overflowX: 'hidden',
		width: theme.spacing(7) + 1,
		[theme.breakpoints.up('sm')]: {
			width: theme.spacing(9) + 1,
		},
	},
	toolbar: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
		padding: theme.spacing(0, 1),
		// necessary for content to be below app bar
		...theme.mixins.toolbar,
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
		fontSize: '15px',
		overflowX: 'overlay',
	},
	align: {
		marginLeft: 'auto',
	},
	menuItem: {
		marginLeft: '8px',
	},
}))

export default function Presentation(props) {
	const { accessModules, user, handleSignOut } = props
	const classes = useStyles()
	const theme = useTheme()
	const [open, setOpen] = React.useState(false)
	const [anchorEl, setAnchorEl] = React.useState(null)
	const openIcon = Boolean(anchorEl)

	const handleDrawerOpen = () => {
		setOpen(true)
	}

	const handleDrawerClose = () => {
		setOpen(false)
	}

	const handleMenu = (event) => {
		setAnchorEl(event.currentTarget)
	}

	const handleClose = () => {
		setAnchorEl(null)
	}

	return (
		<div className={classes.root}>
			<CssBaseline />
			<AppBar
				position='fixed'
				className={clsx(classes.appBar, {
					[classes.appBarShift]: open,
				})}
			>
				<Toolbar>
					<IconButton
						color='inherit'
						aria-label='open drawer'
						onClick={handleDrawerOpen}
						edge='start'
						className={clsx(classes.menuButton, {
							[classes.hide]: open,
						})}
					>
						<MenuIcon />
					</IconButton>
					<div className={classes.align}>
						<IconButton
							aria-label='account of current user'
							aria-controls='menu-appbar'
							aria-haspopup='true'
							onClick={handleMenu}
							color='inherit'
						>
							<Avatar alt='Remy Sharp' src={user.imageURL} />
						</IconButton>
						<Menu
							id='menu-appbar'
							anchorEl={anchorEl}
							keepMounted
							transformOrigin={{
								vertical: 'center',
								horizontal: 'right',
							}}
							open={openIcon}
							onClose={handleClose}
						>
							<Link
								to={`/console/profile`}
								style={{ color: 'black', textDecoration: 'none' }}
							>
								<MenuItem onClick={handleClose}>Profile</MenuItem>
							</Link>
							<MenuItem style={{ color: 'black' }} onClick={handleSignOut}>
								Sign out
							</MenuItem>
						</Menu>
					</div>
				</Toolbar>
			</AppBar>
			<Drawer
				variant='permanent'
				className={clsx(classes.drawer, {
					[classes.drawerOpen]: open,
					[classes.drawerClose]: !open,
				})}
				classes={{
					paper: clsx({
						[classes.drawerOpen]: open,
						[classes.drawerClose]: !open,
					}),
				}}
			>
				<div className={classes.toolbar}>
					<IconButton onClick={handleDrawerClose}>
						{theme.direction === 'rtl' ? (
							<ChevronRightIcon />
						) : (
							<ChevronLeftIcon />
						)}
					</IconButton>
				</div>
				<Divider />
				{modules
					.filter(
						(module) =>
							accessModules.includes(module.moduleName) ||
							accessModules.includes('console-customization') ||
							module.moduleName === 'common-module'
					)
					.map((item) => {
						const Icon = item.Icon
						return (
							<Link
								style={{ textDecoration: 'none' }}
								onClick={handleDrawerClose}
								to={item.link}
								key={item.text}
							>
								<ListItem className={classes.menuItem}>
									<Tooltip
										arrow
										title={
											<h4 style={{ size: '7px', marginBottom: '2px' }}>
												{item.text}
											</h4>
										}
										placement='right-end'
									>
										<ListItemIcon>
											<Icon size={18} />
										</ListItemIcon>
									</Tooltip>
									<ListItemText primary={item.text} />
								</ListItem>
							</Link>
						)
					})}
			</Drawer>
			<main className={classes.content}>
				<div className={classes.toolbar} />
				<Switch>
					{protectedRoutes.map(({ path, component, moduleName }) => {
						if (
							(accessModules.includes(moduleName) ||
								accessModules.includes('console-customization') ||
								moduleName === 'common-module') &&
							user.status === 'active'
						) {
							return (
								<Route key={path} exact path={path} component={component} />
							)
						} else {
							return (
								<Route key={path} exact path={path} component={UnAuthorized} />
							)
						}
					})}
					<Redirect from='/signIn' to='/' />
				</Switch>
			</main>
		</div>
	)
}
