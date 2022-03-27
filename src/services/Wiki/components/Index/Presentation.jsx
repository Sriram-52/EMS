import React from 'react'
import {
	Grid,
	Typography,
	Paper,
	InputBase,
	Tooltip,
	Fab,
	Divider,
	IconButton,
	Avatar,
	withStyles,
	Button,
	makeStyles,
} from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import {
	Search as SearchIcon,
	Add as AddIcon,
	Settings as SettingsIcon,
} from '@material-ui/icons'
import validate from '../../../../utils/functions/validation'
import MetaInfo from '../../../../utils/functions/metaInfo'
import { Link } from 'react-router-dom'
import { FaRegThumbsUp, FaRegThumbsDown } from 'react-icons/fa'

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	paper: {
		padding: theme.spacing(2),
		color: theme.palette.text.secondary,
		height: '100%',
	},
	small: {
		width: theme.spacing(4),
		height: theme.spacing(4),
		verticalAlign: 'center',
		top: theme.spacing(2),
	},
	root: {
		padding: '2px 4px',
		display: 'flex',
		alignItems: 'center',
	},
	input: {
		marginLeft: theme.spacing(1),
		flex: 1,
	},
	iconButton: {
		padding: 10,
	},
	divider: {
		height: 28,
		margin: 4,
	},
	searchIcon: {
		paddingTop: theme.spacing(2),
		paddingBottom: theme.spacing(2),
		paddingRight: theme.spacing(2),
		flex: 1,
		display: 'flex',
	},
}))

function CustomCard({ title, category }) {
	const metaInfo = new MetaInfo()
	const classes = useStyles()
	return (
		<Paper className={classes.paper}>
			<Typography variant='h4' className='text-center' color='textPrimary'>
				{title}
			</Typography>
			{category.length ? (
				category.map((ele, idx) => (
					<React.Fragment key={idx}>
						<Divider className='mt-3' />
						<div className='d-flex'>
							<div>
								<Tooltip title={metaInfo.emailToName(ele.createdBy)}>
									<Avatar
										className={classes.small}
										src={metaInfo.getImage(ele.createdBy)}
									/>
								</Tooltip>
							</div>
							<div className='ml-3'>
								<HtmlTooltip
									title={
										<React.Fragment>
											<Typography className='text-center' color='inherit'>
												{ele.title}
											</Typography>
										</React.Fragment>
									}
								>
									<Link
										to={'/console/wiki/' + ele.id}
										style={{ marginLeft: '4px' }}
									>
										{ele.title.trim().length > 35 ? (
											<Typography variant='body1'>
												{ele.title.trim().substring(0, 35) + '...'}
												<br />
											</Typography>
										) : (
											<Typography variant='body1'>
												{ele.title.trim()}
												<br />
											</Typography>
										)}
									</Link>
								</HtmlTooltip>
								<Typography
									className='d-flex'
									variant='caption'
									color='textSecondary'
								>
									CreatedOn:{' '}
									<em className='mr-1'>
										{validate.dateAndTimeFormatter(ele.createdAt)}
									</em>
									<div className='d-flex mr-1'>
										<FaRegThumbsUp size={18} />
										<p className='ml-1'>{ele.upVotes.length}</p>
									</div>
									<div className='d-flex'>
										<FaRegThumbsDown size={18} />
										<p className='ml-1'>{ele.downVotes.length}</p>
									</div>
								</Typography>
							</div>
						</div>
					</React.Fragment>
				))
			) : (
				<Typography className='text-center mt-3'>
					No Articles to display
				</Typography>
			)}
		</Paper>
	)
}

const HtmlTooltip = withStyles((theme) => ({
	tooltip: {
		backgroundColor: '#f5f5f9',
		color: 'rgba(0, 0, 0, 0.87)',
		maxWidth: 220,
		fontSize: theme.typography.pxToRem(12),
		border: '1px solid #dadde9',
	},
}))(Tooltip)

function Presentation(props) {
	const {
		general,
		archived,
		recentlyAdded,
		knowledge,
		allArticles,
		searchKeyWord,
		access_modules,
	} = props
	const classes = useStyles()
	return (
		<div className={classes.root}>
			<Grid container spacing={3}>
				<Grid item xs={10} sm={8} md={11}>
					<Autocomplete
						options={allArticles}
						filterSelectedOptions
						autoHighlight
						getOptionLabel={(option) => option.title}
						renderOption={(option) => (
							<div>
								<Link to={'/console/wiki/' + option.id}>
									<Typography>{option.title}</Typography>
								</Link>
							</div>
						)}
						renderInput={(params) => (
							<Paper ref={params.InputProps.ref} component='form'>
								<Grid container>
									<Grid item xs={12} className={classes.root}>
										<InputBase
											{...params}
											className={classes.input}
											placeholder='Enter your idea or search items here ...'
											name='search'
											autoComplete='off'
											onChange={(event) => setSearchKeyWord(event.target.value)}
											onKeyPress={(event) => {
												if (event.key === 'Enter') event.preventDefault()
											}}
										/>
										<IconButton
											className={classes.iconButton}
											aria-label='search'
										>
											<SearchIcon />
										</IconButton>
										<Divider
											className={classes.divider}
											orientation='vertical'
										/>
										<Link
											to={'/console/wiki/' + searchKeyWord + '/create'}
											style={{ color: 'white' }}
										>
											<IconButton
												color='primary'
												className={classes.iconButton}
											>
												<Tooltip title='Add a new one'>
													<AddIcon />
												</Tooltip>
											</IconButton>
										</Link>
									</Grid>
								</Grid>
							</Paper>
						)}
					/>
				</Grid>
				{access_modules.includes('wiki-manager') ||
				access_modules.includes('console-customization') ? (
					<Grid item xs={2} sm={4} md={1}>
						<Tooltip title='Wiki Settings'>
							<Link to={'/console/wiki/settings'} style={{ color: 'white' }}>
								<Fab size='medium' className='ml-2' color='secondary'>
									<SettingsIcon />
								</Fab>
							</Link>
						</Tooltip>
					</Grid>
				) : null}
				<Grid item xs={12} sm={6} md={3}>
					<CustomCard title={'Recently Added'} category={recentlyAdded} />
				</Grid>
				<Grid item xs={12} sm={6} md={3}>
					<CustomCard title={'General'} category={general} />
				</Grid>
				<Grid item xs={12} sm={6} md={3}>
					<CustomCard title={'Knowledge'} category={knowledge} />
				</Grid>
				<Grid item xs={12} sm={6} md={3}>
					<CustomCard title={'Archived'} category={archived} />
				</Grid>
				<Grid item xs={12}>
					<div className='text-center'>
						<Link to={'/console/wiki/morearticles'}>
							<Button color='primary' size='medium' variant='contained'>
								More Articles
							</Button>
						</Link>
					</div>
				</Grid>
			</Grid>
		</div>
	)
}

export default Presentation
