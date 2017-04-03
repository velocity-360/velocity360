"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _react = require("react");

var React = _interopRequire(_react);

var Component = _react.Component;
module.exports = function (props) {
	var menu = props.items.map(function (item, i) {
		return React.createElement(
			"li",
			{ key: i },
			React.createElement(
				"a",
				{ onClick: props.selectItem.bind(undefined, item), style: { color: "#fff" }, href: "#" },
				React.createElement(
					"div",
					null,
					item.name,
					" ",
					item.selected ? React.createElement("i", { className: "icon-ok-sign" }) : null
				)
			)
		);
	});

	return React.createElement(
		"header",
		{ id: "header", className: "no-sticky hidden-xs sidebar", style: { paddingTop: 96, background: "#333" } },
		React.createElement(
			"div",
			{ id: "header-wrap" },
			React.createElement(
				"div",
				{ className: "container clearfix" },
				React.createElement(
					"div",
					{ id: "primary-menu-trigger" },
					React.createElement("i", { className: "icon-reorder" })
				),
				React.createElement(
					"nav",
					{ id: "primary-menu" },
					React.createElement(
						"ul",
						null,
						menu
					)
				),
				React.createElement(
					"div",
					{ style: localStyle.slack },
					React.createElement("img", { src: "/images/slack.png" }),
					React.createElement(
						"p",
						{ style: { marginTop: 8, marginBottom: 6 } },
						"Join our Slack channel to ask questions about tutorials and discuss general programming and industry topics:"
					),
					React.createElement("input", { placeholder: "Name", style: localStyle.input, type: "text" }),
					React.createElement("br", null),
					React.createElement("input", { placeholder: "Email", style: localStyle.input, type: "text" }),
					React.createElement(
						"a",
						{ href: "#", className: "button button-small button-circle button-border button-aqua" },
						"Join"
					)
				)
			)
		)
	);
};

var localStyle = {
	input: {
		background: "#f9f9f9",
		border: "none",
		borderBottom: "1px solid #ddd",
		marginBottom: 12,
		width: 100 + "%",
		height: 28
	},
	slack: {
		background: "#f9f9f9",
		borderRadius: 2,
		padding: 16
	}
};