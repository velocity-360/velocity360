"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var Promise = _interopRequire(require("bluebird"));




var cbk;
var stripeHandler;

module.exports = {

	initialize: function (completion, onClosed) {
		cbk = completion;
		stripeHandler = StripeCheckout.configure({
			key: "pk_live_yKFwKJsJXwOxC0yZob29rIN5",
			image: "/img/logo_260.png",
			address: true,
			locale: "auto",
			panelLabel: "Premium: $19.99/month",
			token: function (token) {
				// You can access the token ID with `token.id`
				cbk(token);
			},
			closed: function () {
				if (onClosed) onClosed();
			}
		});
	},

	initializeWithText: function (text, completion, onClosed) {
		cbk = completion;
		stripeHandler = StripeCheckout.configure({
			key: "pk_live_yKFwKJsJXwOxC0yZob29rIN5",
			image: "/img/logo_260.png",
			address: true,
			locale: "auto",
			panelLabel: text,
			token: function (token) {
				// You can access the token ID with `token.id`
				cbk(token);
			},
			closed: function () {
				if (onClosed) onClosed();
			}
		});
	},

	showModal: function () {
		if (stripeHandler == null) return;

		stripeHandler.open({
			name: "Velocity 360",
			description: "Premium Subscription"
		});
	},

	showModalWithText: function (text) {
		if (stripeHandler == null) return;

		stripeHandler.open({
			name: "Velocity 360",
			description: text
		});
	}


};