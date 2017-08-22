import React from 'react';
import { connect } from 'dva';
// import { Breadcrumb } from 'antd';
// import styles from './meetingCategoryManage.css';
// import MainLayout from '../../components/MainLayout/MainLayout';
import MeetingCategoryListComponent from '../../components/MeetingCategoryManage/MeetingCategoryList';

function MeetingCategoryList() {
    return (
        <MeetingCategoryListComponent />
    );
}

export default connect()(MeetingCategoryList);

