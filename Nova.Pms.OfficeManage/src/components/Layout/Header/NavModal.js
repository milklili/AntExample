import React from 'react'
import PropTypes from 'prop-types'
import { Icon, Input, Modal } from 'antd'
import { classnames } from 'utils'
import styles from './index.less'

const NavModal = ({
  navModalProp,
}) => {
  const { navBarKey,
    visible,
    handleModalOk,
    handleModalCancel,
    handleRemoveMenu,
    handleAddMenu,
    checkedMenu,
    unCheckedMenu } = navModalProp
  return (
    <Modal
      title={`编辑${navBarKey}`}
      style={{ top: 60 }}
      width={800}
      visible={visible}
      onOk={handleModalOk}
      onCancel={handleModalCancel}
    >
      <div style={{ marginBottom: '20px' }}>
        菜单名称
        {' '}
        <Input
          placeholder="输入菜单名称"
          defaultValue={navBarKey}
          id="menuName"
          style={{ marginTop: '10px' }}
        />
      </div>
      <h4 className={styles.itemTitle} style={{ marginTop: '20px' }}>
        已选服务
      </h4>
      <ul className={styles.menuWrap}>
        {checkedMenu &&
          checkedMenu.map(mItem => (
            <li className={classnames(styles.menuItem, styles.checked)}>
              <a onClick={handleRemoveMenu.bind(this, mItem.id)}>
                {mItem.name}
                <Icon type="close" />
              </a>
            </li>
          ))}
      </ul>
      <h4 className={styles.itemTitle} style={{ marginTop: '20px' }}>
        全部可用服务
      </h4>
      <ul className={styles.menuWrap}>
        {unCheckedMenu.map(mItem => (
          <li className={styles.menuItem}>
            <a onClick={handleAddMenu.bind(this, mItem.id)}>
              {mItem.name}
              <Icon type="plus" />
            </a>
          </li>
        ))}
      </ul>
    </Modal>
  )
}

NavModal.propTypes = {
  navModalProp: PropTypes.object,
}

export default NavModal
