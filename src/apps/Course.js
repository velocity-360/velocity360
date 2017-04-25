import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Nav, Sidebar, Enroll, Footer } from '../components/presentation'
import { BaseContainer } from '../components/containers'

class Course extends Component {
	constructor(){
		super()
		this.state = {

		}
	}

	render(){
		const SidebarContainer = BaseContainer(Sidebar)
		const selected = this.props.session.course.selected
		const menuItems = [
			{name:'overview', page:'course', selected:(selected=='overview')}
		]

		const course = this.props.courses[this.props.session.course.slug]
		const EnrollHOC = BaseContainer(Enroll)

		return (
			<div>
				<Nav user={this.props.user} />
				<div id="wrapper" className="clearfix" style={{background:'#fff'}}>
					<SidebarContainer withSlack={true} items={menuItems} />
					<section id="content" style={{background:'#fff'}}>

						<div className="content-wrap">
							<div className="container clearfix">
								<div className="heading-block center">
									<h1 style={{fontFamily:'Pathway Gothic One', fontWeight:200}}>{course.title}</h1>
								</div>

								<div className="col_full bottommargin-lg clearfix">
									<div className="ipost clearfix">
										<div className="col_two_third nobottommargin">
											<div className="entry-content description">
												<p dangerouslySetInnerHTML={{ __html:course.description }}></p>
											</div>
										</div>

										<div className="col_one_third nobottommargin col_last">
											<div className="entry-image topmargin-sm">
												<img className="image_fade" src={'https://media-service.appspot.com/site/images/'+course.image+'?crop=512'} alt={course.title+' | Velocity 360'} />
											</div>
										</div>
									</div>
								</div>

							</div>
						</div>
					</section>


					<section style={{background:'#f9f9f9'}}>
						<div className="content-wrap">
							<div className="container clearfix">

								<div className="heading-block center topmargin">
									<h1 style={{fontFamily:'Pathway Gothic One', fontWeight:200}}>Units</h1>
								</div>

								<div className="col_full bottommargin-lg topmargin clearfix">

									<div className="row">
										{ course.units.map((unit, i) => {
												return (
													<div key={i} className="col-md-4 notopmargin">
														<div className="feature-box fbox-center fbox-bg fbox-effect" style={{height:340, paddingTop:36}}>
															<h3>{unit.topic}</h3>
															<hr />
															<p className="subtitle">{unit.description}</p>
														</div>
													</div>
												)
											})
										}

									</div>
								</div>
							</div>
						</div>
					</section>

					<section style={{background:'#fff'}}>
						<div className="content-wrap topmargin">
							<EnrollHOC {...course} />
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
		session: state.session,
		courses: state.course
	}
}

export default connect(stateToProps)(BaseContainer(Course))