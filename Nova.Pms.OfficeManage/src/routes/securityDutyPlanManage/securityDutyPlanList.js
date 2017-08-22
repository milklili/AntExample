import React from 'react';
import { connect } from 'dva';
// import { Breadcrumb } from 'antd';
// import { Link } from 'dva/router';
// import styles from './securityDutyPlanManage.css';
// import MainLayout from '../../components/MainLayout/MainLayout';
import SecurityDutyPlanManageComponent from '../../components/SecurityDutyPlanManage/SecurityDutyPlanList';

function SecurityDutyPlanList() {
    return (
         <SecurityDutyPlanManageComponent />
    );
}

export default connect()(SecurityDutyPlanList);