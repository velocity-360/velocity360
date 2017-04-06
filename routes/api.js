var express = require('express')
var router = express.Router()
var utils = require('../utils')
var controllers = require('../controllers')

var microserviceResources = {
	post: 'post'
}

router.get('/:resource', function(req, res, next){
	var resource = req.params.resource

	var controller = controllers[resource]
	if (controller == null){
		res.json({
			confirmation:'fail',
			message: 'Invalid Resource'
		})
		return
	}

	controller
	.find(req.query, false, req.session.token)
	.then(function(results){
		res.json({
			confirmation: 'success',
			results: results
		})

		return
	})
	.catch(function(err){
		res.json({
			confirmation: 'fail',
			message: err
		})

		return
	})
})

router.get('/:resource/:id', function(req, res, next){
	var resource = req.params.resource
	var id = req.params.id

	var controller = controllers[resource]
	if (controller == null){
		res.json({
			confirmation:'fail',
			message: 'Invalid Resource'
		})
		return
	}

	controller
	.findById(id, false, req.session.token)
	.then(function(result){
		res.json({
			confirmation: 'success',
			result: result
		})

		return
	})
	.catch(function(err){
		res.json({
			confirmation: 'fail',
			message: 'Not found'
		})

		return
	})
})

router.post('/:resource', function(req, res, next){
	var resource = req.params.resource

	var controller = controllers[resource]
	if (controller == null){
		res.json({
			confirmation:'fail',
			message: 'Invalid Resource.'
		})
		return
	}

	controller
	.create(req.body, req.session.token)
	.then(function(result){
		res.json({
			confirmation: 'success',
			result: result
		})

		return
	})
	.catch(function(err){
		res.json({
			confirmation: 'fail',
			message: err
		})

		return
	})
})

router.put('/:resource/:id', function(req, res, next){
	var resource = req.params.resource
	var id = req.params.id

	var controller = controllers[resource]
	if (controller == null){
		res.json({
			confirmation:'fail',
			message: 'Invalid Resource.'
		})
		return
	}

	console.log('PUT: '+id+', '+JSON.stringify(req.body))

	controller
//	.put(id, req.body, req.session.token)
	.put(id, req.body, null)
	.then(function(result){
		res.json({
			confirmation: 'success',
			result: result
		})

		return
	})
	.catch(function(err){
		console.log('ERROR: '+err.message)
		res.json({
			confirmation: 'fail',
			message: err
		})

		return
	})
})

router.delete('/:resource/:id', function(req, res, next){
	var resource = req.params.resource
	var id = req.params.id

	var controller = controllers[resource]
	if (controller == null){
		res.json({
			confirmation:'fail',
			message: 'Invalid Resource.'
		})
		return
	}

	controller
	.delete(id, req.session.token)
	.then(function(){
		res.json({
			confirmation: 'success'
		})
		return
	})
	.catch(function(err){
		res.json({
			confirmation: 'fail',
			message: err
		})

		return
	})
})

module.exports = router



