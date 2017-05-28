var express = require('express')
var router = express.Router()
var controllers = require('../controllers')
var utils = require('../utils')
var Microservice = require('turbo360')({site_id:process.env.SITE_ID})

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
		controllers.profile
		.create(req.body)
		.then(function(profile){
			req.session.user = profile.id // install cookie with profile id set to 'user'
			Microservice.sendEmail({
				content: JSON.stringify(req.body),
				fromemail: process.env.BASE_EMAIL,
				fromname: 'Velocity 360',
				recipient: 'dkwon@velocity360.io',
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
		controllers.subscriber.create(req.body)
		.then(function(result){
			// REQUIRED PARAMS: content, fromemail, fromname, recipient, subject
			Microservice.sendEmail({
				content: JSON.stringify(req.body),
				fromemail: process.env.BASE_EMAIL,
				fromname: 'Velocity 360',
				recipient: 'dkwon@velocity360.io',
				subject: req.body.cta || 'Slack Invitation Request'
			})

			res.json({
				confirmation: 'success',
				result: result
			})
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


	// var emailList = ['dkwon@velocity360.io', 'katrina@velocity360.io']
	// var actions = ['application', 'proposal', 'freesession']

	// if (actions.indexOf(action) != -1){
	// 	// EmailManager.sendEmails(process.env.BASE_EMAIL, emailList, body.subject, JSON.stringify(body))
	// 	res.json({
	// 		confirmation:'success', 
	// 		message: body.confirmation
	// 	})

	// 	return
	// }

	// if (action == 'syllabus'){
	// 	var course = body.course.toLowerCase()

	// 	var syllabusMap = {
	// 		'full stack immersive': {
	// 			template: 'fullstack-immersive.html',
	// 			pdf: 'FullStackImmersive.pdf'
	// 		},
	// 		'node and react': {
	// 			template: '',
	// 			pdf: 'NodeReactEvening.pdf'
	// 		},
	// 		'full stack evening': {
	// 			template: 'node-react-evening.html',
	// 			pdf: '24-Week-Part-Time.pdf'
	// 		}			
	// 	}

	// 	var syllabus = syllabusMap[course]
	// 	fetchFile('public/email/syllabus/'+syllabus['template'])
	// 	.then(function(html){
	// 		var url = 'https://www.velocity360.io/syllabus/'+syllabus['pdf']
	// 		html = html.replace('{{link}}', url)
	// 		html = html.replace('{{name}}', Helpers.capitalize(body.firstName))
	// 		html = html.replace('{{link}}', url)

	// 		var subscriber = {
	// 			name: body.firstName + body.lastName,
	// 			email: body.email,
	// 			workshop: course
	// 		}

	// 		subscriberController.post(subscriber, function(err, result){
	// 			if (err){
	// 				return
	// 			}

	// 			req.session.visitor = result.id
	// 			EmailManager.sendHtmlEmail(process.env.BASE_EMAIL, result.email, 'Velocity 360 - Syllabus Request', html)
	// 			res.json({
	// 				confirmation: 'success',
	// 				message: body.confirmation
	// 			})
	// 			return
	// 		})
	// 	})
	// 	.catch(function(err){

	// 	})

	// 	EmailManager.sendEmails(process.env.BASE_EMAIL, ['dkwon@velocity360.io'], 'Syllabus Request', JSON.stringify(body))
	// 	return
	// }


	// if (action == 'rsvp') {
	// 	var infoRequest = req.body
		
	// 	// send email to yourself for notification:
	// 	EmailManager.sendEmail(process.env.BASE_EMAIL, 'dkwon@velocity360.io', 'Event RSVP', JSON.stringify(infoRequest))
	// 	.then(function(){
	// 		var confirmationMsg = 'Dear '+Helpers.capitalize(infoRequest.firstName)+',<br /><br />Thanks for registering to the '+infoRequest.subject+' workshop on '+infoRequest.date+'! My name is Katrina Murphy and I am the community manager of <a href="https://www.velocity360.io">Velocity 360</a>. Velocity offers part-time and full-time instructional courses in software development. We specialize in the following areas: Node JS, React, React Native, Angular, and iOS.<br /><br />If you are interested in learning about our full or part-time development courses, check <a href="https://www.velocity360.io">HERE</a>. Thanks and see you at the workshop.<br /><br />Katrina Murphy<br />Community Manager<br /><a href="https://www.velocity360.io">Velocity 360</a><br /><br /><br /><a style="background:#f1f9f5;border: 1px solid #ddd; padding:16px; text-decoration:none;margin-top:12px" href="https://www.velocity360.io/syllabus/FundamentalsBootcamp.pdf">Download Syllabus</a>'
	// 		var name = infoRequest.firstName
	// 		if (infoRequest.lastName != null)
	// 			name = name+' '+infoRequest.lastName

	// 		var subscriber = {
	// 			name: name,
	// 			email: infoRequest.email,
	// 			workshop: infoRequest.subject,
	// 			survey: infoRequest.survey
	// 		}

	// 		subscriberController.post(subscriber, function(err, result){
	// 			if (err == null)
	// 				req.session.visitor = result.id
	// 		})

	// 		return EmailManager.sendHtmlEmail(process.env.BASE_EMAIL, infoRequest.email, infoRequest.subject, confirmationMsg)
	// 	})
	// 	.then(function(){
	// 		res.json({
	// 			confirmation: 'success',
	// 			message: 'Thanks for your interest in the '+infoRequest.subject+' workshop. Please check your email for a confirmation. Looking forward to seeing you there!'
	// 		})
	// 		return
	// 	})
	// 	.catch(function(err){
	// 		res.json({confirmation:'fail', message:err.message})
	// 		return
	// 	})

	// 	return
	// }

	res.json({
		confirmation:'fail',
		message: 'Invalid Action'
	})

})


module.exports = router
