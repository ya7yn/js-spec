Object.extend(Spec.Matchers.Helpers, {
	satisfy: function(block) {
		return new Spec.Matchers.Satisfy(block);
	}
});

Spec.Matchers.Satisfy = Class.create({
	initialize: function(block) {
		this.block = block;
	},
	matches: function(target, block) {
		if (block) this.block = block;
		this.target = target;
		return this.block(target);
	},
	failureMessage: function() {
		return "expected " + Object.inspect(this.target) + " to satisfy the block";
	},
	negativeFailureMessage: function() {
		return "expected " + Object.inspect(this.target) + " not to satisfy the block";
	}
});

