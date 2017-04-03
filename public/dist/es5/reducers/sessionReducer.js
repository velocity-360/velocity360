"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var constants = _interopRequire(require("../constants"));

var initialState = {
	selectedMenuItem: "home",
	page: "home",
	home: {
		selected: "tutorials"
	},
	tutorial: {
		selected: "overview"
	}
};


module.exports = function (_x, action) {
	var state = arguments[0] === undefined ? initialState : arguments[0];
	var newState = Object.assign({}, state);

	switch (action.type) {
		case constants.SELECT_MENU_ITEM:
			// {"name":"community","page":"home","selected":false}
			//			console.log('SELECT_MENU_ITEM: '+JSON.stringify(action.item))
			//			newState['selectedMenuItem'] = action.item
			newState[action.item.page] = {
				selected: action.item.name
			};

			return newState;

		// case constants.TOGGLE_LOADING:
		// 	newState['isLoading'] = action.isLoading
		// 	return newState

		default:
			return state;
	}
};