Object.extend(Spec.Matchers.Helpers, {
	match: function(expected) {
		return new Spec.Matchers.Match(expected);
	}
});

Spec.Matchers.Match = Class.create({
	initialize: function(expected) {
		this.expected = expected;
	},
	matches: function(target) {
		this.target = target;
		return this.target.match(this.expected);
	},
	failureMessage: function() {
		return this.message("");
	},
	negativeFailureMessage: function() {
		return this.message("not ")
	},
	message: function(maybe_not) {
		return "expected " + Object.inspect(this.target) + " " + maybe_not + "to match " + Object.inspect(this.expected);
	}
});

