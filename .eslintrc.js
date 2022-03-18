module.exports = {
  root: true,
  env: {
    node: true,
    commonjs: true,
    es2021: true,
  },
  extends: ['eslint:recommended', 'prettier'],
  parserOptions: {
    ecmaVersion: 'latest',
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    'no-unused-vars': [
      'error',
      { argsIgnorePattern: '(next)|(models)|(Sequelize)' },
    ],
  },
  overrides: [
    {
      files: ['*.mjs', 'vite.config.js', 'vitest.setup.js'],
      parserOptions: {
        sourceType: 'module',
      },
    },
    {
      files: ['server/test/**/*'],
      env: {
        jest: true,
      },
    },
  ],
};
