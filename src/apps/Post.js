import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Nav, Sidebar, Footer, Detail } from '../components/presentation'
import { BaseContainer, Tutorials, Posts, Recent } from '../components/containers'

class Post extends Component {
	componentWillMount(){

	}

	componentDidMount(){

	}

	render(){
//		console.log('SLUG: '+this.props.session.post.slug)
		const SidebarContainer = BaseContainer(Sidebar)
		const selected = this.props.session.post.selected
		const menuItems = [
			{name:'overview', page:'post', selected:(selected=='overview')},
			{name:'comments', page:'post', selected:(selected=='comments')}
		]

		const post = this.props.posts[this.props.session.post.slug]
		// console.log('RENDER: '+JSON.stringify(post))

		return (
			<div>
				<Nav user={this.props.user} />
				<div id="wrapper" className="clearfix">
					<SidebarContainer withSlack={false} items={menuItems} />

					<section id="content">
						<div className="content-wrap">
							<div className="container clearfix">
								<Detail {...post} />
								<Recent />
							</div>
						</div>
					</section>

					<section id="content" style={{background:'#f9f9f9'}}>
						<div className="content-wrap">
							<Tutorials />						
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
		posts: state.post,
		session: state.session
	}
}

export default connect(stateToProps)(BaseContainer(Post))
