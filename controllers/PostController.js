var Microservice = require('../utils/Microservice')


module.exports = {
	find: function(params, token){
		return Microservice({site_id:process.env.SITE_ID}).fetch('post', params) // this returns a promise
	},

	findById: function(id, token){
		return Microservice({site_id:process.env.SITE_ID}).fetchOne('post', id)
	},

	create: function(params, token){

	},

	put: function(id, params, token){

	},

	delete: function(token){

	}

}



