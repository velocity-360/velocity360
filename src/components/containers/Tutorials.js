import React, { Component } from 'react'
import { connect } from 'react-redux'
import { TutorialPreview } from '../presentation'
import BaseContainer from './BaseContainer'

class Tutorials extends Component {
	componentDidMount(){
		if (this.props.tutorials.all != null)
			return

		this.props.fetchData('tutorial', {limit: 6})
	}

	render(){
		const list = this.props.tutorials.all || []
		return (
			<div className="container clearfix">
				<div className="heading-block center">
					<h1 style={{fontFamily:'Pathway Gothic One', fontWeight:200}}>Tutorials</h1>
				</div>

				{ list.map((tutorial, i) => {
						const index = i+1
						const className = (index%3 == 0) ? 'col_one_third col_last' : 'col_one_third'
						return (
							<TutorialPreview className={className} key={tutorial.id} {...tutorial} />
						)
					})
				}
			</div>
		)
	}
}

const stateToProps = (state) => {
	return {
		tutorials: state.tutorial
	}
}

export default connect(stateToProps)(BaseContainer(Tutorials))