import request from '../utils/request';
import queryString from 'query-string';
import { PAGE_SIZE } from '../constants';


export function getAll(pageInfo) {
    var params = queryString.stringify({...pageInfo});
    return request('/api/saas/Contracts?'+params, {
        method: 'GET'
    });
}

export function get({ id }) {
    return request(`/api/saas/Contracts/${id}`);
}

export function create(values) {
    return request(`/api/saas/Contracts`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'Post',
        body: JSON.stringify(values.val)
    });
}

export function edit({ val }) {
    return request('/api/saas/Contracts', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'PUT',
        body: JSON.stringify(val),
    });
}

export function remove({ id }) {
    return request(`/api/saas/Contracts`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'DELETE',
        body: JSON.stringify(id),
    });
}

export function getCityData() {
    return request('http://passer-by.com/data_location/list.json');
}

export function getStreet(code) {
    
    return request(`http://passer-by.com/data_location/town/${code.code}.json`)
}
