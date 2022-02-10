# Project Code Style Guide

Regarding formatting of the code (whitespace and overall presentation), we will be using a formatting tool called [prettier](https://prettier.io/). It has integrations with some of the most popular editors and IDEs (ex. Vim, Emacs, VSCode, Anything JetBrains, and more) in addition to having a CLI interface. Details on integrations and CLI usage can be found [here](https://prettier.io/docs/en/editors.html).

We can settle the whole tabs-vs-spaces flame war later since prettier makes this configurable. One of the most common configurations is two spaces for the tab size and is what a lot of tooling tends to generate in JS.

## Naming and Feature Usage Conventions

Any style guide questions not relating to whitespacing, line breaks, or other purely formatting concerns should follow the [MDN Code Examples Guidelines](https://developer.mozilla.org/en-US/docs/MDN/Guidelines/Code_guidelines/JavaScript). Naming conventions should follow these guidelines as well. However, for our use case, we will have the following adjustments regarding formatting and function delaractions compared to the MDN Code Examples Guidelines:

1. Any formatting applied by prettier takes prescedence over what is specified by the MDN examples guidelines. (mostly whitespace as prettier will not mess with naming conventions)
2. There are several ways to write callbacks/inline functions/lambdas in JavaScript, each with some small differences. The following approaches should be used:
    - For functions that are usually just called as functions and not used as callbacks, define them using the function keyword syntax as follows:
    ```js
    function myFunction(param1, param2) {
        // Function body
    }
    ```
    - For callbacks, prefer using the arrow function syntax unless you:
        - A. Writing an event handler for an HTML element such as a button's click event
        - B. Callbacks used to group unit tests into logical groupings.
        - C. Have another technical reason to not use arrow functios (shouldn't need to worry about this one much in this project though)
    ```js
    // Ex. route handler callback:
    router.get('/page/path', (req, res, next) => {
        // Inline route handler
    });
    ```
    If the callback should be used in multiple places or is being named for clarity, define the function using a function expression. (These are functions that are primarily intended to be passed as a parameter)
    ```js
    // Ex. reused route handler, may be in separate file
    const chickenHandler = (req, res, next) => {
        // Route handler body
    };

    router.get('/hen', chickenHandler);
    router.get('/rooster', chickenHandler);
    ```
    In the event that you cannot use arrow functions as mentioned in the above cases, you would substitute the arrow function syntax with the anonymous function syntax. This looks like the following:
    ```js
    // Arrow function form
    const chickenHandler = (req, res, next) => {};

    // Anonymous function form
    const chickenHandler = function(req, res, next) {};

    // Anonymous function as a callback (mainly test grouping and for declaring tests)
    it('should not blow up', function() {
        // Test code here
    });
    ```
