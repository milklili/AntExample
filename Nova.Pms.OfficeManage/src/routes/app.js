import React from 'react'
import PropTypes from 'prop-types'
import { message } from 'antd'
// import pathToRegexp from 'path-to-regexp'
import { connect } from 'dva'
import { hashHistory } from 'dva/router'
import { Helmet } from 'react-helmet'
import NProgress from 'nprogress'
import '../themes/index.less'
import { Layout, Loader } from '../components'
import { classnames, config } from '../utils'
import Error from './error'
import './app.less'

const { openPages, prefix } = config

const { Header, Bread, Footer, Sider, styles } = Layout
let lastHref

const App = ({ children, dispatch, app, loading, location }) => {
  const {
    menu,
    sidebarRootId,
    tabBar,
    navBarKey,
    navBarVisible,
    notice,
    profile,
    siderFold,
    menuPopoverVisible,
    navOpenKeys,
    selectedKeys,
    navModalVisible,
  } = app
  let { pathname } = location
  pathname = pathname.startsWith('/') ? pathname : `/${pathname}`
  const { iconFontJS, iconFontCSS, logo } = config
  // const current = menu.filter(item => pathToRegexp(item.route || '').exec(pathname))
  // const hasPermission = current.length ? permissions.visit.includes(current[0].id) : false
  const hasPermission = true
  const href = window.location.href

  if (lastHref !== href) {
    NProgress.start()
    if (!loading.global) {
      NProgress.done()
      lastHref = href
    }
  }

  // 自定义导航栏相关
  const navBar = tabBar.find(m => m.name === navBarKey) || {}
  const validMenu =
    menu &&
    menu.filter(item => {
      let condition = false
      if (item.route) {
        condition = item.mpid !== '-1' && !/.+\/:\w+$/g.test(item.route)
      }
      return condition
    })
  const checkedMenu =
    Object.keys(navBar).length &&
    validMenu &&
    validMenu.filter(item => {
      return navBar.menu.includes(item.id)
    })
  const unCheckedMenu = Object.keys(navBar).length
    ? validMenu &&
        validMenu.filter(item => {
          return !navBar.menu.includes(item.id)
        })
    : validMenu

  const handleModalOk = () => {
    const input = document.getElementById('menuName')
    const value = input.value.trim()
    if (!value) {
      message.warn('请输入菜单名称')
      input.focus()
      return
    }
    const arr = tabBar.filter(cm => cm.name === value)
    if (arr.length > 1) {
      message.warn('菜单名称已存在')
      return
    }
    const _t = [...tabBar]
    let _n = { ...navBar }
    _n.name = value
    _t[_t.findIndex(cm => cm.name === navBarKey)] = _n
    dispatch({ type: 'app/saveTabBar', payload: { tabBar: _t } })
    dispatch({ type: 'app/updateNavBarKey', payload: { navBarKey: value } })
  }
  const handleModalCancel = () => {
    const input = document.getElementById('menuName')
    input.value = navBarKey
    dispatch({ type: 'app/resetTabBar' })
    dispatch({ type: 'app/switchModal' })
  }

  const handleAddMenu = id => {
    let _t = [...tabBar]
    let _n = { ...navBar }
    if (_n.menu.length >= 10) {
      message.warn('最多只能添加10个服务')
      return
    }
    _n.menu.push(id)
    const index = _t.findIndex(m => m.name === _n.name)
    _t[index] = _n
    dispatch({ type: 'app/updateNavbar', payload: { navBar: _n } })
    dispatch({ type: 'app/updateTabBar', payload: { tabBar: _t } })
  }
  const handleRemoveMenu = id => {
    let _t = [...tabBar]
    let _n = { ...navBar }
    _n.menu = _n.menu.filter(m => m !== id)
    const index = _t.findIndex(m => m.name === _n.name)
    _t[index] = _n
    dispatch({ type: 'app/updateNavbar', payload: { navBar: _n } })
    dispatch({ type: 'app/updateTabBar', payload: { tabBar: _t } })
  }

  // popMenu 组件相关
  const findRoute = (rId, m) => {
    let route
    const childRoutes = m.filter(_ => _.mpid === rId)
    for (let i in childRoutes) {
      if (childRoutes[i].route) {
        route = childRoutes[i]
        return route
      }
    }
    !route && findRoute(childRoutes[0], m)
    return route
  }
  const handleMenuItemClick = (item, isFold) => {
    const rootId = isFold ? item.id : item.mpid || item.id
    let selectedId = item.id
    if (isFold) {
      const child = findRoute(item.id, menu)
      selectedId = child.id
      hashHistory.push(child.route)
    }
    dispatch({
      type: 'app/handleSelectedKeys',
      payload: { selectedKeys: [selectedId] },
    })
    dispatch({ type: 'app/updateSidebarRootId', payload: { sidebarRootId: rootId } })
    dispatch({ type: 'app/setMenuPopover', payload: { menuPopoverVisible: false } })
  }

  // header组件相关

  const headerProps = {
    menu,
    tabBar,
    handleMenuItemClick,
    navBar: { ...navBar, menu: checkedMenu },
    navBarVisible,
    profile,
    notice,
    siderFold,
    menuPopoverVisible,
    navOpenKeys,
    selectedKeys,
    navModalProp: {
      navBarKey,
      visible: navModalVisible,
      handleRemoveMenu,
      handleAddMenu,
      handleModalCancel,
      handleModalOk,
      unCheckedMenu,
      checkedMenu,
    },
    setMenuPopover (visible) {
      dispatch({ type: 'app/setMenuPopover', payload: { menuPopoverVisible: visible } })
    },
    logout () {
      dispatch({ type: 'app/logout' })
    },
    changeOpenKeys (openKeys) {
      dispatch({
        type: 'app/handleNavOpenKeys',
        payload: { navOpenKeys: openKeys },
      })
    },
    editNavBar () {
      dispatch({ type: 'app/switchModal' })
    },
    editTabBar () {
      // dispatch({ type: 'app/updateCMenus', payload: { cMenus: _c } })
      // dispatch({ type: 'app/updateNavBarKey', payload: { navBarKey: '我的菜单', noSet: true } })
      // dispatch({ type: 'app/switchModal' })
    },
    handleClickNavItem (m) {
      const newNavOpenKeys = []
      const rootId = m.mpid || m.id
      const findParent = _m => {
        for (let i = 0; i < menu.length; i++) {
          if (_m.mpid === menu[i].id) {
            newNavOpenKeys.push(menu[i].id)
            findParent(menu[i])
            return
          }
        }
      }
      findParent(m)
      dispatch({
        type: 'app/handleNavOpenKeys',
        payload: { navOpenKeys: newNavOpenKeys },
      })
      dispatch({
        type: 'app/handleSelectedKeys',
        payload: { selectedKeys: [m.id] },
      })
      dispatch({ type: 'app/updateSidebarRootId', payload: { sidebarRootId: rootId } })
    },
    handleSetNavBar (key) {
      const condation = key && key !== navBarKey
      if (condation) {
        dispatch({
          type: 'app/updateNavBarKey',
          payload: { navBarKey: key },
        })
      }
      dispatch({
        type: 'app/setNavbarVisible',
        payload: { navBarVisible: condation || !navBarVisible },
      })
    },
    handleNoticeClick () {
      console.log('click noticeBar')
    },
    handleNoticeClose () {
      dispatch({
        type: 'app/closeNotice',
      })
    },
  }

  const siderProps = {
    menu,
    sidebarRootId,
    siderFold,
    navOpenKeys,
    selectedKeys,
    setSiderFold (visible) {
      dispatch({ type: 'app/setSiderFold', payload: { siderFold: visible } })
    },
    handleClickNavMenu (e) {
      dispatch({
        type: 'app/handleSelectedKeys',
        payload: { selectedKeys: [e.key] },
      })
    },
    changeOpenKeys (openKeys) {
      dispatch({
        type: 'app/handleNavOpenKeys',
        payload: { navOpenKeys: openKeys },
      })
    },
  }

  const breadProps = {
    menu,
  }

  if (openPages && openPages.includes(pathname)) {
    return (
      <div>
        <Loader spinning={loading.effects['app/query']} />
        {children}
      </div>
    )
  }

  // 用户直接关闭浏览器触发的清理工作，后续记录用户操作状态完善后，可以去除代码
  const clear = () => {
    localStorage.removeItem(`${prefix}navOpenKeys`)
    localStorage.removeItem(`${prefix}selectedKeys`)
    localStorage.removeItem(`${prefix}sidebarRootId`)
  }

  window.addEventListener('beforeunload', clear)
  return (
    <div>
      <Helmet>
        <title>ANTD ADMIN</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href={logo} type="image/x-icon" />
        {iconFontJS && <script src={iconFontJS} />}
        {iconFontCSS && <link rel="stylesheet" href={iconFontCSS} />}
      </Helmet>
      <Header {...headerProps} />
      <div
        className={classnames(
          styles.layout,
          { [styles.fold]: siderFold },
        )}
        style={{ height: `calc(100vh - ${47 + ((navBarVisible + !!(notice && notice.visible)) * 36)}px)` }}
      >
        <aside className={styles.sider}>
          <Sider {...siderProps} />
        </aside>
        <div className={styles.main}>
          <Bread {...breadProps} />
          <div className={styles.container}>
            <div className={styles.content}>
              {hasPermission ? children : <Error />}
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  )
}

App.propTypes = {
  children: PropTypes.element.isRequired,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  app: PropTypes.object,
  loading: PropTypes.object,
}

export default connect(({ app, loading }) => ({ app, loading }))(App)
