import React from 'react'
import { connect } from 'dva'
import styles from './approvalManage.css'
import ApprovalManageComponent
  from '../../components/ApprovalManage/CreateApproval'

function CreateApproval () {
  return <ApprovalManageComponent />
}

export default connect()(CreateApproval)
