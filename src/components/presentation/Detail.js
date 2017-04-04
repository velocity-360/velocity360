import React, { Component } from 'react'

export default (props) => {

	// const post = props
	const description = props.text || props.description
	const image = (props.image.indexOf('http') > -1) ? props.image : 'https://media-service.appspot.com/site/images/'+props.image
	const units = props.posts || []

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

					<img style={{marginBottom:24,width:60+'%',maxWidth:360,minWidth:300}} src={image} alt={'The Daily Slate | '+props.title} />
					<div dangerouslySetInnerHTML={{ __html:description }} className="entry-content description"></div>

					<div className="description tutorial">
						{ (units.length > 0) ? <div><h3>Units</h3><hr /></div> : null}
						{ units.map((unit, i) => {
                                let youtube = null
                                if (unit.youtube != null)
                                    youtube = (unit.youtube.length == 0) ? null : <object style={localStyle.youtube} data={'https://www.youtube.com/embed/'+unit.youtube}></object>

								return (
									<div style={{marginBottom:16}} key={i}>
										<h4>{(i+1)+'. '+unit.title}</h4>
										{unit.description}
										{youtube}
									</div>
								)
							})

						}
					</div>

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


const localStyle = {
    youtube: {
        background:'#fff',
        padding:3,
        border:'1px solid #ddd',
        width: 220,
        height: 180,
        float:'none',
        clear:'both',
        margin:'4px auto'
    }
}