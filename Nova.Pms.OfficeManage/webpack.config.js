const webpack = require('webpack');
module.exports = (webpackConfig) => {
  // var definePlugin = new webpack.DefinePlugin({
  //   __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'false')),
  //   __PRERELEASE__: JSON.stringify(JSON.parse(process.env.BUILD_PRERELEASE || 'true'))
  // });
  // webpackConfig.plugins.push(definePlugin)

  const vendor = new webpack.optimize.CommonsChunkPlugin({
    names: ['vendor', 'manifest'],
  })

  webpackConfig.plugins.push(vendor)

  webpackConfig.entry.vendor = ['react', 'react-dom', 'moment', 'redux', 'react-router', 'classnames']
  // FilenameHash
  webpackConfig.output.chunkFilename = '[name].[chunkhash:5].js' // http://webpack.github.io/docs/configuration.html#output-chunkfilename

  // ClassnameHash
  const cssLoaderOption = {
    importLoaders: 1,
    modules: true,
    localIdentName: '[hash:base64:5]',
  }
  const cssLoaders = webpackConfig.module.loaders[3].loader.split('!')
  webpackConfig.module.loaders[3].loader = cssLoaders.map(item => {
    if (item.startsWith('css')) {
      return `css?${JSON.stringify(cssLoaderOption)}`
    }
    return item
  }).join('!')

  // PreLoaders
  // webpackConfig.module.preLoaders = [{
  //   test: /\.js$/,
  //   enforce: 'pre',
  //   loader: 'eslint',
  // }]


  // Alias
  webpackConfig.resolve.alias = {
    components: `${__dirname}/src/components`,
    utils: `${__dirname}/src/utils`,
    config: `${__dirname}/src/utils/config`,
    enums: `${__dirname}/src/utils/enums`,
  }

  return webpackConfig
}
