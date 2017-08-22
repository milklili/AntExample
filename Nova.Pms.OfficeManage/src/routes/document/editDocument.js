import React from 'react';
import { connect } from 'dva';
// import { Breadcrumb } from 'antd';
// import { Link } from 'dva/router';
// import styles from './document.css';
// import MainLayout from '../../components/MainLayout/MainLayout';
import EditDocumentComponent from '../../components/Document/EditDocument';

function ContractList() {
    return (
        <EditDocumentComponent />
    );
}

export default connect()(ContractList);

