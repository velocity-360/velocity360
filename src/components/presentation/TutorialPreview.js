import React, { Component } from 'react'

export default (props) => {

	const tutorial = props
	return (
		<div className={props.className}>
			<div className="feature-box fbox-center fbox-bg fbox-effect">
				<div className="fbox-icon">
					<a href={'/tutorial/'+tutorial.slug}>
						<img src={'https://media-service.appspot.com/site/images/'+tutorial.image+'?crop=120'} alt={tutorial.title} />
					</a>
				</div>
				<h3>
					<a style={{color:'#333'}} href={'/tutorial/'+tutorial.slug}>{tutorial.title}</a>
				</h3>
				<hr />
				<p className="subtitle">
					<a style={{color:'#777'}} href={'/tutorial/'+tutorial.slug}>
						{tutorial.description.substring(0, 160)+'...'}
					</a>
				</p>
			</div>
		</div>
	)
}