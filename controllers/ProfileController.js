var Profile = require('../models/Profile.js')
var mongoose = require('mongoose')
var Promise = require('bluebird')
var utils = require('../utils')

// - - - - - - - - - - - - - - - - - - - - HELPER METHODS - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

function convertToJson(profiles){
	var results = new Array();
    for (var i=0; i<profiles.length; i++){
  	  var p = profiles[i];
  	  results.push(p.summary());
    }
	
	return results;
}

module.exports = {
	pluralKey: function(){
		return 'profiles';
	},

	find: function(params){ // Promise version
		return new Promise(function(resolve, reject){			
			/* Query by filters passed into parameter string: */
			var limit = params.limit
			if (limit == null)
				limit = '0'

			delete params['limit']

			var format = 'json'
			if (params['format'] != null){
				format = params['format'] // list or string
				delete params['format']
			}
			
			Profile.find(params, null, {limit:parseInt(limit), sort:{timestamp: -1}}, function(err, profiles) {
				if (err) {
					reject(err)
					return
				}

				if (format == 'list' || format == 'string'){
					var list = []
					for (var i=0; i<profiles.length; i++){
						var profile = profiles[i]
						var email = profile.email.toLowerCase()

						if (list.indexOf(email) != -1) // already there, duplicate
							continue
						
						if (email.length == 0) // empty string
							continue

						if (email.indexOf('@') == -1) // invalid email
							continue

						list.push(email)
					}

					if (format == 'list')
						resolve(list)

					if (format == 'string')
						resolve(list.join(','))

					return
				}

				
				resolve(convertToJson(profiles))
			})
		})
	},

	findById: function(id){
		return new Promise(function(resolve, reject){
			Profile.findById(id, function(err, profile) {
				if (err) {
					reject(err)
					return
				}

				if (profile == null){
					reject(new Error('Profile Not Found'))
					return
				}
				
				resolve(profile.summary())
			})
		})
	},	

	create: function(params){ // Promise version
		return new Promise(function(resolve, reject){
			Profile.find({email:params.email}, function(err, profiles){
				if (err){
					reject(err)
					return
				}

				if (profiles.length > 0){ // profile with email already exists - send it back
					var profile = profiles[0]

					// update profile with new params:
					var keys = Object.keys(params)
					keys.forEach(function(key, i){
						profile[key] = params[key]
					})

					profile.save()
					resolve(profile)
					return
				}

				// Create new profile. This is what should happen:
				if (params.email != null){
					if (params.email.length > 0)
						params['slug'] = params.email.split('@')[0]+'-'+utils.TextUtils.randomString(6)
				}
				
				Profile.create(params, function(error, profile){
					if (error){
						reject(err)
						return
					}
					
					resolve(profile)
					return
				})
			})
		})
	},

	put: function(id, params){
		return new Promise(function(resolve, reject){
			Profile.findByIdAndUpdate(id, params, {new:true}, function(err, profile){
				if (err){
					reject(err)
					return
				}

				resolve(profile.summary())
			})
		})
	},

	delete: function(){

	}

}



