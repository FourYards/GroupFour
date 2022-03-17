const repl = require('repl');
const db = require('../server/db/models');

console.log(
  `Welcome to yard-work-marketplace REPL (Node.js version ${process.version}).`
);
console.log('Type ".help" for more information.');
console.log(
  'See https://nodejs.org/dist/latest-v16.x/docs/api/repl.html#design-and-features for node REPL features.'
);
console.log(
  'To reference the result of the last evaluated expression, use the "_" variable.'
);
console.log('');

// REPL server setup
const replServer = repl.start('project-repl> ');
replServer.context = Object.assign(replServer.context, db);
replServer.on('exit', () => {
  process.exit(0);
});

// Setup history
replServer.setupHistory('.project_repl_history', (err) => {
  if (err) {
    console.error(
      'WARN: Unable to create repl history file in the current directory!'
    );
    console.error(err);
  }
});

// Additional REPL commands
replServer.defineCommand('models', {
  help: 'View sequelize models available in this REPL session',
  action: () => {
    const models = db.sequelize.models;
    console.log();
    console.log(
      'The following sequelize models can be accessed in the global scope of this REPL session, exported as their modelName:'
    );
    Object.keys(models).forEach((modelName) => {
      console.log(modelName);
    });
    console.log();
    console.log(
      'The following sequelize values are also accessible in the global scope of this REPL session:'
    );
    console.log(
      "sequelize\tThe sequelize instance for the application's database connection"
    );
    console.log('Sequelize\tThe Sequelize constructor (Note the capital "S")');
    console.log();
    replServer.displayPrompt();
  },
});
