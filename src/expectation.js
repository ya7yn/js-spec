Spec.Expectation = {
	extend: function() {
		$A(arguments).each(function(object) { 
			object.prototype["should"] = Spec.Expectation.should; 
			object.prototype["shouldNot"] = Spec.Expectation.shouldNot;
		});
	},
	
	should: function(matcher) {
		return matcher.matches(this) ? true : matcher.failureMessage();
	},
	shouldNot: function(matcher) {
		if (!Object.isFunction(matcher.negativeFailureMessage))
			throw Error("matcher " + Object.inspect(matcher) + " does not allow shouldNot");
		return matcher.matches(this) ? matcher.negativeFailureMessage() : true;
	}
};

Object.extend(Spec, Spec.Matchers.Helpers);
Spec.satisfy = Spec.describe = function(contextName, map) {
	new Spec.Context(contextName, map);
};

