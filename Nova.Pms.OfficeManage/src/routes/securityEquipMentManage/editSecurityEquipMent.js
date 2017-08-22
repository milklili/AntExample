import React from 'react';
import { connect } from 'dva';
// import { Breadcrumb } from 'antd';
// import { Link } from 'dva/router';
// import styles from './SecurityEquipMentManage.css';
// import MainLayout from '../../components/MainLayout/MainLayout';
import EditSecurityEquipMentComponent from '../../components/SecurityEquipMentManageBack/editSecurityEquipMent';

function EditSecurityEquipMent() {
    return (
        <EditSecurityEquipMentComponent />
    );
}

export default connect()(EditSecurityEquipMent);