import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { Nav, Sidebar, Footer, Detail } from '../components/presentation'
import { BaseContainer, Tutorials, Posts } from '../components/containers'

class Post extends Component {
	componentWillMount(){

	}

	render(){
//		console.log('SLUG: '+this.props.session.post.slug)
		const SidebarContainer = BaseContainer(Sidebar)
		const selected = this.props.session.post.selected
		const menuItems = [
			{name:'overview', page:'post', selected:(selected=='overview')},
			{name:'comments', page:'post', selected:(selected=='comments')}
		]

		const post = this.props.posts[this.props.session.post.slug]
		// console.log('RENDER: '+JSON.stringify(post))

		return (
			<div>
				<Nav />
				<div id="wrapper" className="clearfix">
					<SidebarContainer items={menuItems} />

					<section id="content">
						<div className="content-wrap">
							<div className="container clearfix">
								<Detail {...post} />

								<div className="sidebar nobottommargin col_last clearfix" style={{background:'#fff'}}>
									<div className="sidebar-widgets-wrap">
										<div className="widget clearfix">

											<h4 style={{marginBottom:10}}>Recent Posts</h4>
											<div className="tabs nobottommargin clearfix" id="sidebar-tabs">

												<div className="tab-container">
													<div className="tab-content clearfix" id="tabs-1">
														<div id="popular-post-list-sidebar">

															<div className="spost clearfix">
																<div className="entry-image">
																	<a href="#" className="nobg">
																		<img src="https://lh3.googleusercontent.com/qbxcPQzA8eK56i3bmo51-qzk9VNXA7yazNOSxhJUGfBnfwL6CmVfS8Sgn6BTGF0QtbBHbwlgYlh2WVWWrMTKTri6YQ=s64-c" alt="Velocity 360" />
																	</a>
																</div>
																<div className="entry-c">
																	<div className="entry-title">
																		<h4><a href="#">Post</a></h4>
																	</div>
																	<ul className="entry-meta">
																		<li>March 31, 2017</li>
																	</ul>
																</div>
															</div>

														</div>
													</div>
												</div>
											</div>
										</div>

									</div>
								</div>

							</div>
						</div>
					</section>

					<section id="content" style={{background:'#f9f9f9'}}>
						<div className="content-wrap">
							<Tutorials />						
						</div>
					</section>

					<Footer />
				</div>
			</div>
		)
	}
}

const stateToProps = (state) => {
	return {
		posts: state.post,
		session: state.session
	}
}

export default connect(stateToProps)(Post)