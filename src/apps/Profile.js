import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Nav, Sidebar, Footer } from '../components/presentation'
import { BaseContainer, Tutorials } from '../components/containers'
import { TextUtils } from '../utils'

class Profile extends Component {
	constructor(){
		super()
		this.state = {

		}
	}

	componentDidMount(){
		const profile = this.props.profiles[this.props.session.profile.slug]
		if (profile == null)
			return

		this.props.fetchData('comment', {'source.id':profile.id})
		.then(response => {
			console.log('RESPONSE: '+JSON.stringify(response))
		})
		.catch(err => {
			console.log('ERROR: '+err.message)
		})
	}

	render(){
		const SidebarContainer = BaseContainer(Sidebar)
		const selected = this.props.session.profile.selected
		const menuItems = [
			{name:'profile', page:'profile', selected:(selected=='profile')}
			// {name:'site', page:'profile', selected:(selected=='site')}
		]

		const profile = this.props.profiles[this.props.session.profile.slug]
		let content = null

		if (selected == 'profile'){
			const commentsList = this.props.comments.all || []
			const comments = commentsList.map((comment, i) => {
				const context = comment.source.context
				const href = '/'+context.type+'/'+context.slug+'?selected=comments'
				return (
					<div key={comment.id} className="spost clearfix">
						<div className="entry-image">
							<a href={href}>
								<img src={comment.source.image+'=s72-c'} alt="Velocity 360" />
							</a>
						</div>
						<div className="entry-c">
							<div className="entry-title">
								<h4>
									<a href={href}>{ TextUtils.truncateText(comment.text, 120) }</a>
								</h4>
							</div>
							<ul className="entry-meta">
								<li>{comment.dateString}</li>
							</ul>
						</div>
					</div>
				)
			})

			content = (
				<section id="content">
					<div className="content-wrap">
						<div className="container clearfix">
							<div className="row">
								<div className="col-md-4 col-sm-6 bottommargin">
									<div className="feature-box fbox-center fbox-bg fbox-effect" style={{minHeight:320}}>
										<div className="fbox-icon">
											<img style={{background:'#ededed'}} src={profile.image+'=s72-c'} alt={profile.username+' | Velocity 360'} />
										</div>
										<h3>{profile.firstName} {profile.lastName}</h3>
										{profile.username}
										<hr />
										<p style={{textAlign:'left', marginBottom:24}} className="subtitle">
											{profile.bio}
										</p>

										<p style={{textAlign:'left'}} className="subtitle">
											{ profile.tags.map((tag, i) => {
													return (
														<a style={localStyle.tag} href="#" key={tag}>{tag}</a>
													)
												})
											}
										</p>

									</div>
								</div>

								<div className="col-md-8 col-sm-6 bottommargin" style={{paddingTop:48}}>
									<div className="fancy-title title-border">
										<h4>Comments</h4>
									</div>
									<div id="home-recent-news">{comments}</div>
								</div>
							</div>
						</div>
					</div>
				</section>
			)
		}

		if (selected == 'site'){
			content = (
				<iframe style={{width:100+'%', minHeight:650}} src="https://ryanab.github.io"></iframe>
			)
		}


		return (
			<div>
				<Nav user={this.props.user} />
				<div id="wrapper" className="clearfix">
					<SidebarContainer withSlack={true} items={menuItems} />
					{ content }
					{ (selected == 'site') ? null : (
							<section id="content" style={{background:'#f9f9f9'}}>
								<div className="content-wrap">
									<Tutorials />
								</div>
							</section>
						)
					}

					<Footer />
				</div>
			</div>
		)
	}
}

const localStyle = {
	tag: {
		fontSize: 12,
		padding: 4,
		marginRight: 8,
		marginBottom: 8,
		display: 'inline-block',
		background: '#ededed'
	}
}

const stateToProps = (state) => {
	return {
		profiles: state.profile,
		comments: state.comment,
		account: state.account,
		session: state.session
	}
}

export default connect(stateToProps)(BaseContainer(Profile))
