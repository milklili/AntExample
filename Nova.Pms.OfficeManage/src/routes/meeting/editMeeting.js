import React from 'react';
import { connect } from 'dva';
// import { Breadcrumb } from 'antd';
// import { Link } from 'dva/router';
// import styles from './meeting.css';
// import MainLayout from '../../components/MainLayout/MainLayout';
import EditMeetingComponent from '../../components/Meeting/EditMeeting';

function EditConferenceRecord() {
    return (
        <EditMeetingComponent />
    );
}

export default connect()(EditConferenceRecord);