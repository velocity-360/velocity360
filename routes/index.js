var express = require('express')
var router = express.Router()

var React = require('react')
var ReactDOMServer = require('react-dom/server')
var apps = require('../public/dist/es5/apps')
var store = require('../public/dist/es5/stores')
var controllers = require('../controllers')

var staticPages = {
	about: 'about'
}

var reactApps = {
	tutorial: apps.Tutorial,
	post: apps.Post,
	account: apps.Account
}

router.get('/', function(req, res, next) {
	var initialData = {}
	controllers.tutorial
	.find(null)
	.then(function(tutorials){
		var tutorialReducer = {
			all: tutorials
		}

		initialData['tutorial'] = tutorialReducer

		var initialState = store.configureStore(initialData)
		// console.log('INITIAL: '+JSON.stringify(initialState.getState()))

		var home = React.createElement(apps.Home)
		var provider = React.createElement(apps.ServerEntry, {component:home, store:initialState})

	    res.render('index', {
	    	react: ReactDOMServer.renderToString(provider),
	    	initial: JSON.stringify(initialState.getState()),
	    	bundle: 'home'
	    })
	})
	.catch(function(err){
		res.json({
			confirmation:'fail',
			message: err.message
		})
	})
})

router.get('/account', function(req, res, next) {
	var initialData = {
		session:{
			page:'account',
			account: {
				selected:'overview'
			}
		}
	}	

	controllers.account
	.currentUser(req)
	.then(function(user){
		var reducer = {
			currentUser: user
		}

		initialData['account'] = reducer
		var initialState = store.configureStore(initialData)

		var component = React.createElement(reactApps['account'])
		var provider = React.createElement(apps.ServerEntry, {component:component, store:initialState})

	    res.render('index', {
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

})

router.get('/:page', function(req, res, next) {
	if (staticPages[req.params.page] != null){
	    res.render(staticPages[req.params.page], null)
		return
	}

    res.render(req.params.page, null)

})

router.get('/:page/:slug', function(req, res, next) {
	var page = req.params.page
	if (page == 'api'){
		next()
		return
	}

	if (staticPages[page] != null){
	    res.render(staticPages[page], null)
		return
	}

	var controller = controllers[page] // check for null

	var initialData = {
		session:{
			page:page,
			post: {
				selected:'overview',
				slug: req.params.slug
			},
			tutorial: {
				selected:'overview',
				slug: req.params.slug
			}
		},
	}

	controller
	.find({slug: req.params.slug})
	.then(function(entities){
		var reducer = {
			// all: entities
		}

		entities.forEach(function(entity, i){
			reducer[entity.slug] = entity
			// reducer[entity.id] = entity
		})

		initialData[page] = reducer

		var initialState = store.configureStore(initialData)
		// console.log('INITIAL: '+JSON.stringify(initialState.getState()))

		var component = React.createElement(reactApps[page], {slug: req.params.slug})
		var provider = React.createElement(apps.ServerEntry, {component:component, store:initialState})

	    res.render('index', {
	    	react: ReactDOMServer.renderToString(provider),
	    	initial: JSON.stringify(initialState.getState()),
	    	bundle: page
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
