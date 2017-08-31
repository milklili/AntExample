import request from '../utils/request';
import queryString from 'query-string';
import { PAGE_SIZE } from '../constants';

export function create(approval) {
    return request('/api/officeManage/approval', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(approval.approval),
    });
}
export function edit(approval) {
    return request('/api/officeManage/approval', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'PUT',
        body: JSON.stringify(approval.approval),
    });
}
export function comment(personStatus) {
    return request('/api/officeManage/approval/addComment', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(personStatus.personStatus),
    });
}
export function remove({ ids }) {
    return request(`/api/officeManage/approval`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'DELETE',
        body: JSON.stringify(ids),
    });
}
export function revoked({ ids }) {
    return request(`/api/officeManage/approval/revokedApproval`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(ids),
    });
}

export function getAll(pageInfo) {
    var params = queryString.stringify({...pageInfo});
    return request('/api/officeManage/approval?'+params, {
        method: 'GET'
    });
}
export function cleaningAreaList() {
    return request(`/api/officeManage/cleaningArea/cleaningAreaList`);
}
export function get({ id }) {
    return request(`/api/officeManage/Approval/${id}`);
}