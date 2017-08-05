var express = require('express')
var router = express.Router()
var controllers = require('../controllers')
var utils = require('../utils')
var Base64 = require('js-base64').Base64

router.get('/:hash', function(req, res, next) {
	var decoded = Base64.decode(req.params.hash)
	var parsed = JSON.parse(decoded) // {"id":"12322312312"}

	if (parsed.id == null){
		res.json({
			confirmation: 'fail'
		})
		return
	}

	if (parsed.resource == null){
		res.json({
			confirmation: 'fail'
		})
		return
	}

	var controller = controllers[parsed.resource]
	controller.findById(parsed.id, true)
	.then(function(entity){
		if (entity == null){
			throw new Error('Not Found')
			return
		}

		res.redirect(entity.link)
	})
	.catch(function(err){
		console.log('ERROR: ' + err.message)
		res.json({
			confirmation: 'fail',
			message: err.message
		})
	})
})

router.get('/:resource/:id', function(req, res, next) {
	var resource = req.params.resource
	var resourceId = req.params.id

	var controller = controllers[resource]
	if (controller == null){
		res.json({
			confirmation: 'fail',
			message: 'Invalid Resource'
		})

		return
	}

	var currentUser = null
	controllers.account.currentUser(req)
	.then(function(profile){ // can be null
		if (profile == null)
			return null
		else {
			currentUser = profile
			return controller.findById(resourceId, true)
		}
	})
	.then(function(entity){
		if (currentUser == null){
			res.redirect('/')
		}
		
		else if (entity == null){
			res.redirect('/')
		}
		
		else if (entity.link == 0){ // there is no link
			res.redirect('/')
		}

		else if (entity.price == 0){ // it's free, everyone can download
			res.redirect(entity.link)
		}
		
		else if (currentUser.accountType == 'premium'){
			res.redirect(entity.link)
		}
		
		else if (entity.subscribers.indexOf(currentUser.id) == -1){
			res.redirect('/')
		}
		
		else 
			res.redirect(entity.link)		
	})
	.catch(function(err){
		console.log('ERROR: '+err.message)
		res.redirect('/')
	})
})


module.exports = router
