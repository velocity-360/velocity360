var superagent = require('superagent')
var Promise = require('bluebird')

const BASE_URL = 'https://velocity-microservices.herokuapp.com'

var config = {
	site_id: null
}

var instance = {

	fetch: function(resource, params){
		// console.log('FETCH: '+config.site_id)
		// console.log('Resource: '+resource)
		// console.log('Params: '+JSON.stringify(params))

		params['site'] = config.site_id
		return new Promise(function(resolve, reject){
			superagent
			.get(BASE_URL+'/api/'+resource)
			.query(params)
			.set('Accept', 'application/json')
			.end(function(err, response){
				if (err){
					reject(err)
					return
				}

				if (response.body.confirmation == 'fail'){
					reject(new Error(response.body.message))
					return
				}

				resolve(response.body.results)
//				console.log('RESPNSE: '+JSON.stringify(response.body))
			})
		})
	},

	fetchOne: function(resource, id){
		// params['site'] = config.site_id
		return new Promise(function(resolve, reject){
			superagent
			.get(BASE_URL+'/api/'+resource+'/'+id)
			.query(null)
			.set('Accept', 'application/json')
			.end(function(err, response){
				if (err){
					reject(err)
					return
				}

				if (response.body.confirmation == 'fail'){
					reject(new Error(response.body.message))
					return
				}

				resolve(response.body.result)
			})
		})
	},

	create: function(resource, params){
		params['site'] = config.site_id
		return new Promise(function(resolve, reject){

		})
	},


	update: function(resource, id, params){
		return new Promise(function(resolve, reject){

		})
	}
}

module.exports = function(credentials){
	// console.log('TEST: '+JSON.stringify(credentials))
	config['site_id'] = credentials['site_id']

	// var config = {
	// 	site_id: credentials.id,
	// 	fetch: instanceMethods.fetch
	// }

	return instance
}