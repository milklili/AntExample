import request from '../utils/request';
import queryString from 'query-string';
import { PAGE_SIZE } from '../constants';


export function getAll(pageInfo) {
    var params = queryString.stringify({...pageInfo});
    return request('/api/officeManage/meeting?'+params, {
        method: 'GET'
    });  
}

export function create(values) {
    return request('/api/officeManage/meeting', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(values.values),
    });
}
export function getMeetingData({id}) {
    return request(`/api/officeManage/meeting/${id}`);
}
export function edit({val}) {
    return request('/api/officeManage/meeting', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'PUT',
        body: JSON.stringify(val),
    });
}
export function remove({ids}) {
    return request(`/api/officeManage/meeting`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'DELETE',
        body: JSON.stringify(ids),
    });
}
