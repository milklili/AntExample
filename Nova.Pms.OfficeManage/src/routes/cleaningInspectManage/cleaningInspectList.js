import React from 'react'
import { connect } from 'dva'
import styles from './cleaningInspectManage.css'
import CleaningInspectManageComponent
  from '../../components/CleaningInspectManage/CleaningInspectList'

function CleaningInspectList () {
  return <CleaningInspectManageComponent />
}

export default connect()(CleaningInspectList)
