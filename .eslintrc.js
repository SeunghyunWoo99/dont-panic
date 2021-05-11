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
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
        alias: {
          assets: './src/assets',
          components: './src/components',
          navigations: './src/navigations',
          scenes: './src/scenes',
          utils: './src/utils',
        },
      },
    },
  },
}
