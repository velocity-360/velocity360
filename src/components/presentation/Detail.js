import React, { Component } from 'react'
import { TextUtils } from '../../utils'

export default (props) => {

	// const post = props
	const description = props.text || props.description
	const image = (props.image.indexOf('http') > -1) ? props.image : 'https://media-service.appspot.com/site/images/'+props.image
	const units = props.posts || []

	let detail = null
	if (props.schema == 'post'){
		detail = (
			<ul className="entry-meta clearfix">
				<li>{props.dateString}</li>
				<li><a href="#">{props.author || 'Admin'}</a></li>
			</ul>
		)
	}
	if (props.schema == 'tutorial'){
		detail = (
			<ul className="entry-meta clearfix">
				<li>{TextUtils.capitalize(props.category)}</li>
				<li>{props.posts.length} Units</li>
				<li><a href="#">{ (props.price==0) ? 'Free' : '$'+props.price}</a></li>
			</ul>
		)
	}

	return (
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
				{detail}

				<img style={{marginBottom:24,width:60+'%',maxWidth:360,minWidth:300}} src={image} alt={'The Daily Slate | '+props.title} />
				<div dangerouslySetInnerHTML={{ __html:description }} className="entry-content description"></div>

				<div className="description tutorial">
					{ (units.length > 0) ? <div><h3>Units</h3><hr /></div> : null }
					{ units.map((unit, i) => {
							const youtube = unit.youtube || ''
							return (
								<div style={{marginBottom:24}} key={i}>
									<h4>{(i+1)+'. '+unit.title}</h4>
									{unit.description}
									{(youtube.length > 0) ? <div style={{height:200, marginTop:12}}><object style={localStyle.youtube} data={'https://www.youtube.com/embed/'+unit.youtube}></object></div> : null}
								</div>
							)
						})

					}
				</div>

				{ (props.schema == 'tutorial') ? null : (
						<div className="ssk-group ssk-round clearfix bottommargin">
						    <a href="#" className="ssk ssk-facebook"></a>
						    <a href="#" className="ssk ssk-twitter"></a>
						    <a href="#" className="ssk ssk-email"></a>
						</div>
					)
				}
			</div>
		</div>
	)
}


const localStyle = {
    youtube: {
        width: 220,
        height: 180
        // margin:'4px auto'
    }
}