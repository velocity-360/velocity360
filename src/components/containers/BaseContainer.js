import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from '../../actions'
import { Stripe, TextUtils, Alert, APIManager } from '../../utils'


const BaseContainer = (Container) => {

	class Base extends Component {
		constructor(){
			super()
			this.state = {
				credentials: {
					name: '',
					email: '',
					username: '',
					password: ''
				}
			}
		}

		updateCredentials(field, event){
			// console.log('updateCredentials: '+field+' == '+event.target.value)
			let updated = Object.assign({}, this.state.credentials)
			updated[field] = event.target.value
			this.setState({
				credentials: updated
			})
		}

		subscribe(event){
			if (event)
				event.preventDefault()

			if (this.state.credentials.name.length == 0){
				alert('Please enter your name.')
				return
			}

			if (this.state.credentials.email.length == 0){
				alert('Please enter your email.')
				return
			}

			APIManager
			.handlePost('/auth/subscribe', this.state.credentials)
			.then(response => {
				alert('Thanks for Subscribing! We will send you an email shortly with an invitation to our Slack Chanel!')
			})
			.catch(err => {

			})
		}

		followTutorial(tutorial, event){
			if (event)
				event.preventDefault()

			const user = this.props.account.currentUser
			if (user == null){ // register first THEN follow tutorial:
				APIManager
				.handlePost('/auth/register', this.state.credentials)
				.then(response => {
					const profile = response.profile
			        let subscribers = Object.assign([], tutorial.subscribers)
			        subscribers.push(profile._id)
			        return this.props.updateTutorial(tutorial, {subscribers: subscribers})
				})
				.then(response => {
		            window.location.href = '/account'
				})
				.catch(err => {
					alert('ERROR: '+err.message)
				})

				return
			}

	        let subscribers = Object.assign([], tutorial.subscribers)
	        if (subscribers.indexOf(user.id) != -1){ // already subscribed
	            window.location.href = '/account?selected=tutorials'
	            return
	        }

	        subscribers.push(user.id)
	        this.props.updateTutorial(tutorial, {subscribers: subscribers})
	        .then(response => {
	            window.location.href = '/account?selected=tutorials'
	        })
	        .catch(err => {

	        })
		}

		submitComment(comment, subject){
			const user = this.props.account.currentUser
			if (user == null){
				alert('Please login or register to submit comments.')
				return
			}

			if (comment.text.length == 0){
				alert('Please enter a comment')
				return
			}
			
			let updated = Object.assign({}, comment)
			updated['subject'] = subject.id
			updated['source'] = {
				id: user.id,
				username: (user.username.length > 0) ? user.username : user.firstName,
				slug: user.slug,
				image: user.image,
				context: {
					type: subject.schema,
					id: subject.id,
					slug: subject.slug,
					image: subject.image || '',
					name: subject.title || subject.name
				}
			}

			this.postData('comment', updated)
		}

		register(event){
			if (event)
				event.preventDefault()

			if (this.state.credentials.username.length == 0){
				alert('Please enter a username')
				return
			}

			if (this.state.credentials.email.length == 0){
				alert('Please enter your email')
				return
			}

			APIManager
			.handlePost('/auth/register', this.state.credentials)
			.then(response => {
				// console.log('register: '+JSON.stringify(response))
				window.location.href = '/account'
			})
			.catch(err => {
				alert('ERROR: '+err)
			})
		}

	    showStripeModal(product, event){
	    	console.log('Show Strip Modal: '+JSON.stringify(product))
	        event.preventDefault()

	        if (product.schema == 'subscription'){
	            Stripe.initializeWithText('Subscribe', (token) => {
	                this.props.submitStripeCard(token)
	                .then(response => {
	                	window.location.href = '/account'
	                })
	                .catch(err => {
	                	alert(err.message)
	                })
	            }, () => {
	                setTimeout(() => {
	                }, 100)
	            })

	            Stripe.showModalWithText('Premium Subscription - $19.99/mo')
	            return
	        }

            Stripe.initializeWithText('Purchase', (token) => {
                this.props.submitStripeCharge(token, product)
                .then(response => {
                	if (product.schema == 'course'){
                		// show pop up confirmation here
						Alert.showConfirmation({
							title: 'Success!',
							text: 'Thanks for enrolling in the '+product.title+'.'
						})

                		return
                	}

	                window.location.href = '/account'
                })
                .catch(err => {
	                alert(err.message)
                })
            }, () => {
                setTimeout(() => {
                }, 100)
            })

            const price = product.price || product.tuition || product.deposit // courses have tution or deposit
            Stripe.showModalWithText(product.title+' - $'+TextUtils.numberWithCommas(price))
	    }

		selectMenuItem(item, event){
			if (event != null){
				event.preventDefault()
				window.scrollTo(0, 0)
			}

			// console.log('selectMenuItem: '+JSON.stringify(item))
			this.props.selectMenuItem(item)
		}

		fetchData(resource, params, event){
			if (event)
				event.preventDefault()

			if (resource == 'profile'){
				return this.props.fetchProfiles(params)
			}

			if (resource == 'post'){
				return this.props.fetchPosts(params)
			}

			if (resource == 'tutorial'){
				return this.props.fetchTutorials(params)
			}

			if (resource == 'comment'){
				return this.props.fetchComments(params)
			}

			if (resource == 'project'){
				return this.props.fetchProjects(params)
			}
		}

		postData(resource, params, event){
			if (event)
				event.preventDefault()

			if (resource == 'comment'){
				return this.props.submitComment(params)
			}

			if (resource == 'project'){
				return this.props.createProject(params)
			}
		}

		updateData(resource, entity, params){ // 'entity' is the original object being updated, params is updates
			if (this.props.account.currentUser == null){ // every update requires login
				alert('Please register or log in.')
				return
			}

			// console.log('updateData: '+resource+' == '+JSON.stringify(params))
			if (resource == 'profile')
				return this.props.updateProfile(entity, params)

			if (resource == 'project')
				return this.props.updateProject(entity, params)
		}

		deleteData(resource, entity){
			if (event)
				event.preventDefault()

			if (resource == 'project'){
				return this.props.removeProject(entity)
			}
		}

		render(){
			return (
				<div>
					<Container
						user={this.props.account.currentUser}
						fetchData={this.fetchData.bind(this)}
						postData={this.postData.bind(this)}
						updateData={this.updateData.bind(this)}
						deleteData={this.deleteData.bind(this)}
						onSubmitComment={this.submitComment.bind(this)}
						updateCredentials={this.updateCredentials.bind(this)}
						register={this.register.bind(this)}
						subscribe={this.subscribe.bind(this)}
						followTutorial={this.followTutorial.bind(this)}
						showStripeModal={this.showStripeModal.bind(this)} 
						selectItem={this.selectMenuItem.bind(this)}
						{...this.props} />
				</div>
			)
		}
	}

	const stateToProps = (state) => {
		return {
			session: state.session,
			account: state.account,
	        tutorials: state.tutorial
		}
	}

	const dispatchToProps = (dispatch) => {
		return {
			fetchProfiles: (params) => dispatch(actions.fetchProfiles(params)),
			fetchTutorials: (params) => dispatch(actions.fetchTutorials(params)),
			fetchPosts: (params) => dispatch(actions.fetchPosts(params)),
			fetchComments: (params) => dispatch(actions.fetchComments(params)),
			submitComment: (params) => dispatch(actions.submitComment(params)),
			fetchProjects: (params) => dispatch(actions.fetchProjects(params)),
			createProject: (params) => dispatch(actions.createProject(params)),
			updateProject: (project, params) => dispatch(actions.updateProject(project, params)),
			removeProject: (project) => dispatch(actions.removeProject(project)),
			selectMenuItem: (item) => dispatch(actions.selectMenuItem(item)),
	        submitStripeCard: (token) => dispatch(actions.submitStripeCard(token)),
	        submitStripeCharge: (token, product) => dispatch(actions.submitStripeCharge(token, product)),
			updateProfile: (profile, params) => dispatch(actions.updateProfile(profile, params)),
	        updateTutorial: (tutorial, params) => dispatch(actions.updateTutorial(tutorial, params))
		}
	}


	return connect(stateToProps, dispatchToProps)(Base)
}

export default BaseContainer