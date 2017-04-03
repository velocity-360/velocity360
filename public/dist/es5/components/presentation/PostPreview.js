"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _react = require("react");

var React = _interopRequire(_react);

var Component = _react.Component;
module.exports = function (props) {
	var post = props;
	return React.createElement(
		"div",
		{ className: "entry clearfix" },
		React.createElement(
			"div",
			{ style: localStyle.imageContainer, className: "entry-image" },
			React.createElement(
				"a",
				{ href: "/post/" + post.slug },
				React.createElement("img", { style: localStyle.image, className: "image_fade", src: post.image + "=s320-c", alt: post.title })
			)
		),
		React.createElement(
			"div",
			{ className: "entry-c" },
			React.createElement(
				"div",
				{ className: "entry-title" },
				React.createElement(
					"h2",
					null,
					React.createElement(
						"a",
						{ href: "/post/" + post.slug },
						post.title
					)
				)
			),
			React.createElement(
				"ul",
				{ className: "entry-meta clearfix" },
				React.createElement(
					"li",
					null,
					post.dateString
				),
				React.createElement(
					"li",
					null,
					React.createElement(
						"a",
						{ href: "#" },
						"Admin"
					)
				)
			),
			React.createElement(
				"div",
				{ className: "entry-content" },
				React.createElement(
					"p",
					null,
					React.createElement(
						"a",
						{ href: "/post/" + post.slug },
						post.preview
					)
				)
			)
		)
	);
};

var localStyle = {
	image: {
		border: "1px solid #ddd",
		maxWidth: 200
	},
	imageContainer: {
		width: 160
	}
};