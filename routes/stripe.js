var express = require('express')
var router = express.Router()
var Promise = require('bluebird')
var Microservice = require('velocity-microservice')({site_id:process.env.SITE_ID})
var controllers = require('../controllers')

// function createStripeCharge(customerId, amount, description){
//     return new Promise(function (resolve, reject){
// 		var stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
// 		stripe.charges.create({
// 			amount: amount*100, // amount in cents
// 			currency: 'usd',
// 			customer: customerId,
// 			description: description,
// 		}, function(err, charge) {
// 			if (err){ // check for `err`
// 	            reject(err)
// 	            return
// 			}

// 	    	resolve(charge)
// 		})
//     })
// }


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

// 	if (resource == 'register') { // new user signing up as premium subscriber
// //		console.log('REGISTER: '+JSON.stringify(req.body))
// 		var params = {email: req.body.email}

// 		controllers.profile.create(params)
// 		.then(function(profile){
// 			// return Microservice.createStripeAccount(profile, req.body.stripeToken, null)
// 			var stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
// 			return Microservice.createStripeAccount({ // requires stripeRef, profile, stripeToken values
// 				stripeRef: stripe,
// 				profile: profile,
// 				stripeToken: stripeToken
// 			})
// 		})
// 		.catch(function(err){
// 			res.send({'confirmation':'fail', 'message':err.message})
// 			return
// 		})
// 	}

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
		// req.body = {stripeToken: token.id, email: token.email, name: token.name}
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
			// console.log('CREATE STRIPE CUSTOMER: '+JSON.stringify(profile))
//			return Microservice.createStripeAccount(profile, stripeToken)

			var stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
			return Microservice.createStripeAccount({ // requires stripeRef, profile, stripeToken values
				stripeRef: stripe,
				profile: profile,
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

			// EmailManager.sendEmail(process.env.BASE_EMAIL, 'dkwon@velocity360.io', 'New Premium Subscriber', JSON.stringify(profile.summary()))
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
