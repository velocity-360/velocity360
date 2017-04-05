import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Nav, Sidebar, Footer, Preview } from '../components/presentation'
import { BaseContainer } from '../components/containers'

class Account extends Component {
	componentWillMount(){

	}

	componentDidMount(){
		if (this.props.user == null)
			return

		if (this.props.tutorials.all != null)
			return

		this.props.fetchData('tutorial', {subscribers:this.props.user.id})
		.then(response => {
			// console.log('TUTORIALS: '+JSON.stringify(response))
		})
		.catch(err => {
			console.log('ERROR: '+JSON.stringify(err))
		})
	}

	render(){
//		console.log('SLUG: '+this.props.session.post.slug)
		const SidebarContainer = BaseContainer(Sidebar)
		const selected = this.props.session.account.selected
		const menuItems = [
			{name:'tutorials', page:'account', selected:(selected=='tutorials')},
			{name:'profile', page:'account', selected:(selected=='profile')}
		]

		// console.log('RENDER: '+JSON.stringify(this.props.tutorials.all))
		const list = this.props.tutorials.all || []

		return (
			<div>
				<Nav user={this.props.user} />
				<div id="wrapper" className="clearfix">
					<SidebarContainer withSlack={false} items={menuItems} />

					<section id="content">
						<div className="content-wrap">
							<div className="container clearfix">
								<div className="col_two_third postcontent nobottommargin clearfix">
									<div id="posts" className="events small-thumbs">

										<div className="entry-title">
											<h1>Tutorials</h1>
										</div>
										<hr />

										{ list.map((tutorial, i) => {
												return <Preview key={tutorial.id} {...tutorial} />
											})
										}

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
		tutorials: state.tutorial,
		session: state.session
	}
}

export default connect(stateToProps)(BaseContainer(Account))
