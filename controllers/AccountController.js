var Profile = require('../models/Profile')
var mongoose = require('mongoose')
var Promise = require('bluebird')

module.exports = {
	login: function(params, completion){
		return new Promise(function(resolve, reject){
			Profile.find({'email':params.email}, function(err, profiles) {
				if (err) {
					reject(err)
					return
				}
				
				if (profiles.length == 0){
					reject(new Error('Profile '+params.email+' not found.'))
					return
				}
				
				var profile = profiles[0] // assume first one
				if (profile.password != params.password){
					reject(new Error('Incorrect Password'))
					return
				}
				
				resolve(profile.summary())
				return
			})
		})

		// Profile.find({'email':params.email}, function(err, profiles) {
		// 	if (err) {
		// 		completion({'message':err.message}, null);
		// 		return
		// 	}
			
		// 	if (profiles.length == 0){
		// 		completion({'message':'Profile '+params.email+' not found.'}, null)
		// 		return
		// 	}
			
		// 	var profile = profiles[0] // assume first one
		// 	if (profile.password != params.password){
		// 		completion({'message':'Incorrect Password'}, null)
		// 		return
		// 	}
				
		// 	completion(null, profile.summary())
		// 	return
		// })
	}, 

	currentUser: function(req){
	    return new Promise(function (resolve, reject){
			if (req.session == null){
				resolve(null)
				return
			}

			if (req.session.user == null){
				resolve(null)
				return
			}

			var userId = req.session.user
			Profile.findById(userId, function(err, profile){
				if (err){
					reject(err)
					return
				}
				
				if (profile == null){
					resolve(null)
					return
				}

				resolve(profile.summary())
			})
	    })
	}

}

