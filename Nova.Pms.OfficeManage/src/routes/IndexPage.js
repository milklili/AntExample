import React from 'react'
import { connect } from 'dva'
import LogoGather from './logo'

function IndexPage () {
  return (
    <LogoGather />
  )
}

IndexPage.propTypes = {}

export default connect()(IndexPage)
