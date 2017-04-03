"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var firebase = _interopRequire(require("firebase"));

var databaseRef = null;
var config = {
	apiKey: "AIzaSyAdKSGhUOw1_-PNq9n9vXDkk_nuXj0lZzE",
	authDomain: "thevarsity-6abb7.firebaseapp.com",
	databaseURL: "https://thevarsity-6abb7.firebaseio.com",
	storageBucket: "thevarsity-6abb7.appspot.com",
	messagingSenderId: "566744350980"
};

module.exports = {

	configure: function () {
		firebase.initializeApp(config);
		databaseRef = firebase.database();
	},

	database: function () {
		if (databaseRef != null) return databaseRef;

		firebase.initializeApp(config);
		databaseRef = firebase.database();
		return databaseRef;
	},

	register: function (path, callback) {
		if (databaseRef == null) {
			firebase.initializeApp(config);
			databaseRef = firebase.database();
		}

		databaseRef.ref(path).on("value", function (snapshot) {
			var data = snapshot.val();
			if (data == null) {
				callback({}, null);
				return;
			}

			callback(null, data);
		});
	},

	post: function (path, data, callback) {
		if (databaseRef == null) {
			firebase.initializeApp(config);
			databaseRef = firebase.database();
		}

		databaseRef.ref(path).set(data, function () {
			callback();
		});
	}

};