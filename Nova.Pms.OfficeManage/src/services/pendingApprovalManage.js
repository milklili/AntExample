import request from '../utils/request';
import queryString from 'query-string';
import { PAGE_SIZE } from '../constants';

export function addOpinions(personStatus) {
    return request('/api/officeManage/pendingApproval/opinions', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(personStatus.personStatus),
    });
}
export function addPendingComment(personStatus) {
    return request('/api/officeManage/pendingApproval/pendingComment', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(personStatus.personStatus),
    });
}
export function addApprovedComment(personStatus) {
    return request('/api/officeManage/pendingApproval/approvedComment', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(personStatus.personStatus),
    });
}
export function addSendApprovalComment(personStatus) {
    return request('/api/officeManage/pendingApproval/sendApprovalComment', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(personStatus.personStatus),
    });
}
export function batchAddComment(personStatus) {

    return request('/api/officeManage/pendingApproval/comment', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(personStatus.personStatus),
    });
}
export function transferApproval(personStatus) {
    return request('/api/officeManage/pendingApproval/transferApproval', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(personStatus.personStatus),
    });
}

export function deleteApproval({ ids }) {
    return request(`/api/officeManage/pendingApproval`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'DELETE',
        body: JSON.stringify( ids ),
    });
}

export function revokedApproval({ ids }) {
    return request(`/api/officeManage/revokedApproval`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ ids: ids }),
    });
}

export function getPendingApprovalList(pageInfo) {
    var params = queryString.stringify({...pageInfo});
    return request('/api/officeManage/pendingApproval/pendingApprovalList?'+params, {
        method: 'GET'
    });
}
export function getApprovedList(pageInfo) {
    var params = queryString.stringify({...pageInfo});
    return request('/api/officeManage/pendingApproval/approvedList?'+params, {
        method: 'GET'
    });
}
export function getSendApprovalList(pageInfo) {
    var params = queryString.stringify({...pageInfo});
    return request('/api/officeManage/pendingApproval/sendApprovalList?'+params, {
        method: 'GET'
    });
}

export function getAllCleaningAreaList() {
    debugger;
    return request(`/api/officeManage/getAllCleaningAreaList`);
}