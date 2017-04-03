"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _defineProperty = function (obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); };

var constants = _interopRequire(require("../constants"));

var APIManager = require("../utils").APIManager;


var postData = function (path, data, actionType, payloadKey) {
	return function (dispatch) {
		return APIManager.handlePost(path, data).then(function (response) {
			//			const result = response.result
			dispatch(_defineProperty({
				type: actionType }, payloadKey, response[payloadKey]));

			return response;
		})["catch"](function (err) {
			dispatch({
				type: constants.TOGGLE_LOADING,
				isLoading: false
			});
			throw err
			//			alert(err.message)
			;
		});
	};
};

var getData = function (path, params, actionType) {
	return function (dispatch) {
		return APIManager.handleGet(path, params).then(function (response) {
			dispatch({
				type: actionType,
				params: params, // can be null
				data: response.results || response.result
			});

			return response;
		})["catch"](function (err) {
			console.log("ERROR: " + JSON.stringify(err));
			dispatch({
				type: constants.TOGGLE_LOADING,
				isLoading: false
			});

			throw err
			// alert(err.message)
			;
		});
	};
};

var putData = function (path, data, actionType, payloadKey) {
	return function (dispatch) {
		return APIManager.handlePut(path, data).then(function (response) {
			//			console.log('RESPONSE: '+JSON.stringify(response[payloadKey]))
			dispatch(_defineProperty({
				type: actionType }, payloadKey, response[payloadKey]));

			return response;
		})["catch"](function (err) {
			dispatch({
				type: constants.TOGGLE_LOADING,
				isLoading: false
			});
			throw err
			// alert('ERROR: '+JSON.stringify(err))
			;
		});
	};
};

var submitStripeCharge = function (token, product) {
	return function (dispatch) {
		return APIManager.submitStripeCharge(token, product).then(function (response) {
			// returns profile and product
			console.log("SUBMIT STRIPE CHARGE: " + JSON.stringify(response));
			dispatch({
				type: constants.CURRENT_USER_RECIEVED,
				profile: response.profile
			});
			return response;
		}).then(function (response) {
			dispatch({ // TODO: make this conditional based on product purchased:
				type: constants.TUTORIAL_UPDATED,
				tutorial: response.tutorial
			});
			return response;
		})["catch"](function (err) {
			alert(err.message);
		});
	};
};

var submitStripeCard = function (token) {
	return function (dispatch) {
		return APIManager.submitStripeCard(token).then(function (response) {
			// returns profile and product
			//			console.log('SUBMIT STRIPE CARD: '+JSON.stringify(response))
			dispatch({
				type: constants.CURRENT_USER_RECIEVED,
				profile: response.profile
			});

			return response;
		})["catch"](function (err) {
			alert(err.message);
		});
	};
};

module.exports = {
	toggleLoading: function (isLoading) {
		return {
			type: constants.TOGGLE_LOADING,
			isLoading: isLoading
		};
	},

	register: function (credentials) {
		return function (dispatch) {
			dispatch({
				type: constants.TOGGLE_LOADING,
				isLoading: true
			});
			return dispatch(postData("/api/profile", credentials, constants.CURRENT_USER_RECIEVED, "profile"));
		};
	},

	login: function (credentials) {
		return function (dispatch) {
			dispatch({
				type: constants.TOGGLE_LOADING,
				isLoading: true
			});
			return dispatch(postData("/account/login", credentials, constants.CURRENT_USER_RECIEVED, "profile"));
		};
	},

	selectMenuItem: function (item) {
		return {
			type: constants.SELECT_MENU_ITEM,
			item: item
		};
	},

	currentUserReceived: function (user) {
		return {
			type: constants.CURRENT_USER_RECIEVED,
			user: user
		};
	},

	updateProfile: function (profile, params) {
		return function (dispatch) {
			return dispatch(putData("/api/profile/" + profile.id, params, constants.PROFILE_UPDDATED, "profile"));
		};
	},

	fetchCourses: function (params) {
		return function (dispatch) {
			return dispatch(getData("/api/course", params, constants.COURSES_RECEIVED));
		};
	},

	fetchTutorials: function (params) {
		return function (dispatch) {
			return dispatch(getData("/api/tutorial", params, constants.TUTORIALS_RECEIVED));
		};
	},

	fetchPosts: function (params) {
		return function (dispatch) {
			return dispatch(getData("/api/post", params, constants.POSTS_RECEIVED));
		};
	},

	submitStripeCharge: function (token, product) {
		return function (dispatch) {
			return dispatch(submitStripeCharge(token, product));
		};
	},

	submitStripeCard: function (token) {
		return function (dispatch) {
			return dispatch(submitStripeCard(token));
		};
	},

	updateTutorial: function (tutorial, params) {
		return function (dispatch) {
			return dispatch(putData("/api/tutorial/" + tutorial.id, params, constants.TUTORIAL_UPDATED, "tutorial"));
		};
	}

};