"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var constants = _interopRequire(require("../constants"));

var initialState = {
	currentUser: null
};

module.exports = function (_x, action) {
	var state = arguments[0] === undefined ? initialState : arguments[0];
	var newState = Object.assign({}, state);
	var currentUser = Object.assign([], newState.currentUser);

	switch (action.type) {
		case constants.CURRENT_USER_RECIEVED:
			console.log("CURRENT_USER_RECIEVED: " + JSON.stringify(action.profile));
			newState.currentUser = action.profile;
			return newState;

		case constants.PROFILE_UPDDATED:
			newState.currentUser = action.profile;
			return newState;

		default:
			return state;
	}
};