module.exports = {
  'extends': 'airbnb',
  'parser': 'babel-eslint',
  'rules': {
    'semi': ['error', 'never'],
    'import/prefer-default-export': 'off',
    'no-use-before-define': 'off',
    'react/jsx-filename-extension': 'off',
    "react/destructuring-assignment": 'never',
    'react/prop-types': 'off',
    'react/no-array-index-key': 'off',
    'global-require': 'off',
    "node/no-unsupported-features/es-syntax": 'off',
    'consistent-return': 'off'
  },
  'globals': {
    'fetch': false,
    'document': true,
    'FormData': true,
    'google': true,
    'alert': true,
    'describe': true,
    'beforeEach': true,
    'test': true,
    'expect': true
  }
}