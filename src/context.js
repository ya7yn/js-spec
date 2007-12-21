Spec.Context = Class.create({
	initialize: function(name, specs) {
		this.name = name;
		this.filters = { beforeAll: [], beforeEach: [], afterEach: [], afterAll: [] };
		this.specs = new Hash;
		(specs || Prototype.K).apply(this);
		Spec.Context.register(this);
	},
	addFilter: function(type, filter) {
		this.filters[type.camelize()].push(filter);
	},
	before: function(type, filter) {
		this.addFilter("before-" + type, filter);
	},
	after: function(filterType, filter) {
		this.addFilter("after-" + type, filter);
	},
	it: function(description, spec) {
		this.specs.set(description, spec);
	},
	describe: function() {
		return this.name + ":\n" + this.specs.keys().map(function(spec) { return "- " + spec }).join("\n");
	},
	run: function() {
		var result, sandbox = {}, f = this.filters;
		f.beforeAll.invoke("apply", sandbox);
		this.specs.each(function(spec) {
			try {
				f.beforeEach.invoke("apply", sandbox);
				result = spec[1].apply(sandbox);
				f.afterEach.invoke("apply", sandbox);
				result === true ? this.pass(spec[0]) : this.fail(spec[0], result);
			} catch(e) {
				this.error(spec[0], e.message);
			}
		}.bind(this));
		f.afterAll.invoke("apply", sandbox);
	},
	pass: function(spec) {
		console.log("[PASS] %s", spec);
	},
	fail: function(spec, message) {
		console.log("[FAIL] %s\nwith: %s", spec, message);
	},
	error: function(spec, message) {
		console.log("[ERROR] in '%s'\nmessage: %s", spec, message);
	}
});

Spec.Context._contexts = []
Spec.Context.register = function(context) {
	this._contexts.push(context);
}

Spec.run = function() {
	Spec.Context._contexts.invoke("run");
}