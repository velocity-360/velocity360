import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Nav, Sidebar, Footer } from '../components/presentation'
import { BaseContainer } from '../components/containers'
import { TextUtils } from '../utils'

class Project extends Component {

	render(){
		const user = this.props.user
		const SidebarContainer = BaseContainer(Sidebar)
		const selected = this.props.session.project.selected
		const menuItems = [
			{name:'overview', page:'project', selected:(selected=='overview')},
			{name:'collaborators', page:'project', selected:(selected=='collaborators')}
		]

		const project = this.props.projects[this.props.session.project.slug]
		// console.log('PROEJECT: '+JSON.stringify(project))

		return (
			<div>
				<Nav user={this.props.user} />

				<div id="wrapper" className="clearfix">
					<SidebarContainer withSlack={false} items={menuItems} />

					<section id="content">
						<div className="content-wrap">
							<div className="container clearfix">
								<div className="col_two_third col_last">
									<div className="tabs tabs-bb clearfix ui-tabs ui-widget ui-widget-content ui-corner-all" id="tab-9">
										<ul className="tab-nav clearfix ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all" role="tablist">
											<li className="ui-state-default ui-corner-top ui-tabs-active ui-state-active" role="tab" tabIndex="-1" aria-controls="tabs-34" aria-labelledby="ui-id-18" aria-selected="true" aria-expanded="false"><a href="#tabs-34" className="ui-tabs-anchor" role="presentation" tabIndex="-1" id="ui-id-18">Description</a></li>
											<li className="ui-state-default ui-corner-top" role="tab" tabIndex="-1" aria-controls="tabs-35" aria-labelledby="ui-id-19" aria-selected="false" aria-expanded="false"><a href="#tabs-35" className="ui-tabs-anchor" role="presentation" tabIndex="-1" id="ui-id-19">Images</a></li>
											<li className="hidden-phone ui-state-default ui-corner-top" role="tab" tabIndex="-1" aria-controls="tabs-36" aria-labelledby="ui-id-20" aria-selected="false" aria-expanded="false"><a href="#tabs-36" className="ui-tabs-anchor" role="presentation" tabIndex="-1" id="ui-id-20">Activity</a></li>
										</ul>

										<div className="tab-container">
											<div className="tab-content clearfix ui-tabs-panel ui-widget-content ui-corner-bottom" id="tabs-34" aria-labelledby="ui-id-18" role="tabpanel" aria-hidden="true" style={{display:'none'}}>
												<p>{project.description}</p>
											</div>
											<div className="tab-content clearfix ui-tabs-panel ui-widget-content ui-corner-bottom" id="tabs-35" aria-labelledby="ui-id-19" role="tabpanel" aria-hidden="true" style={{display:'none'}}>

												{ (project.images == null) ? null : project.images.map((image, i) => {
														return (
															<a target="_blank" key={image} href={image} data-lightbox="gallery-item">
																<img src={image+'=s220-c'} alt="" style={{width:126}} />
															</a>

														)
													})
												}

											</div>
											<div className="tab-content clearfix ui-tabs-panel ui-widget-content ui-corner-bottom" id="tabs-36" aria-labelledby="ui-id-20" role="tabpanel" aria-hidden="true" style={{display:'none'}}>

							<div style={{border:'1px solid #ddd', height:450, background:'#ededed'}}>

								<div style={{border:'none', padding:16, background:'#f9f9f9', borderBottom:'1px solid #ddd'}}>
									<a href="#"><strong>Username</strong></a>
									<span style={{fontWeight:200, fontSize:12, float:'right'}}>April 13</span>
									<p dangerouslySetInnerHTML={{ __html: TextUtils.convertToHtml('comment text') }} style={{marginBottom:0, marginTop:4}}></p>
								</div>

								<div style={{border:'none', padding:16, background:'#f9f9f9', borderBottom:'1px solid #ddd'}}>
									<a href="#"><strong>Username</strong></a>
									<span style={{fontWeight:200, fontSize:12, float:'right'}}>April 13</span>
									<p dangerouslySetInnerHTML={{ __html: TextUtils.convertToHtml('comment text') }} style={{marginBottom:0, marginTop:4}}></p>
								</div>

							</div>


											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</section>



					<Footer />
				</div>
			</div>
		)
	}
}

const stateToProps = (state) => {
	return {
		account: state.account,
		session: state.session,
		projects: state.project
	}
}

export default connect(stateToProps)(BaseContainer(Project))