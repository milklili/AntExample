import React from 'react';
import { connect } from 'dva';
// import { Breadcrumb } from 'antd';
// import { Link } from 'dva/router';
// import styles from './meeting.css';
// import MainLayout from '../../components/MainLayout/MainLayout';
import ViewMeetingComponent from '../../components/Meeting/ViewMeeting';

function ViewConferenceRecord() {
    return (
        <ViewMeetingComponent />
    );
}

export default connect()(ViewConferenceRecord);