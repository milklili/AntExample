import React from 'react'
import { connect } from 'dva'
import styles from './approvalManage.css'
import InitiatedListManageComponent
  from '../../components/ApprovalManage/InitiatedList'

function InitiatedList () {
  return <InitiatedListManageComponent />
}

export default connect()(InitiatedList)
