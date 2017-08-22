import React from 'react';
import { connect } from 'dva';
// import { Breadcrumb } from 'antd';
// import { Link } from 'dva/router';
// import styles from './meeting.css';
// import MainLayout from '../../components/MainLayout/MainLayout';
import CreateMeetingComponent from '../../components/Meeting/CreateMeeting';

function CreateConferenceRecord() {
    return (
        <CreateMeetingComponent />
    );
}

export default connect()(CreateConferenceRecord);