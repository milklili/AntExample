import React from 'react';
import { connect } from 'dva';
// import { Breadcrumb } from 'antd';
// import { Link } from 'dva/router';
// import styles from './workingPlanManage.css';
// import MainLayout from '../../components/MainLayout/MainLayout';
import EditWorkingPlanComponent from '../../components/WorkingPlanManage/editWorkingPlan';

function EditWorkingPlan() {
    return (
        <EditWorkingPlanComponent />
    );
}

export default connect()(EditWorkingPlan);