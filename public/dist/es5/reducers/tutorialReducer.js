"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var constants = _interopRequire(require("../constants"));

var initialState = {
	all: null
};

module.exports = function (_x, action) {
	var state = arguments[0] === undefined ? initialState : arguments[0];
	var newState = Object.assign({}, state);
	var updatedList = state.all ? Object.assign([], state.all) : [];

	switch (action.type) {
		case constants.TUTORIALS_RECEIVED:
			//			console.log('TUTORIALS_RECEIVED: '+JSON.stringify(action.tutorials))
			action.tutorials.forEach(function (tutorial, i) {
				if (newState[tutorial.id] == null) {
					newState[tutorial.id] = tutorial;
					newState[tutorial.slug] = tutorial;
					updatedList.push(tutorial);

					var list = newState[tutorial.category] ? Object.assign([], newState[tutorial.category]) : [];
					list.push(tutorial);
					newState[tutorial.category] = list;
				}
			});

			newState.all = updatedList;
			return newState;

		case constants.TUTORIAL_UPDATED:
			newState[action.tutorial.id] = action.tutorial;
			newState[action.tutorial.slug] = action.tutorial;

			var array = [];
			updatedList.forEach(function (tutorial, i) {
				if (tutorial.id == action.tutorial.id) // replace old with new
					array.push(action.tutorial);else array.push(tutorial);
			});

			newState.all = array;
			return newState;

		default:
			return state;
	}
};