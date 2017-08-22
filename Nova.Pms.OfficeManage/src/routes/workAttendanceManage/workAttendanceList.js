import React from 'react';
import { connect } from 'dva';
// import { Breadcrumb } from 'antd';
// import { Link } from 'dva/router';
// import styles from './workAttendanceList.css';
// import MainLayout from '../../components/MainLayout/MainLayout';
import WorkAttendanceManageComponent from '../../components/WorkAttendanceManage/WorkAttendanceList';

function WorkAttendanceList() {
    return (
        <WorkAttendanceManageComponent />
    );
}

export default connect()(WorkAttendanceList);