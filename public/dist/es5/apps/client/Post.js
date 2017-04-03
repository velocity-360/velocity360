"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _react = require("react");

var React = _interopRequire(_react);

var Componet = _react.Componet;
var ReactDOM = _interopRequire(require("react-dom"));

var Provider = require("react-redux").Provider;
var store = _interopRequire(require("../../stores"));

var Post = _interopRequire(require("../Post"));

var initialState = window.__PRELOADED_STATE__;

var app = React.createElement(
	Provider,
	{ store: store.configureStore(initialState) },
	React.createElement(Post, null)
);

ReactDOM.render(app, document.getElementById("root"));