import React from 'react';
import { connect } from 'dva';

import DocumentListComponent from '../../components/Document/DocumentList';

function ContractList() {
    return (
        <DocumentListComponent />
    );
}

export default connect()(ContractList);

