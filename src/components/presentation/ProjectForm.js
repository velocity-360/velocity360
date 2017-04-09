import React, { Component } from 'react'
import Dropzone from 'react-dropzone'

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
		project.tags.split(',').forEach((tag, i) => {
			if (tag.length > 0)
				tagsArray.push(tag.trim().toLowerCase())
		})

		project['tags'] = tagsArray
		this.props.onSubmit(project)
	}

	render(){
		const updated = this.state.updated

		return (
			<div style={localStyle.profile}>
				<input value={updated.name} onChange={this.updateProject.bind(this, 'name')} type="text" placeholder="Project Name" style={localStyle.input} />
				<input value={updated.tags} onChange={this.updateProject.bind(this, 'tags')} type="text" placeholder="Tags" style={localStyle.input} />
				<textarea value={updated.description} onChange={this.updateProject.bind(this, 'description')} placeholder="Description" style={localStyle.textarea}></textarea>
				<a href="#" onClick={this.submitProject.bind(this)} style={{marginLeft:0, marginTop:16}} className="button button-blue">Update Project</a>
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