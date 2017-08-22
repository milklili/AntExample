import React from 'react';
import { connect } from 'dva';
// import { Breadcrumb } from 'antd';
// import styles from './planType.css';
// import MainLayout from '../../components/MainLayout/MainLayout';
import PlanTypeListComponent from '../../components/PlanTypeCategory/PlanTypeList';

function ContractList() {
    return (
        <PlanTypeListComponent />
    );
}

export default connect()(ContractList);

