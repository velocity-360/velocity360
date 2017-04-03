"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var superagent = _interopRequire(require("superagent"));

var Promise = _interopRequire(require("bluebird"));

var queue = []; // only queue the GET requests, for now

module.exports = {
	handleGet: function (endpoint, params) {
		return new Promise(function (resolve, reject) {
			if (queue.indexOf(endpoint) != -1) // request already running, ignore
				return;

			queue.push(endpoint);

			superagent.get(endpoint).query(params).set("Accept", "application/json").end(function (err, res) {
				var index = queue.indexOf(endpoint);
				queue.splice(index, 1);

				if (err) {
					reject(err);
					return;
				}

				if (res.body.confirmation != "success") {
					reject({ message: res.body.message });
					return;
				}

				resolve(res.body);
			});
		});
	},

	// using superagent here because for some reason, cookies don't get installed using fetch (wtf)
	handlePost: function (endpoint, body) {
		return new Promise(function (resolve, reject) {
			superagent.post(endpoint).send(body).set("Accept", "application/json").end(function (err, res) {
				if (err) {
					reject(err);
					return;
				}

				if (res.body.confirmation != "success") {
					reject({ message: res.body.message });
					return;
				}

				resolve(res.body);
			});
		});
	},

	handlePut: function (endpoint, body) {
		return new Promise(function (resolve, reject) {
			superagent.put(endpoint).send(body).set("Accept", "application/json").end(function (err, res) {
				if (err) {
					reject(err);
					return;
				}

				var json = res.body;
				if (json.confirmation != "success") {
					reject({ message: json.message });
					return;
				}

				resolve(json);
			});
		});
	},

	upload: function (file, completion) {
		superagent.get("https://media-service.appspot.com/api/upload").query(null).set("Accept", "application/json").end(function (err, res) {
			if (err) {
				completion(err, null);
				return;
			}

			if (res.body.confirmation != "success") {
				completion({ message: res.body.message }, null);
				return;
			}

			var uploadRequest = superagent.post(res.body.upload);
			uploadRequest.attach("file", file);
			uploadRequest.end(function (err, resp) {
				if (err) {
					console.log("UPLOAD ERROR: " + JSON.stringify(err));
					completion(err, null);
					return;
				}

				var image = resp.body.image;
				completion(null, image);
			});
		});
	},

	submitStripeCard: function (token) {
		return new Promise(function (resolve, reject) {
			var body = {
				stripeToken: token.id,
				email: token.email,
				name: token.name
			};

			superagent.post("/stripe/card").type("form").send(body).set("Accept", "application/json").end(function (err, res) {
				if (err) {
					reject(err);
					return;
				}

				if (res.body.confirmation != "success") {
					reject({ message: res.body.message });
					return;
				}

				resolve(res.body);
			});
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
		;
	},

	submitStripeCharge: function (token, product) {
		return new Promise(function (resolve, reject) {
			var price = product.price || product.tuition;
			var body = {
				stripeToken: token.id,
				email: token.email,
				amount: price,
				type: product.schema,
				description: product.title,
				product: product.id
			};

			superagent.post("/stripe/charge").type("form").send(body).set("Accept", "application/json").end(function (err, res) {
				if (err) {
					reject(err);
					return;
				}

				if (res.body.confirmation != "success") {
					reject({ message: res.body.message });
					return;
				}

				resolve(res.body);
			});
		});
	}
};