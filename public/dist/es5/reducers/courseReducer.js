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
		case constants.COURSES_RECEIVED:
			action.courses.forEach(function (course, i) {
				if (newState[course.id] == null) {
					newState[course.id] = course;
					newState[course.slug] = course;
					updatedList.push(course);
				}
			});

			newState.all = updatedList;
			if (action.params == null) return newState;

			keys.forEach(function (key, i) {
				// ignore slug and id
				var array = newState[key] ? Object.assign([], newState[key]) : [];
			});

			return newState;

		default:
			return state;
	}
};