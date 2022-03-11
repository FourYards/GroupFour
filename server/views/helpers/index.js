const pageScriptHelpers = require('./pageScript');

function registerHelperModule(hbs, helperModule) {
  Object.keys(helperModule).forEach((helperName) => {
    hbs.registerHelper(helperName, helperModule[helperName]);
  });
}

module.exports = function registerHelpers(hbs) {
  registerHelperModule(hbs, pageScriptHelpers);
};
