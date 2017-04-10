import React, { Component } from 'react'
import Dropzone from 'react-dropzone'
import { APIManager } from '../../utils'

class ProjectForm extends Component {
	constructor(){
		super()
		this.state = {

		}
	}

	copyProject(){
		let project = Object.assign({}, this.props)
		project['tags'] = (project.tags) ? project.tags.join(', ') : ''
		this.setState({
			updated: project
		})
	}

	componentWillMount(){
		this.copyProject()
	}

	componentDidUpdate(){
		if (this.props.id == this.state.updated.id)
			return

		// console.log('componentDidUpdate: ProjectForm')
		this.copyProject()
	}

	updateProject(field, event){
		event.preventDefault()
		// console.log('updateProject: '+JSON.stringify(this.state))

		let updated = Object.assign({}, this.state.updated)
		updated[field] = event.target.value
		this.setState({
			updated: updated
		})
	}

	submitProject(event){
		event.preventDefault()
		let project = Object.assign({}, this.state.updated)
		let tagsArray = []
		if (project.tags != null){
			project.tags.split(',').forEach((tag, i) => {
				if (tag.length > 0)
					tagsArray.push(tag.trim().toLowerCase())
			})
		}

		project['tags'] = tagsArray
		this.props.onSubmit(project)
	}

	deleteProject(event){
		event.preventDefault()
		const confirmed = confirm('Are You Sure?')
		if (confirmed == true)
			this.props.onDeleteProject(this.props)
	}

	uploadImage(files){
		APIManager.upload(files[0], (err, image) => {
			if (err){
				alert(err.message)
				return
			}

			// {"id":"zlaYa4d4","address":"https://lh3.googleusercontent.com/4wx2dLcSxn45N_G2--w9USvDJMx",
			// "name":"2.png","key":"AMIfv97SWgG7RBl_424QhViLIDJYPRBa3UPs9y-PXOYGTI-TKYsdt4Fc"}
			// console.log('Image Uloaded: '+JSON.stringify(image))

			let updated = Object.assign({}, this.state.updated)
			let images = (updated.images == null) ? [] : Object.assign([], updated.images)
			images.push(image.address)
			updated['images'] = images
			this.setState({
				updated: updated
			})
		})
	}

	removeImage(image, event){
		event.preventDefault()
		// console.log('removeImage: '+JSON.stringify(image))

		let updated = Object.assign({}, this.state.updated)
		let images = (updated.images == null) ? [] : Object.assign([], updated.images)
		const index = images.indexOf(image)
		if (index == -1)
			return

		images.splice(index, 1)
		updated['images'] = images
		this.setState({
			updated: updated
		})
	}

	render(){
		const updated = this.state.updated

		return (
			<div style={localStyle.profile}>
				<input value={updated.name} onChange={this.updateProject.bind(this, 'name')} type="text" placeholder="Project Name" style={localStyle.input} />
				<input value={updated.tags} onChange={this.updateProject.bind(this, 'tags')} type="text" placeholder="Tags" style={localStyle.input} />
				<input value={updated.github} onChange={this.updateProject.bind(this, 'github')} type="text" placeholder="GitHub Repo" style={localStyle.input} />
				<textarea value={updated.description || ''} onChange={this.updateProject.bind(this, 'description')} placeholder="Description" style={localStyle.textarea}></textarea>
				<h4 style={{marginBottom:12}}>Images</h4>
				<div className="row">
					{ (updated.images == null) ? null : updated.images.map((image, i) => {
							return (
								<div key={image} className="col-md-3" style={{marginBottom:16}}>
									<a target="_blank" href={image}>
										<img style={{marginBottom:4}} src={image+'=s256-c'} />
									</a>
									<a style={{fontSize:12, color:'red'}} onClick={this.removeImage.bind(this, image)} href="#">remove</a>
								</div>
							)
						})
					}
				</div>

				<Dropzone onDrop={this.uploadImage.bind(this)} style={{border:'none'}}>
					<button>Upload Image</button>
				</Dropzone>

				<hr />
				<div className="row">
					<div className="col-md-6">
						<a href="#" onClick={this.submitProject.bind(this)} style={{marginLeft:0, marginTop:16}} className="button button-blue">Update Project</a>
					</div>
					<div className="col-md-6">
						<a href="#" onClick={this.deleteProject.bind(this)} style={{marginLeft:0, marginTop:16}} className="button button-red">Delete Project</a>
					</div>
				</div>
			</div>
		)
	}
}

const localStyle = {
	profile: {
		background: '#fff',
		border: '1px solid #ddd',
		padding: 24,
		borderRadius: 3
	},
	input: {
		height: 32,
		width: 100+'%',
		border: 'none',
		marginTop: 16,
		borderBottom: '1px solid #ddd'
	},
	textarea: {
		background: '#f9f9f9',
		height: 200,
		width: 100+'%',
		marginTop: 24,
		padding: 12,
		border: 'none'
	},
	dropzone: {
		width: 100+'%',
		height: 200,
		background: '#f9f9f9',
		float: 'right',
		padding: 24,
		textAlign: 'center',
		marginBottom: 12
	},
	dropzoneWithImage: {
		width: 100+'%',
		height: 200,
		background: '#ffff',
		float: 'right',
		padding: 24,
		textAlign: 'center',
		marginBottom: 6
	}
}

export default ProjectForm