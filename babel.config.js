module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          assets: './src/assets',
          lotties: './src/assets/lotties',
          components: './src/components',
          navigations: './src/navigations',
          scenes: './src/scenes',
          utils: './src/utils',
        },
      },
    ],
  ],
}
