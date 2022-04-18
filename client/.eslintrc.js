/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-prettier',
  ],
  env: {
    node: false,
    browser: true,
    commonjs: false,
    'vue/setup-compiler-macros': true,
  },
  rules: {
    'vue/no-deprecated-dollar-scopedslots-api': 'off',
  },
};
