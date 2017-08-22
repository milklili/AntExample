import React from 'react';
import { connect } from 'dva';
// import { Breadcrumb } from 'antd';
// import { Link } from 'dva/router';
// import styles from './securityPositionList.css';
// import MainLayout from '../../components/MainLayout/MainLayout';
import ShowOrEditSecurityPositionComponent from '../../components/SecurityPositionManage/showOrEditSecurityPosition';

function ShowOrEditSecurityPosition() {
    return (
        <ShowOrEditSecurityPositionComponent />
    );
}

export default connect()(ShowOrEditSecurityPosition);