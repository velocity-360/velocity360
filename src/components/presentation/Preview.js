import React, { Component } from 'react'

export default (props) => {

	return (
		<div className="entry clearfix" style={{border:'none'}}>
			<div className="entry-image hidden-sm" style={{width:140}}>
				<a href={'/'+props.schema+'/'+props.slug}>
					<img src={'https://media-service.appspot.com/site/images/'+props.image+'?crop=360'} alt={'Velocity 360 | '+props.title} />
				</a>
			</div>
			<div className="entry-c">
				<div className="entry-title">
					<h2><a href={'/'+props.schema+'/'+props.slug}>{props.title}</a></h2>
				</div>
				<ul className="entry-meta clearfix">
					<li><a href="#">{props.posts.length} Units</a></li>
					<li><a href="#">{props.category}</a></li>
				</ul>
				<div className="entry-content">
					<a target="_blank" href={'/premium/tutorial/'+props.id} className="btn btn-info">View Files</a>
				</div>
			</div>
		</div>
	)

}