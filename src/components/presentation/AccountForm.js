import React, { Component } from 'react'
import Dropzone from 'react-dropzone'

export default (props) => {

	const initial = props.initial
	return (
		<div style={localStyle.profile}>
			<div className="row">
				<div className="col-md-8" style={{marginBottom:16}}>
					<input defaultValue={initial.firstName} type="text" onChange={props.onChange.bind(this, 'firstName')} placeholder="First Name" style={localStyle.input} />
					<input defaultValue={initial.lastName} type="text" onChange={props.onChange.bind(this, 'lastName')} placeholder="Last Name" style={localStyle.input} />
					<input defaultValue={initial.username} type="text" onChange={props.onChange.bind(this, 'username')} placeholder="Username" style={localStyle.input} />
					<input defaultValue={initial.tags} type="text" onChange={props.onChange.bind(this, 'tags')} placeholder="Tags (node, react, redux, etc)" style={localStyle.input} />
					<textarea defaultValue={initial.bio} onChange={props.onChange.bind(this, 'bio')} placeholder="Bio" style={localStyle.textarea}></textarea>
					<a href="#" onClick={props.onSubmit.bind(this)} style={{marginLeft:0, marginTop:16}} className="button button-blue">Update Profile</a>
				</div>

				<div className="col-md-4">
					<div style={{width:100+'%'}}>
						<Dropzone onDrop={props.onUpload.bind(this)} style={{border:'none', textAlign:'center'}}>
							<div style={localStyle.dropzone}>
								{ (initial.image.indexOf('http') > -1) ? <img style={{marginBottom:6}} src={initial.image+'=s120-c'} /> : null }
								Profile Image
							</div>
							<button className="button button-mini button-circle button-red">Upload Image</button>
						</Dropzone>
					</div>
				</div>

			</div>
		</div>
	)
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
	}
}