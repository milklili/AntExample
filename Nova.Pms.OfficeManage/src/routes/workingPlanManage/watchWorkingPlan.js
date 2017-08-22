import React from 'react';
import { connect } from 'dva';
// import { Breadcrumb } from 'antd';
// import { Link } from 'dva/router';
// import styles from './workingPlanManage.css';
// import MainLayout from '../../components/MainLayout/MainLayout';
import WatchWorkingPlanComponent from '../../components/WorkingPlanManage/watchWorkingPlan';

function WatchWorkingPlan() {
    return (
        <WatchWorkingPlanComponent />
    );
}

export default connect()(WatchWorkingPlan);