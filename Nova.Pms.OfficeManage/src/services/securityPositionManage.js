import request from '../utils/request';
import { PAGE_SIZE } from '../constants';

//export function getData({ page, filterStr }) {
//    return request(`/api/officeManage/getSecurityPositionList/${page}/${PAGE_SIZE}`);
//}
export function getData(pageInfo) {
    return request('/api/officeManage/getSecurityPositionList', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(pageInfo),
    });
}


export function getRegionList() {
    debugger;
    return request(`/api/officeManage/getRegionList`);
}

export function getSecurityDutyPlanList({ regionId}) {
    debugger;
    return request(`/api/officeManage/getSecurityDutyPlanList/${regionId}`);
}


export function getDepartmentList({ id }) {
    return request(`/api/officeManage/getDepartmentList/${id}`);
}

export function getSecurityPositionInformation({ id }) {
debugger;
return request(`/api/officeManage/getSecurityPositionInformation/${id}`);
} 
export function getDetailSecurityPositionList({ id}) {
    debugger;
    return request(`/api/officeManage/getDetailSecurityPositionList/${id}`);
}

export function getAllStaffList() {
    return request(`/api/officeManage/getAllStaffList`);
}
export function getAllDepartmentList() {
    return request(`/api/officeManage/getAllDepartmentList`);
}

export function addSecurityPosition(securityPosition) {
    debugger;
    return request(`/api/officeManage/addSecurityPosition`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'Post',
        body: JSON.stringify(securityPosition)
    });
}
export function addSecurityPositionMembers(securityPositionMembers) {
    debugger;
    return request(`/api/officeManage/addSecurityPositionMembers`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'Post',
        body: JSON.stringify(securityPositionMembers.securityPositionMembers)
    });
}
export function getStaffList({ id }) {
    debugger;
    return request(`/api/officeManage/getStaffList/${id}`);
}



export function getStaffData({ staffId }) {
    debugger;
    return request(`/api/officeManage/getStaffData/${staffId}`);
}

export function getSecurityDutyPlanData({ securityDutyPlanId }) {
    debugger;
    return request(`/api/officeManage/getSecurityDutyPlanData/${securityDutyPlanId}`);
}

export function editSecurityPosition(securityPosition) {
    debugger;
    return request(`/api/officeManage/editSecurityPosition`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'Post',
        body: JSON.stringify(securityPosition)
    });
}
export function editSecurityPositionMembers(securityPositionMembers) {
    debugger;
    return request(`/api/officeManage/editSecurityPositionMembers`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'Post',
        body: JSON.stringify(securityPositionMembers.securityPositionMembers)
    });
}


export function removeSecurityPositionMembers({ id }) {
    debugger;
    return request(`/api/officeManage/deleteSecurityPositionMembers/${id}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'DELETE',
        //body: JSON.stringify(id),
    });
}
export function removeSecurityPosition({ id }) {
    debugger;
    return request(`/api/officeManage/deleteSecurityPosition/${id}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'DELETE',
        //body: JSON.stringify(id),
    });
}

export function edit({ editWorkAttendance }) {
    return request('/api/officeManage/editWorkAttendance', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(editWorkAttendance.editWorkAttendance),
    });
}


