import React from 'react';
import { connect } from 'dva';
import CreateDocumentComponent from '../../components/Document/CreateDocument';

function ContractList() {
    return (
        <CreateDocumentComponent />
    );
}

export default connect()(ContractList);

