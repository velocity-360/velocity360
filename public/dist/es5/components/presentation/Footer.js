"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _react = require("react");

var React = _interopRequire(_react);

var Component = _react.Component;
module.exports = function (props) {
	return React.createElement(
		"footer",
		{ id: "footer", className: "dark notopborder", style: { background: "#260354" } },
		React.createElement(
			"div",
			{ id: "copyrights" },
			React.createElement(
				"div",
				{ className: "container center clearfix", style: { color: "#f9f9f9" } },
				"Copyright © 2017. Velocity 360"
			)
		)
	);
};