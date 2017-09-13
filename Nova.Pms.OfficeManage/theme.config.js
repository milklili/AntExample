const fs = require('fs')
const path = require('path')
const lessToJs = require('less-vars-to-js')
const overWrite = process.env.NODE_ENV !== 'development'
module.exports = () => {
  const themePath = path.join(__dirname, './src/themes/default.less')
  const lessObj = lessToJs(fs.readFileSync(themePath, 'utf8'))
  overWrite && (lessObj["@icon-url"] = '/Nova.Pms.Spa/Home/antd/iconfont' )
  return lessObj
}
