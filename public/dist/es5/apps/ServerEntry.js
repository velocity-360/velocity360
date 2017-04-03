"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _react = require("react");

var React = _interopRequire(_react);

var Component = _react.Component;
var Provider = require("react-redux").Provider;
module.exports = function (props) {
	return React.createElement(
		Provider,
		{ store: props.store },
		props.component
	);
};