import request from '../utils/request';
import { PAGE_SIZE } from '../constants';

//export function securityEquipMentList({page, filterStr}) {
//    return request(`/api/officeManage/securityEquipMentList/${page}/${PAGE_SIZE}`);
//}
export function securityEquipMentList(pageInfo) {
    return request('/api/officeManage/securityEquipMentList', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(pageInfo),
    });
}

export function addSecurityEquipMent(securityEquipMent) {
    debugger;
    return request('/api/officeManage/createSecurityEquipMent', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(securityEquipMent.securityEquipMent),
    });
}

export function editSecurityEquipMent(securityEquipMent) {
    return request('/api/officeManage/editSecurityEquipMent', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(securityEquipMent.securityEquipMent),
    });
}


export function remove({ids}) {
    return request(`/api/officeManage/deleteSecurityEquipMent`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'DELETE',
        body: JSON.stringify({ ids:ids}),
    });
}

export function getRegionList() {
debugger;
    return request(`/api/officeManage/getRegionList`);
}

export function getDepartmentList({ id }) {
    return request(`/api/officeManage/getDepartmentList/${id}`);
}

export function getStaffList({ id }) {
    debugger;
    return request(`/api/officeManage/getStaffList/${id}`);
}


export function getSecurityEquipMent({ id }) {
    return request(`/api/officeManage/getSecurityEquipMent/${id}`);
}
export function getInitialRegion() {
    debugger;
    return request(`/api/officeManage/getInitialRegion`);
}

export function getAllStaffList() {
    debugger;
    return request(`/api/officeManage/getAllStaffList`);
}

export function getAllDepartmentList() {
    debugger;
    return request(`/api/officeManage/GetAllDepartmentList`);
}







