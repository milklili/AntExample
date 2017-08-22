import React from 'react';
import { connect } from 'dva';
import { Breadcrumb } from 'antd';
import { Link } from 'dva/router';
import styles from './cleaningAreaManage.css';
import MainLayout from '../../components/MainLayout/MainLayout';
import CleaningAreaManageComponent from '../../components/CleaningAreaManage/CleaningAreaList';

function CleaningAreaList() {
   
    return (
        <CleaningAreaManageComponent />
    );
}

export default connect()(CleaningAreaList);