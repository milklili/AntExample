import React from 'react';
import { connect } from 'dva';
import { Breadcrumb } from 'antd';

import ArticleRegistrationManageComponent from '../../components/ArticleRegistrationManage/ArticleRegistrationList';

function ArticleRegistrationList() {
    return (
        <ArticleRegistrationManageComponent />
    );
}

export default connect()(ArticleRegistrationList);