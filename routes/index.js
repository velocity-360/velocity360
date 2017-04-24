var express = require('express')
var router = express.Router()

var React = require('react')
var ReactDOMServer = require('react-dom/server')
var apps = require('../public/dist/es5/apps')
var store = require('../public/dist/es5/stores')
var controllers = require('../controllers')
var utils = require('../utils')

var staticPages = {
	about: 'about',
	login: 'login'
}

var reactApps = {
	tutorial: apps.Tutorial,
	courses: apps.Courses,
	post: apps.Post,
	account: apps.Account,
	project: apps.Project,
	profile: apps.Profile
}

var template = (process.env.ENVIRONMENT=='dev') ? 'index-dev' : 'index'

router.get('/', function(req, res, next) {
	var initialData = {
		session:{
			page: 'home',
			home: {
				selected: req.query.selected || 'tutorials'
			}
		}
	}

	controllers.account.currentUser(req)
	.then(function(user){
		initialData['account'] = {currentUser: user}
		return controllers.tutorial.find(null)
	})
	.then(function(tutorials){
		var tutorialReducer = {
			all: tutorials
		}

		initialData['tutorial'] = tutorialReducer

		var initialState = store.configureStore(initialData)
		// console.log('INITIAL: '+JSON.stringify(initialState.getState()))

		var home = React.createElement(apps.Home)
		var provider = React.createElement(apps.ServerEntry, {component:home, store:initialState})

	    res.render(template, {
	    	react: ReactDOMServer.renderToString(provider),
	    	initial: JSON.stringify(initialState.getState()),
	    	bundle: 'home',
			tags: {
				title: 'Learn Full Stack React, Redux and Node',
				description: 'Learn Full Stack React, Redux and Node',
				url: 'https://www.velocity360.io',
				image: 'https://www.velocity360.io/images/logo_260.png'
			}
	    })
	})
	.catch(function(err){
		res.json({
			confirmation:'fail',
			message: err.message
		})
	})
})


router.get('/:page', function(req, res, next) {
	if (staticPages[req.params.page] != null){
	    res.render(staticPages[req.params.page], null)
		return
	}

    if (req.params.page == 'account'){
		var initialData = {
			session:{
				page: req.params.page,
				account: {
					selected: req.query.selected || 'profile'
				}
			}
		}	

		controllers.account.currentUser(req)
		.then(function(user){
			var reducer = {currentUser: user}

			initialData['account'] = reducer
			var initialState = store.configureStore(initialData)

			var component = React.createElement(reactApps['account'])
			var provider = React.createElement(apps.ServerEntry, {component:component, store:initialState})

		    res.render(template, {
		    	react: ReactDOMServer.renderToString(provider),
		    	initial: JSON.stringify(initialState.getState()),
		    	bundle: 'account'
		    })
		})
		.catch(function(err){
			res.json({
				confirmation: 'fail',
				message: err.message
			})
		})    	
    }


    if (req.params.page == 'courses'){
		var initialData = {
			session:{
				page: req.params.page,
				courses: {
					selected: 'courses'
				}
			}
		}


		controllers.account.currentUser(req)
		.then(function(user){
			var reducer = {currentUser: user}

			initialData['account'] = reducer
			var initialState = store.configureStore(initialData)

			var component = React.createElement(reactApps[req.params.page])
			var provider = React.createElement(apps.ServerEntry, {component:component, store:initialState})

		    res.render(template, {
		    	react: ReactDOMServer.renderToString(provider),
		    	initial: JSON.stringify(initialState.getState()),
		    	bundle: req.params.page
		    })
		})
		.catch(function(err){
			res.json({
				confirmation: 'fail',
				message: err.message
			})
		}) 


    }

})

router.get('/:page/:slug', function(req, res, next) {
	var page = req.params.page
	if (page == 'api' || page == 'auth' || page=='premium' || page=='stripe' || page=='email' || page=='admin'){
		next()
		return
	}

	if (staticPages[page] != null){
	    res.render(staticPages[page], null)
		return
	}

	var tags = {}
	var controller = controllers[page] // check for null
	var initialData = {
		session:{
			page: page,
			post: {
				selected: req.query.selected || 'overview',
				slug: req.params.slug
			},
			tutorial: {
				selected: req.query.selected || 'overview',
				slug: req.params.slug
			},
			project: {
				selected: req.query.selected || 'overview',
				slug: req.params.slug
			},
			profile: {
				selected: req.query.selected || 'profile',
				slug: req.params.slug
			}
		}
	}

	controllers.account.currentUser(req)
	.then(function(user){
		initialData['account'] = {currentUser: user}
		return controller.find({slug: req.params.slug})
	})
	.then(function(entities){
		var reducer = {}
		entities.forEach(function(entity, i){
			var summary = entity.description || entity.preview || entity.bio || ''
			reducer[entity.slug] = entity
			tags['title'] = entity.title || entity.name || entity.username
			tags['url'] = 'https://www.velocity360.io/'+page+'/'+entity.slug
			tags['description'] = utils.TextUtils.truncateText(summary, 220)
			if (entity.image != null)
				tags['image'] = (entity.image.indexOf('http') == -1) ? 'https://media-service.appspot.com/site/images/'+entity.image+'?crop=260' : entity.image+'=s260-c'
		})

		initialData[page] = reducer

		var initialState = store.configureStore(initialData)

//		var component = React.createElement(reactApps[page], {slug: req.params.slug})
		var component = React.createElement(reactApps[page])
		var provider = React.createElement(apps.ServerEntry, {component:component, store:initialState})

	    res.render(template, {
	    	react: ReactDOMServer.renderToString(provider),
	    	initial: JSON.stringify(initialState.getState()),
	    	bundle: page,
	    	tags: tags
	    })
	})
	.catch(function(err){
		res.json({
			confirmation:'fail',
			message: err.message
		})
	})
})


module.exports = router
