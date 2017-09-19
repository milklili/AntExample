import React from 'react'
import { connect } from 'dva'
import ShowApprovalManageComponent
  from '../../components/ApprovalManage/ShowApproval'

function ShowApproval () {
  return <ShowApprovalManageComponent />
}

export default connect()(ShowApproval)
