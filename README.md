# Cyllene

Basic templates for javascript with code logic execution

## Usage

The following illustrates a simple use case:

```javascript
var template = new Cyllene("Good evening, {{name}}. {{ say.greeting() }}.");
template.render({
  name: "Daniel",
  say: {
    greeting: function() {
      return "Welcome back"
    }
  }
});
```
The output of the render method will be `Good evening, Daniel. Welcome back.`.

#### Escaping text

Text wrapped in double curly brackets (`{{`) is implicitly escaped, whereas in triple (`{{{`) is not.

```javascript
var template = new Cyllene("Good evening, {{name}}. {{{ greeting }}}.");
template.render({
  name: "<script>alert('x')</script>",
  greeting: "<b>Hi there</b>"
});
```

In this case the output will be `Good evening, &lt;script&gt;alert('x')&lt;/script&gt;. <b>Hi there</b>.`.

#### Code blocks

Text encased in `{%` is useful for logic statements, and as such it's not printed. 
For visibility the control's structure opening brace may be replaced with a colon (`:`) and the closing brace with `endif;`, `endfor;` equivalent.

```javascript
var template = new Cyllene("\
  {% if(currentUser.state == 'banished'): %} \
    You're not allowed to view this page.\
  {% else: %} \
    Welcome back {{ currentUser.name }}.\
  {% endif; %}\
");
```

#### Helper methods

Helpers may be defined as follows:

```javascript
Cyllene.helpers.capitalize = function(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}
```
Calling the helpers is as simple as:

```javascript
var template = new Cyllene("Hi there, {{ capitalize(firstName) }}");
```

## License

This package is licensed under the MIT license and/or the Creative Commons Attribution-ShareAlike.
