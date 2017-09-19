import React from 'react'
import PropTypes from 'prop-types'
import { Menu, Icon, Dropdown } from 'antd'
import { classnames, config } from 'utils'
import PopMenu from '../PopMenu'
import PopMenuW from '../PopMenuW'
import styles from './index.less'

import NavBar from './NavBar'
import NoticeBar from './NoticeBar'
import NavModal from './NavModal'

// import PM from './payment-menu'
// import CM from './customer-menu'
// import COM from './contract-menu'
import menuWuYe from './menu-data'

let timer, lastSelect, parentNode
// const handlerMouseEnter = (suffix, e) => {
//   !parentNode && (parentNode = e.currentTarget.parentNode)
//   const current = parentNode.querySelector(
//     `#${config.popMenu}-${suffix}`
//   )
//   const firstChild = e.currentTarget.firstChild
//   const setVisible = () => {
//     lastSelect && (lastSelect.style.display = 'none', lastSelect.previousSibling.removeAttribute('data-active'))
//     current.style.display = 'block'
//     firstChild.setAttribute('data-active', '')
//     lastSelect = current
//   }
//   if (!lastSelect) {
//     return setVisible()
//   }
//   if (timer) {
//     clearTimeout(timer)
//   }
//   timer = setTimeout(setVisible, 200)
// }
const handlerMouseClick = (suffix, e) => {
  !parentNode && (parentNode = e.currentTarget.parentNode)
  const current = parentNode.querySelector(
    `#${config.popMenu}-${suffix}`
  )
  const firstChild = e.currentTarget.firstChild
  if (lastSelect === current) {
    lastSelect.style.display = 'none'
    firstChild.removeAttribute('data-active')
    lastSelect = null
  } else {
    lastSelect && (lastSelect.style.display = 'none', lastSelect.previousSibling.removeAttribute('data-active'))
    current.style.display = 'block'
    firstChild.setAttribute('data-active', '')
    lastSelect = current
  }
}
const handlerMouseLeave = () => {
  const firstChild = lastSelect.previousSibling
  lastSelect.style.display = 'none'
  firstChild.removeAttribute('data-active')
  lastSelect = null
  // timer && clearTimeout(timer)
  // timer = null
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
  // menuWuYe,
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

  // const payMenuProps = {
  //   menu: PM,
  //   handleMenuItemClick () {
  //     // to do
  //   },
  // }
  // const ctmMenuProps = {
  //   menu: CM,
  //   handleMenuItemClick () {
  //     // to do
  //   },
  // }
  // const cotMenuProps = {
  //   menu: COM,
  //   handleMenuItemClick () {
  //     // to do
  //   },
  // }

  const menuClick = () => {
    // to do
  }

  const PopMenuTemplate = ({ popMenu, name, idSubfix }) => {
    return (
      <div
        className={styles.item}
        onClick={handlerMouseClick.bind(null, idSubfix)}
        style={{ cursor: 'inherit' }}
      >
        <a>
          {name}
          {/* <Icon type="caret-down" style={{ marginLeft: 2, fontSize: '6px' }} /> */}
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

  // const indexPage = menu.find(m => m.route === '/dashboard' || m.route === '/')
  const logoutMenu = (
    <Menu className={styles.dropdown}>
      <Menu.Item key="logout">
        <a href="/Users/Account/LogOff">
          <Icon type="exclamation-circle-o" style={{ marginRight: 5 }} /><span>{`退 出`}</span>
        </a>
      </Menu.Item>
      <Menu.Item key="profile">
        <a href="/Users/Account/MyProfile">
          <Icon type="user" style={{ marginRight: 5 }} /><span>我的资料</span>
        </a>
      </Menu.Item>
      <Menu.Item key="about">
        <a id="aboutSystem">
          <Icon type="bulb" style={{ marginRight: 5 }} /> <span>关于系统</span>
        </a>
      </Menu.Item>
    </Menu>
  )
  return (
    <div className={styles.headerWrap}>
      <div className={classnames(styles.header, styles.dark)}>
        <div className={classnames(styles.logo, styles.item)}>
          <img alt={'logo'} src={config.logo} />
          {/* <span>{config.name}</span> */}
        </div>
        <div className={styles.item}>
          {/* <Link
            to={indexPage && indexPage.route}
            onClick={handleMenuItemClick.bind(null, indexPage, false)}
          >
            {indexPage && indexPage.name}
          </Link> */}
          <a
            href="/"
          >
            首页
          </a>
        </div>
        <div style={{ display: 'flex' }} onMouseLeave={handlerMouseLeave} >
          <PopMenuTemplate popMenu={<PopMenu {...oaMenuProps} />} name="OA系统" idSubfix="oa" />
          {menuWuYe.length > 0 && menuWuYe.map((item, index) => (
            <PopMenuTemplate
              popMenu={<PopMenuW menu={item.menu} handleMenuItemClick={menuClick} />}
              name={item.text} idSubfix={`${index}`} key={item.text} />
          ))}
        </div>
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
  menuWuYe: PropTypes.array,
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
