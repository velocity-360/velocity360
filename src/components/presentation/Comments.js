import React, { Component } from 'react'
import { TextUtils } from '../../utils'

export default (props) => {

	let image = null
	if (props.image.length > 0)
		image = (props.image.indexOf('http') == -1) ? 'https://media-service.appspot.com/site/images/'+props.image+'?crop=96' : props.image+'=s96-c'

	return (

		<div className="single-post nobottommargin">
			<div className="entry clearfix" style={{border:'none',paddingBottom:0,marginBottom:0}}>
				<div className="entry-title">
					<h1>{props.title || props.name}</h1>
				</div>
				<hr />
				<textarea onChange={props.onChangeComment.bind(this, 'text')} style={{border:'1px solid #ddd', height:80, width:100+'%', marginBottom:6, resize:'none', padding:6, borderRadius:2}}></textarea>
				<div style={{width:100+'%', textAlign:'right', marginBottom:16}}>
					<button onClick={props.onSubmit.bind(this)} className="button button-mini button-circle button-red">Submit</button>
				</div>
				
				{ props.comments.map((comment, i) => {
						return (
							<div key={comment.id} style={{border:'none', padding:16, background:'#f9f9f9', marginBottom:16}}>
								<a href={'/profile/'+comment.source.slug}><strong>{comment.source.username}</strong></a>
								<span style={{fontWeight:200, fontSize:12, float:'right'}}>{comment.dateString}</span>
								<p dangerouslySetInnerHTML={{ __html:TextUtils.convertToHtml(comment.text) }} style={{marginBottom:0, marginTop:4}}></p>
							</div>
						)
					})
				}
			</div>
		</div>
		
	)
}
