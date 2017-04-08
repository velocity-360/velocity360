import React, { Component } from 'react'

export default (props) => {

	return (
		<div className="container clearfix">
			<div className="heading-block center">
				<h1 style={{fontFamily:'Pathway Gothic One', fontWeight:200}}>Membership</h1>
			</div>

			<div className="row clear-bottommargin">
				<div className="col-md-6 col-sm-6 bottommargin">
					<div className="promo promo-border promo-mini" style={{background:'#fff'}}>
						<h3>Premium</h3>
						$19.99/month
						<hr />
						<p>Join as a premium member for $19.99 each month and receive unlimited access to all tutorials, code samples, and forums on the site.</p>
						<ul style={{paddingLeft:16,marginBottom:0}}>
                            <li>Downloadable Code Samples</li>
                            <li>Downloadable Videos</li>
                            <li>Q &amp; A Forum Access</li>
                            <li>Discounts on Live Courses</li>
                        </ul>
						<a onClick={props.showStripeModal.bind(this, {schema:'subscription'})} href="#" className="button button-circle button-dark">Join</a>
					</div>
				</div>

				<div className="col-md-6 col-sm-6 bottommargin">
					<div className="promo promo-border promo-mini" style={{background:'#fff'}}>
						<h3>Basic</h3>
						Free
						<hr />
						<p>Join as a basic member to gain access to the free tutorials, get notifications when new tutorials and courses are published, and participate in the Q&amp;A forums.</p>
						<input onChange={props.updateCredentials.bind(this, 'username')} type="text" style={{border:'none',borderBottom:'1px solid #eee',width:100+'%',marginBottom:16}} placeholder="Username" /><br />
						<input onChange={props.updateCredentials.bind(this, 'email')} type="text" style={{border:'none',borderBottom:'1px solid #eee',width:100+'%',marginBottom:16}} placeholder="Email" /><br />
						<a onClick={props.register.bind(this)} href="#" className="button button-circle button-dark">Join</a>
					</div>
				</div>
			</div>
		</div>
	)
}