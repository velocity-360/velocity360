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
		// console.log('changeComment: '+field+' == '+event.target.value)
		let updated = Object.assign({}, this.state.comment)
		updated[field] = event.target.value
		this.setState({
			comment: updated
		})

	}

	submitComment(){
		const post = this.props.posts[this.props.session.post.slug]
		if (post == null)
			return

		this.props.onSubmitComment(this.state.comment, post)
	}

	componentDidUpdate(){
		const selected = this.props.session.post.selected
		// console.log('componentDidUpdate: '+selected)
		if (selected != 'comments')
			return

		const post = this.props.posts[this.props.session.post.slug]
		if (post == null)
			return

		if (this.props.comments.all != null)
			return

		this.props.fetchData('comment', {subject:post.id})
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
		if (selected == 'overview')
			content = <Detail {...post} />
		
		else if (selected == 'comments'){
			content = (
				<Comments 
					comments={this.props.comments.all || []}
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
							<div className="container clearfix">
								<div className="col_two_third postcontent nobottommargin clearfix">
									{content}
								</div>
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
		comments: state.comment,
		session: state.session
	}
}

export default connect(stateToProps)(BaseContainer(Post))
