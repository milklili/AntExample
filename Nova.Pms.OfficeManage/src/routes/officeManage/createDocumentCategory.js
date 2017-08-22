import React from 'react';
import { connect } from 'dva';
import CreateDocumentCategoryComponent from '../../components/OfficeManage/CreateDocumentCategory';

function ContractList() {
    return (
        <CreateDocumentCategoryComponent />
    );
}

export default connect()(ContractList);