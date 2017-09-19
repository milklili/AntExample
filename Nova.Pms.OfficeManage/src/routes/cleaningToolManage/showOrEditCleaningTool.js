import React from 'react'
import { connect } from 'dva'
import styles from './cleaningToolList.css'
import ShowOrEditCleaningToolComponent
  from '../../components/CleaningToolManage/showOrEditCleaningTool'

function ShowOrEditCleaningTool () {
  return <ShowOrEditCleaningToolComponent />
}

export default connect()(ShowOrEditCleaningTool)
