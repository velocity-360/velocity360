"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var Time = _interopRequire(require("react-time"));

var React = _interopRequire(require("react"));

var differenceFromNow = function (timestamp) {
    var now = new Date();
    var ts = new Date(timestamp);
    var diff = now - ts;
    return diff;
};

module.exports = {

    formattedDate: function (timestamp) {
        var diff = differenceFromNow(timestamp);
        var date = null;
        if (diff > 24 * 60 * 1000) return React.createElement(Time, { value: timestamp, format: "MMM DD, YYYY" });

        return React.createElement(Time, { value: timestamp, titleFormat: "YYYY/MM/DD HH:mm", relative: true });
    },

    abbreviatedDate: function (timestamp) {
        var diff = differenceFromNow(timestamp);
        var date = null;
        if (diff > 24 * 60 * 1000) return React.createElement(Time, { value: timestamp, format: "MMM DD" });

        return React.createElement(Time, { value: timestamp, format: "MMM DD", relative: true });
    },

    today: function () {
        return React.createElement(Time, { value: new Date(), format: "MMM D, YYYY" });
    }
};