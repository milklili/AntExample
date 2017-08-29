import request from '../utils/request';
import queryString from 'query-string';
import { PAGE_SIZE } from '../constants';

//export function getData({ page, filterStr }) {
//    return request(`/api/officeManage/getSecurityEventsList/${page}/${PAGE_SIZE}`);
//}
export function getData(pageInfo) {
    var params = queryString.stringify({...pageInfo});
    return request('/api/officeManage/securityEvents/securityEventsList?'+params, {
        method: 'GET'
    });
}

export function addSecurityEvents(securityEvents) {
    return request(`/api/officeManage/securityEvents/securityEvents`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'Post',
        body: JSON.stringify(securityEvents.securityEvents)
    });
}

export function editSecurityEvents({ securityEvents }) {
    return request('/api/officeManage/securityEvents/securityEvents', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'Put',
        body: JSON.stringify(securityEvents),
    });
}

export function getSecurityEventsData({ id }) {
    return request(`/api/officeManage/securityEvents/securityEventsData/${id}`);
}
export function remove({ ids }) {
    return request(`/api/officeManage/securityEvents/securityEvents`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'DELETE',
        body: JSON.stringify(ids),
    });
}


