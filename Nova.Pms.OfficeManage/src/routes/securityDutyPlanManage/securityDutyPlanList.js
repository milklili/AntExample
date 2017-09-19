import React from 'react'
import { connect } from 'dva'
import SecurityDutyPlanManageComponent
  from '../../components/SecurityDutyPlanManage/SecurityDutyPlanList'

function SecurityDutyPlanList () {
  return <SecurityDutyPlanManageComponent />
}

export default connect()(SecurityDutyPlanList)
