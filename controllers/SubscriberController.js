var Subscriber = require('../models/Subscriber.js')
var mongoose = require('mongoose')
var Promise = require('bluebird')


// - - - - - - - - - - - - - - - - - - - - HELPER METHODS - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

function convertToJson(subscribers){
	var results = new Array()
    for (var i=0; i<subscribers.length; i++){
  	  var p = subscribers[i]
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
			
			var format = 'json'
			if (params['format'] != null){
				format = params['format'] // list or string
				delete params['format']
			}

			Subscriber.find(params, null, {limit:parseInt(limit), sort:{timestamp: -1}}, function(err, subscribers) {
				if (err) {
					reject(err)
					return
				}

				if (format == 'list' || format == 'string'){
					var list = []
					for (var i=0; i<subscribers.length; i++){
						var subscriber = subscribers[i]
						var email = subscriber.email.toLowerCase()
						if (list.indexOf(email) != -1) // already there, duplicate
							continue
						
						if (email.length == 0) // empty string
							continue

						if (email.indexOf('@') == -1) // invalid email
							continue

						list.push(email)
					}

					if (format == 'list'){
						resolve(list)
						return
					}

					if (format == 'string'){
						resolve(list.join(','))
						return
					}

					return
				}
				
				resolve(convertToJson(subscribers))
			})
		})
	},

	findById: function(id, isRaw){
		return new Promise(function(resolve, reject){
			Subscriber.findById(id, function(err, subscriber) {
				if (err) {
					reject(err)
					return
				}
				
				if (isRaw)
					resolve(subscriber)
				else
					resolve(subscriber.summary())
			})
		})
	},

	create: function(params){
		return new Promise(function(resolve, reject){
			Subscriber.find({email:params.email}, function(err, subscribers){
				if (err){
					reject(err)
					return
				}

				if (subscribers.length > 0){ // subscriber with email already exists - send it back
					var subscriber = subscribers[0]
					resolve(subscriber.summary())
					return
				}

				// Create new subscriber. This is what should happen:
				Subscriber.create(params, function(err, subscriber){
					if (err){
						reject(err)
						return
					}

					resolve(subscriber.summary())
					return
				})
			})
		})
	},

	// post: function(subscriberInfo, completion){
	// 	Subscriber.find({email:subscriberInfo.email}, function(err, subscribers){
	// 		if (err){
	// 			completion({confirmation:'fail', message:err.message}, null)
	// 			return
	// 		}

	// 		if (subscribers.length > 0){ // subscriber with email already exists - send it back
	// 			var subscriber = subscribers[0]
	// 			completion(null, subscriber.summary())
	// 			return
	// 		}

	// 		// Create new subscriber. This is what should happen:
	// 		Subscriber.create(subscriberInfo, function(err, subscriber){
	// 			if (err){
	// 				completion({confirmation:'fail', message:err.message}, null)
	// 				return
	// 			}

	// 			if (completion != null)
	// 				completion(null, subscriber.summary())
				
	// 			return
	// 		})
	// 	})
	// },

	put: function(subscriberId, subscriberInfo, completion){
		Subscriber.findByIdAndUpdate(subscriberId, subscriberInfo, {new:true}, function(err, subscriber){
			if (err){
				completion({confirmation:'fail', message:err.message}, null)
				return
			}
			
			completion(null, subscriber.summary())
			return
		})
	},

	delete: function(params, completion){
		Subscriber.find(params, function(err, subscribers){
			if (err){
				completion({confirmation:'fail', message:err.message}, null)
				return
			}

			for (var i=0; i<subscribers.length; i++){
				var subscriber = subscribers[i]
				subscriber.remove()				
			}

			completion(null, null)
		})
	}	

}



