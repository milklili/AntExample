import React from 'react';
import { connect } from 'dva';
import { Breadcrumb } from 'antd';
import { Link } from 'dva/router';
import styles from './cleaningInspectManage.css';
import MainLayout from '../../components/MainLayout/MainLayout';
import CleaningInspectManageComponent from '../../components/CleaningInspectManage/CleaningInspectList';

function CleaningInspectList() {
    
    return (
        <CleaningInspectManageComponent />
    );
}

export default connect()(CleaningInspectList);