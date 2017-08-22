import React from 'react';
import { connect } from 'dva';
// import { Breadcrumb } from 'antd';
// import styles from './contract.css';
// import EditContractComponent from '../components/Contract/editContract';
// import MainLayout from '../components/MainLayout/MainLayout';
import { Link } from 'dva/router';

function editContract() {

    return (
        <EditContractComponent />
    );
}

export default connect()(editContract);