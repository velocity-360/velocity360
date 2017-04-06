import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Nav, Sidebar, Membership, Footer } from '../components/presentation'
import { BaseContainer, Tutorials, Posts } from '../components/containers'

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
		this.props.fetchData('comment', {limit:3})
		.then(response => {
			console.log('RESPONSE: '+JSON.stringify(response))
			// fetch featured members
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

		if (selected == 'community'){
			content = (
				<div className="container clearfix">
					<div className="heading-block center">
						<h1 style={{fontFamily:'Pathway Gothic One'}}>Community</h1>
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
													<a href="#">
														<img src={comment.source.image+'=s64-c'} alt="Velocity 360" />
													</a>
												</div>
												<div className="entry-c">
													<div className="entry-title">
														<h4><a href={'/'+comment.source.context.type+'/'+comment.source.context.slug+'?selected=comments'}>{comment.text}</a></h4>
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
							
								<div className="spost clearfix">
									<div className="entry-image">
										<a href="#"><img src="images/magazine/small/5.jpg" alt="" /></a>
									</div>
									<div className="entry-c">
										<div className="entry-title">
											<h4><a href="#">Planes: Fire And Rescue</a></h4>
										</div>
										<ul className="entry-meta">
											<li><i className="icon-calendar3"></i> 10th July 2014</li>
											<li><a href="#"><i className="icon-comments"></i> 43</a></li>
										</ul>
									</div>
								</div>

								<div className="spost clearfix">
									<div className="entry-image">
										<a href="#"><img src="images/magazine/small/6.jpg" alt="" /></a>
									</div>
									<div className="entry-c">
										<div className="entry-title">
											<h4><a href="#">Planes: Fire And Rescue</a></h4>
										</div>
										<ul className="entry-meta">
											<li><i className="icon-calendar3"></i> 10th July 2014</li>
											<li><a href="#"><i className="icon-comments"></i> 43</a></li>
										</ul>
									</div>
								</div>

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
		comments: state.comment,
		session: state.session
	}
}

export default connect(stateToProps)(BaseContainer(Home))