import React from 'react';
import { connect } from 'dva';
import OfficeManageListComponent from '../../components/OfficeManage/OfficeManageList';

function ContractList() {
    return (
       <OfficeManageListComponent />
    );
}

export default connect()(ContractList);

