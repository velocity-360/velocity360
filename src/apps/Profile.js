import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Nav, Sidebar, Footer, Detail, Comments } from '../components/presentation'
import { BaseContainer, Tutorials, Recent } from '../components/containers'

class Profile extends Component {
	constructor(){
		super()
		this.state = {

		}
	}

	componentWillMount(){

	}

	componentDidMount(){

	}

	componentDidUpdate(){
		// const selected = this.props.session.post.selected
		// if (selected != 'comments')
		// 	return

		// const post = this.props.posts[this.props.session.post.slug]
		// if (post == null)
		// 	return

		// if (this.props.comments.all != null)
		// 	return

		// this.props.fetchData('comment', {subject:post.id})
	}

	render(){
		const SidebarContainer = BaseContainer(Sidebar)
		const selected = this.props.session.profile.selected
		const menuItems = [
			{name:'profile', page:'profile', selected:(selected=='profile')},
			// {name:'comments', page:'profile', selected:(selected=='comments')}
		]

		const profile = this.props.profiles[this.props.session.profile.slug]
		// let content = null
		// if (selected == 'overview')
		// 	content = <Detail {...post} />
		
		// else if (selected == 'comments'){
		// 	content = (
		// 		<Comments 
		// 			comments={this.props.comments.all || []}
		// 			onChangeComment={this.changeComment.bind(this)}
		// 			onSubmit={this.submitComment.bind(this)} />
		// 	)			
		// }

		return (
			<div>
				<Nav user={this.props.user} />
				<div id="wrapper" className="clearfix">
					<SidebarContainer withSlack={true} items={menuItems} />

					<section id="content">
						<div className="content-wrap">
							<div className="container clearfix">

								<div className="row">
									<div className="col-md-4 col-sm-6 bottommargin">
										<div className="feature-box fbox-center fbox-bg fbox-effect" style={{minHeight:320}}>
											<div className="fbox-icon">
												<img src={profile.image+'=s72-c'} alt={profile.username+' | Velocity 360'} />
											</div>
											<h3>{profile.firstName} {profile.lastName}</h3>
											{profile.username}
											<hr />
											<p style={{textAlign:'left'}} className="subtitle">
												{profile.bio}
											</p>
										</div>
									</div>

									<div className="col-md-8 col-sm-6 bottommargin" style={{paddingTop:48}}>
										<div className="fancy-title title-border">
											<h4>Comments</h4>
										</div>

										<div id="home-recent-news">
											<div className="spost clearfix">
												<div className="entry-image">
													<a href="#"><img src="https://lh3.googleusercontent.com/oKjv_cWz2bmBpiGEC9wOK5_dvz8JhlAr3xo4rKoh2a9frmCu87GGkQ3xnUXiMAaCZkKWKZ4shBYH2JgsQp9eYFS7=s72-c" alt="Velocity 360" /></a>
												</div>
												<div className="entry-c">
													<div className="entry-title">
														<h4><a href="#">Dkwon</a></h4>
													</div>
													<ul className="entry-meta">
														<li>10th July 2014</li>
													</ul>
												</div>
											</div>

											<div className="spost clearfix">
												<div className="entry-image">
													<a href="#"><img src="https://lh3.googleusercontent.com/oKjv_cWz2bmBpiGEC9wOK5_dvz8JhlAr3xo4rKoh2a9frmCu87GGkQ3xnUXiMAaCZkKWKZ4shBYH2JgsQp9eYFS7=s72-c" alt="Velocity 360" /></a>
												</div>
												<div className="entry-c">
													<div className="entry-title">
														<h4><a href="#">Dkwon</a></h4>
													</div>
													<ul className="entry-meta">
														<li>10th July 2014</li>
													</ul>
												</div>
											</div>

											<div className="spost clearfix">
												<div className="entry-image">
													<a href="#"><img src="https://lh3.googleusercontent.com/oKjv_cWz2bmBpiGEC9wOK5_dvz8JhlAr3xo4rKoh2a9frmCu87GGkQ3xnUXiMAaCZkKWKZ4shBYH2JgsQp9eYFS7=s72-c" alt="Velocity 360" /></a>
												</div>
												<div className="entry-c">
													<div className="entry-title">
														<h4><a href="#">Dkwon</a></h4>
													</div>
													<ul className="entry-meta">
														<li>10th July 2014</li>
													</ul>
												</div>
											</div>
										</div>
									</div>



								</div>


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
		profiles: state.profile,
		account: state.account,
		session: state.session
	}
}

export default connect(stateToProps)(BaseContainer(Profile))
