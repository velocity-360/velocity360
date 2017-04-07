import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Modal } from 'react-bootstrap'
import { Nav, Sidebar, Footer, Preview, AccountForm } from '../components/presentation'
import { BaseContainer } from '../components/containers'
import { TextUtils, APIManager } from '../utils'

class Account extends Component {
	constructor(){
		super()
		this.state = {
            showModal: false,
            passwords: {},
			updatedProfile: {

			}
		}
	}

	componentWillMount(){
		if (this.props.user == null)
			return

		this.copyUserToState()
	}

	componentDidMount(){
		if (this.props.tutorials.all != null)
			return

        if (this.props.user.confirmed != 'yes'){
            setTimeout(() => {
                this.setState({
                    showModal: true
                })
            }, 750)
        }


		this.props.fetchData('tutorial', {subscribers:this.props.user.id})
		.then(response => {
			// console.log('TUTORIALS: '+JSON.stringify(response))
		})
		.catch(err => {
			console.log('ERROR: '+JSON.stringify(err))
		})
	}

	copyUserToState(){
		let updated = Object.assign({}, this.props.user)
		updated['tags'] = updated.tags.join(', ')
		this.setState({
			updatedProfile: updated
		})		
	}	

    toggleModal(){
        this.setState({
            showModal: !this.state.showModal
        })
    }

    updatePassword(event){
        let updated = Object.assign({}, this.state.passwords)
        updated[event.target.id] = event.target.value
        this.setState({
            passwords: updated
        })    	
    }

    submitPassword(event){
        event.preventDefault()
        // console.log('submitPassword: '+JSON.stringify(this.state.passwords))

        let passwords = this.state.passwords
        if (passwords.password1 == null){
            alert('Please complete both fields.')
            return
        }

        if (passwords.password2 == null){
            alert('Please complete both fields.')
            return
        }

        if (passwords.password1 !== passwords.password2){
            alert('Passwords do not match.')
            return
        }

        const user = this.props.user
        if (user == null)
            return

        const params = {
            password: passwords.password1,
            confirmed: 'yes'
        }

        this.setState({showModal: false})
        this.props.updateData('profile', user, params)
        .then(result => {
            alert('Your password has been updated. Thanks!')
			this.copyUserToState()
            return result
        })
        .catch(err => {
            alert(err)
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
				if (tag.length > 0)
					tagsArray.push(tag.trim().toLowerCase())
			})

			updated['tags'] = tagsArray
		}

		this.props.updateData('profile', this.props.user, updated)
		.then(response => {
			console.log('PROFILE UPDATED: '+JSON.stringify(response))
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
					<p>You are subscribed to the following tutorials:</p>
					{ list.map((tutorial, i) => {
							return <Preview key={tutorial.id} {...tutorial} />
						})
					}
				</div>
			)
		}

		if (selected == 'profile'){
			content = (
				<div>
					<p>Manage your profile details:</p>
					<AccountForm 
						onChange={this.onChangeProfile.bind(this)}
						onSubmit={this.updateProfile.bind(this)}
						onUpload={this.uploadImage.bind(this)}
						initial={this.state.updatedProfile} />
				</div>
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


                <Modal bsSize="sm" show={this.state.showModal} onHide={this.toggleModal.bind(this)}>
                    <Modal.Body style={localStyle.modal}>
                        <div style={{textAlign:'center'}}>
                            <img style={localStyle.logo} src='/images/logo-dark.png' />
                            <hr />
                            <h4>Set Password</h4>
                        </div>

                        <input id="password1" onChange={this.updatePassword.bind(this)} className={localStyle.textField.className} style={localStyle.textField} type="password" placeholder="Password" />
                        <input id="password2" onChange={this.updatePassword.bind(this)} className={localStyle.textField.className} style={localStyle.textField} type="password" placeholder="Repeat Password" />
                        <div style={localStyle.btnLoginContainer}>
                            <a href="#" onClick={this.submitPassword.bind(this)} className={localStyle.btnLogin.className}><i className="icon-lock3"></i>Update Password</a>
                        </div>
                    </Modal.Body>
                </Modal>				
			</div>
		)
	}
}

const localStyle = {
	title: {
		color:'#fff',
		fontFamily: 'Pathway Gothic One',
		fontWeight: 200,
		fontSize: 30
	},
	modal: {
		background:'#f9f9f9',
		padding:24,
		borderRadius:3,
		minHeight: 370
	},
	textField: {
		marginBottom:12,
		className: 'form-control'
	},
	btnLoginContainer: {
		textAlign:'center',
		marginTop:24
	},
	btnLogin: {
		className: 'button button-circle button-blue'
	}
}

const stateToProps = (state) => {
	return {
		tutorials: state.tutorial,
		session: state.session
	}
}

export default connect(stateToProps)(BaseContainer(Account))
