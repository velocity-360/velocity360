"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var React = _interopRequire(_react);

var Component = _react.Component;
var connect = require("react-redux").connect;
var PostPreview = require("../presentation").PostPreview;
var BaseContainer = _interopRequire(require("./BaseContainer"));

var Posts = (function (Component) {
	function Posts() {
		_classCallCheck(this, Posts);

		if (Component != null) {
			Component.apply(this, arguments);
		}
	}

	_inherits(Posts, Component);

	_prototypeProperties(Posts, null, {
		componentDidMount: {
			value: function componentDidMount() {
				if (this.props.posts.all != null) {
					return;
				}this.props.fetchData("post", {});
			},
			writable: true,
			configurable: true
		},
		render: {
			value: function render() {
				var list = this.props.posts.all || [];

				return React.createElement(
					"div",
					{ className: "container clearfix" },
					React.createElement(
						"div",
						{ className: "heading-block center" },
						React.createElement(
							"h1",
							{ style: { fontFamily: "Pathway Gothic One" } },
							"Blog"
						)
					),
					React.createElement(
						"div",
						{ className: "postcontent nobottommargin clearfix" },
						React.createElement(
							"div",
							{ id: "posts", className: "small-thumbs" },
							list.map(function (post, i) {
								return React.createElement(PostPreview, _extends({ key: post.id }, post));
							})
						)
					)
				);
			},
			writable: true,
			configurable: true
		}
	});

	return Posts;
})(Component);

var stateToProps = function (state) {
	return {
		posts: state.post

	};
};

module.exports = connect(stateToProps)(BaseContainer(Posts));