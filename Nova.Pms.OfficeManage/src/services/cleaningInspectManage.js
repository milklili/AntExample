import request from '../utils/request';
import queryString from 'query-string';
import { PAGE_SIZE } from '../constants';

export function getAll(pageInfo) {
    var params = queryString.stringify({...pageInfo});
    return request('/api/officeManage/cleaningInspect?'+params, {
        method: 'GET'
    });
}

export function create(cleaningInspect) {
    return request(`/api/officeManage/cleaningInspect`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(cleaningInspect.cleaningInspect)
    });
}

export function edit({ cleaningInspect }) {
    return request('/api/officeManage/cleaningInspect', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'PUT',
        body: JSON.stringify(cleaningInspect),
    });
}

export function remove({ ids }) {
    return request(`/api/officeManage/cleaningInspect`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'DELETE',
        body: JSON.stringify(ids),
    });
}
