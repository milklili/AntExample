import React from 'react';
import { connect } from 'dva';
import { Breadcrumb } from 'antd';
import { Link } from 'dva/router';
import styles from './approvalManage.css';
import MainLayout from '../../components/MainLayout/MainLayout';
import ShowApprovalManageComponent from '../../components/ApprovalManage/ShowApproval';

function ShowApproval() {
    return (
        <ShowApprovalManageComponent />
    );
}

export default connect()(ShowApproval);