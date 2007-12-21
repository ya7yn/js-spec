Object.extend(Spec.Matchers.Helpers, {
	include: function() {
		return new Spec.Matchers.Include($A(arguments));
	}
});

Spec.Matchers.Include = Class.create({
	initialize: function(expecteds) {
		this.expecteds = expecteds;
	},
	matches: function(target) {
		this.target = target;
		return this.expecteds.all(function(expected) { return target.include(expected) });
	},
	failureMessage: function() {
		return this.message();
	},
	negativeFailureMessage: function() {
		return this.message("not ");
	},
	message: function(maybe_not) {
		return "expected #{target} #{maybe_not}to include #{expecteds}".interpolate({
			maybe_not: maybe_not || "",
			target:    this.target.inspect(),
			expecteds: this.expecteds.map(Object.inspect).join(", ")
		});
	}
});

