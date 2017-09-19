import React from 'react'
import { connect } from 'dva'
import VisitorRegistrationManageComponent
  from '../../components/VisitorRegistrationManage/VisitorRegistrationList'

function VisitorRegistrationList () {
  return <VisitorRegistrationManageComponent />
}

export default connect()(VisitorRegistrationList)
