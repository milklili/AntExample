import React from 'react'
import PropTypes from 'prop-types'
import { Menu, Icon, Popover, Dropdown } from 'antd'
import { Link } from 'dva/router'
import { classnames, config } from 'utils'
import PopMenu from '../PopMenu'
import PopMenuW from '../PopMenuW'
import styles from './index.less'

import NavBar from './NavBar'
import NoticeBar from './NoticeBar'
import NavModal from './NavModal'
import Logo from '../../../assets/logo.png'

import PM from './payment-menu'
import CM from './customer-menu'
import COM from './contract-menu'

// const SubMenu = Menu.SubMenu

// let timer
const handlerMouseEnter = (suffix, e) => {
  const menuWrap = e.currentTarget.querySelector(
    `#${config.popMenu}-${suffix}`
  )
  menuWrap.style.display = 'block'
}
const handlerMouseLeave = (suffix, e) => {
  const menuWrap = e.currentTarget.querySelector(
    `#${config.popMenu}-${suffix}`
  )
  menuWrap.style.display = 'none'

  // 取消误触消失

  // if (timer) {

  //   clearTimeout(timer)

  // } else {

  //   timer = setTimeout(() => {

  //     timer = null

  //   }, 100)

  // }
}

const handlerClick = e => {
  const menuWrap = e.currentTarget
  menuWrap.style.display = 'none'
}

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

  // menuPopoverVisible,

  // setMenuPopover,
}) => {
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

  const oaMenuProps = {
    menu,
    handleMenuItemClick,
  }

  const payMenuProps = {
    menu: PM,
    handleMenuItemClick () {
      // to do
    },
  }
  const ctmMenuProps = {
    menu: CM,
    handleMenuItemClick () {
      // to do
    },
  }
  const cotMenuProps = {
    menu: COM,
    handleMenuItemClick () {
      // to do
    },
  }

  const PopMenuTemplate = ({ popMenu, name, idSubfix }) => {
    return (
      <div
        className={styles.item}
        onMouseEnter={handlerMouseEnter.bind(null, idSubfix)}
        onMouseLeave={handlerMouseLeave.bind(null, idSubfix)}
        style={{ cursor: 'inherit' }}
      >
        <a>
          {name}
          <Icon type="caret-down" style={{ marginLeft: 2 }} />
        </a>
        <div
          id={`${config.popMenu}-${idSubfix}`}
          onClick={handlerClick}
          className={styles.popMenu}
          style={{ display: 'none' }}
        >
          {popMenu}
        </div>
      </div>
    )
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
          <img alt={'logo'} src={Logo} />
          {/* <span>{config.name}</span> */}
        </div>
        <div className={styles.item}>
          <Link
            to={indexPage && indexPage.route}
            onClick={handleMenuItemClick.bind(null, indexPage, false)}
          >
            {indexPage && indexPage.name}
          </Link>
        </div>
        <PopMenuTemplate popMenu={<PopMenu {...oaMenuProps} />} name="OA系统" idSubfix="oa" />
        <PopMenuTemplate popMenu={<PopMenuW {...payMenuProps} />} name="收费管理" idSubfix="payment" />
        <PopMenuTemplate popMenu={<PopMenuW {...ctmMenuProps} />} name="客户服务" idSubfix="customer" />
        <PopMenuTemplate popMenu={<PopMenuW {...cotMenuProps} />} name="房屋合同" idSubfix="contract" />
        <ul className={styles.customMenu}>
          {tabBar.length &&
            tabBar.map(item => (
              <li
                className={classnames(styles.item, styles.menuItem, {
                  [styles.active]: item.name === navBar.name,
                })}
                key={item.name}
              >
                <a onClick={handleSetNavBar.bind(null, item.name)}>
                  {item.name}
                </a>
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
      {navBarVisible && <NavBar {...navBarProps} />}
      {notice.visible && <NoticeBar {...noticeBarProps} />}
      {navModalProp.visible && <NavModal navModalProp={navModalProp} />}
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
