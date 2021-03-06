var accountController = require('./AccountController')
var tutorialController = require('./TutorialController')
var courseController = require('./CourseController')
var profileController = require('./ProfileController')
var subscriberController = require('./SubscriberController')
var postController = require('./PostController')
var projectController = require('./ProjectController')

module.exports = {

	account: accountController,
	tutorial: tutorialController,
	profile: profileController,
	subscriber: subscriberController,
	post: postController,
	project: projectController,
	course: courseController
	
}
