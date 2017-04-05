import React, { Component } from 'react'
import { connect } from 'react-redux'
import { PostPreview, Slack } from '../presentation'
import BaseContainer from './BaseContainer'

class Recent extends Component {
	componentDidMount(){
		if (this.props.posts.all != null)
			return

		this.props
		.fetchData('post', {limit:3})
		.then(response => {
			return this.props.fetchData('tutorial', {limit:3})
		})
		.then(response => {

		})
		.catch(err => {

		})
	}

	render(){
		const recentPosts = this.props.posts.all || []
		const tutorials = this.props.tutorials.all || []
		
		return (
			<div className="sidebar nobottommargin col_last clearfix" style={{background:'#fff'}}>
				<div className="sidebar-widgets-wrap">
					<div className="widget clearfix">

						<h4 style={{marginBottom:10}}>Recent Posts</h4>
						{ recentPosts.map((post, i) => {
								return (
									<div key={post.id} className="spost clearfix">
										<div className="entry-image">
											<a href={'/post/'+post.slug} className="nobg">
												<img src={post.image+'=s64-c'} alt={post.title+' | Velocity 360'} />
											</a>
										</div>
										<div className="entry-c">
											<div className="entry-title">
												<h4><a href={'/post/'+post.slug}>{post.title}</a></h4>
											</div>
											<ul className="entry-meta">
												<li>{post.dateString}</li>
											</ul>
										</div>
									</div>
								)
							})
						}

						<h4 style={{marginBottom:10, marginTop:64}}>Featured Tutorials</h4>
						{ tutorials.map((tutorial, i) => {
								return (
									<div key={tutorial.id} className="spost clearfix">
										<div className="entry-image">
											<a href={'/tutorial/'+tutorial.slug} className="nobg">
												<img src={'https://media-service.appspot.com/site/images/'+tutorial.image+'?crop=120'} alt={tutorial.title+' | Velocity 360'} />
											</a>
										</div>
										<div className="entry-c">
											<div className="entry-title">
												<h4><a href={'/tutorial/'+tutorial.slug}>{tutorial.title}</a></h4>
											</div>
											<ul className="entry-meta">
												<li>{tutorial.category}</li>
											</ul>
										</div>
									</div>
								)
							})
						}

						<div style={{marginTop:64}}>
							<Slack 
								subscribe={this.props.subscribe.bind(this)} 
								updateCredentials={this.props.updateCredentials.bind(this)} />
						</div>

					</div>

				</div>
			</div>

		)
	}
}

const localStyle = {
	input: {
		background: '#f9f9f9',
		border: 'none',
		borderBottom:'1px solid #ddd',
		marginBottom: 12,
		width: 100+'%',
		height: 28
	},
	slack: {
		background: '#f9f9f9',
		borderRadius: 2,
		padding: 16
	}
}

const stateToProps = (state) => {
	return {
		posts: state.post,
		tutorials: state.tutorial
	}
}

export default connect(stateToProps)(BaseContainer(Recent))
