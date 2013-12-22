describe("Cyllene", function() {
    describe("variable substitution", function() {
        it("replaces placeholders with assigned values", function() {
            var template = new Cyllene("Good evening, {{name}}. {{message}}.");
            var locals = { name: "Daniel", message: "I've been expecting you" };
            expect(template.render(locals)).toEqual("Good evening, Daniel. I've been expecting you.");
        });

        it("escapes values in double curly brackets", function() {
            var template = new Cyllene("Harmless {{comment}}");
            var locals = { comment: '<b onclick="dojs();">opinion</b>' };
            expect(template.render(locals)).toEqual('Harmless &lt;b onclick="dojs();"&gt;opinion&lt;/b&gt;');
        });

        it("does not escape values in triple curly brackets", function() {
            var template = new Cyllene("Hello {{{greeting}}}");
            var locals = { greeting: '<strong color="red">world!</strong>.' };
            expect(template.render(locals)).toEqual('Hello <strong color="red">world!</strong>.');
        });
    });

    describe("code execution", function() {
        it("handles one liners", function() {
            var template = new Cyllene("And then he said: `{{ greeting.say() }}`.");
            var locals = {
                greeting: {
                    say: function() { return "hello"; }
                }
            };
            expect(template.render(locals)).toEqual("And then he said: `hello`.");
        });

        describe("blocks", function() {
            var template;

            beforeEach(function() {
                template = new Cyllene(" \
                    {% if(currentUser.state == 'banished'): %} \
                        You're not allowed to view this page.\
                    {% else if(currentUser.state == 'unapproved'): %} \
                        Account pending approval. \
                    {% else: %} \
                        Welcome back {{ currentUser.name }}.\
                    {% endif; %}\
                ");
            });

            it("output contents in current context", function() {
                var locals = {
                    currentUser: {
                        state: "banished"
                    }
                };
                expect(template.render(locals).trim()).toEqual("You're not allowed to view this page.");
            });

            it("handles else if statements", function() {
                var locals = {
                    currentUser: {
                        state: "unapproved"
                    }
                };
                expect(template.render(locals).trim()).toEqual("Account pending approval.");
            });

            it("handles mixed expressions", function() {
                var locals = {
                    currentUser: {
                        state: "active",
                        name: "Daniel"
                    }
                };
                expect(template.render(locals).trim()).toEqual("Welcome back Daniel.");
            });
        });
    });
});
