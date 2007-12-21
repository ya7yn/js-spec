Object.extend(Spec.Matchers.Helpers, {
	respondTo: function() {
		return new Spec.Matchers.RespondTo($A(arguments));
	}
});

Spec.Matchers.RespondTo = Class.create({
	initialize: function(names) {
		this.names = names;
	},
	matches: function(target) {
		this.target = target;
		this.nonResponsive = this.names.reject(Object.respondTo.curry(target));
		return this.nonResponsive.size() == 0;
	},
	failureMessage: function() {
		return "expected target to respond to " + this.nonResponsive.join(", ");
	},
	negativeFailureMessage: function() {
		return "expected target not to respond to " + this.names.join(", ");
	}
});

