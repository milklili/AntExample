import React from 'react'
import { connect } from 'dva'
import CreateContractComponent from '../../components/Contract/createContract'

function createContract () {
  return <CreateContractComponent />
}

export default connect()(createContract)
