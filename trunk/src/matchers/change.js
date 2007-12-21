Matcher.addHelpers({
	change: function(receiver, message) {
		return new Matcher.Change(receiver, message);
	}
});

Matcher.create("Change", {
	initialize: function(receiver, message) {
		this.receiver = receiver;
		this.message = message;
		this.usingBy = this.usingFrom = this.usingTo = false;
	},
	matches: function(actual) {
		this.actual = actual;
		this.executeChange();
		if (this.usingFrom && this.from != this.before)
			return false;
		if (this.usingTo && this.to != this.after)
			return false;
		if (this.usingBy)
			return this.before + this.amount == this.after;
		return this.before != this.after;
	},
	executeChange: function() {
		var proxied = this.receiver[this.message];
		this.before = Object.isFunction(proxied) ? proxied() : proxied;
		Object.isFunction(this.actual) ? this.actual() : eval(this.actual);
		this.after = Object.isFunction(proxied) ? proxied() : proxied;
	},
	failureMessage: function() {
		if (this.usingTo)
			return this.message + " should have been changed to " + Object.inspect(this.to) + ", but is now " + Object.inspect(this.after);
		if (this.usingFrom)
			return this.message + " should have initially been " + Object.inspect(this.from) + ", but was " + Object.inspect(this.before);
		if (this.usingBy)
			return this.message + " should have been changed by " + Object.inspect(this.amount) + 
				", but was changed by " + Object.inspect(this.after - this.before);
		return this.message + " should have changed, but is still " + Object.inspect(this.before);
	},
	negativeFailureMessage: function() {
		return this.message + " should not have changed, but did change from " + 
			Object.inspect(this.before) + " to " + Object.inspect(this.after);
	},
	by: function(amount) {
		this.usingBy = true;
		this.amount = amount;
		return this;
	},
	from: function(from) {
		this.usingFrom = true;
		this.from = from;
		return this;
	},
	to: function(to) {
		this.usingTo = true;
		this.to = to;
		return this;
	}
});