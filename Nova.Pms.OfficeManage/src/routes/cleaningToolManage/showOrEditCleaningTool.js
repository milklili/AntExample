import React from 'react';
import { connect } from 'dva';
import { Breadcrumb } from 'antd';
import { Link } from 'dva/router';
import styles from './cleaningToolList.css';
import MainLayout from '../../components/MainLayout/MainLayout';
import ShowOrEditCleaningToolComponent from '../../components/CleaningToolManage/showOrEditCleaningTool';

function ShowOrEditCleaningTool() {
    
    return (
        <ShowOrEditCleaningToolComponent />
    );
}

export default connect()(ShowOrEditCleaningTool);