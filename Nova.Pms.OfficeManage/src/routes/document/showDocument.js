import React from 'react';
import { connect } from 'dva';
// import { Breadcrumb } from 'antd';
// import { Link } from 'dva/router';
// import styles from './document.css';
// import MainLayout from '../../components/MainLayout/MainLayout';
import ShowDocumentComponent from '../../components/Document/ShowDocument';

function ContractList() {
    return (
         <ShowDocumentComponent />
    );
}

export default connect()(ContractList);

