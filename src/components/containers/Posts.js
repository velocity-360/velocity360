import React, { Component } from 'react'
import { connect } from 'react-redux'
import { PostPreview } from '../presentation'
import BaseContainer from './BaseContainer'

class Posts extends Component {
	componentDidMount(){
		if (this.props.posts.all != null)
			return

		this.props.fetchData('post', {})
	}

	render(){
		const list = this.props.posts.all || []
		
		return (
			<div className="container clearfix">
				<div className="heading-block center">
					<h1 style={{fontFamily:'Pathway Gothic One'}}>Blog</h1>
				</div>

				<div className="postcontent nobottommargin clearfix">

					<div id="posts" className="small-thumbs">
						{ list.map((post, i) => {
								return <PostPreview key={post.id} {...post} />
							})
						}
					</div>
				</div>
			</div>
		)
	}
}

const stateToProps = (state) => {
	return {
		posts: state.post

	}
}

export default connect(stateToProps)(BaseContainer(Posts))
