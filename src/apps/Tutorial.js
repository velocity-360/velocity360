import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { Nav, Sidebar, Membership, Detail, Footer } from '../components/presentation'
import { BaseContainer, Tutorials, Posts, Recent } from '../components/containers'

class Tutorial extends Component {
	componentWillMount(){
		// console.log('Tutorial: componentWillMount = '+JSON.stringify(this.props))
	}

	render(){
		const SidebarContainer = BaseContainer(Sidebar)
		const selected = this.props.session.tutorial.selected
		const menuItems = [
			{name:'overview', page:'tutorial', selected:(selected=='overview')},
			{name:'comments', page:'tutorial', selected:(selected=='comments')}
		]

		const tutorial = this.props.tutorials[this.props.session.tutorial.slug]

		return (
			<div>
				<Nav user={this.props.user} />
				<div id="wrapper" className="clearfix">
					<SidebarContainer withSlack={false} items={menuItems} />

					<section id="content">
						<div className="content-wrap">
							<div className="container clearfix">
								<Detail {...tutorial} />
								<Recent />
							</div>
						</div>
					</section>

					<section id="content" style={{background:'#f9f9f9'}}>
						<div className="content-wrap">
							<Membership />
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
		tutorials: state.tutorial
	}
}

export default connect(stateToProps)(BaseContainer(Tutorial))