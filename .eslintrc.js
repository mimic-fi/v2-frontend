module.exports = {
  parser: 'babel-eslint',
  extends: ['react-app'],
  rules: {
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
    'max-len': ['error', { code: 155, ignoreStrings: true }],
    'comma-spacing': ['error', { before: false, after: true }],
  },
}
