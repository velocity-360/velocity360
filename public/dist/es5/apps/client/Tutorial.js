"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _react = require("react");

var React = _interopRequire(_react);

var Componet = _react.Componet;
var ReactDOM = _interopRequire(require("react-dom"));

var Provider = require("react-redux").Provider;
var store = _interopRequire(require("../../stores"));

var Tutorial = _interopRequire(require("../Tutorial"));

var initialState = window.__PRELOADED_STATE__;

var app = React.createElement(
	Provider,
	{ store: store.configureStore(initialState) },
	React.createElement(Tutorial, null)
);

ReactDOM.render(app, document.getElementById("root"));