import React from 'react';
import { connect } from 'dva';
// import { Breadcrumb } from 'antd';
// import { Link } from 'dva/router';
// import styles from './workAttendanceList.css';
// import MainLayout from '../../components/MainLayout/MainLayout';
import ShowOrEditWorkAttendanceComponent from '../../components/WorkAttendanceManage/showOrEditWorkAttendance';

function ShowOrEditWorkAttendance() {
    return (
         <ShowOrEditWorkAttendanceComponent />
    );
}

export default connect()(ShowOrEditWorkAttendance);