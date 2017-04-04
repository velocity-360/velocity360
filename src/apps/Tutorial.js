import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { Nav, Sidebar, Membership, Detail, Footer } from '../components/presentation'
import { BaseContainer, Tutorials, Posts } from '../components/containers'

class Tutorial extends Component {
	componentWillMount(){
		// console.log('Tutorial: componentWillMount = '+JSON.stringify(this.props))
	}

	render(){
		const SidebarContainer = BaseContainer(Sidebar)
		// const selected = this.props.session.home.selected
		const menuItems = [
			{name:'overview', page:'tutorial', selected:true},
			{name:'units', page:'tutorial', selected:false},
			{name:'community', page:'tutorial', selected:false}
		]

		const tutorial = this.props.tutorials[this.props.session.tutorial.slug]
		// console.log('RENDER: '+JSON.stringify(tutorial))

		return (
			<div>
				<Nav />
				<div id="wrapper" className="clearfix">
					<SidebarContainer items={menuItems} />

					<section id="content">
						<div className="content-wrap">
							<div className="container clearfix">
								<Detail {...tutorial} />
						
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
		session: state.session,
		tutorials: state.tutorial
	}
}

export default connect(stateToProps)(Tutorial)