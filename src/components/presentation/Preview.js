import React, { Component } from 'react'

export default (props) => {

	return (
		<div className="entry clearfix" style={{border:'none'}}>
			<div className="entry-image hidden-sm">
				<a href="#">
					<img src={'https://media-service.appspot.com/site/images/'+props.image+'?crop=360'} alt={'Velocity 360 | '+props.title} />
				</a>
			</div>
			<div className="entry-c">
				<div className="entry-title">
					<h2><a href="#">{props.title}</a></h2>
				</div>
				<ul className="entry-meta clearfix">
					<li><a href="#">11:00 - 19:00</a></li>
					<li><a href="#">{props.category}</a></li>
				</ul>
				<div className="entry-content">
					<a href="#" className="btn btn-info">View</a>
				</div>
			</div>
		</div>
	)

}