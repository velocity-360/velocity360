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


								<div className="row">



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
		profiles: state.profile,
		courses: state.course,
		session: state.session
	}
}

export default connect(stateToProps)(BaseContainer(Courses))