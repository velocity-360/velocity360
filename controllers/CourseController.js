var Course = require('../models/Course')
var TextUtils = require('../utils/TextUtils')
var mongoose = require('mongoose')
var Promise = require('bluebird')


// - - - - - - - - - - - - - - - - - - - - HELPER METHODS - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

function convertToJson(courses){
	var results = new Array()
    for (var i=0; i<courses.length; i++){
  	  var p = courses[i]
  	  results.push(p.summary())
    }
	
	return results
}


module.exports = {
	find: function(params){ // Promise version
		return new Promise(function(resolve, reject){

			/* Query by filters passed into parameter string: */
			var limit = '0'
			if (params){
				var limit = params.limit || '0'
				delete params['limit']
			}
			
			Course.find(params, null, {limit:parseInt(limit), sort:{priority: 1}}, function(err, courses) {
				if (err) {
					reject(err)
					return
				}
				
				resolve(convertToJson(courses))
			})
		})
	},

	findById: function(id, isRaw){
		return new Promise(function(resolve, reject){
			Course.findById(id, function(err, course) {
				if (err) {
					reject(err)
					return
				}
				
				if (isRaw)
					resolve(course)
				else
					resolve(course.summary())
			})
		})
	},

	create: function(params, completion){
		params['slug'] = TextUtils.slugVersion(params.title)
		Course.create(params, function(err, course){
			if (err){
				completion({confirmation:'fail', message:err.message}, null)
				return
			}
			
			completion(null, course.summary())
			return
		})
	},

	put: function(id, params, token){
		if (params.title != null)
			params['slug'] = TextUtils.slugVersion(params.title)

		return new Promise(function(resolve, reject){
			Course.findByIdAndUpdate(id, params, {new:true}, function(err, course){
				if (err){
					reject(err)
					return
				}
				
				resolve(course.summary())
				return
			})
		})
	},

	delete: function(){

	}

}



