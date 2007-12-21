Spec.Matchers = {};
Spec.Matchers.Helpers = {};

<%= include 'matchers/be.js',
            'matchers/be_close.js',
            'matchers/change.js',
						'matchers/have.js',
						'matchers/include.js',
						'matchers/match.js',
						'matchers/respond_to.js',
						'matchers/satisfy.js'
%>
