<%= include 'HEADER' %>

var Spec = {
	Version: '<%= SPEC_VERSION %>'
};

Object.respondTo = function(object, name) {
	return Object.isFunction(object[name]);
}

<%= include 'matcher.js',
						'context.js',
            'expectation.js' %>

Spec.Expectation.extend(Array, Date, Function, Number, RegExp, String);

Class.create = Class.create.wrap(function() {
	var args = $A(arguments), proceed = args.shift(), klass = proceed.apply(Class, args);
	Spec.Expectation.extend(klass);
	return klass;
});
