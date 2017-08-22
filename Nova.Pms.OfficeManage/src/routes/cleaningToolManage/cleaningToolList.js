import React from 'react';
import { connect } from 'dva';
import { Breadcrumb } from 'antd';
import { Link } from 'dva/router';
import styles from './cleaningToolList.css';
import MainLayout from '../../components/MainLayout/MainLayout';
import CleaningToolManageComponent from '../../components/CleaningToolManage/CleaningToolList';

function CleaningToolList() {
    
    return (
        <CleaningToolManageComponent />
    );
}

export default connect()(CleaningToolList);