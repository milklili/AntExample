import React from 'react'
import PropTypes from 'prop-types'
import { Icon } from 'antd'
import styles from './index.less'

const NoticeBar = ({ ele, handleNoticeClose, handleNoticeClick }) => {
  return (
    <div className={styles.noticeBar}>
      <a onClick={handleNoticeClick}>
        { ele }
      </a>
      <a onClick={handleNoticeClose}>
        <Icon type="close-circle" />
      </a>
    </div>
  )
}

NoticeBar.propTypes = {
  ele: PropTypes.element,
  handleNoticeClick: PropTypes.func,
  handleNoticeClose: PropTypes.func,
}

export default NoticeBar
