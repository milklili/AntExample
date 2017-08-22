import request from '../utils/request';
import { PAGE_SIZE } from '../constants';

//export function getWorkingPlanlist({page, filterStr}) {
//    return request(`/api/officeManage/workingPlanlist/${page}/${PAGE_SIZE}/${filterStr}`);
//}
export function getWorkingPlanlist(pageInfo) {
    return request('/api/officeManage/workingPlanlist', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(pageInfo),
    });
}
export function create(values) {
    return request('/api/officeManage/createWorkingPlan', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(values.values),
    });
}

export function getRegionList() {
    return request(`/api/officeManage/getRegionList`);
}

export function getDepartmentList({ id }) {
    return request(`/api/officeManage/getDepartmentList/${id}`);
}

export function getStaffList({ id }) {
    debugger;
    return request(`/api/officeManage/getStaffList/${id}`);
} 
export function getUserList() {
    debugger;
    return request(`/api/officeManage/getUserList`);
} 


export function getOfficeManagementCategoryList() {
    return request('/api/officeManage/getOfficeManagementCategoryList');
}

export function getWorkingPlanStaff({departmentId}) {
    return request(`/api/officeManage/getWorkingPlanStaff/${departmentId}`);
}


export function getWorkingPlanDepartment({regionId}){
debugger;
    return request(`/api/officeManage/getWorkingPlanDepartment/${regionId}`);
}


export function getWorkingPlanEditData({id}) {
    return request(`/api/officeManage/getWorkingPlanEditData/${id}`);
}
export function getWorkingPlanWatchData({ id }) {
    return request(`/api/officeManage/getWorkingPlanWatchData/${id}`);
}

export function edit({ val }) {
    return request('/api/officeManage/editWorkingPlan', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(val),
    });
}


export function remove({ids}) {
    return request(`/api/officeManage/deleteWorkingPlan`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'DELETE',
        body: JSON.stringify({ ids:ids}),
    });
}


export function reviewWorkingPlan({ ids }) {
    return request(`/api/officeManage/reviewWorkingPlan`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'Post',
        body: JSON.stringify({ ids: ids }),
    });
}
export function cancellationAuditWorkingPlan({ ids }) {
    return request(`/api/officeManage/cancellationAuditWorkingPlan`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'Post',
        body: JSON.stringify({ ids: ids }),
    });
}
export function changeWorkingPlanState( changeStateModel) {
    debugger;
    return request(`/api/officeManage/changeWorkingPlanState`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'Post',
        body: JSON.stringify(changeStateModel.changeStateModel)
    });
}





