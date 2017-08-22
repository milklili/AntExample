import React from 'react';
import { connect } from 'dva';
// import { Breadcrumb } from 'antd';
// import styles from './securityEquipMentManage.css';
// import MainLayout from '../../components/MainLayout/MainLayout';
import SecurityEquipMentListComponent from '../../components/SecurityEquipMentManage/SecurityEquipMentList';

function  SecurityEquipMentList() {
    return (
       <SecurityEquipMentListComponent />
    );
}

export default connect()(SecurityEquipMentList);

