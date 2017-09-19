import React from 'react'
import { connect } from 'dva'
import ShowOrEditWorkAttendanceComponent
  from '../../components/WorkAttendanceManage/showOrEditWorkAttendance'

function ShowOrEditWorkAttendance () {
  return <ShowOrEditWorkAttendanceComponent />
}

export default connect()(ShowOrEditWorkAttendance)
