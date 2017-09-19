import React from 'react'
import { connect } from 'dva'
import EditContractComponent from '../../components/Contract/editContract'

function editContract () {
  return <EditContractComponent />
}

export default connect()(editContract)
