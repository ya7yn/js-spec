Object.extend(Spec.Matchers.Helpers, {
	be: function(expected) {
		return new Spec.Matchers.Be("===", expected);
	},
	equal: function(expected) {
		return new Spec.Matchers.Be("==", expected);
	},
	beLessThan: function(expected) {
		return new Spec.Matchers.Be("<", expected);
	},
	beLessOrEqualThan: function(expected) {
		return new Spec.Matchers.Be("<=", expected);
	},
	beGreaterThan: function(expected) {
		return new Spec.Matchers.Be(">", expected);
	},
	beGreaterOrEqualThan: function(expected) {
		return new Spec.Matchers.Be(">=", expected);
	}
});

Spec.Matchers.Be = Class.create({
	initialize: function(comparison, expected) {
		this.expected = expected;
		this.comparison = comparison;
	},
	matches: function(target) {
		this.target = target;
		return this[this.comparison]();
	},
	"===": function() {
		return this.target === this.expected;
	},
	"==": function() {
		return Object.isArray(this.expected) && Object.isArray(this.target)
			? this.expected.size() == this.target.size() && 
					this.expected.all(function(element, index) { return element == this.target[index] }.bind(this))
			: this.target == this.expected;
	},
	"<": function() {
		return this.target < this.expected;
	},
	"<=": function() {
		return this.target <= this.expected;
	},
	">": function() {
		return this.target > this.expected;
	},
	">=": function() {
		return this.target >= this.expected;
	},
	failureMessage: function(relation) {
		var relation = relation || " ";
		return "expected " + Object.inspect(this.expected) + relation + "to be " + this.comparison.replace(/_/, " ") + 
			" " + Object.inspect(this.target);
	},
	negativeFailureMessage: function() {
		return this.failureMessage(" not ");
	}
});

