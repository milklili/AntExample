import React from 'react';
import { connect } from 'dva';
import EditDocumentCategoryComponent from '../../components/OfficeManage/EditDocumentCategory';

function ContractList() {
    return (
        <EditDocumentCategoryComponent />
    );
}

export default connect()(ContractList);