import React, { Component } from 'react'
import { connect } from 'react-redux'
import { TutorialPreview } from '../presentation'

class Tutorials extends Component {

	componentDidMount(){
		// console.log('componentDidMount: '+JSON.stringify(this.props.tutorials.all))
	}

	render(){
		return (
			<div className="container clearfix">
				<div className="heading-block center">
					<h1 style={{fontFamily:'Pathway Gothic One'}}>Tutorials</h1>
				</div>

				{ this.props.tutorials.all.map((tutorial, i) => {
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

export default connect(stateToProps)(Tutorials)