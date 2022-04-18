const clientScriptHelpers = require('./clientScripts');
const helpers = require('handlebars-helpers');

function registerHelperModule(hbs, helperModule) {
  Object.keys(helperModule).forEach((helperName) => {
    hbs.registerHelper(helperName, helperModule[helperName]);
  });
}

module.exports = function registerHelpers(hbs) {
  registerHelperModule(hbs, helpers(['comparison', 'object']));
  registerHelperModule(hbs, clientScriptHelpers);
};
