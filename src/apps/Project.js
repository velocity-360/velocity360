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
			{name:'collaborators', page:'project', selected:(selected=='collaborators')}
		]

		return (
			<div>
				<Nav user={this.props.user} />

				<div id="wrapper" className="clearfix">
					<SidebarContainer withSlack={false} items={menuItems} />

					<section id="content">
						<div className="content-wrap">
							<div className="container clearfix">


		<div className="row">
			<div className="col-md-4 col-sm-6 bottommargin">
				<div className="feature-box fbox-center fbox-bg fbox-effect" style={{height:320}}>
					<div className="fbox-icon">
						<a href="#">
							<img style={{background:'#fff'}} src="https://media-service.appspot.com/site/images/60KjE_z8?crop=120" alt="" />
						</a>
					</div>
					<h3>
						<a style={{color:'#333'}} href="#">Project Title</a>
					</h3>
					<hr />
					<p className="subtitle">
						<a style={{color:'#777'}} href="#">
							description
						</a>
					</p>
				</div>

			</div>
			<div className="col-md-8 col-sm-6 bottommargin" style={{paddingTop:48}}>
				<div className="fancy-title title-border">
					<h4>Acitivity</h4>
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
		account: state.account,
		session: state.session,
		projects: state.project
	}
}

export default connect(stateToProps)(BaseContainer(Project))