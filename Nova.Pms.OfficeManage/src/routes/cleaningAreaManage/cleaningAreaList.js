import React from 'react'
import { connect } from 'dva'
import styles from './cleaningAreaManage.css'
import CleaningAreaManageComponent
  from '../../components/CleaningAreaManage/CleaningAreaList'

function CleaningAreaList () {
  return <CleaningAreaManageComponent />
}

export default connect()(CleaningAreaList)
