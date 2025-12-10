// eslint.config.js

import nextLint from '@next/eslint-plugin-next';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';
import globals from 'globals';
import noRelativeImportPaths from 'eslint-plugin-no-relative-import-paths';

export default [
  // 1. Next.js Recommended Rules
  {
    files: ['src/**/*.{js,jsx,ts,tsx}'],
    ...nextLint.configs['recommended'],
    ...nextLint.configs['core-web-vitals'],
    languageOptions: {
      globals: globals.browser,
    },
  },

  // 2. TypeScript Recommended Rules
  {
    files: ['src/**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
    },
  },

  // 3. Project Custom Rules
  {
    files: ['src/**/*.{js,jsx,ts,tsx}'],
    plugins: {
      'no-relative-import-paths': noRelativeImportPaths,
      prettier: prettierPlugin,
    },
    rules: {
      // Immer rule
      'no-param-reassign': [
        'error',
        {
          props: true,
          ignorePropertyModificationsFor: ['draftState'],
        },
      ],

      'react/require-default-props': 'off',

      // Enforce alias imports
      'no-relative-import-paths/no-relative-import-paths': [
        'warn',
        { rootDir: './src', prefix: '@' },
      ],

      // Logging rules
      'no-console': ['warn', { allow: ['warn', 'error'] }],

      // Prettier as a rule
      'prettier/prettier': 'error',
    },
  },

  // 4. Prettier LAST
  prettierConfig,

  // 5. Ignore Files
  {
    ignores: ['dist', '.next', 'node_modules', 'next-env.d.ts', '*.js'],
  },
];
