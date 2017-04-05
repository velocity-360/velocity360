import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Nav, Sidebar, Footer, Detail, Comments } from '../components/presentation'
import { BaseContainer, Tutorials, Posts, Recent } from '../components/containers'

class Post extends Component {
	constructor(){
		super()
		this.state = {
			comment: {
				text: ''
			}
		}
	}

	componentWillMount(){

	}

	componentDidMount(){

	}

	changeComment(field, event){
//		console.log('changeComment: '+field+' == '+event.target.value)
		let updated = Object.assign({}, this.state.comment)
		updated[field] = event.target.value
		this.setState({
			comment: updated
		})

	}

	submitComment(){
		console.log('submitComment: '+JSON.stringify(this.state.comment))
		if (this.state.comment.text.length == 0){
			alert('Please enter a comment')
			return
		}
	}

	render(){
		const SidebarContainer = BaseContainer(Sidebar)
		const selected = this.props.session.post.selected
		const menuItems = [
			{name:'overview', page:'post', selected:(selected=='overview')},
			{name:'comments', page:'post', selected:(selected=='comments')}
		]

		const post = this.props.posts[this.props.session.post.slug]
		// console.log('RENDER: '+JSON.stringify(post))

		let content = null
		if (selected == 'overview'){
			content = (
				<div className="container clearfix">
					<Detail {...post} />
					<Recent />
				</div>
			)
		}
		if (selected == 'comments'){
			content = (
				<Comments 
					onChangeComment={this.changeComment.bind(this)}
					onSubmit={this.submitComment.bind(this)} />
			)			
		}

		return (
			<div>
				<Nav user={this.props.user} />
				<div id="wrapper" className="clearfix">
					<SidebarContainer withSlack={false} items={menuItems} />

					<section id="content">
						<div className="content-wrap">
							{content}
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
