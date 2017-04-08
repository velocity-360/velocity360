var express = require('express')
var router = express.Router()
var controllers = require('../controllers')
var Microservice = require('velocity-microservice')({site_id:process.env.SITE_ID})

router.get('/:template', function(req, res, next) {
	var template = req.params.template


	var data = {}
	controllers.tutorial
	.find({limit:3})
	.then(function(results){
		data['tutorials'] = results
	    return Microservice.fetch('post', {limit:5})
	})
	.then(function(results){
		var index = req.query.index || 0
		data['post'] = results[index]
	    res.render('email/'+template, data)
	})
	.catch(function(err){
		console.log('ERROR: '+err)
		res.json({
			confirmation: 'fail',
			message: err.message
		})

//	    res.render('email/'+template, null)
	})
})

module.exports = router
