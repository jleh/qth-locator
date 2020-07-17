module.exports = {
  'env': {
    'browser': true,
    'commonjs': true,
    'es6': true,
    'jest': true
  },
  'extends': 'eslint:recommended',
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly'
  },
  'parserOptions': {
    'ecmaVersion': 8
  },
  'rules': {
    'semi': ['error', 'always'],
    'space-before-function-paren': 'off',
    'arrow-spacing': 'error',
    'comma-dangle': ['error', 'never'],
    'comma-spacing': ['error'],
    'curly': 'error',
    'dot-notation': 'error',
    'eqeqeq': 'error',
    'indent': ['error', 2, { 'SwitchCase': 1 }],
    'key-spacing': 'error',
    'padded-blocks': ['error', 'never'],
    'prefer-const': 'warn',
    'prefer-destructuring': 'off',
    'prefer-template': 'error',
    'prefer-spread': 'error',
    'rest-spread-spacing': 'error',
    'require-atomic-updates': 'warn',
    'no-duplicate-imports': 'error',
    'no-use-before-define': ['error', 'nofunc'],
    'no-useless-computed-key': 'error',
    'no-useless-concat': 'error',
    'no-unneeded-ternary': 'error',
    'no-var': 'error',
    'no-restricted-globals': 'error',
    'no-trailing-spaces': 'error',
    'max-len': ['error', 125, { ignoreUrls: true, ignoreTemplateLiterals: true }],
    'quotes': ['error', 'single'],
    'no-irregular-whitespace': 'error',
    'no-multi-spaces': 'error',
    'arrow-body-style': 'error',
    'arrow-parens': ['error', 'as-needed', { 'requireForBlockBody': true }],
    'default-case': 'error',
    'dot-location': ['error', 'property'],
    'jsx-quotes': ['error', 'prefer-double'],
    'no-useless-constructor': 'error',
    'no-useless-rename': 'error',
    'prefer-arrow-callback': 'error',
    'yoda': 'error'
  }
};