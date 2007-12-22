<%= include 'HEADER' %>

var JsSpec = {
	Version: '<%= SPEC_VERSION %>'
};

Object.respondTo = function(object, name) {
	return Object.isFunction(object[name]);
}

<%= include 'matcher.js',
						'context.js',
            'expectation.js' %>

Spec = Matcher.Helpers;
Spec.describe = function(contextName, map) {
	new Context(contextName, map);
};
