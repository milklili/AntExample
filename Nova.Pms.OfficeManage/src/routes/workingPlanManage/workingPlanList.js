import React from 'react';
import { connect } from 'dva';
// import { Breadcrumb } from 'antd';
// import styles from './workingPlanManage.css';
// import MainLayout from '../../components/MainLayout/MainLayout';
import WorkingPlanListComponent from '../../components/WorkingPlanManage/workingPlanList';

function  WorkingPlanList() {
    return (
        <WorkingPlanListComponent />
    );
}

export default connect()(WorkingPlanList);

