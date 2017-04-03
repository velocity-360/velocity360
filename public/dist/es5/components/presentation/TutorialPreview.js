"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _react = require("react");

var React = _interopRequire(_react);

var Component = _react.Component;
module.exports = function (props) {
	var tutorial = props;
	return React.createElement(
		"div",
		{ className: props.className },
		React.createElement(
			"div",
			{ className: "feature-box fbox-center fbox-bg fbox-effect" },
			React.createElement(
				"div",
				{ className: "fbox-icon" },
				React.createElement(
					"a",
					{ href: "/tutorial/" + tutorial.slug },
					React.createElement("img", { src: "https://media-service.appspot.com/site/images/" + tutorial.image + "?crop=120", alt: tutorial.title })
				)
			),
			React.createElement(
				"h3",
				null,
				React.createElement(
					"a",
					{ style: { color: "#333" }, href: "/tutorial/" + tutorial.slug },
					tutorial.title
				)
			),
			React.createElement("hr", null),
			React.createElement(
				"p",
				{ className: "subtitle" },
				React.createElement(
					"a",
					{ style: { color: "#777" }, href: "/tutorial/" + tutorial.slug },
					tutorial.description.substring(0, 160) + "..."
				)
			)
		)
	);
};