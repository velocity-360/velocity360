webpackJsonp([2],{

/***/ 221:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(5);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(17);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRedux = __webpack_require__(11);

var _presentation = __webpack_require__(27);

var _containers = __webpack_require__(41);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Home = function (_Component) {
	_inherits(Home, _Component);

	function Home() {
		_classCallCheck(this, Home);

		return _possibleConstructorReturn(this, (Home.__proto__ || Object.getPrototypeOf(Home)).apply(this, arguments));
	}

	_createClass(Home, [{
		key: 'componentWillMount',
		value: function componentWillMount() {
			// console.log('HOME: componentWillMount = '+JSON.stringify(this.props))
		}
	}, {
		key: 'render',
		value: function render() {
			var SidebarContainer = (0, _containers.BaseContainer)(_presentation.Sidebar);
			var selected = this.props.session.home.selected;
			var menuItems = [{ name: 'tutorials', page: 'home', selected: selected == 'tutorials' }, { name: 'blog', page: 'home', selected: selected == 'blog' }, { name: 'community', page: 'home', selected: selected == 'community' }];

			var content = null;
			if (selected == 'tutorials') content = _react2.default.createElement(_containers.Tutorials, null);

			if (selected == 'blog') content = _react2.default.createElement(_containers.Posts, null);

			return _react2.default.createElement(
				'div',
				null,
				_react2.default.createElement(_presentation.Nav, null),
				_react2.default.createElement(
					'div',
					{ id: 'wrapper', className: 'clearfix' },
					_react2.default.createElement(SidebarContainer, { items: menuItems }),
					_react2.default.createElement(
						'section',
						{ id: 'content' },
						_react2.default.createElement(
							'div',
							{ className: 'content-wrap' },
							content
						)
					),
					_react2.default.createElement(
						'section',
						{ id: 'content', style: { background: '#f9f9f9' } },
						_react2.default.createElement(
							'div',
							{ className: 'content-wrap' },
							_react2.default.createElement(_presentation.Membership, null)
						)
					),
					_react2.default.createElement(_presentation.Footer, null)
				)
			);
		}
	}]);

	return Home;
}(_react.Component);

var stateToProps = function stateToProps(state) {
	return {
		session: state.session
	};
};

exports.default = (0, _reactRedux.connect)(stateToProps)(Home);

/***/ }),

/***/ 225:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _react = __webpack_require__(5);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(17);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRedux = __webpack_require__(11);

var _stores = __webpack_require__(26);

var _stores2 = _interopRequireDefault(_stores);

var _Home = __webpack_require__(221);

var _Home2 = _interopRequireDefault(_Home);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initialState = window.__PRELOADED_STATE__;

var app = _react2.default.createElement(
	_reactRedux.Provider,
	{ store: _stores2.default.configureStore(initialState) },
	_react2.default.createElement(_Home2.default, null)
);

_reactDom2.default.render(app, document.getElementById('root'));

/***/ })

},[225]);
//# sourceMappingURL=home.map