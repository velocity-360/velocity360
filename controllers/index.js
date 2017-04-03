var accountController = require('./AccountController')
var tutorialController = require('./TutorialController')
var profileController = require('./ProfileController')
var subscriberController = require('./SubscriberController')
var postController = require('./PostController')

module.exports = {

	account: accountController,
	tutorial: tutorialController,
	profile: profileController,
	subscriber: subscriberController,
	post: postController
	
}
