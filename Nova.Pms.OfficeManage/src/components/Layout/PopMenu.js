import React from 'react'
import PropTypes from 'prop-types'
import { Icon } from 'antd'
import { Link } from 'dva/router'
import { classnames, arrayToTree, config } from 'utils'
import styles from './PopMenu.less'

let timer

const clear = () => {
  timer && clearTimeout(timer)
  timer = null
}

const handleMouseEnter = e => {
  const ele = e.currentTarget
  const child = ele.querySelector(`#${ele.dataset.ownmenu}`)
  const parent = ele.parentNode
  if (timer) {
    clearTimeout(timer)
  }
  timer = setTimeout(() => {
    if (
      parent.dataset.selectid && parent.dataset.selectid !== ele.dataset.ownmenu
    ) {
      const preEle = parent.querySelector(`#${parent.dataset.selectid}`)
      const preParent = preEle.parentNode
      preEle.style.display = 'none'
      preParent.removeAttribute('data-checked')
    }
    if (child) {
      ele.setAttribute('data-checked', '')
      parent.dataset.selectid = ele.dataset.ownmenu
      child.style.display = 'flex'
    }
    timer = null
  }, 100)
}

const createQuickMenu = (menu, quickMenu) => {
  const father = [...new Set(quickMenu.map(q => q.mpid || q.id))].map(id => {
    return menu.find(item => {
      return item.id === id
    })
  })

  father.forEach(f => {
    const children = quickMenu.filter(q => q.mpid === f.id)
    children.length && (f.children = children)
  })
  return father
}

const PopMenu = ({ menu, handleMenuItemClick }) => {
  const validMenu = menu.filter(_ => _.mpid !== '-1')
  const menuTree = arrayToTree(validMenu, 'id', 'mpid')
  const quickMenu = createQuickMenu(
    menu,
    validMenu.filter(_m => _m.quick && _m.route)
  )
  // 递归生成菜单
  const getMenus = menuTreeN => {
    return menuTreeN.map(item => {
      if (item.children) {
        return (
          <li
            key={item.id}
            data-ownmenu={`${config.prefix}-menu-${item.id}`}
            onMouseEnter={handleMouseEnter}
            className={classnames(styles.menuItem, styles.menuFold)}
          >
            <div
              className={styles.subTitle}
              onClick={handleMenuItemClick.bind(null, item, true)}
            >
              <span>
                {item.icon &&
                  <Icon type={item.icon} style={{ marginRight: 4 }} />}
                {item.name}
              </span>
              <Icon type="right" />
            </div>
            <ul
              id={`${config.prefix}-menu-${item.id}`}
              className={styles.subMenu}
            >
              {getMenus(item.children)}
            </ul>
          </li>
        )
      }
      return (
        <li
          key={item.id}
          data-ownmenu={`${config.prefix}-menu-${item.id}`}
          onMouseEnter={handleMouseEnter}
          className={classnames(styles.menuItem, styles.menuRouter)}
        >
          <Link
            to={item.route}
            onClick={handleMenuItemClick.bind(null, item, false)}
          >
            {item.icon && <Icon type={item.icon} style={{ marginRight: 4 }} />}
            {item.name}
          </Link>
        </li>
      )
    })
  }

  const getQuickMenus = qm => {
    return (<li
      key="quick-menu"
      data-checked
      data-ownmenu={`${config.prefix}-menu-quick`}
      onMouseEnter={handleMouseEnter}
      className={classnames(styles.menuItem, styles.menuFold)}
    >
      <div className={styles.subTitle}>
        <span>
          总览
        </span>
        <Icon type="bars" />
      </div>
      <ul id={`${config.prefix}-menu-quick`} className={styles.subMenu} style={{ display: 'flex' }}>
        {qm.map(item => (
          <li
            key={`quick-menu-${item.id}`}
            className={styles.quickItem}
          >
            <h3 style={{ paddingBottom: '10px', color: '#eee' }}>{item.name}</h3>
            {item.children
              ? item.children.map(c => (
                <Link
                  to={c.route}
                  onClick={handleMenuItemClick.bind(
                    null,
                    c,
                    false
                  )}
                >
                  {/* {c.icon &&
                  <Icon
                    type={c.icon}
                    style={{ marginRight: 4 }}
                  />} */}
                  {c.name}
                </Link>
              ))
              : <Link
                to={item.route}
                onClick={handleMenuItemClick.bind(null, item, false)}
              >
                {/* {item.icon &&
                <Icon type={item.icon} style={{ marginRight: 4 }} />} */}
                {item.name}
              </Link>}

          </li>
        ))}
      </ul>
    </li>)
  }
  const menuItems = getMenus(menuTree)

  const quickMenuEle = getQuickMenus(quickMenu)

  return (
    <div className={styles.allMenu} onClick={clear} onMouseLeave={clear}>
      <ul className={styles.menu} data-selectid={`${config.prefix}-menu-quick`}>
        {quickMenu.length && quickMenuEle }
        {menuItems}
      </ul>
    </div>
  )
}

PopMenu.propTypes = {
  menu: PropTypes.array,
  handleMenuItemClick: PropTypes.func,
}

export default PopMenu
