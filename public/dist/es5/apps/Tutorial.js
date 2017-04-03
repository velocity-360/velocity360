"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _react = require("react");

var React = _interopRequire(_react);

var Component = _react.Component;
var ReactDOM = _interopRequire(require("react-dom"));

var connect = require("react-redux").connect;
var _componentsPresentation = require("../components/presentation");

var Nav = _componentsPresentation.Nav;
var Sidebar = _componentsPresentation.Sidebar;
var Membership = _componentsPresentation.Membership;
var Footer = _componentsPresentation.Footer;
var _componentsContainers = require("../components/containers");

var BaseContainer = _componentsContainers.BaseContainer;
var Tutorials = _componentsContainers.Tutorials;
var Posts = _componentsContainers.Posts;
var Tutorial = (function (Component) {
	function Tutorial() {
		_classCallCheck(this, Tutorial);

		if (Component != null) {
			Component.apply(this, arguments);
		}
	}

	_inherits(Tutorial, Component);

	_prototypeProperties(Tutorial, null, {
		componentWillMount: {
			value: function componentWillMount() {},
			writable: true,
			configurable: true
		},
		render: {
			value: function render() {
				var SidebarContainer = BaseContainer(Sidebar);
				// const selected = this.props.session.home.selected
				var menuItems = [{ name: "overview", page: "tutorial", selected: true }, { name: "units", page: "tutorial", selected: false }, { name: "community", page: "tutorial", selected: false }];

				return React.createElement(
					"div",
					null,
					React.createElement(Nav, null),
					React.createElement(
						"div",
						{ id: "wrapper", className: "clearfix" },
						React.createElement(SidebarContainer, { items: menuItems }),
						React.createElement(
							"section",
							{ id: "content" },
							React.createElement(
								"div",
								{ className: "content-wrap" },
								"Tutorial PAGE"
							)
						),
						React.createElement(
							"section",
							{ id: "content", style: { background: "#f9f9f9" } },
							React.createElement(
								"div",
								{ className: "content-wrap" },
								React.createElement(Membership, null)
							)
						),
						React.createElement(Footer, null)
					)
				);
			},
			writable: true,
			configurable: true
		}
	});

	return Tutorial;
})(Component);

var stateToProps = function (state) {
	return {
		session: state.session
	};
};

module.exports = connect(stateToProps)(Tutorial);
// console.log('HOME: componentWillMount = '+JSON.stringify(this.props))