import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Nav, Sidebar, Membership, Footer } from '../components/presentation'
import { BaseContainer } from '../components/containers'
import { TextUtils } from '../utils'

class Courses extends Component {


	render(){
		const SidebarContainer = BaseContainer(Sidebar)
		const selected = this.props.session.courses.selected
		const menuItems = [
			{name:'courses', page:'courses', selected:(selected=='courses')}
		]

		const courses = this.props.courses.all || []

		// const MembershipHOC = BaseContainer(Membership)

		return (
			<div>
				<Nav user={this.props.user} />
				<div id="wrapper" className="clearfix" style={{background:'#f9f9f9'}}>
					<SidebarContainer withSlack={true} items={menuItems} />

					<section id="content" style={{background:'#f9f9f9'}}>
						<div className="content-wrap">
							<div className="container clearfix">
								<div id="posts" className="events small-thumbs">
									<div className="entry-title">
										<h1>Live Courses</h1>
									</div>
									<hr />
								</div>


								{ courses.map((course, i) => {
										const href = '/course/'+course.slug
										return (
											<div key={course.id} className="row">
												<div className="col-md-4 col-sm-6 bottommargin">
													<div className="feature-box fbox-center fbox-bg fbox-effect" style={{minHeight:320}}>
														<div className="fbox-icon">
															<img style={{background:'#ededed'}} src={'https://media-service.appspot.com/site/images/'+course.image+'?crop=120'} alt={course.title+' | Velocity 360'} />
														</div>
														<h3><a href={href}>{course.title}</a></h3>
														<span style={{fontWeight:400, fontSize:12}}>{course.dates}</span><br />
														<span style={{fontWeight:400, fontSize:12}}>${ TextUtils.numberWithCommas(course.tuition) }</span>
														<hr />
														<p style={{textAlign:'left', marginBottom:24}} className="subtitle">
															{TextUtils.truncateText(course.description, 400)}
														</p>

														<p style={{textAlign:'left'}} className="subtitle">
															{ course.tags.map((tag, i) => {
																	return <a style={localStyle.tag} href="#" key={tag}>{tag}</a>
																})
															}
														</p>
														<a href={href} style={{marginLeft:0, marginTop:16}} className="button button-rounded button-large button-dirtygreen"><span>Course Details</span></a>
													</div>
												</div>

												<div className="col-md-8 col-sm-6 bottommargin" style={{paddingTop:48}}>
													<div className="fancy-title title-border">
														<h4 style={{background:'#f9f9f9'}}>Units</h4>
													</div>
													<div id="home-recent-news">
														{ course.units.map((unit, j) => {
																return (
																	<div key={unit.topic} className="spost clearfix">
																		<div className="entry-c">
																			<div className="entry-title">
																				<h4><a href={href}>{unit.topic}</a></h4>
																			</div>
																			<ul className="entry-meta">
																				<li>{ TextUtils.truncateText(unit.description, 120) }</li>
																			</ul>
																		</div>
																	</div>

																)
															})
														}


													</div>
												</div>

											</div>
										)
									})
								}

							</div>
						</div>

					</section>
					<Footer />

				</div>
			</div>
		)
	}
}

const localStyle = {
	tag: {
		fontSize: 12,
		padding: 4,
		marginRight: 8,
		marginBottom: 8,
		display: 'inline-block',
		background: '#ededed'
	}
}

const stateToProps = (state) => {
	return {
		profiles: state.profile,
		courses: state.course,
		session: state.session
	}
}

export default connect(stateToProps)(BaseContainer(Courses))