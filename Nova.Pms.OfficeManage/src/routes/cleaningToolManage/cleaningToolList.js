import React from 'react'
import { connect } from 'dva'
import styles from './cleaningToolList.css'
import CleaningToolManageComponent
  from '../../components/CleaningToolManage/CleaningToolList'

function CleaningToolList () {
  return <CleaningToolManageComponent />
}

export default connect()(CleaningToolList)
