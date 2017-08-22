import React from 'react';
import { connect } from 'dva';
// import { Breadcrumb } from 'antd';
// import { Link } from 'dva/router';
// import styles from './securityPositionList.css';
// import MainLayout from '../../components/MainLayout/MainLayout';
import SecurityPositionManageComponent from '../../components/SecurityPositionManage/SecurityPositionList';

function SecurityPositionList() {
    return (
        <SecurityPositionManageComponent />
    );
}

export default connect()(SecurityPositionList);