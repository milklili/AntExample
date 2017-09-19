import React from 'react'
import { connect } from 'dva'
import SecurityEventsManageComponent
  from '../../components/SecurityEventsManage/SecurityEventsList'

function SecurityEventsList () {
  return <SecurityEventsManageComponent />
}

export default connect()(SecurityEventsList)
