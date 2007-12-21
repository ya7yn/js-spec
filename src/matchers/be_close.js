Object.extend(Spec.Matchers.Helpers, {
	beClose: function(expected, delta) {
		return new Spec.Matchers.BeClose(expected, delta);
	}
});

Spec.Matchers.BeClose = Class.create({
	initialize: function(expected, delta) {
		this.expected = expected;
		this.delta = delta;
	},
	matches: function(target) {
		this.target = target;
		return (this.target - this.expected).abs() < this.delta;
	},
	failureMessage: function() {
		return "expected " + this.expected + " +/- (< " + this.delta + "), got " + this.target;
	},
	negativeFailureMessage: function() {
		return "expected " + this.expected + " not to be within " + this.delta + " of " + this.target;
	}
});

