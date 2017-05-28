import React, { Component } from 'react'

export default (props) => {

	return (	
		<header id="header" className="full-header border-full-header static-sticky sticky-header" data-sticky-className="not-dark" data-sticky-offset="full" data-sticky-offset-negative="100">
			<div id="header-wrap">
				<div className="container clearfix" style={{paddingRight:0, width:100+'%'}}>

					<div id="primary-menu-trigger"><i className="icon-reorder"></i></div>
					<div id="logo" style={{marginLeft:15}}>
						<a href="/" className="standard-logo" data-dark-logo="/images/canvasone-dark.png"><img src="/images/canvasone.png" alt="Canvas Logo" /></a>
						<a href="/" className="retina-logo" data-dark-logo="/images/canvasone-dark@2x.png"><img src="/images/canvasone@2x.png" alt="Canvas Logo" /></a>
					</div>

					<nav id="primary-menu">
						<ul className="one-page-menu" data-easing="easeInOutExpo" data-speed="1250" data-offset="65">
							<li><a href="/"><div>Home</div></a></li>
							<li><a href="/tutorials"><div>Tutorials</div></a></li>
							<li><a href="/#section-courses"><div>Courses</div></a></li>
							<li><a href="/blog"><div>Blog</div></a></li>
							<li><a href="/account" style={{background:'#260354'}}><div style={{color:'#fff'}}>Account</div></a></li>
						</ul>
					</nav>
				</div>
			</div>
		</header>
	)
}