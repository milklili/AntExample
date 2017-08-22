import React from 'react';
import { connect } from 'dva';
// import { Breadcrumb } from 'antd';
// import { Link } from 'dva/router';
// import styles from './meetingCategoryManage.css';
// import MainLayout from '../../components/MainLayout/MainLayout';
import EditMeetingCategoryComponent from '../../components/MeetingCategoryManage/EditMeetingCategory';

function CreateMeetingCategory() {
    return (
        <EditMeetingCategoryComponent />
    );
}

export default connect()(CreateMeetingCategory);