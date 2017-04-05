var express = require('express')
var router = express.Router()
var controllers = require('../controllers')
var utils = require('../utils')

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
			return controller.findById(resourceId)
		}
	})
	.then(function(entity){
		if (currentUser == null){
			console.log('TEST 1')
			res.redirect('/')
		}
		
		else if (entity == null){
			console.log('TEST 2')
			res.redirect('/')
		}
		
		else if (entity.link == 0){ // there is no link
			console.log('TEST 3')
			res.redirect('/')
		}

		else if (entity.price == 0){ // it's free, everyone can download
			console.log('TEST 4')
			res.redirect(entity.link)
		}
		
		else if (currentUser.accountType == 'premium'){
			console.log('TEST 5')
			res.redirect(entity.link)
		}
		
		else if (entity.subscribers.indexOf(currentUser.id) == -1){
			console.log('TEST 6')
			res.redirect('/')
		}
		
		else 
			res.redirect(entity.link)		
	})
	.catch(function(err){
		console.log('TEST ERROR: '+err.message)
		res.redirect('/')
	})
})


module.exports = router
