var express = require('express')
var router = express.Router()
var controllers = require('../controllers')
var utils = require('../utils')
var Turbo = require('turbo360')({site_id: process.env.SITE_ID})

router.get('/:action', function(req, res, next) {
	var action = req.params.action

	if (action == 'currentuser') {
		controllers.account.currentUser(req)
		.then(function(user){
			res.json({
				confirmation: 'success',
				user: user
			})
		})
		.catch(function(err){
			res.json({
				confirmation: 'fail',
				message: err.message
			})
		})
		return
	}

	if (action == 'logout') {
		req.session.reset() // client-sessions

		var redirect = req.query.redirect
		if (redirect == null){
			// req.session.destroy() // express-session
			res.redirect('/')
			return
		}

		if (redirect == 'turbo'){
			res.redirect('http://www.turbo360.co')
			return
		}

		res.redirect('/')
		return
	}

	if (action == 'unsubscribe') {
		var email = req.query.email
		Turbo.sendEmail({
			content: 'Unsubscribe: '+email,
			fromemail: process.env.BASE_EMAIL,
			fromname: 'Velocity 360',
			recipients: ['dkwon@velocity360.io'],
			subject: 'Unsubscribe: '+email
		})

		res.send('You Are Unsubscribed.')
		return
	}

	res.json({
		confirmation:'fail',
		message: 'Invalid Action'
	})
})

router.post('/:action', function(req, res, next) {
	var action = req.params.action

	if (action == 'login') {
		controllers.account.login(req.body)
		.then(function(user){
			req.session.user = user.id
			res.json({
				confirmation: 'success',
				user: user
			})
		})
		.catch(function(err){
			res.json({
				confirmation: 'fail',
				message: err.message
			})
		})

		return
	}

	if (action == 'register') {
		controllers.profile.create(req.body)
		.then(function(profile){
			req.session.user = profile.id // install cookie with profile id set to 'user'
			Turbo.sendEmail({
				content: JSON.stringify(req.body),
				fromemail: process.env.BASE_EMAIL,
				fromname: 'Velocity 360',
				recipients: ['dkwon@velocity360.io'],
				subject: 'New Registration'
			})

			res.json({
				confirmation: 'success',
				user: profile
			})
		})
		.catch(function(err){
			res.json({
				confirmation: 'fail',
				message: err
			})
		})

		return
	}

	if (action == 'subscribe'){
		var subscriber = null
		controllers.subscriber.create(req.body)
		.then(function(result){
			subscriber = result
			// REQUIRED PARAMS: content, fromemail, fromname, recipient, subject
			return Turbo.sendEmail({
				content: JSON.stringify(req.body),
				fromemail: process.env.BASE_EMAIL,
				fromname: 'Velocity 360',
				recipients: ['dkwon@velocity360.io'],
				subject: req.body.cta || 'Slack Invitation Request'
			})
		})
		.then(function(data){
			res.json({
				confirmation: 'success',
				result: subscriber
			})

			return
		})
		.catch(function(err){
			console.log('ERROR: '+err.message)
			res.json({
				confirmation: 'fail',
				message: err
			})
		})

		return
	}

	res.json({
		confirmation:'fail',
		message: 'Invalid Action'
	})

})


module.exports = router
