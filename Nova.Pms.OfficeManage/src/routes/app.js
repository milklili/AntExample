
import React from 'react'
import PropTypes from 'prop-types'
import pathToRegexp from 'path-to-regexp'
import { connect } from 'dva'
// import { Helmet } from 'react-helmet'
// import NProgress from 'nprogress'
import '../themes/index.less'
import { Layout } from '../components'
import { classnames, config } from '../utils'
// import Error from './error'

const { prefix, openPages } = config
const { Header, Bread, Footer, Sider, styles } = Layout

function App({ children, dispatch, app, loading, location }) {
  const { user, siderFold, darkTheme, isNavbar, menuPopoverVisible, navOpenKeys, menu } = app
  
  const headerProps = {
    menu,
    user,
    siderFold,
    isNavbar,
    menuPopoverVisible,
    navOpenKeys,
    switchMenuPopover () {
      dispatch({ type: 'app/switchMenuPopver' })
    },
    logout () {
      dispatch({ type: 'app/logout' })
    },
    switchSider () {
      dispatch({ type: 'app/switchSider' })
    },
    changeOpenKeys (openKeys) {
      dispatch({ type: 'app/handleNavOpenKeys', payload: { navOpenKeys: openKeys } })
    },
  }

  const siderProps = {
    menu,
    siderFold,
    darkTheme,
    navOpenKeys,
    changeTheme () {
      dispatch({ type: 'app/switchTheme' })
    },
    changeOpenKeys (openKeys) {
      localStorage.setItem(`${prefix}navOpenKeys`, JSON.stringify(openKeys))
      dispatch({ type: 'app/handleNavOpenKeys', payload: { navOpenKeys: openKeys } })
    },
  }

  const breadProps = {
    menu,
  }

  return (
    <div
      className={classnames(
        styles.layout,
        { [styles.fold]: isNavbar ? false : siderFold },
        { [styles.withnavbar]: isNavbar }
      )}
    >
      {!isNavbar
        ? <aside
            className={classnames(styles.sider, { [styles.light]: !darkTheme })}
          >
            <Sider {...siderProps} />
          </aside>
        : ""}
      <div className={styles.main}>
        <Header {...headerProps} />
        <Bread {...breadProps} />
        <div className={styles.container}>
          <div className={styles.content}>
            {children}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

App.propTypes = {};

function mapStateToProps(state) {
  return {
    loading: state.loading.models.app,
    app: state.app,
  };
}

export default connect(mapStateToProps)(App);
