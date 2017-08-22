import React from 'react';
import { connect } from 'dva';
import { Breadcrumb } from 'antd';
import { Link } from 'dva/router';
import styles from './pendingApprovalManage.css';
import MainLayout from '../../components/MainLayout/MainLayout';
import PendingApprovalListManageComponent from '../../components/PendingApprovalManage/PendingApprovalList';

function PendingApprovalList() {
    return (
           <PendingApprovalListManageComponent />
    );
}

export default connect()(PendingApprovalList);