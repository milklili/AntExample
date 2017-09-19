import React from 'react'
import { connect } from 'dva'
import WorkAttendanceManageComponent
  from '../../components/WorkAttendanceManage/WorkAttendanceList'

function WorkAttendanceList () {
  return <WorkAttendanceManageComponent />
}

export default connect()(WorkAttendanceList)
