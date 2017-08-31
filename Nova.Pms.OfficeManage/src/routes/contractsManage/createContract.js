import React from 'react';
import { connect } from 'dva';
// import { Breadcrumb } from 'antd';
// import styles from './contract.css';
 import CreateContractComponent from '../../components/Contract/createContract';
// import MainLayout from '../components/MainLayout/MainLayout';
import { Link } from 'dva/router';

function createContract() {

  return (
      <CreateContractComponent />
  );
}

export default connect()(createContract);
