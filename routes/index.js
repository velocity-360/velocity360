var express = require('express')
var router = express.Router()

var React = require('react')
var ReactDOMServer = require('react-dom/server')
var apps = require('../public/dist/es5/apps')
var store = require('../public/dist/es5/stores')
var controllers = require('../controllers')
var utils = require('../utils')

var staticPages = {
	landing: 'landing',
	tutorials: 'tutorials',
	tutorial: 'tutorial',
	course: 'course',
	post: 'post',
	register: 'register',
	login: 'login',
	blog: 'blog',
	sidenavigation: 'sidenavigation'
}

var routes = {
	api: 'api',
	auth: 'auth',
	premium: 'premium',
	stripe: 'stripe',
	email: 'email',
	admin: 'admin'
}

var reactApps = {
	tutorial: apps.Tutorial,
	courses: apps.Courses,
	course: apps.Course,
	post: apps.Post,
	account: apps.Account,
	project: apps.Project,
	profile: apps.Profile
}

var template = (process.env.ENVIRONMENT=='dev') ? 'index-dev' : 'index'


router.get('/', function(req, res, next) {
	var data = {user: null}

	controllers.account.currentUser(req)
	.then(function(user){
		data['user'] = user
		delete user['email']
		data['currentUser'] = JSON.stringify(user)
	    res.render('landing', data)
	})
	.catch(function(err){
	    res.render('landing', null)
	})

	return
})


router.get('/:page', function(req, res, next) {
	if (staticPages[req.params.page] != null){
		var data = {user: null}

		controllers.account.currentUser(req)
		.then(function(user){
			data['user'] = user
			delete user['email']
			data['currentUser'] = JSON.stringify(user)
		    res.render(staticPages[req.params.page], data)
		})
		.catch(function(err){
		    res.render(staticPages[req.params.page], null)
		})

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
			initialData['account'] = {currentUser: user}
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
			initialData['account'] = {currentUser: user}
			return controllers.course.find({})
		})
		.then(function(entities){
			// console.log('COURSES: '+JSON.stringify(entities))
			initialData['course'] = {all: entities}

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

	// these requests are passed off to the next route:
	if (routes[page] != null){
		next()
		return
	}

	var template = staticPages[page]
	if (template != null){
		var slug = req.params.slug

		var data = {user: null}
		controllers.account.currentUser(req)
		.then(function(user){
			data['user'] = user
			delete user['email']
			data['currentUser'] = JSON.stringify(user)
			var controller = controllers[page] // check for null
			return controller.find({slug: req.params.slug})
		})
		.then(function(results){
			var entity = (results.length == 0) ? null : results[0]
			data[page] = entity
			if (entity){
				var summary = entity.description || entity.preview || entity.bio || ''
				data['tags'] = {
					title: entity.title,
					url: 'https://www.velocity360.io/'+page+'/'+slug,
					image: 'https://media-service.appspot.com/site/images/'+entity.image+'?crop=260',
					description: utils.TextUtils.truncateText(summary, 220)
				}
			}

		    res.render(template, data)
		})		
		.catch(function(err){
			res.json({
				confirmation: 'fail',
				message: err.message
			})
		})

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
			course: {
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
