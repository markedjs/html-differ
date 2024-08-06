import markedEslintConfig from '@markedjs/eslint-config';
import globals from 'globals';

export default [
  {
    ignores: ['**/coverage'],
  },
  ...markedEslintConfig,
  {
    languageOptions: {
      globals: {
        ...globals.mocha,
      },
    },
  },
];
