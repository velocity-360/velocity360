"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _react = require("react");

var React = _interopRequire(_react);

var Component = _react.Component;
module.exports = function (props) {
	return React.createElement(
		"div",
		{ id: "page-menu" },
		React.createElement(
			"div",
			{ id: "page-menu-wrap" },
			React.createElement(
				"div",
				{ className: "container clearfix", style: { width: 98 + "%" } },
				React.createElement(
					"div",
					{ style: { fontFamily: "Pathway Gothic One", fontSize: 30, fontWeight: 100 }, className: "menu-title" },
					React.createElement(
						"a",
						{ style: { color: "#fff" }, href: "/" },
						"Velocity 360"
					)
				),
				React.createElement(
					"nav",
					{ className: "one-page-menu" },
					React.createElement(
						"ul",
						{ className: "hidden-xs" },
						React.createElement(
							"li",
							null,
							React.createElement(
								"a",
								{ href: "/" },
								React.createElement(
									"div",
									null,
									"Home"
								)
							)
						),
						React.createElement(
							"li",
							null,
							React.createElement(
								"a",
								{ href: "/" },
								React.createElement(
									"div",
									null,
									"About"
								)
							)
						),
						React.createElement(
							"li",
							null,
							React.createElement(
								"a",
								{ href: "#" },
								React.createElement(
									"div",
									null,
									"Login"
								)
							)
						)
					),
					React.createElement(
						"ul",
						{ className: "visible-xs", style: { background: "#000" } },
						React.createElement(
							"li",
							null,
							React.createElement(
								"a",
								{ href: "#", "data-href": "#header" },
								React.createElement(
									"div",
									null,
									"Test"
								)
							)
						)
					)
				),
				React.createElement(
					"div",
					{ id: "page-submenu-trigger" },
					React.createElement("i", { className: "icon-reorder" })
				)
			)
		)
	);
};