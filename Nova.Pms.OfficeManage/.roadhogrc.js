const path = require('path')

const svgSpriteDirs = [
  path.resolve(__dirname, 'src/svg/'),
  require.resolve('antd').replace(/index\.js$/, ''),
]

export default {
  entry: 'src/index.js',
  svgSpriteLoaderDirs: svgSpriteDirs,
  // devtool: 'source-map',
  publicPath: '/Nova.Pms.Spa/Home/',
  "theme": "./theme.config.js",
  // 接口代理示例
  
  "proxy": {
	  "/api/saas": {
      "target": "http://localhost:8425/api/saas",
      "changeOrigin": true,
      "pathRewrite": { "^/api/saas" : "" }
    },
    "/api": {
      "target": "http://10.10.120.137:8091/api/",
      "changeOrigin": true,
      "pathRewrite": { "^/api" : "" }
    },
    // "/api/v2": {
    //   "target": "http://192.168.0.110",
    //   "changeOrigin": true,
    //   "pathRewrite": { "^/api/v2" : "/api/v2" }
    // }
  },
  "env": {
      "development": {
        "extraBabelPlugins": [
          "dva-hmr",
          "transform-runtime",
  		    ["import", { "libraryName": "antd", "style": true }]
        ]
      },
      "production": {
        "extraBabelPlugins": [
          "transform-runtime",
  		    ["import", { "libraryName": "antd", "style": true}]
        ]
      }
  }
}
