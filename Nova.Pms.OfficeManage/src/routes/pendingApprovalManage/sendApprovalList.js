import React from 'react'
import { connect } from 'dva'
import styles from './pendingApprovalManage.css'
import SendApprovalListManageComponent
  from '../../components/PendingApprovalManage/SendApprovalList'

function SendApprovalList () {
  return <SendApprovalListManageComponent />
}

export default connect()(SendApprovalList)
