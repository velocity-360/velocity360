import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Nav, Sidebar, Membership, Detail, CTA, Comments, Footer } from '../components/presentation'
import { BaseContainer, Tutorials, Recent } from '../components/containers'

class Tutorial extends Component {
	constructor(){
		super()
		this.state = {
			comment: {
				text: ''
			}
		}
	}

	componentWillMount(){
		// console.log('Tutorial: componentWillMount = '+JSON.stringify(this.props))
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
		const tutorial = this.props.tutorials[this.props.session.tutorial.slug]
		if (tutorial == null)
			return

		this.props.onSubmitComment(this.state.comment, tutorial)
	}

	componentDidUpdate(){
		const selected = this.props.session.tutorial.selected
		// console.log('componentDidUpdate: '+selected)
		if (selected != 'comments')
			return

		const tutorial = this.props.tutorials[this.props.session.tutorial.slug]
		if (tutorial == null)
			return

		if (this.props.comments.all != null)
			return

		this.props.fetchData('comment', {subject:tutorial.id})
	}

	purchaseTutorial(event){
		event.preventDefault()
		console.log('purchaseTutorial')
	}

	renderCta(){
		const user = this.props.user // can be null
		const tutorial = this.props.tutorials[this.props.session.tutorial.slug]
		if (tutorial == null)
			return null

		if (user == null) // not logged in
			return (tutorial.price == 0) ? null : <CTA onSubmit={this.purchaseTutorial.bind(this)} layout="purchase" {...tutorial} /> 

		// User logged in:
		if (tutorial.subscribers.indexOf(user.id) > -1) // already subscribed
			return <CTA onSubmit={this.props.followTutorial.bind(this)} layout="subscribed" {...tutorial} />

		// Not subscribed:
		if (user.accountType == 'premium')
			return <CTA onSubmit={this.props.followTutorial.bind(this)} layout="premium" {...tutorial} />
		
		if (tutorial.price == 0)
			return <CTA onSubmit={this.props.followTutorial.bind(this)} layout="subscribe" {...tutorial} />

		return <CTA onSubmit={this.purchaseTutorial.bind(this)} layout="purchase" {...tutorial} />
	}

	render(){
		const user = this.props.user
		const SidebarContainer = BaseContainer(Sidebar)
		const selected = this.props.session.tutorial.selected
		const menuItems = [
			{name:'overview', page:'tutorial', selected:(selected=='overview')},
			{name:'comments', page:'tutorial', selected:(selected=='comments')}
		]

		const tutorial = this.props.tutorials[this.props.session.tutorial.slug]

		let content = null
		if (selected == 'overview')
			content = <Detail {...tutorial} />
		
		else if (selected == 'comments'){
			content = (
				<Comments 
					comments={this.props.comments.all || []}
					onChangeComment={this.changeComment.bind(this)}
					onSubmit={this.submitComment.bind(this)} />
			)			
		}

		let cta = (selected == 'overview') ? this.renderCta() : null


		const MembershipHOC = BaseContainer(Membership)
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
									{cta}
								</div>
								<Recent />
							</div>
						</div>
					</section>

					<section id="content" style={{background:'#f9f9f9'}}>
						<div className="content-wrap">
							<MembershipHOC />
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
		comments: state.comment,
		tutorials: state.tutorial
	}
}

export default connect(stateToProps)(BaseContainer(Tutorial))