import React, { Component } from 'react'

export default (props) => {

	return (
		<div style={localStyle.slack}>
			<img src="/images/slack.png" />
			<p style={{marginTop:8, marginBottom:6}}>
				Join our Slack channel to ask questions about tutorials and 
				discuss general programming and industry topics:
			</p>
			<input onChange={props.updateCredentials.bind(this, 'name')} placeholder="Name" style={localStyle.input} type="text" />
			<br />
			<input onChange={props.updateCredentials.bind(this, 'email')} placeholder="Email" style={localStyle.input} type="text" />
			<a onClick={props.subscribe.bind(this)} href="#" className="button button-small button-circle button-border button-aqua">Join</a>
		</div>
	)
}

const localStyle = {
	input: {
		background: '#f9f9f9',
		border: 'none',
		borderBottom:'1px solid #ddd',
		marginBottom: 12,
		width: 100+'%',
		height: 28
	},
	slack: {
		background: '#f9f9f9',
		borderRadius: 2,
		padding: 16
	}
}