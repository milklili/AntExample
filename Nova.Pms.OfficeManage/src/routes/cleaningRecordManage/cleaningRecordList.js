import React from 'react';
import { connect } from 'dva';
import { Breadcrumb } from 'antd';
import { Link } from 'dva/router';
import styles from './cleaningRecordManage.css';
import MainLayout from '../../components/MainLayout/MainLayout';
import CleaningRecordManageComponent from '../../components/CleaningRecordManage/CleaningRecordList';

function CleaningRecordList() {
   
    return (
       <CleaningRecordManageComponent />
    );
}

export default connect()(CleaningRecordList);