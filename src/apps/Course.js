import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Nav, Sidebar, Footer } from '../components/presentation'
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

		// const MembershipHOC = BaseContainer(Membership)
		return (
			<div>
				<Nav user={this.props.user} />
				<div id="wrapper" className="clearfix" style={{background:'#f9f9f9'}}>
					<SidebarContainer withSlack={true} items={menuItems} />
						<section id="content" style={{background:'#f9f9f9'}}>

							<div className="content-wrap">
								<div className="container clearfix">


							<div className="col_full bottommargin-lg clearfix">
								<div className="entry-title">
									<h1 style={{background:'#f9f9f9'}}>{course.title}</h1>
								</div>
								<hr />

								<div className="ipost clearfix">
									<div className="col_two_third nobottommargin">
										<div className="entry-content description">
											<p dangerouslySetInnerHTML={{ __html:course.description }}></p>
										</div>
									</div>

									<div className="col_one_third nobottommargin col_last">
										<div className="entry-image topmargin">
											<img className="image_fade" src={'https://media-service.appspot.com/site/images/'+course.image+'?crop=512'} alt={course.title+' | Velocity 360'} />
										</div>
									</div>
								</div>
							</div>


								</div>
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
		// account: state.account,
		session: state.session,
		courses: state.course
	}
}

export default connect(stateToProps)(BaseContainer(Course))