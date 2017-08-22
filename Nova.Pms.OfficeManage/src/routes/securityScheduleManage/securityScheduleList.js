import React from 'react';
import { connect } from 'dva';
// import { Breadcrumb } from 'antd';
// import { Link } from 'dva/router';
// import styles from './securityScheduleManage.css';
// import MainLayout from '../../components/MainLayout/MainLayout';
import SecurityScheduleManageComponent from '../../components/SecurityScheduleManage/SecurityScheduleList';

function SecurityScheduleList() {
    return (
        <SecurityScheduleManageComponent />
    );
}

export default connect()(SecurityScheduleList);