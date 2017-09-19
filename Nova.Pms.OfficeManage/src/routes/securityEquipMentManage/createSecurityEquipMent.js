import React from 'react'
import { connect } from 'dva'
import CreateSecurityEquipMentComponent
  from '../../components/SecurityEquipMentManageBack/createSecurityEquipMent'

function CreateSecurityEquipMent () {
  return <CreateSecurityEquipMentComponent />
}

export default connect()(CreateSecurityEquipMent)
