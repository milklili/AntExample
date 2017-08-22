import React from 'react';
import { connect } from 'dva';
// import { Breadcrumb } from 'antd';
// import { Link } from 'dva/router';
// import styles from './planType.css';
// import MainLayout from '../../components/MainLayout/MainLayout';
import CreatePlanTypeComponent from '../../components/PlanTypeCategory/CreatePlanType';

function CreatePlanType() {
    return (
        <CreatePlanTypeComponent />
    );
}

export default connect()(CreatePlanType);