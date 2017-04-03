"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var React = _interopRequire(_react);

var Component = _react.Component;
var connect = require("react-redux").connect;
var actions = _interopRequire(require("../../actions"));

var _utils = require("../../utils");

var TextUtils = _utils.TextUtils;
var Stripe = _utils.Stripe;
var APIManager = _utils.APIManager;


var BaseContainer = function (Container) {
	var Base = (function (Component) {
		function Base() {
			_classCallCheck(this, Base);

			_get(Object.getPrototypeOf(Base.prototype), "constructor", this).call(this);
			this.state = {
				credentials: {
					name: "",
					email: "",
					password: ""
				}
			};
		}

		_inherits(Base, Component);

		_prototypeProperties(Base, null, {
			updateCredentials: {
				value: function updateCredentials(event) {
					var updated = Object.assign({}, this.state.credentials);
					updated[event.target.id] = event.target.value;
					this.setState({
						credentials: updated
					});
				},
				writable: true,
				configurable: true
			},
			subscribe: {
				value: function subscribe(event) {
					APIManager.handlePost("/account/subscribe", this.state.credentials).then(function (response) {
						alert("Thanks for Subscribing! We will send you an email shortly with an invitation to our Slack Chanel!");
					})["catch"](function (err) {});
				},
				writable: true,
				configurable: true
			},
			followTutorial: {
				value: function followTutorial(tutorial) {
					var _this = this;
					var user = this.props.account.currentUser;
					if (user == null) {
						// register first THEN follow tutorial:
						APIManager.handlePost("/account/register", this.state.credentials).then(function (response) {
							var profile = response.profile;
							var subscribers = Object.assign([], tutorial.subscribers);
							subscribers.push(profile._id);
							return _this.props.updateTutorial(tutorial, { subscribers: subscribers });
						}).then(function (response) {
							window.location.href = "/account";
						})["catch"](function (err) {
							alert("ERROR: " + err.message);
						});

						return;
					}

					var subscribers = Object.assign([], tutorial.subscribers);
					if (subscribers.indexOf(user.id) != -1) {
						// already subscribed
						window.location.href = "/account";
						return;
					}

					subscribers.push(user.id);
					this.props.updateTutorial(tutorial, { subscribers: subscribers }).then(function (response) {
						window.location.href = "/account";
					})["catch"](function (err) {});
				},
				writable: true,
				configurable: true
			},
			register: {
				value: function register(event) {
					console.log("register: " + JSON.stringify(this.state.credentials));
					APIManager.handlePost("/account/register", this.state.credentials).then(function (response) {
						window.location.href = "/account";
					})["catch"](function (err) {
						alert("ERROR: " + err);
					});
				},
				writable: true,
				configurable: true
			},
			showStripeModal: {
				value: function showStripeModal(product, event) {
					var _this = this;
					event.preventDefault();
					//	        this.props.toggleLoading(true)

					if (product.schema == "subscription") {
						Stripe.initializeWithText("Subscribe", function (token) {
							_this.props.submitStripeCard(token).then(function (response) {
								window.location.href = "/account"
								// console.log('TEST: '+JSON.stringify(response))
								//	                    this.props.toggleLoading(false)
								;
							})["catch"](function (err) {
								alert(err.message);
							});
						}, function () {
							setTimeout(function () {}, 100);
						});

						Stripe.showModalWithText("Premium Subscription - $19.99/mo");
						return;
					}

					Stripe.initializeWithText("Purchase", function (token) {
						_this.props.submitStripeCharge(token, product).then(function (response) {
							window.location.href = "/account"
							//                    console.log('TEST: '+JSON.stringify(response))
							//                    this.props.toggleLoading(false)
							;
						})["catch"](function (err) {});
					}, function () {
						setTimeout(function () {}, 100);
					});

					Stripe.showModalWithText(product.title + " - $" + product.price);
				},
				writable: true,
				configurable: true
			},
			updateData: {
				value: function updateData(req, entity, params) {
					var user = this.props.account.currentUser; // every update requires login
					if (user == null) {
						alert("Please register or log in.");
						// Alert.showAlert({
						// 	title: 'Oops',
						// 	text: 'Please register or log in.'
						// })
						return;
					}

					console.log("updateData: " + req + " == " + JSON.stringify(params));
					if (req == "profile") {
						return this.props.updateProfile(entity, params);
					}
				},
				writable: true,
				configurable: true
			},
			selectMenuItem: {
				value: function selectMenuItem(item, event) {
					if (event != null) {
						event.preventDefault();
						window.scrollTo(0, 0);
					}

					// console.log('selectMenuItem: '+JSON.stringify(item))
					this.props.selectMenuItem(item);
				},
				writable: true,
				configurable: true
			},
			fetchData: {
				value: function fetchData(resource, params, event) {
					if (event) event.preventDefault();

					if (resource == "post") {
						this.props.fetchPosts(params);
					}
				},
				writable: true,
				configurable: true
			},
			render: {
				value: function render() {
					return React.createElement(
						"div",
						null,
						React.createElement(Container, _extends({
							fetchData: this.fetchData.bind(this),
							updateCredentials: this.updateCredentials.bind(this),
							register: this.register.bind(this),
							subscribe: this.subscribe.bind(this),
							followTutorial: this.followTutorial.bind(this),
							showStripeModal: this.showStripeModal.bind(this),
							updateData: this.updateData.bind(this),
							selectItem: this.selectMenuItem.bind(this)
						}, this.props))
					);
				},
				writable: true,
				configurable: true
			}
		});

		return Base;
	})(Component);

	var stateToProps = function (state) {
		return {
			session: state.session,
			account: state.account,
			tutorials: state.tutorial
		};
	};

	var dispatchToProps = function (dispatch) {
		return {
			fetchPosts: function (params) {
				return dispatch(actions.fetchPosts(params));
			},
			selectMenuItem: function (item) {
				return dispatch(actions.selectMenuItem(item));
			},
			submitStripeCard: function (token) {
				return dispatch(actions.submitStripeCard(token));
			},
			submitStripeCharge: function (token, product) {
				return dispatch(actions.submitStripeCharge(token, product));
			},
			updateProfile: function (profile, params) {
				return dispatch(actions.updateProfile(profile, params));
			},
			updateTutorial: function (tutorial, params) {
				return dispatch(actions.updateTutorial(tutorial, params));
			}
		};
	};


	return connect(stateToProps, dispatchToProps)(Base);
};

module.exports = BaseContainer;
//	                    this.props.toggleLoading(false)
//                    this.props.toggleLoading(false)