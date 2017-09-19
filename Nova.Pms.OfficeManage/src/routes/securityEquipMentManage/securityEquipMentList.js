import React from 'react'
import { connect } from 'dva'
import SecurityEquipMentListComponent
  from '../../components/SecurityEquipMentManage/SecurityEquipMentList'

function SecurityEquipMentList () {
  return <SecurityEquipMentListComponent />
}

export default connect()(SecurityEquipMentList)
