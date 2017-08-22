import React from 'react';
import { connect } from 'dva';
// import { Breadcrumb } from 'antd';
// import { Link } from 'dva/router';
// import styles from './workingPlanManage.css';
// import MainLayout from '../../components/MainLayout/MainLayout';
import CreateWorkingPlanComponent from '../../components/WorkingPlanManage/createWorkingPlan';

function  CreateWorkingPlan() {
    return (
        <CreateWorkingPlanComponent />
    );
}

export default connect()( CreateWorkingPlan);