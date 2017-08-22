import React from 'react';
import { connect } from 'dva';
// import { Breadcrumb } from 'antd';
// import styles from './contract.css';
// import MainLayout from '../components/MainLayout/MainLayout';
import ContractListComponent from '../components/Contract/contractList';

function ContractList() {
  return (
      <ContractListComponent />
  );
}

export default connect()(ContractList);
