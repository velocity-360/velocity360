import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Nav, Sidebar, Membership, Footer } from '../components/presentation'
import { BaseContainer, Tutorials, Posts } from '../components/containers'
import { TextUtils } from '../utils'

class Home extends Component {
	componentWillMount(){
		// console.log('HOME: componentWillMount = '+JSON.stringify(this.props))
	}

	componentDidUpdate(){
		const selected = this.props.session.home.selected
		if (selected != 'community')
			return

		if (this.props.comments.all != null)
			return

		// console.log('FETCH COMMENTS: ')
		this.props.fetchData('comment', {limit:10})
		.then(response => {
			return this.props.fetchData('profile', {featured:'yes', limit:10}) // fetch featured members
		})
		.then(response => {
			console.log('RESPONSE: '+JSON.stringify(response))
		})
		.catch(err => {
			console.log('ERROR: '+err.message)
		})
	}

	render(){
		const SidebarContainer = BaseContainer(Sidebar)
		const selected = this.props.session.home.selected
		const menuItems = [
			{name:'tutorials', page:'home', selected:(selected=='tutorials')},
			{name:'blog', page:'home', selected:(selected=='blog')},
			{name:'community', page:'home', selected:(selected=='community')}
		]

		let content = null
		if (selected == 'tutorials')
			content = <Tutorials />

		if (selected == 'blog')
			content = <Posts />

		const comments = this.props.comments.all || []
		const members = this.props.profiles.all || []

		if (selected == 'community'){
			content = (
				<div className="container clearfix">
					<div className="heading-block center">
						<h1 style={{fontFamily:'Pathway Gothic One', fontWeight:200}}>Community</h1>
					</div>

					<div className="row">
						<div className="col-md-6 col-sm-6 bottommargin">
							<div className="fancy-title title-border">
								<h4>Recent Comments</h4>
							</div>

							<div id="home-recent-news">
								{ comments.map((comment, i) => {
										return (
											<div key={comment.id} className="spost clearfix">
												<div className="entry-image">
													<a href={'/profile/'+comment.source.slug}>
														<img src={comment.source.image+'=s64-c'} alt="Velocity 360" />
													</a>
												</div>
												<div className="entry-c">
													<div className="entry-title">
														<h4>
															<a href={'/'+comment.source.context.type+'/'+comment.source.context.slug+'?selected=comments'}>
																{TextUtils.truncateText(comment.text, 90)}
															</a>
														</h4>
													</div>
													<ul className="entry-meta">
														<li>{comment.dateString}</li>
													</ul>
												</div>
											</div>
										)
									})
								}
							</div>
						</div>

						<div className="col-md-6 col-sm-6 bottommargin">
							<div className="fancy-title title-border">
								<h4>Featured Members</h4>
							</div>

							<div id="home-recent-news">

								{ members.map((member, i) => {
										const href = '/profile/'+member.slug
										return (
											<div key={member.id} className="spost clearfix">
												<div className="entry-image">
													<a href={href}><img src={(member.image.length < 10) ? '/images/usericon.png' : member.image+'=s72-c'} alt={'Velocity 360 | '+member.username} /></a>
												</div>
												<div className="entry-c">
													<div className="entry-title">
														<h4><a href={href}>{(member.username.length > 0) ? member.username : member.firstName+' '+member.lastName}</a></h4>
													</div>
													<ul className="entry-meta">
														<li>{member.tags.join(', ')}</li>
													</ul>
												</div>
											</div>
										)
									})
								}
							
							</div>
						</div>
					</div>
				</div>
			)
		}

		const MembershipHOC = BaseContainer(Membership)

		return (
			<div>
				<Nav user={this.props.user} />
				<div id="wrapper" className="clearfix">
					<SidebarContainer withSlack={true} items={menuItems} />

					<section id="content">
						<div className="content-wrap">
							{content}
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
		profiles: state.profile,
		comments: state.comment,
		session: state.session
	}
}

export default connect(stateToProps)(BaseContainer(Home))