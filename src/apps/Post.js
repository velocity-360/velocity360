import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { Nav, Sidebar, Membership, Footer } from '../components/presentation'
import { BaseContainer, Tutorials, Posts } from '../components/containers'

class Post extends Component {
	componentWillMount(){
		// console.log('HOME: componentWillMount = '+JSON.stringify(this.props))
	}

	render(){
		const SidebarContainer = BaseContainer(Sidebar)
		const selected = this.props.session.home.selected
		const menuItems = [
			{name:'tutorials', page:'home', selected:(selected=='tutorials')},
			{name:'blog', page:'home', selected:(selected=='blog')},
			{name:'community', page:'home', selected:(selected=='community')}
		]

		return (
			<div>
				<Nav />
				<div id="wrapper" className="clearfix">
					<SidebarContainer items={menuItems} />

					<section id="content">
						<div className="content-wrap">
							POST PAGE
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
		session: state.session
	}
}

export default connect(stateToProps)(Post)