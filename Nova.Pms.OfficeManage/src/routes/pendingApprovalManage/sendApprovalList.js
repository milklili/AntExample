import React from 'react';
import { connect } from 'dva';
import { Breadcrumb } from 'antd';
import { Link } from 'dva/router';
import styles from './pendingApprovalManage.css';
import MainLayout from '../../components/MainLayout/MainLayout';
import SendApprovalListManageComponent from '../../components/PendingApprovalManage/SendApprovalList';

function SendApprovalList() {
   
    return (
        <SendApprovalListManageComponent />
    );
}

export default connect()(SendApprovalList);