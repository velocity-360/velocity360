import React, { Component } from 'react'
import { TextUtils } from '../../utils'

export default (props) => {
	const depositOnly = Object.assign({}, props)
	delete depositOnly['tuition']

	const tuitionOnly = Object.assign({}, props)
	delete tuitionOnly['deposit']
	tuitionOnly['tuition'] = (props.tuition-200)

	return (
		<div className="container clearfix">
			<div className="heading-block center">
				<h1 style={{fontFamily:'Pathway Gothic One', fontWeight:200}}>Enroll</h1>
			</div>

			<div className="row clear-bottommargin">
				<div className="col-md-6 col-sm-6 bottommargin">
					<div className="promo promo-border promo-mini" style={{background:'#fff'}}>
						<h3>Deposit</h3>
						${ TextUtils.numberWithCommas(props.deposit) }
						<hr />
						<p>Join as a premium member for $19.99 each month and receive unlimited access to all tutorials, code samples, and forums on the site.</p>
						<a onClick={props.showStripeModal.bind(this, depositOnly)} href="#" className="button button-circle button-dark">Enroll</a>
					</div>
				</div>

				<div className="col-md-6 col-sm-6 bottommargin">
					<div className="promo promo-border promo-mini" style={{background:'#fff'}}>
						<h3>Full Tuition</h3>
						${ TextUtils.numberWithCommas(props.tuition) }
						<hr />
						<p>Join as a premium member for $19.99 each month and receive unlimited access to all tutorials, code samples, and forums on the site.</p>
						<a onClick={props.showStripeModal.bind(this, tuitionOnly)} href="#" className="button button-circle button-dark">Enroll</a>
					</div>
				</div>
			</div>
		</div>
	)
}