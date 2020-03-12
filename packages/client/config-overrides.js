const {
  override,
  addBabelPlugin,
  addWebpackResolve,
  addLessLoader,
  fixBabelImports
} = require('customize-cra')

const path = require('path')

module.exports = override(
  addBabelPlugin('react-hot-loader/babel'),
  addWebpackResolve({
    alias: {
      'react-dom': '@hot-loader/react-dom',
      '@app': path.resolve(__dirname, './src')
    }
  }),
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true
  }),
  addLessLoader({
    javascriptEnabled: true
  })
)
