import request from '../utils/request';
import queryString from 'query-string';
import { PAGE_SIZE } from '../constants';

export function getAll(pageInfo) {
    var params = queryString.stringify({...pageInfo});
    return request('/api/officeManage/cleaningRecord?'+params, {
        method: 'GET'
    });
}

export function create(cleaningRecord) {
    return request(`/api/officeManage/cleaningRecord`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(cleaningRecord.cleaningRecord)
    });
}

export function edit({ cleaningRecord }) {
    return request('/api/officeManage/cleaningRecord', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'PUT',
        body: JSON.stringify(cleaningRecord),
    });
}

export function remove({ ids }) {
    return request(`/api/officeManage/cleaningRecord`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'DELETE',
        body: JSON.stringify(ids),
    });
}
