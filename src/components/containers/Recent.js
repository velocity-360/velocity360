import React, { Component } from 'react'
import { connect } from 'react-redux'
import { PostPreview } from '../presentation'
import BaseContainer from './BaseContainer'

class Recent extends Component {
	componentDidMount(){
		if (this.props.posts.all != null)
			return

		this.props.fetchData('post', {limit:3})
	}

	render(){
		const list = this.props.posts.all || []
		
		return (
			<div className="sidebar nobottommargin col_last clearfix" style={{background:'#fff'}}>
				<div className="sidebar-widgets-wrap">
					<div className="widget clearfix">

						<h4 style={{marginBottom:10}}>Recent Posts</h4>
						<div className="tabs nobottommargin clearfix" id="sidebar-tabs">

							<div className="tab-container">
								<div className="tab-content clearfix" id="tabs-1">
									<div id="popular-post-list-sidebar">

										{ list.map((post, i) => {
												return (
													<div key={post.id} className="spost clearfix">
														<div className="entry-image">
															<a href={'/post/'+post.slug} className="nobg">
																<img src={post.image+'=s64-c'} alt={post.title+' | Velocity 360'} />
															</a>
														</div>
														<div className="entry-c">
															<div className="entry-title">
																<h4><a href={'/post/'+post.slug}>{post.title}</a></h4>
															</div>
															<ul className="entry-meta">
																<li>{post.dateString}</li>
															</ul>
														</div>
													</div>
												)
											})
										}

									</div>
								</div>
							</div>
						</div>
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

export default connect(stateToProps)(BaseContainer(Recent))
