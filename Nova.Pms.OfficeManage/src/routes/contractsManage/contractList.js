import React from 'react'
import { connect } from 'dva'
import ContractListComponent from '../../components/Contract/contractList'

function ContractList () {
  return <ContractListComponent />
}

export default connect()(ContractList)
