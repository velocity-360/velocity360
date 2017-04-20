var express = require('express')
var router = express.Router()
var Promise = require('bluebird')
var Microservice = require('turbo360')({site_id:process.env.SITE_ID})
var controllers = require('../controllers')

function createProfile(name, email){
	var parts = name.split(' ')
	return controllers.profile.create({
		email: email,
		firstName: parts[0],
		lastName: (parts.length > 1) ? parts[parts.length-1] : '',
		password: 'abcd'
	})
}

router.post('/:resource', function(req, res, next) {
	var resource = req.params.resource

	if (resource == 'charge') {
		var customerName = ''
		var customerEmail = req.body.email
		var type = req.body.type
		var prod = null

		var stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
		Microservice.createStripeCharge({ // charge for new people, unregistered customers
			stripeRef: stripe,
			description: 'Velocity 360: '+req.body.description,
			amount: req.body.amount,
			stripeToken: req.body.stripeToken
		})
		.then(function(charge){
			customerName = charge.source.name // this comes from Stripe
			return controllers[type].findById(req.body.product, true) // get raw version
		})
		.then(function(product){
			prod = product

			var params = null
			if (req.session == null){
				return controllers.profile.find({email: customerEmail})
			}
			if (req.session.user == null){
				return controllers.profile.find({email: customerEmail})
			}

			return controllers.profile.findById(req.session.user) // logged in user
		})
		.then(function(results){
			if (Object.prototype.toString.call(results) === '[object Array]') 
				return (results.length > 0) ? results[0] : createProfile(customerName, customerEmail)
			
			return (results == null) ? createProfile(customerName, customerEmail) : results
		})
		.then(function(profile){
			var subscribers = prod.subscribers
			if (subscribers.indexOf(profile.id) == -1){
				subscribers.push(profile.id)
				prod['subscribers'] = subscribers
				prod.save()
			}

			Microservice.sendEmail({
				content: customerName + ' purchased ' + prod.title,
				fromemail: process.env.BASE_EMAIL,
				fromname: 'Velocity 360',
				recipient: 'dkwon@velocity360.io',
				subject: type.toUpperCase()+' Purchase'
			})

			// TODO: send new profile a welcome email, do this in the controller
			req.session.user = profile.id // login as user
			var response = {
				confirmation: 'success',
				user: profile // this is already the summary
			}

			response[req.body.type] = prod.summary()
			res.send(response)
			return
		})
		.catch(function(err){
			console.log('CHARGE ERROR: ' + err)
			res.send({
				confirmation: 'fail',
				message: err.message
			})
			return
		})
		
		return
	}


	// Apply a credit card to a profile:
	if (resource == 'card') {
		var stripeToken = req.body.stripeToken
		if (stripeToken == null){
			res.json({confirmation:'fail', message:'Missing stripeToken parameter'})
			return
		}

		if (req.body.name != null){
			var parts = req.body.name.split(' ')
			req.body['firstName'] = parts[0]
			if (parts.length > 1)
				req.body['lastName'] = parts[parts.length-1]
		}
		
		var params = (req.session.user) ? {id: req.session.user} : {id:'-1'}
		controllers.profile.find(params)
		.then(function(profiles){ // can be null
			return (profiles.length == 0) ? controllers.profile.create(req.body) : profile[0]
		})
		.then(function(profile){
			var stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
			return Microservice.createStripeAccount({ // requires stripeRef, client, stripeToken values
				stripeRef: stripe,
				client: profile,
				stripeToken: stripeToken
			})			
		})
		.then(function(profile){
			profile['accountType'] = 'premium'
			profile['monthlyRate'] = 19.99

			var promoCode = req.body.promoCode
			if (promoCode != null){ // check promo code
				profile['promoCode'] = promoCode
				if (promoCode == 'nyu')
					profile['monthlyRate'] = 9.99
			}

			req.session.user = profile._id.toString() // login as user
			res.json({confirmation:'success', user:profile.summary()})

			Microservice.sendEmail({
				content: JSON.stringify(profile.summary()),
				fromemail: process.env.BASE_EMAIL,
				fromname: 'Velocity 360',
				recipient: 'dkwon@velocity360.io',
				subject: 'New Premium Subscriber'
			})

 			profile.save()
		})
		.catch(function(err){
			res.send({confirmation:'fail', message:err.message})
		})
	}	
})


module.exports = router
