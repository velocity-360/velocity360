import React, { Component } from 'react'

export default (props) => {

	return (
		<div className="container clearfix">

			<div className="col_two_third postcontent nobottommargin clearfix">
				<div className="single-post nobottommargin">
					<div className="entry clearfix" style={{border:'none',paddingBottom:0,marginBottom:0}}>
						<div className="entry-title">
							<h1>Comments</h1>
						</div>
						<hr />

						<textarea onChange={props.onChangeComment.bind(this, 'text')} style={{border:'1px solid #ddd', height:80, width:100+'%', marginBottom:6, resize:'none', padding:6, borderRadius:2}}></textarea>
						<div style={{width:100+'%', textAlign:'right', marginBottom:16}}>
							<button onClick={props.onSubmit.bind(this)} className="button button-mini button-circle button-red">Submit</button>
						</div>
						
						<div style={{border:'none', padding:16, background:'#f9f9f9', marginBottom:16}}>
							<strong>username</strong><span style={{marginLeft:16, fontWeight:200}}>timestamp</span>
							<p style={{marginBottom:0, marginTop:12}}>
								That seems like a pretty shit deal, ykno? Like what if youre the best viking there ever was and youre doing a great job at keeping the peace with your iron fist and there are just no glorious battles to be had?
							</p>
						</div>

						<div style={{border:'none', padding:16, background:'#f9f9f9', marginBottom:16}}>
							<strong>username</strong><span style={{marginLeft:16, fontWeight:200}}>timestamp</span>
							<p style={{marginBottom:0, marginTop:12}}>
								That seems like a pretty shit deal, ykno? Like what if youre the best viking there ever was and youre doing a great job at keeping the peace with your iron fist and there are just no glorious battles to be had?
							</p>
						</div>

						<div style={{border:'none', padding:16, background:'#f9f9f9', marginBottom:16}}>
							<strong>username</strong><span style={{marginLeft:16, fontWeight:200}}>timestamp</span>
							<p style={{marginBottom:0, marginTop:12}}>
								That seems like a pretty shit deal, ykno? Like what if youre the best viking there ever was and youre doing a great job at keeping the peace with your iron fist and there are just no glorious battles to be had?
							</p>
						</div>

					</div>
					
				</div>
			</div>
		</div>		
	)
}
