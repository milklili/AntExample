import React from 'react'
import { connect } from 'dva'
import EditSecurityEquipMentComponent
  from '../../components/SecurityEquipMentManageBack/editSecurityEquipMent'

function EditSecurityEquipMent () {
  return <EditSecurityEquipMentComponent />
}

export default connect()(EditSecurityEquipMent)
