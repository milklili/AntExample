import React from 'react';
import { connect } from 'dva';
// import { Breadcrumb } from 'antd';
// import { Link } from 'dva/router';
// import styles from './planType.css';
// import MainLayout from '../../components/MainLayout/MainLayout';
import EditPlanTypeComponent from '../../components/PlanTypeCategory/EditPlanType';

function EditPlanType() {
    return (
         <EditPlanTypeComponent />
    );
}

export default connect()(EditPlanType);