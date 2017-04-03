import React, { Component } from 'react'

export default (props) => {

	const post = props
	return (
		<div className="entry clearfix">
			<div style={localStyle.imageContainer} className="entry-image">
				<a href={'/post/'+post.slug}>
					<img style={localStyle.image} className="image_fade" src={post.image+'=s320-c'} alt={post.title} />
				</a>
			</div>
			<div className="entry-c">
				<div className="entry-title">
					<h2><a href={'/post/'+post.slug}>{post.title}</a></h2>
				</div>
				<ul className="entry-meta clearfix">
					<li>{post.dateString}</li>
					<li><a href="#">Admin</a></li>
				</ul>
				<div className="entry-content">
					<p>
						<a href={'/post/'+post.slug}>{post.preview}</a>
					</p>
				</div>
			</div>
		</div>
	)
}

const localStyle = {
	image: {
		border:'1px solid #ddd',
		maxWidth: 200
	},
	imageContainer: {
		width:160
	}
}