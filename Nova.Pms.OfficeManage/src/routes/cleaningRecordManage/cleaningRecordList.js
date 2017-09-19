import React from 'react'
import { connect } from 'dva'
import styles from './cleaningRecordManage.css'
import CleaningRecordManageComponent
  from '../../components/CleaningRecordManage/CleaningRecordList'

function CleaningRecordList () {
  return <CleaningRecordManageComponent />
}

export default connect()(CleaningRecordList)
