import React from 'react'
import { connect } from 'dva'
import SecurityScheduleManageComponent
  from '../../components/SecurityScheduleManage/SecurityScheduleList'

function SecurityScheduleList () {
  return <SecurityScheduleManageComponent />
}

export default connect()(SecurityScheduleList)
