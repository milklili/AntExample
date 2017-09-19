import React from 'react'
import { connect } from 'dva'
import SecurityPositionManageComponent
  from '../../components/SecurityPositionManage/SecurityPositionList'

function SecurityPositionList () {
  return <SecurityPositionManageComponent />
}

export default connect()(SecurityPositionList)
