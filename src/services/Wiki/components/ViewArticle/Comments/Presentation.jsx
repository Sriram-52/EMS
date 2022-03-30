import React from 'react'
import {
	List,
	ListItem,
	Divider,
	ListItemText,
	ListItemAvatar,
	Avatar,
	Typography,
	Grid,
	Button,
	IconButton,
	Chip,
	makeStyles,
} from '@material-ui/core'
import { Delete as DeleteIcon, Edit as EditIcon } from '@material-ui/icons'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import FacebookProgress from '../../../../../utils/components/customProgress'
import SunEditor from 'suneditor-react'
import parse from 'html-react-parser'
import MetaInfo from '../../../../../utils/functions/metaInfo'

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		backgroundColor: theme.palette.background.paper,
	},
	inline: {
		display: 'inline',
	},
}))

export default function Presentation(props) {
	const classes = useStyles()
	const {
		comments,
		handleChange,
		isEditing,
		handleSubmit,
		commentText,
		commenting,
		handleUpdate,
		handleDelete,
		auth,
	} = props

	dayjs.extend(relativeTime)

	const onEdit = (id) => {
		console.log(id)
		const comment = comments.filter((item) => item.id === id)[0]
		handleChange('isEditing', true)
		handleChange('commentText', comment.content)
		handleChange('updateId', comment.id)
	}

	const cancelUpdate = () => {
		handleChange('isEditing', false)
		handleChange('commentText', '')
	}

	const metaInfo = new MetaInfo()

	return (
		<div>
			<List className={classes.root}>
				{comments.map((comment) => {
					return (
						<div>
							<ListItem alignItems='flex-start'>
								<ListItemAvatar>
									<Avatar
										alt={comment.createdBy}
										src={metaInfo.getImage(comment.createdBy)}
									/>
								</ListItemAvatar>
								<ListItemText
									primary={
										<span className='d-flex'>
											<span>
												<Link to={'/console/employees/' + comment.createdBy}>
													{metaInfo.emailToName(comment.createdBy)}
												</Link>{' '}
												{metaInfo.checkSupervisor(comment.createdBy) ? (
													<Chip
														style={{
															backgroundColor: '#f78a14',
															fontWeight: 'bold',
															color: '#fff',
														}}
														size='small'
														label='SUPERVISOR'
													/>
												) : metaInfo.getEmployeeKey(
														comment.createdBy,
														'jobtitle'
												  ) ? (
													<Chip
														size='small'
														label={metaInfo.getEmployeeKey(
															comment.createdBy,
															'jobtitle'
														)}
													/>
												) : null}
											</span>
											<Typography
												style={{ marginLeft: '15px', color: 'grey' }}
												variant='body2'
											>
												{dayjs(comment.createdAt).fromNow()}
											</Typography>{' '}
											{auth.uid === comment.createdBy ? (
												<span>
													<span>
														<IconButton
															onClick={() => onEdit(comment.id)}
															style={{ marginLeft: '10px', marginTop: '-15px' }}
														>
															<EditIcon />
														</IconButton>
													</span>{' '}
													<span>
														<IconButton
															onClick={() => handleDelete(comment.id)}
															style={{ marginLeft: '10px', marginTop: '-15px' }}
														>
															<DeleteIcon />
														</IconButton>
													</span>
												</span>
											) : null}
										</span>
									}
									secondary={
										<React.Fragment>
											<Typography
												component='span'
												variant='body2'
												className={classes.inline}
												color='textPrimary'
											>
												{parse(comment.content || '')}
											</Typography>
										</React.Fragment>
									}
								/>
							</ListItem>
							<Divider variant='inset' component='li' />
						</div>
					)
				})}
			</List>

			<h2>Leave your comment</h2>
			<Grid container spacing={3}>
				<Grid item xs={12} sm={12}>
					<form onSubmit={!isEditing ? handleSubmit : handleUpdate}>
						<SunEditor
							placeholder='Type your comment here'
							setContents={commentText}
							onChange={(data) => handleChange('commentText', data)}
							setOptions={{
								buttonList: [
									[
										'undo',
										'redo',
										'font',
										'fontSize',
										'formatBlock',
										'bold',
										'underline',
										'italic',
										'strike',
										'subscript',
										'superscript',
										'fontColor',
										'hiliteColor',
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
										'showBlocks',
										'codeView',
									],
								],
								mode: 'Balloon-always',
							}}
						/>
						<br />
						<br />
						{commentText.length > 0 ? (
							commenting ? (
								<FacebookProgress />
							) : !isEditing ? (
								<Button variant='contained' color='primary' type='submit'>
									Comment
								</Button>
							) : (
								<span>
									<Button
										variant='contained'
										className='flairbtn'
										type='submit'
									>
										Update comment
									</Button>{' '}
									<Button
										variant='contained'
										color='secondary'
										onClick={cancelUpdate}
									>
										Cancel
									</Button>
								</span>
							)
						) : (
							<Button variant='contained' type='button' disabled>
								Comment
							</Button>
						)}
					</form>
				</Grid>
				<Grid item xs={12} sm={12}></Grid>
			</Grid>
		</div>
	)
}
