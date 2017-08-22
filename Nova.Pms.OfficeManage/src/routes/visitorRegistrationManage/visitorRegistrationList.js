import React from 'react';
import { connect } from 'dva';
// import { Breadcrumb } from 'antd';
// import { Link } from 'dva/router';
// import styles from './visitorRegistrationManage.css';
// import MainLayout from '../../components/MainLayout/MainLayout';
import VisitorRegistrationManageComponent from '../../components/VisitorRegistrationManage/VisitorRegistrationList';

function VisitorRegistrationList() {
    return (
        <VisitorRegistrationManageComponent />
    );
}

export default connect()(VisitorRegistrationList);