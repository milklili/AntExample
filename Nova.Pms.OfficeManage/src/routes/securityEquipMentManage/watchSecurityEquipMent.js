import React from 'react'
import { connect } from 'dva'
import WatchSecurityEquipMentComponent
  from '../../components/SecurityEquipMentManageBack/watchSecurityEquipMent'

function WatchSecurityEquipMent () {
  return <WatchSecurityEquipMentComponent />
}

export default connect()(WatchSecurityEquipMent)
