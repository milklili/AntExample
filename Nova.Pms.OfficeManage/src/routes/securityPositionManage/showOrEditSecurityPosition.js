import React from 'react'
import { connect } from 'dva'
import ShowOrEditSecurityPositionComponent
  from '../../components/SecurityPositionManage/showOrEditSecurityPosition'

function ShowOrEditSecurityPosition () {
  return <ShowOrEditSecurityPositionComponent />
}

export default connect()(ShowOrEditSecurityPosition)
