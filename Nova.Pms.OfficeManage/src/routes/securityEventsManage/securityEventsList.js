import React from 'react';
import { connect } from 'dva';
// import { Breadcrumb } from 'antd';
// import { Link } from 'dva/router';
// import styles from './securityEventsManage.css';
// import MainLayout from '../../components/MainLayout/MainLayout';
import SecurityEventsManageComponent from '../../components/SecurityEventsManage/SecurityEventsList';

function SecurityEventsList() {
    return (
         <SecurityEventsManageComponent />
    );
}

export default connect()(SecurityEventsList);