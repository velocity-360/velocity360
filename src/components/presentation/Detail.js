import React, { Component } from 'react'

export default (props) => {

	// const post = props
	return (
		<div className="col_two_third postcontent nobottommargin clearfix">
			<div className="single-post nobottommargin">
				<div className="entry clearfix" style={{border:'none',paddingBottom:0,marginBottom:0}}>
					<div className="entry-title">
						<h1>{props.title}</h1>
					</div>
					<hr />
					<div className="ssk-group ssk-round" style={{float:'right'}}>
					    <a href="#" className="ssk ssk-facebook"></a>
					    <a href="#" className="ssk ssk-twitter"></a>
					    <a href="#" className="ssk ssk-email"></a>
					</div>
					<ul className="entry-meta clearfix">
						<li>{props.dateString}</li>
						<li><a href="#">Admin</a></li>
					</ul>

					<img style={{marginBottom:24,width:60+'%',maxWidth:450,minWidth:300}} src={props.image} alt={'The Daily Slate | '+props.title} />

					<div dangerouslySetInnerHTML={{ __html:props.text }} className="entry-content description"></div>

					<div className="ssk-group ssk-round clearfix bottommargin">
					    <a href="#" className="ssk ssk-facebook"></a>
					    <a href="#" className="ssk ssk-twitter"></a>
					    <a href="#" className="ssk ssk-email"></a>
					</div>
				</div>
				
			</div>
		</div>

	)


}