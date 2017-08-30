import React from 'react'
import PropTypes from 'prop-types'
import { Icon } from 'antd'
import { Link } from 'dva/router'
import styles from './index.less'

const NavBar = ({ menu, handleClickNavItem, editNavBar, handleSetNavBar }) => {
  return (
    <ul className={styles.navBar}>
      {menu &&
        menu.map(item => (
          <li key={item.id}>
            <Link to={item.route} onClick={handleClickNavItem.bind(null, item)}>
              {/* {item.icon && <Icon type={item.icon} style={{ marginRight: '4px' }} />} */}
              {item.name}
            </Link>
          </li>
        ))}
      <li key="navBarMenuAdd">
        <a onClick={editNavBar}>
          <Icon type="edit" />
        </a>
      </li>
      <li key="nvaBarToggle" style={{ position: 'absolute', right: '6px' }}>
        <a
          onClick={handleSetNavBar.bind(null, null)}
        >
          <Icon type="up-square" />
        </a>
      </li>
    </ul>
  )
}

NavBar.propTypes = {
  menu: PropTypes.array,
  handleSetNavBar: PropTypes.func,
  editNavBar: PropTypes.func,
  handleClickNavItem: PropTypes.func,
}

export default NavBar
