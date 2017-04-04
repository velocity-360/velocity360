import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { Nav, Sidebar, Footer } from '../components/presentation'
import { BaseContainer } from '../components/containers'

class Account extends Component {
	componentWillMount(){

	}

	componentDidMount(){

	}

	render(){
//		console.log('SLUG: '+this.props.session.post.slug)
		const SidebarContainer = BaseContainer(Sidebar)
		const selected = this.props.session.account.selected
		const menuItems = [
			{name:'overview', page:'account', selected:(selected=='overview')},
			{name:'comments', page:'account', selected:(selected=='comments')}
		]

		// console.log('RENDER: '+JSON.stringify(post))

		return (
			<div>
				<Nav />
				<div id="wrapper" className="clearfix">
					<SidebarContainer withSlack={false} items={menuItems} />

					<section id="content">
						<div className="content-wrap">
							<div className="container clearfix">
								Account Page
							</div>
						</div>
					</section>

					<section id="content" style={{background:'#f9f9f9'}}>
						<div className="content-wrap">

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

export default connect(stateToProps)(Account)
