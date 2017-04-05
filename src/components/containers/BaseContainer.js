import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from '../../actions'
import { Stripe, APIManager } from '../../utils'

const BaseContainer = (Container) => {

	class Base extends Component {
		constructor(){
			super()
			this.state = {
				credentials: {
					name: '',
					email: '',
					password: ''
				}
			}
		}

		updateCredentials(event){
			let updated = Object.assign({}, this.state.credentials)
			updated[event.target.id] = event.target.value
			this.setState({
				credentials: updated
			})
		}

		subscribe(event){
			APIManager.handlePost('/account/subscribe', this.state.credentials)
			.then(response => {
				alert('Thanks for Subscribing! We will send you an email shortly with an invitation to our Slack Chanel!')
			})
			.catch(err => {

			})
		}

		followTutorial(tutorial){
			const user = this.props.account.currentUser
			if (user == null){ // register first THEN follow tutorial:
				APIManager
				.handlePost('/account/register', this.state.credentials)
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
	            window.location.href = '/account'
	            return
	        }

	        subscribers.push(user.id)
	        this.props.updateTutorial(tutorial, {subscribers: subscribers})
	        .then(response => {
	            window.location.href = '/account'
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
				username: user.username,
				image: user.image
			}

			this.postData('comment', updated)
		}

		register(event){
			console.log('register: '+JSON.stringify(this.state.credentials))
			APIManager
			.handlePost('/account/register', this.state.credentials)
			.then(response => {
				window.location.href = '/account'
			})
			.catch(err => {
				alert('ERROR: '+err)

			})
		}


	    showStripeModal(product, event){
	        event.preventDefault()
//	        this.props.toggleLoading(true)

	        if (product.schema == 'subscription'){
	            Stripe.initializeWithText('Subscribe', (token) => {
	                this.props.submitStripeCard(token)
	                .then(response => {
	                	window.location.href = '/account'
	                    // console.log('TEST: '+JSON.stringify(response))
//	                    this.props.toggleLoading(false)
	                })
	                .catch(err => {
	                	alert(err.message)
	                })
	            }, () => {
	                setTimeout(() => {
//	                    this.props.toggleLoading(false)
	                }, 100)
	            })

	            Stripe.showModalWithText('Premium Subscription - $19.99/mo')
	            return
	        }

            Stripe.initializeWithText('Purchase', (token) => {
                this.props.submitStripeCharge(token, product)
                .then(response => {
	                	window.location.href = '/account'
//                    console.log('TEST: '+JSON.stringify(response))
//                    this.props.toggleLoading(false)
                })
                .catch(err => {

                })
            }, () => {
                setTimeout(() => {
//                    this.props.toggleLoading(false)
                }, 100)
            })

            Stripe.showModalWithText(product.title+' - $'+product.price)
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

			if (resource == 'post'){
				return this.props.fetchPosts(params)
			}

			if (resource == 'tutorial'){
				return this.props.fetchTutorials(params)
			}

			if (resource == 'comment'){
				return this.props.fetchComments(params)
			}
		}

		postData(resource, params, event){
			if (event)
				event.preventDefault()

			if (resource == 'comment'){
				return this.props.submitComment(params)
			}
		}

		updateData(resource, entity, params){ // 'entity' is the original object being updated, params is updates
			if (this.props.account.currentUser == null){ // every update requires login
				alert('Please register or log in.')
				// Alert.showAlert({
				// 	title: 'Oops',
				// 	text: 'Please register or log in.'
				// })
				return
			}

			// console.log('updateData: '+resource+' == '+JSON.stringify(params))
			if (resource == 'profile')
				return this.props.updateProfile(entity, params)
		}		

		render(){
			return (
				<div>
					<Container
						user={this.props.account.currentUser}
						fetchData={this.fetchData.bind(this)}
						postData={this.postData.bind(this)}
						updateData={this.updateData.bind(this)}
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
			fetchTutorials: (params) => dispatch(actions.fetchTutorials(params)),
			fetchPosts: (params) => dispatch(actions.fetchPosts(params)),
			fetchComments: (params) => dispatch(actions.fetchComments(params)),
			submitComment: (params) => dispatch(actions.submitComment(params)),
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