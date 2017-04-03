"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var constants = _interopRequire(require("../constants"));

var initialState = {
	all: null
};

module.exports = function (_x, action) {
	var state = arguments[0] === undefined ? initialState : arguments[0];
	var newState = Object.assign({}, state);

	switch (action.type) {
		case constants.POSTS_RECEIVED:
			console.log("POSTS_RECEIVED: " + JSON.stringify(action.data));
			newState.all = action.data;
			return newState;


		default:
			return state;
	}
};