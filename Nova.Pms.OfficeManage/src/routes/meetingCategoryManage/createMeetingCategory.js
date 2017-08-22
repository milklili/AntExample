import React from 'react';
import { connect } from 'dva';
// import { Breadcrumb } from 'antd';
// import { Link } from 'dva/router';
// import styles from './meetingCategoryManage.css';
// import MainLayout from '../../components/MainLayout/MainLayout';
import CreateMeetingCategoryComponent from '../../components/MeetingCategoryManage/CreateMeetingCategory';

function CreateMeetingCategory() {
    return (
        <CreateMeetingCategoryComponent />
    );
}

export default connect()(CreateMeetingCategory);