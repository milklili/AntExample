import React from 'react'
import { connect } from 'dva'
import styles from './pendingApprovalManage.css'
import ApprovedListManageComponent
  from '../../components/PendingApprovalManage/ApprovedList'

function ApprovedList () {
  return <ApprovedListManageComponent />
}

export default connect()(ApprovedList)
