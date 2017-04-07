import superagent from 'superagent'
import Promise from 'bluebird'

var queue = [] // only queue the GET requests, for now

export default {
	handleGet: (endpoint, params) => {
		return new Promise((resolve, reject) => {
			if (queue.indexOf(endpoint) != -1) // request already running, ignore
				return
			
			queue.push(endpoint)

			superagent
			.get(endpoint)
			.query(params)
			.set('Accept', 'application/json')
			.end((err, res) => {
				let index = queue.indexOf(endpoint)
				queue.splice(index, 1)

				if (err){ 
					reject(err)
					return
				}

				if (res.body.confirmation != 'success'){
					reject({message:res.body.message})
					return
				}

				resolve(res.body)
			})
		})
	},

	// using superagent here because for some reason, cookies don't get installed using fetch (wtf)
	handlePost: (endpoint, body) => {
		return new Promise((resolve, reject) => {
			superagent
			.post(endpoint)
			.send(body)
			.set('Accept', 'application/json')
			.end((err, res) => {
				if (err){ 
					reject(err)
					return
				} 

				if (res.body.confirmation != 'success'){
					reject({message:res.body.message})
		    		return
				}

				resolve(res.body)
			})
		})
	},

	handlePut: (endpoint, body) => {
		return new Promise((resolve, reject) => {
			superagent
			.put(endpoint)
			.send(body)
			.set('Accept', 'application/json')
			.end((err, res) => {
				if (err){ 
					reject(err)
					return
				}
				
				const json = res.body
				if (json.confirmation != 'success'){
					reject({message:json.message})
		    		return
				}

				resolve(json)
			})
		})
	},

	upload: (file, completion) => {
		superagent
		.get('https://media-service.appspot.com/api/upload')
		.query(null)
		.set('Accept', 'application/json')
		.end((err, res) => {
			if (err){ 
				completion(err, null)
				return
			}

			if (res.body.confirmation != 'success'){
	    		completion({message:res.body.message}, null)
	    		return
			}

	        var uploadRequest = superagent.post(res.body.upload)
	        uploadRequest.attach('file', file)
	        uploadRequest.end((err, resp) => {
	        	if (err){
			      	console.log('UPLOAD ERROR: '+JSON.stringify(err))
					completion(err, null)
	              	return
	        	}

		      	var image = resp.body.image
				completion(null, image)
	        })
		})
	},

	submitStripeCard: (token) => {
		// {"id":"tok_19vYn5C5b8QCRB75sRSWkA1o","object":"token","card":{"id":"card_19vYn4C5b8QCRB75SkGkpcyh"
		// "object":"card","address_city":"Woodcliff Lake","address_country":"United States",
		// "address_line1":"12 Lyons Court","address_line1_check":"pass","address_line2":null,"address_state":"NJ",
		// "address_zip":"07677","address_zip_check":"pass","brand":"Visa","country":"US","cvc_check":"pass",
		// "dynamic_last4":null,"exp_month":6,"exp_year":2020,"funding":"debit","last4":"9072","metadata":{},
		// "name":"Denny Kwon","tokenization_method":null},"client_ip":"74.71.60.50","created":1489094839,
		// "email":"dennykwon2@gmail.com","livemode":true,"type":"card","used":false}
		return new Promise((resolve, reject) => {
			var body = {
				stripeToken: token.id,
				email: token.email,
				name: token.card.name
			}

			superagent
			.post('/stripe/card')
			.type('form')
			.send(body)
			.set('Accept', 'application/json')
			.end(function(err, res){
				if (err){ 
					reject(err)
					return
				}
				
				if (res.body.confirmation != 'success'){
					reject({message:res.body.message})
		    		return
				}

				resolve(res.body)
			})
		})

		// var body = {
		// 	stripeToken: token.id,
		// 	email: token.email
		// }

		// superagent
		// .post('/stripe/card')
		// .type('form')
		// .send(body)
		// .set('Accept', 'application/json')
		// .end(function(err, res){
		// 	if (completion == null)
		// 		return

		// 	if (err){ 
		// 		completion(err, null)
		// 		return
		// 	}
			
		// 	if (res.body.confirmation != 'success'){
	 //    		completion({message:res.body.message}, null)
	 //    		return
		// 	}

	 //    	completion(null, res.body)
		// })
	},	

	submitStripeCharge: (token, product) => {
		return new Promise((resolve, reject) => {
			var price = product.price || product.tuition
			var body = {
				stripeToken: token.id,
				email: token.email,
				amount: price,
				type: product.schema,
				description: product.title,
				product: product.id
			}

			superagent
			.post('/stripe/charge')
			.type('form')
			.send(body)
			.set('Accept', 'application/json')
			.end(function(err, res){
				if (err){ 
					reject(err)
					return
				}
				
				if (res.body.confirmation != 'success'){
					reject({message:res.body.message})
		    		return
				}

				resolve(res.body)
			})
		})
	}
}