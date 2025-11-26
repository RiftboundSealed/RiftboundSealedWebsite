import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import { defineConfig, globalIgnores } from 'eslint/config';
import prettier from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';

export default defineConfig([
  globalIgnores(['dist', '**/*.{js,mjs,cjs}', 'node_modules/**']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
      prettier,
    ],
    plugins: {
      import: importPlugin,
      '@typescript-eslint': tseslint.plugin,
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        projectService: true,
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: globals.browser,
    },
    settings: {
      // Make eslint-plugin-import understand TS path aliases like "@/…"
      'import/resolver': {
        typescript: { project: './tsconfig.app.json' },
        node: { extensions: ['.ts', '.js'] },
      },
    },
    rules: {
      // ─── TypeScript
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' },
      ],
      // ─── Import Order
      'import/order': [
        'error',
        {
          groups: [
            ['builtin', 'external', 'internal'],
            ['parent', 'sibling', 'index'],
          ],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
          pathGroups: [
            { pattern: '@/**/**', group: 'parent', position: 'before' },
          ],
          pathGroupsExcludedImportTypes: ['builtin', 'external'],
          distinctGroup: false,
        },
      ],
      // With the TS resolver configured, let this catch unresolved imports:
      'import/no-unresolved': 'error',
      // ─── Style & Formatting
      'eol-last': ['error', 'always'],
      'func-style': ['error', 'expression', { allowArrowFunctions: true }],
    },
  },
]);
