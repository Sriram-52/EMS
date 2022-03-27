import React from 'react'
import {
	TextField,
	Button,
	Grid,
	Paper,
	Typography,
	IconButton,
} from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import {
	AttachFile as AttachFileIcon,
	Delete as DeleteIcon,
} from '@material-ui/icons'
import { GoFileSymlinkFile } from 'react-icons/go'
import { Link } from 'react-router-dom'
import SunEditor from 'suneditor-react'

function Presentation(props) {
	const {
		title,
		content,
		categoryId,
		categories,
		attachments,
		isEdit,
		isUploading,
		handleChange,
		handleKeyValuePairs,
		handleFile,
		handleDeleteAttachment,
		handleSubmit,
		onClickCancel,
	} = props
	return (
		<Grid container>
			<Grid item xs={3}></Grid>
			<Grid item xs={6}>
				<div>
					<main className='mt-2'>
						<Paper className='p-3'>
							<Typography component='h1' variant='h4' align='center'>
								{isEdit ? 'Edit Article' : 'New Article'}
							</Typography>
							<React.Fragment>
								<Typography variant='h6' gutterBottom></Typography>
								<form onSubmit={handleSubmit}>
									<Grid container spacing={3}>
										<Grid item xs={12}>
											<TextField
												label='Enter article name'
												size='small'
												autoComplete='off'
												value={title}
												name='title'
												required
												fullWidth
												onChange={handleChange}
											/>
										</Grid>
										<Grid item xs={12}>
											<Autocomplete
												options={categories}
												autoHighlight
												getOptionLabel={(option) => option.name}
												value={
													categories.filter(
														(option) => option.id === categoryId
													)[0]
												}
												onChange={(e, v) => {
													if (v) {
														handleKeyValuePairs('categoryId', v.id)
													}
												}}
												renderInput={(params) => (
													<TextField
														{...params}
														label='Choose category'
														size='small'
														fullWidth
														required
													/>
												)}
											/>
										</Grid>
										<Grid item xs={12}>
											<SunEditor
												onChange={(data) =>
													handleKeyValuePairs('content', data)
												}
												setContents={content}
												setOptions={{
													imageWidth: '100%',
													imageHeight: '100%',
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
													minHeight: 200,
												}}
											/>
										</Grid>
										<Grid item xs={12}>
											<input
												style={{ display: 'none' }}
												id='contained-button-file-wafile'
												multiple
												type='file'
												onChange={handleFile}
											/>
											<label htmlFor='contained-button-file-wafile'>
												<Button
													variant='contained'
													color='primary'
													component='span'
												>
													<span>
														<AttachFileIcon fontSize='small' color='inherit' />{' '}
														Attachment
													</span>
												</Button>
											</label>
											{attachments.map((doc, index) => (
												<div className='d-flex justify-content-between'>
													<p>
														{doc !== '' ? (
															<a
																target='_blank'
																rel='noopener noreferrer'
																href={doc.url}
															>
																<GoFileSymlinkFile size={22} /> {doc.name}
															</a>
														) : (
															<p>No file choosen</p>
														)}{' '}
													</p>
													<IconButton
														onClick={() => handleDeleteAttachment(index)}
													>
														<DeleteIcon fontSize='small' />
													</IconButton>
												</div>
											))}
											{isUploading ? <p>Uploading please wait...</p> : ''}
										</Grid>
									</Grid>
									<br />
									<div className='text-center mt-4'>
										<Button
											variant='contained'
											color={isEdit ? 'secondary' : 'primary'}
											type='submit'
											disabled={!title.trim() || !content.trim() || !categoryId}
										>
											{isEdit ? 'Update' : 'Create'}
										</Button>{' '}
										<Button
											onClick={onClickCancel}
											variant='contained'
											color='secondary'
										>
											Cancel
										</Button>
									</div>
								</form>
							</React.Fragment>
						</Paper>
					</main>
				</div>
			</Grid>
			<Grid item xs={12} sm={3}></Grid>
		</Grid>
	)
}

export default Presentation
