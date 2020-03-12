const { override, addBabelPlugin, addWebpackResolve } = require('customize-cra')

module.exports = override(
  addBabelPlugin('react-hot-loader/babel'),
  addWebpackResolve({
    alias: {
      'react-dom': '@hot-loader/react-dom',
    }
  })
)
