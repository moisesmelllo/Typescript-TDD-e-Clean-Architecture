import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';

/** @type {import('eslint').Linter.Config[]} */
export default [
  // 1. Define a quais arquivos isso se aplica
  { files: ['**/*.{js,mjs,cjs,ts}'] },

  // 2. Define o ambiente (Node.js e/ou Browser)
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },

  // 3. Configurações recomendadas (JS e TS)
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,

  // 4. Integração com Prettier (desativa regras de formatação do ESLint)
  eslintConfigPrettier,

  // 5. Suas regras personalizadas
  {
    rules: {
      // Avisa se houver variáveis declaradas mas não usadas (mas ignora as que começam com _)
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_' },
      ],

      // Permite console.log (útil em dev), mas avisa. Mude para "error" em produção se quiser.
      'no-console': 'warn',

      // Força o uso de const/let e evita var
      'no-var': 'error',
    },
  },
];
