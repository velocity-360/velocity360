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
var TutorialPreview = require("../presentation").TutorialPreview;
var Tutorials = (function (Component) {
	function Tutorials() {
		_classCallCheck(this, Tutorials);

		if (Component != null) {
			Component.apply(this, arguments);
		}
	}

	_inherits(Tutorials, Component);

	_prototypeProperties(Tutorials, null, {
		componentDidMount: {
			value: function componentDidMount() {},
			writable: true,
			configurable: true
		},
		render: {
			value: function render() {
				return React.createElement(
					"div",
					{ className: "container clearfix" },
					React.createElement(
						"div",
						{ className: "heading-block center" },
						React.createElement(
							"h1",
							{ style: { fontFamily: "Pathway Gothic One" } },
							"Tutorials"
						)
					),
					this.props.tutorials.all.map(function (tutorial, i) {
						var index = i + 1;
						var className = index % 3 == 0 ? "col_one_third col_last" : "col_one_third";
						return React.createElement(TutorialPreview, _extends({ className: className, key: tutorial.id }, tutorial));
					})
				);
			},
			writable: true,
			configurable: true
		}
	});

	return Tutorials;
})(Component);

var stateToProps = function (state) {
	return {
		tutorials: state.tutorial
	};
};

module.exports = connect(stateToProps)(Tutorials);
// console.log('componentDidMount: '+JSON.stringify(this.props.tutorials.all))