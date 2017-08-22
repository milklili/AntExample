import request from '../utils/request';
import { PAGE_SIZE } from '../constants';

export function createApproval(approval) {
    debugger;
    return request('/api/officeManage/createApproval', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(approval.approval),
    });
}
export function editApproval(approval) {
    debugger;
    return request('/api/officeManage/editApproval', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(approval.approval),
    });
}
export function addComment(personStatus) {
    debugger;
    return request('/api/officeManage/addComment', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(personStatus.personStatus),
    });
}

export function deleteApproval({ ids }) {
    debugger;
    return request(`/api/officeManage/deleteApproval`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'DELETE',
        body: JSON.stringify({ ids: ids }),
    });
}

export function revokedApproval({ ids }) {
    debugger;
    return request(`/api/officeManage/revokedApproval`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ ids: ids }),
    });
}

export function getRegion() {
    return request(`/api/officeManage/getRegion`);
}
export function getRegionList() {
    debugger;
    return request(`/api/officeManage/getRegionList`);
}

export function getAllStaffList() {
    return request(`/api/officeManage/getAllStaffList`);
}

export function getStaffList({ id }) {
    debugger;
    return request(`/api/officeManage/getStaffList/${id}`);
} 


export function getInitialRegion() {
    debugger;
    return request(`/api/officeManage/getInitialRegion`);
}

export function getInitiatedList(pageInfo) {
    return request('/api/officeManage/getInitiatedList', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(pageInfo),
    });
}
export function getAllCleaningAreaList() {
    debugger;
    return request(`/api/officeManage/getAllCleaningAreaList`);
}
export function getApprovalInformation({ id }) {
    debugger;
    return request(`/api/officeManage/getApprovalInformation/${id}`);
}