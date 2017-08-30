import request from '../utils/request';
import queryString from 'query-string';
import { PAGE_SIZE } from '../constants';

export function getAll(pageInfo) {
    
    var params = queryString.stringify({...pageInfo});
    return request('/api/officeManage/cleaningArea?'+params, {
        method: 'GET'
    });
}

export function create(cleaningArea) {
    return request(`/api/officeManage/cleaningArea`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(cleaningArea.cleaningArea)
    });
}

export function edit({ cleaningArea }) {
    return request('/api/officeManage/cleaningArea', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'PUT',
        body: JSON.stringify(cleaningArea),
    });
}


export function remove({ ids }) {
    return request(`/api/officeManage/cleaningArea`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'DELETE',
        body: JSON.stringify(ids),
    });
}

