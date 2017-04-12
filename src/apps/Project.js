import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Nav, Sidebar, Footer } from '../components/presentation'
import { BaseContainer } from '../components/containers'

class Project extends Component {

	render(){
		const user = this.props.user
		const SidebarContainer = BaseContainer(Sidebar)
		const selected = this.props.session.project.selected
		const menuItems = [
			{name:'overview', page:'project', selected:(selected=='overview')},
			{name:'comments', page:'project', selected:(selected=='comments')}
		]

		return (
			<div>
				<Nav user={this.props.user} />

				<div id="wrapper" className="clearfix">
					<SidebarContainer withSlack={false} items={menuItems} />

					<section id="content">
						<div className="content-wrap">
							<div className="container clearfix">
								<div className="col_two_third postcontent nobottommargin clearfix">



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
		account: state.account,
		session: state.session,
		projects: state.project
	}
}

export default connect(stateToProps)(BaseContainer(Project))