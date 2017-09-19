import React from 'react'
import { connect } from 'dva'
import styles from './pendingApprovalManage.css'
import PendingApprovalListManageComponent
  from '../../components/PendingApprovalManage/PendingApprovalList'

function PendingApprovalList () {
  return <PendingApprovalListManageComponent />
}

export default connect()(PendingApprovalList)
