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

router.get('/:page', function(req, res, next) {
	if (staticPages[req.params.page] != null){
	    res.render(staticPages[req.params.page], null)
		return
	}

    res.render(req.params.page, null)

})

router.get('/:page/:slug', function(req, res, next) {
	if (req.params.page == 'api'){
		next()
		return
	}

	if (staticPages[req.params.page] != null){
	    res.render(staticPages[req.params.page], null)
		return
	}

	var initialData = {}
	controllers.tutorial
	.find({slug: req.params.slug})
	.then(function(tutorials){
		var tutorialReducer = {
			all: tutorials
		}

		initialData['tutorial'] = tutorialReducer

		var initialState = store.configureStore(initialData)
		// console.log('INITIAL: '+JSON.stringify(initialState.getState()))

		var tutorial = React.createElement(apps.Tutorial)
		var provider = React.createElement(apps.ServerEntry, {component:tutorial, store:initialState})

	    res.render('index', {
	    	react: ReactDOMServer.renderToString(provider),
	    	initial: JSON.stringify(initialState.getState()),
	    	bundle: 'tutorial'
	    })
	})
	.catch(function(err){
		res.json({
			confirmation:'fail',
			message: err.message
		})
	})

//    res.render(req.params.page, null)
    
})

module.exports = router
