import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Nav, Sidebar, Footer, Preview, AccountForm } from '../components/presentation'
import { BaseContainer } from '../components/containers'
import { TextUtils, APIManager } from '../utils'

class Account extends Component {
	constructor(){
		super()
		this.state = {
			updatedProfile: {

			}
		}
	}

	componentWillMount(){
		if (this.props.user == null)
			return

		let updated = Object.assign({}, this.props.user)
		updated['tags'] = updated.tags.join(', ')
		this.setState({
			updatedProfile: updated
		})
	}

	componentDidMount(){
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

	onChangeProfile(field, event){
		let updated = Object.assign({}, this.state.updatedProfile)
		updated[field] = event.target.value
		this.setState({
			updatedProfile: updated
		})
	}

	updateProfile(event){
		event.preventDefault()
		let updated = Object.assign({}, this.state.updatedProfile)
		if (this.state.updatedProfile.tags != null){
			let tagsArray = []
			const array = this.state.updatedProfile.tags.split(',')
			array.forEach((tag, i) => {
				tagsArray.push(tag.trim().toLowerCase())
			})

			updated['tags'] = tagsArray
		}

		this.props.updateData('profile', this.props.user, updated)
		.then(response => {
			alert('Profile Updated')
		})
		.catch(err => {
			alert('Error: '+err.message)
		})
	}

	uploadImage(files){
		APIManager.upload(files[0], (err, response) => {
			if (err){
				alert(err.message)
				return
			}

			// console.log('success: '+JSON.stringify(response)) // {"id":"vb3T4mmU","address":"https://lh3.googleusercontent.com/IXl0ZnEbCX27QoZsrLMmNvLUc-u1AYvUTR1eeNcN3RYUj15hq9HkMomhxWqn8tPYCKkfj1dQVhGk2Hm9kLbQzltX09A","name":"2.png","key":"AMIfv94CEBPCb5Koh0R8hAguUkGxBWNA_UWxtptQW4aAFynwHXwsMBNACk1uD_3DQTGV5KqFAFbhwpGzBGcFKW9ARd373xTNROhwC3gca3D6wkyAvn1dFYO6K-e7NY8xLErdXbErTJOAh35IsfsZezjJLBOvLrZZVeQbSJYXimrheNWvb3T4mmU"}
			let updated = Object.assign({}, this.state.updatedProfile)
			updated['image'] = response.address
			this.setState({
				updatedProfile: updated
			})			
		})
	}

	render(){
//		console.log('SLUG: '+this.props.session.post.slug)
		const SidebarContainer = BaseContainer(Sidebar)
		const selected = this.props.session.account.selected
		const menuItems = [
			{name:'profile', page:'account', selected:(selected=='profile')},
			{name:'tutorials', page:'account', selected:(selected=='tutorials')}
		]

		// console.log('RENDER: '+JSON.stringify(this.props.tutorials.all))
		const list = this.props.tutorials.all || []

		let content = null
		if (selected == 'tutorials'){
			content = (
				<div>
					{ list.map((tutorial, i) => {
							return <Preview key={tutorial.id} {...tutorial} />
						})
					}
				</div>
			)
		}

		if (selected == 'profile'){
			content = (
				<AccountForm 
					onChange={this.onChangeProfile.bind(this)}
					onSubmit={this.updateProfile.bind(this)}
					onUpload={this.uploadImage.bind(this)}
					initial={this.state.updatedProfile} />
			)
		}
		
		return (
			<div>
				<Nav user={this.props.user} />
				<div id="wrapper" className="clearfix">
					<SidebarContainer withSlack={false} items={menuItems} />

					<section id="content" style={{background:'#f9f9f9'}}>
						<div className="content-wrap">
							<div className="container clearfix">
								<div className="col_two_third postcontent nobottommargin clearfix">

									<div id="posts" className="events small-thumbs">
										<div className="entry-title">
											<h1>{ TextUtils.capitalize(selected) }</h1>
										</div>
										<hr />

										{ content }
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
		tutorials: state.tutorial,
		session: state.session
	}
}

export default connect(stateToProps)(BaseContainer(Account))
