const Handlebars = require('hbs').handlebars;

exports.clientScripts = function (...args) {
  // If no arguments supplied to helper, do nothing.
  if (args.length <= 1) return null;

  // Last parameter is the handlebars options object
  const options = args[args.length - 1];
  // If first parameter is an array, treat it as the list of scripts to import. Otherwise, use arguments
  const pageScriptNames = Array.isArray(args[0])
    ? args[0]
    : args.splice(0, args.length - 1);

  // If extending support to production, produce different output if options.data.settings.env != 'production'
  // See https://vitejs.dev/guide/backend-integration.html for details

  let scriptBlock = '';
  pageScriptNames.forEach((pageScriptName) => {
    const scriptName = Handlebars.escapeExpression(pageScriptName);
    const port = Handlebars.escapeExpression(options.data.settings.port);
    scriptBlock += `<script type="module" src="http://localhost:${port}/page/${scriptName}.js"></script>\n`;
  });

  scriptBlock = scriptBlock.trim();

  return new Handlebars.SafeString(scriptBlock);
};
