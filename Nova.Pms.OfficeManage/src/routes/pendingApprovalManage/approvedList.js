import React from 'react';
import { connect } from 'dva';
import { Breadcrumb } from 'antd';
import { Link } from 'dva/router';
import styles from './pendingApprovalManage.css';
import MainLayout from '../../components/MainLayout/MainLayout';
import ApprovedListManageComponent from '../../components/PendingApprovalManage/ApprovedList';

function ApprovedList() {
   
    return (
         <ApprovedListManageComponent />
    );
}

export default connect()(ApprovedList);