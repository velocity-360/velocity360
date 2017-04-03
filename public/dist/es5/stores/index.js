"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _redux = require("redux");

var createStore = _redux.createStore;
var applyMiddleware = _redux.applyMiddleware;
var combineReducers = _redux.combineReducers;
var thunk = _interopRequire(require("redux-thunk"));

var _reducers = require("../reducers");

var accountReducer = _reducers.accountReducer;
var sessionReducer = _reducers.sessionReducer;
var courseReducer = _reducers.courseReducer;
var tutorialReducer = _reducers.tutorialReducer;
var postReducer = _reducers.postReducer;


var store;
module.exports = {

	configureStore: function (initialState) {
		var reducers = combineReducers({
			account: accountReducer,
			session: sessionReducer,
			course: courseReducer,
			tutorial: tutorialReducer,
			post: postReducer
		});

		store = createStore(reducers, initialState, applyMiddleware(thunk));

		return store;
	},

	currentStore: function () {
		return store;
	}

};