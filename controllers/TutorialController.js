var Tutorial = require('../models/Tutorial')
var TextUtils = require('../utils/TextUtils')
var mongoose = require('mongoose')
var Promise = require('bluebird')


// - - - - - - - - - - - - - - - - - - - - HELPER METHODS - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

function convertToJson(tutorials){
	var results = new Array()
    for (var i=0; i<tutorials.length; i++){
  	  var p = tutorials[i]
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
			
			Tutorial.find(params, null, {limit:parseInt(limit), sort:{priority: 1}}, function(err, tutorials) {
				if (err) {
					reject(err)
					return
				}
				
				resolve(convertToJson(tutorials))
			})
		})
	},

	findById: function(id, isRaw){
		return new Promise(function(resolve, reject){
			Tutorial.findById(id, function(err, tutorial) {
				if (err) {
					console.log('TEST 1')
					reject(err)
					return
				}
				
				console.log('TEST 2: '+JSON.stringify(tutorial))
				if (isRaw)
					resolve(tutorial)
				else
					resolve(tutorial.summary())
			})
		})
	},

	create: function(params, completion){
		params['slug'] = TextUtils.slugVersion(params.title)
		Tutorial.create(params, function(err, tutorial){
			if (err){
				completion({confirmation:'fail', message:err.message}, null)
				return
			}
			
			completion(null, tutorial.summary())
			return
		})
	},

	put: function(id, params, completion){
		if (params.title != null)
			params['slug'] = TextUtils.slugVersion(params.title)

		Tutorial.findByIdAndUpdate(id, params, {new:true}, function(err, tutorial){
			if (err){
				completion({confirmation:'fail', message:err.message}, null)
				return
			}
			
			completion(null, tutorial.summary())
			return
		})
	},

	delete: function(){

	}

}



