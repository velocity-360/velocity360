"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _react = require("react");

var React = _interopRequire(_react);

var Component = _react.Component;
module.exports = function (props) {
	return React.createElement(
		"div",
		{ className: "container clearfix" },
		React.createElement(
			"div",
			{ className: "heading-block center" },
			React.createElement(
				"h1",
				{ style: { fontFamily: "Pathway Gothic One" } },
				"Membership"
			)
		),
		React.createElement(
			"div",
			{ className: "row clear-bottommargin" },
			React.createElement(
				"div",
				{ className: "col-md-6 col-sm-6 bottommargin" },
				React.createElement(
					"div",
					{ className: "promo promo-border promo-mini", style: { background: "#fff" } },
					React.createElement(
						"h3",
						null,
						"Premium"
					),
					"$19.99/month",
					React.createElement("hr", null),
					React.createElement(
						"p",
						null,
						"Join as a premium member for $19.99 each month and receive unlimited access to all tutorials, code samples, and forums on the site."
					),
					React.createElement(
						"ul",
						{ style: { paddingLeft: 16, marginBottom: 0 } },
						React.createElement(
							"li",
							null,
							"Downloadable Code Samples"
						),
						React.createElement(
							"li",
							null,
							"Downloadable Videos"
						),
						React.createElement(
							"li",
							null,
							"Q & A Forum Access"
						),
						React.createElement(
							"li",
							null,
							"Discounts on Live Courses"
						)
					),
					React.createElement(
						"a",
						{ href: "#", className: "button button-border button-circle button-dark" },
						"Join"
					)
				)
			),
			React.createElement(
				"div",
				{ className: "col-md-6 col-sm-6 bottommargin" },
				React.createElement(
					"div",
					{ className: "promo promo-border promo-mini", style: { background: "#fff" } },
					React.createElement(
						"h3",
						null,
						"Basic"
					),
					"Free",
					React.createElement("hr", null),
					React.createElement(
						"p",
						null,
						"Join as a basic member to gain access to the free tutorials, get notifications when new tutorials and courses are published, and participate in the Q&A forums."
					),
					React.createElement("input", { type: "text", style: { border: "none", borderBottom: "1px solid #eee", width: 100 + "%", marginBottom: 16 }, placeholder: "Username" }),
					React.createElement("br", null),
					React.createElement("input", { type: "text", style: { border: "none", borderBottom: "1px solid #eee", width: 100 + "%", marginBottom: 16 }, placeholder: "Email" }),
					React.createElement("br", null),
					React.createElement(
						"a",
						{ href: "#", className: "button button-border button-circle button-dark" },
						"Join"
					)
				)
			)
		)
	);
};