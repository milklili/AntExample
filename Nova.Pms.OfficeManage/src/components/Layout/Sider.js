import React from 'react'
import PropTypes from 'prop-types'
import { Icon } from 'antd'
import styles from './Layout.less'
import Menus from './Menu'

const Sider = ({
  siderFold,
  location,
  navOpenKeys,
  selectedKeys,
  handleClickNavMenu,
  setSiderFold,
  changeOpenKeys,
  menu,
  sidebarRootId,
}) => {
  // 侧边栏根据选中菜单的数据自动开启或关闭功能相关，如不需要可以移除，减少一次dispatch
  const hookMenuReady = menuTree => {
    // const method = localStorage.getItem('preSetSiderFoldMethod')
    // switch (method) {
    //   case 'hand' :
    //     localStorage.setItem('preSetSiderFoldMethod', 'none')
    //     break
    //   case 'auto' :
    //     localStorage.setItem('preSetSiderFoldMethod', 'none')
    //     break
    //   default:
    //     localStorage.setItem('preSetSiderFoldMethod', 'auto')
    //     if (menuTree.length === 1 && !menuTree[0].children) {
    //       !siderFold && setSiderFold(true)
    //     } else {
    //       siderFold && setSiderFold(false)
    //     }
    // }
  }

  const handleClickSwitch = visible => {
    // localStorage.setItem('preSetSiderFoldMethod', 'hand')
    setSiderFold(visible)
  }
  const menusProps = {
    menu,
    rootId: sidebarRootId,
    siderFold,
    location,
    navOpenKeys,
    selectedKeys,
    changeOpenKeys,
    handleClickNavMenu,
    hookMenuReady,
  }
  const menuRoot = menu.find(_ => _.id === sidebarRootId)
  const renderTitle = sidebarRootId === '-1' ? '所有服务' : menuRoot && menuRoot.name
  return (
    <div className={styles.sider}>
      <a className={styles.switch} onClick={handleClickSwitch.bind(null, !siderFold)}>
        <Icon type={siderFold ? 'menu-unfold' : 'menu-fold'} />
      </a>
      <h2>
        {renderTitle}
      </h2>
      <Menus {...menusProps} />
    </div>
  )
}

Sider.propTypes = {
  menu: PropTypes.array,
  sidebarRootId: PropTypes.string,
  siderFold: PropTypes.bool,
  location: PropTypes.object,
  setSiderFold: PropTypes.func,
  navOpenKeys: PropTypes.array,
  selectedKeys: PropTypes.array,
  changeOpenKeys: PropTypes.func,
  handleClickNavMenu: PropTypes.func,
}

export default Sider
