import { routerRedux } from 'dva/router'
import { parse } from 'qs'
import config from '../utils/config'
// import { EnumRoleType } from '../utils/enums'
// import { query, logout } from '../services/app'
// import * as menusService from '../services/menus'

import originMenu from './oa-menu'

const { prefix } = config

export default {
  namespace: 'app',
  state: {
    profile: {},
    permissions: {
      visit: [],
    },
    menu: [
      {
        id: 1,
        icon: 'laptop',
        name: 'Dashboard',
        router: '/dashboard',
      },
    ],
    tabBar: JSON.parse(localStorage.getItem(`${prefix}tabBar`)) || [{
      name: '常用服务',
      menu: [],
    }],
    notice: {
      content: '我是一条通知信息！',
      visible: false,
    },
    sidebarRootId: localStorage.getItem(`${prefix}sidebarRootId`) || '-1',
    navBarKey: '',
    navBarVisible: false,
    menuPopoverVisible: false,
    navModalVisible: false,
    siderFold: localStorage.getItem(`${prefix}siderFold`) === 'true',
    // isNavbar: document.body.clientWidth < 769,
    // navOpenKeys: [],
    navOpenKeys: JSON.parse(localStorage.getItem(`${prefix}navOpenKeys`)) || [],
    selectedKeys: JSON.parse(localStorage.getItem(`${prefix}selectedKeys`)) || [
    ],
  },
  subscriptions: {
    setup ({ dispatch }) {
      dispatch({ type: 'query' })

      // let tid

      // window.onresize = () => {

      //   clearTimeout(tid)

      //   tid = setTimeout(() => {

      //     dispatch({ type: 'changeNavbar' })

      //   }, 300)

      // }
    },
  },
  effects: {
    *query ({ payload }, { call, put }) {
      // 判断的条件需要调整
      // 现在没有登录，没有限制
      // if (sessionStorage.getItem('token')) {
      //   const { permissions, profile } = yield call(query, payload)
      //   const { menu, tabBar } = yield call(menusService.query)
      //   localStorage.setItem(`${prefix}tabBar`, JSON.stringify(tabBar))
      //   yield put({
      //     type: 'updateState',
      //     payload: {
      //       menu,
      //       tabBar,
      //       profile,
      //       permissions,
      //     },
      //   })
      //   if (location.pathname === '/login') {
      //     yield put(routerRedux.push('/dashboard'))
      //   }
      // } else if (
      //   config.openPages && config.openPages.indexOf(location.pathname) < 0
      // ) {
      //   // 用于登录后跳转到用户访问的指定路由
      //   // let from = location.pathname
      //   window.location = `${location.origin}/login`
      // }

      const { menu } = originMenu
      const profile = {
        name: 'test',
        id: 1,
      }
      yield put({
        type: 'updateState',
        payload: {
          menu,
          // tabBar,
          profile,
        },
      })
    },

    *logout ({ payload }, { call, put }) {
      const data = yield call(logout, parse(payload))
      if (data.success) {
        sessionStorage.removeItem('token')
        // 可以不移除，配合上面的query过程，让用户每次登陆都回到上一次退出的状态
        // 但是只限同一人，如用户不同，权限不同还需要再做相应的调整
        localStorage.removeItem(`${prefix}navOpenKeys`)
        localStorage.removeItem(`${prefix}selectedKeys`)
        yield put({ type: 'query' })
      } else {
        throw data
      }
    },

    *changeNavbar ({ payload }, { put, select }) {
      const { app } = yield select(_ => _)
      const isNavbar = document.body.clientWidth < 769
      if (isNavbar !== app.isNavbar) {
        yield put({ type: 'handleNavbar', payload: isNavbar })
      }
    },

    *saveTabBar ({ payload: { tabBar } }, { put }) {
      // 应该存储到数据库
      // yield call(menusService.save, usuallyMenus)
      localStorage.setItem(`${prefix}tabBar`, JSON.stringify(tabBar))
      yield put({ type: 'switchModal' })
      yield put({ type: 'updateTabBar', payload: { tabBar } })
    },
  },
  reducers: {
    updateState (state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },

    setSiderFold (state, { payload: { siderFold } }) {
      localStorage.setItem(`${prefix}siderFold`, siderFold)
      return {
        ...state,
        siderFold,
      }
    },
    switchModal (state) {
      return {
        ...state,
        navModalVisible: !state.navModalVisible,
      }
    },
    closeNotice (state) {
      return {
        ...state,
        notice: { ...state.notice, visible: false },
      }
    },
    setMenuPopover (state, { payload: { menuPopoverVisible } }) {
      return {
        ...state,
        menuPopoverVisible,
      }
    },

    setNavbarVisible (state, { payload: { navBarVisible } }) {
      return {
        ...state,
        navBarVisible,
      }
    },

    handleNavOpenKeys (state, { payload: { navOpenKeys } }) {
      localStorage.setItem(`${prefix}navOpenKeys`, JSON.stringify(navOpenKeys))
      return {
        ...state,
        navOpenKeys,
      }
    },

    updateNavBarKey (state, { payload: { navBarKey, noSet } }) {
      !noSet && localStorage.setItem(`${prefix}navBarKey`, navBarKey)
      return {
        ...state,
        navBarKey,
      }
    },

    handleSelectedKeys (state, { payload: { selectedKeys } }) {
      localStorage.setItem(
        `${prefix}selectedKeys`,
        JSON.stringify(selectedKeys)
      )
      return {
        ...state,
        selectedKeys,
      }
    },

    updateTabBar (state, { payload: { tabBar } }) {
      return {
        ...state,
        tabBar,
      }
    },

    updateSidebarRootId (state, { payload: { sidebarRootId } }) {
      localStorage.setItem(`${prefix}sidebarRootId`, sidebarRootId)
      return {
        ...state,
        sidebarRootId,
      }
    },

    resetTabBar (state) {
      const tabBar = JSON.parse(localStorage.getItem(`${prefix}tabBar`))
      const navBarKey = localStorage.getItem(`${prefix}navBarKey`)
      return {
        ...state,
        tabBar,
        navBarKey,
      }
    },
  },
}
