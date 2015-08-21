var assert = require("assert");
var wrap = require("../");
var debug = require("debug")("test");

describe("before/after", function () {
	var results = [];
	var beforeCallback = function () {
		results.push(1);
		debug("beforeCallback", results);
	};
	var afterCallback = function () {
		results.push(3);
		debug("afterCallback", results);
	};
	it("should accept a functions that will be invoked before and after a callback", function (done) {
		function cb (err) {
			assert.ifError(err);
			results.push(2);
			debug("callback", results);
			// wait for after callback
			setTimeout(function () {
				assert.deepEqual(results, [1, 2, 3]);
				done();
			});
		}
		var wrapped = wrap(cb, beforeCallback, afterCallback);
		setTimeout(wrapped, 100);
	});
});
