import React from 'react';
import { connect } from 'dva';
import { Breadcrumb } from 'antd';
import { Link } from 'dva/router';
import styles from './approvalManage.css';
import MainLayout from '../../components/MainLayout/MainLayout';
import InitiatedListManageComponent from '../../components/ApprovalManage/InitiatedList';

function InitiatedList() {
    return (
        <InitiatedListManageComponent />
    );
}

export default connect()(InitiatedList);