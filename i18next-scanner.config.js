const fs = require('fs');
const chalk = require('chalk');

module.exports = {
  input: [
    'src/**/*.{js,jsx,ts,tsx}',
    // Use ! to filter out files or directories
    '!src/**/*.spec.{js,jsx,ts,tsx}',
    '!src/i18n/**',
    '!**/node_modules/**',
  ],
  output: './',
  options: {
    debug: true,
    func: {
      list: ['i18next.t', 'i18n.t', 't'],
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    trans: {
      component: 'Trans',
      i18nKey: 'i18nKey',
      defaultsKey: 'defaults',
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      fallbackKey: function(ns, value) {
        return value;
      },
      acorn: {
        ecmaVersion: 10, // defaults to 10
        sourceType: 'module', // defaults to 'module'
      },
    },
    lngs: ['en', 'es', 'fr', 'de', 'pt'],
    ns: [
      'translation'
    ],
    defaultLng: 'en',
    defaultNs: 'translation',
    defaultValue: '__STRING_NOT_TRANSLATED__',
    resource: {
      loadPath: 'src/locales/{{lng}}/{{ns}}.json',
      savePath: 'src/locales/{{lng}}/{{ns}}.json',
      jsonIndent: 2,
      lineEnding: '\n',
    },
    nsSeparator: ':',
    keySeparator: '.',
    interpolation: {
      prefix: '{{',
      suffix: '}}',
    },
  },
};