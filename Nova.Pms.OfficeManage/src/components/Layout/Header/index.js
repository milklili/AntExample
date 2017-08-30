import React from 'react'
import PropTypes from 'prop-types'
import { Menu, Icon, Popover, Dropdown } from 'antd'
import { Link } from 'dva/router'
import { classnames, config } from 'utils'
import PopMenu from '../PopMenu'
import styles from './index.less'

import NavBar from './NavBar'
import NoticeBar from './NoticeBar'
import NavModal from './NavModal'

// const SubMenu = Menu.SubMenu

let timer

const Header = ({
  profile,
  logout,
  handleMenuItemClick,
  menu,
  tabBar,
  navBar,
  editNavBar,
  editTabBar,
  notice,
  navModalProp,
  handleNoticeClick,
  handleNoticeClose,
  handleClickNavItem,
  handleSetNavBar,
  navBarVisible,
  menuPopoverVisible,
  setMenuPopover,
}) => {
  const handlerMouseEnter = () => {
    setMenuPopover(true)
  }
  const handlerMouseLeave = () => {
    if (timer) {
      clearTimeout(timer)
    } else {
      timer = setTimeout(() => {
        setMenuPopover(false)
        timer = null
      }, 100)
    }
  }

  const navBarProps = {
    menu: navBar.menu,
    editNavBar,
    handleClickNavItem,
    handleSetNavBar,
  }

  const noticeBarProps = {
    ele: <span>{notice.content}</span>,
    handleNoticeClick,
    handleNoticeClose,
  }

  const popMenuProps = {
    menu,
    handleMenuItemClick,
  }

  const indexPage = menu.find(m => m.route === '/dashboard' || m.route === '/')
  const logoutMenu = (
    <Menu className={styles.dropdown}>
      <Menu.Item key="logout">
        <a onClick={logout}>
          Sign out
        </a>
      </Menu.Item>
    </Menu>
  )
  return (
    <div className={styles.headerWrap}>
      <div className={classnames(styles.header, styles.dark)}>
        <div className={classnames(styles.logo, styles.item)}>
          <img alt={'logo'} src={config.logo} />
          <span>{config.name}</span>
        </div>
        <div className={styles.item}>
          <Link to={indexPage && indexPage.route} onClick={handleMenuItemClick.bind(null, indexPage, false)}>
            {indexPage && indexPage.name}
          </Link>
        </div>
        <div
          className={styles.item}
          onMouseEnter={handlerMouseEnter}
          onMouseLeave={handlerMouseLeave}
          style={{ cursor: 'inherit' }}
        >
          <a>
            所有服务
            <Icon type="caret-down" style={{ marginLeft: 2 }} />
          </a>
          {/* style={{ display: `${menuPopoverVisible ? 'block' : 'none'}` }} */}
          <div id={config.popMenu} className={styles.popMenu} style={{ display: `${menuPopoverVisible ? 'block' : 'none'}` }} >
            <PopMenu {...popMenuProps} />
          </div>
        </div>
        <ul className={styles.customMenu}>
          {tabBar.length && tabBar.map(item => (
            <li className={classnames(styles.item, styles.menuItem, { [styles.active]: item.name === navBar.name })} key={item.name}>
              <a onClick={handleSetNavBar.bind(null, item.name)}>{item.name}</a>
            </li>
          ))}
          {/* <li className={styles.item} >
            <Icon type="plus-square" onClick={editTabBar} />
          </li> */}
        </ul>
        <div className={styles.item}>
          <div className={styles.button}>
            <Icon type="mail" />
          </div>
        </div>
        <div className={styles.item}>
          <Dropdown overlay={logoutMenu}>
            <span className={styles.logoutMemu}>
              <Icon type="user" style={{ marginRight: '8px' }} />
              {profile.username}
            </span>
          </Dropdown>
        </div>
      </div>
      { navBarVisible && <NavBar {...navBarProps} /> }
      { notice.visible && <NoticeBar {...noticeBarProps} /> }
      { navModalProp.visible && <NavModal navModalProp={navModalProp} /> }
    </div>
  )
}

Header.propTypes = {
  menu: PropTypes.array,
  tabBar: PropTypes.array,
  navBar: PropTypes.object,
  profile: PropTypes.object,
  notice: PropTypes.object,
  navModalProp: PropTypes.object,
  logout: PropTypes.func,
  siderFold: PropTypes.bool,
  menuPopoverVisible: PropTypes.bool,
  navBarVisible: PropTypes.bool,
  location: PropTypes.object,
  setMenuPopover: PropTypes.func,
  navOpenKeys: PropTypes.array,
  selectedKeys: PropTypes.array,
  changeOpenKeys: PropTypes.func,
  editNavBar: PropTypes.func,
  editTabBar: PropTypes.func,
  handleClickNavItem: PropTypes.func,
  handleSetNavBar: PropTypes.func,
  handleMenuItemClick: PropTypes.func,
  handleNoticeClick: PropTypes.func,
  handleNoticeClose: PropTypes.func,
}

export default Header
