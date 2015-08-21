var debug = require("debug")("callback-wrapper");

module.exports = function (callback) {
  var args = [].slice.call(arguments, 1);
  var wrappedCallback;
  if (typeof args[0] === "function" || typeof args[1] === "function") {
    var beforeCallback = typeof args[0] === "function" ? args[0] : noop;
    var afterCallback = typeof args[1] === "function" ? args[1] : noop;
    wrappedCallback = function () {
      beforeCallback.apply(beforeCallback, arguments);
      callback.apply(callback, arguments);
      afterCallback.apply(afterCallback, arguments);
    };
    debug("created wrapped callbacks: before (%s) - after (%s)", beforeCallback.name || "anonymous", afterCallback.name || "anonymous");
    return wrappedCallback;
  }
  else {
    throw new Error("Invalid parameter. Parameter must be a function.");
  }
};

function noop () {
}
