import React, { Component } from 'react'
import Slack from './Slack'

export default (props) => {

	const menu = props.items.map((item, i) => {
		return (
			<li key={i}>
				<a onClick={props.selectItem.bind(this, item)} style={{color:'#fff', fontSize:16}} href="#">
					<div>{item.name} {(item.selected) ? <i className="icon-ok-sign"></i> : null}</div>
				</a>
			</li>
		)
	})

	return (
		<header id="header" className="no-sticky hidden-xs sidebar" style={{paddingTop:120, background:'#333'}}>
			<div id="header-wrap" style={{background:'#333'}}>
				<div className="container clearfix">
					<div id="primary-menu-trigger"><i className="icon-reorder"></i></div>

					<nav id="primary-menu">
						<ul>{menu}</ul>
					</nav>
					{ (props.withSlack == true) ? <Slack subscribe={props.subscribe.bind(this)} updateCredentials={props.updateCredentials.bind(this)} /> : null }
				</div>
			</div>
		</header>
	)
}

