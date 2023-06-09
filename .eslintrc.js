module.exports = {
  'env': {
    'browser': true,
    'es2021': true
  },
  'extends': [
    'eslint:recommended',
    // 'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  'overrides': [
  ],
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaVersion': 'latest',
    'sourceType': 'module'
  },
  'plugins': [
    'react',
    '@typescript-eslint'
  ],
  'rules': {
    // // turned off linting to test deploy
    // 'quotes': ['error', 'single'],
    // // we want to force semicolons
    // 'semi': ['error', 'always'],
    // // we use 2 spaces to indent our code
    // 'indent': ['error', 2],
  }
};
