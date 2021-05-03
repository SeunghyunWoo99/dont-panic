module.exports = {
  root: true,
  extends: '@react-native-community',
  parser: '@typescript-eslint/parser',
  plugins: ['react', 'react-hooks', '@typescript-eslint', 'prettier'],
  rules: {
    semi: ['error', 'never'],
    'react-native/no-inline-styles': 0,
    'prettier/prettier': 'error',
  },
}
