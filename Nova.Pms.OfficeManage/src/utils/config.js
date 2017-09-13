const APIV1 = '/api/v1'
const APIV2 = '/api/v2'
const evn = process.env.NODE_ENV
const prefix = evn !== 'development' ? '/Nova.Pms.Spa/Home' : ''
module.exports = {
  name: 'Nova PMS',
  prefix: 'NovaPMS',
  footerText: 'Ant Design Admin  © 2017 Nova',
  headerMenuText: '常用服务',
  popMenu: 'nova-admin-menu',
  logo: `${prefix}/logo.png`,
  iconFontCSS: `${prefix}/iconfont.css`,
  iconFontJS: `${prefix}/iconfont.js`,
  // YQL: ['http://www.zuimeitianqi.com'],
  CORS: [],
  openPages: ['/login'],
  apiPrefix: '/api/v1',
  api: {
    userLogin: `${APIV1}/user/login`,
    userLogout: `${APIV1}/user/logout`,
    userInfo: `${APIV1}/userInfo`,
    users: `${APIV1}/users`,
    posts: `${APIV1}/posts`,
    user: `${APIV1}/user/:id`,
    dashboard: `${APIV1}/dashboard`,
    menus: `${APIV1}/menus`,
    v1test: `${APIV1}/test`,
    v2test: `${APIV2}/test`,
  },
}
