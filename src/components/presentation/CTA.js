import React, { Component } from 'react'

export default (props) => {
	const purchase = (
		<div>
			<h3>Purchase</h3>
			${props.price+'.00'}
			<hr />
			<p style={{marginBottom:0}}>Purchase this tutorial for ${props.price} and receive all videos, code samples and access to the forum where people post questions and answers.</p>
			<a onClick={props.onSubmit.bind(this, props)} style={{marginTop:12}} href="#" className="button button-circle button-dark">Purchase, ${props.price}</a>
		</div>
	)

	const subscribed = (
		<div>
			<h3>Subscribed</h3>
			<hr />
			<p style={{marginBottom:0}}>You are subscribed to this tutorial. To access, click the link below:</p>
			<a style={{marginTop:12}} target="_blank" href={'/premium/tutorial/'+props.id} className="button button-circle button-dark">Access Tutorial</a>
		</div>
	)

	const premium = (
		<div>
			<h3>Premium Access</h3>
			<hr />
			<p style={{marginBottom:0}}>As a premium member, you can subscribe to this tutorial by clicking the link below:</p>
			<a onClick={props.onSubmit.bind(this, props)} style={{marginTop:12}} href="#" className="button button-circle button-dark">Subscribe</a>
		</div>
	)

	const subscribe = (
		<div>
			<h3>Subscribe</h3>
			<hr />
			<p style={{marginBottom:0}}>To subscribe to this tutorial, click the link below:</p>
			<a onClick={props.onSubmit.bind(this, props)} style={{marginTop:12}} href="#" className="button button-circle button-dark">Subscribe</a>
		</div>
	)

	let content = null
	if (props.layout == 'subscribe')
		content = subscribe

	if (props.layout == 'subscribed')
		content = subscribed

	if (props.layout == 'premium')
		content = premium

	if (props.layout == 'purchase')
		content = purchase


	return (
		<div className="promo promo-border promo-mini" style={{background:'#f9f9f9', border:'1px solid #ddd'}}>
			{ content }
		</div>
	)
}

const localStyle = {
	container: {
		background:'#f9f9f9',
		border:'1px solid #ddd'
	},
	paragraph: {
		marginBottom: 0
	},
	button: {
		marginTop: 12
	}
}

