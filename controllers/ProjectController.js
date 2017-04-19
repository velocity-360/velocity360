var Microservice = require('turbo360')

module.exports = {
	find: function(params, token){
		return Microservice({site_id:process.env.SITE_ID}).fetch('project', params) // this returns a promise
	},

	findById: function(id, token){
		return Microservice({site_id:process.env.SITE_ID}).fetchOne('project', id)
	},

	create: function(params, token){

	},

	put: function(id, params, token){

	},

	delete: function(token){

	}

}



