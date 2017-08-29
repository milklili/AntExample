import request from '../utils/request';
import queryString from 'query-string';
import { PAGE_SIZE } from '../constants';
//export function getData({ page, filterStr }) {
//    return request(`/api/officeManage/getVisitorRegistrationList/${page}/${PAGE_SIZE}`);
//}
export function getData(pageInfo) {
    var params = queryString.stringify({...pageInfo});
    return request('/api/officeManage/visitorRegistration/visitorRegistrationList?'+params, {
        method: 'GET'
    });
}

export function addVisitorRegistration(visitorRegistration) {
    return request(`/api/officeManage/visitorRegistration/visitorRegistration`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'Post',
        body: JSON.stringify(visitorRegistration.visitorRegistration)
    });
}

export function editVisitorRegistration({ visitorRegistration }) {
    return request('/api/officeManage/visitorRegistration/visitorRegistration', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'PUT',
        body: JSON.stringify(visitorRegistration),
    });
}

export function getVisitorRegistrationData({ id }) {
    return request(`/api/officeManage/visitorRegistration/visitorRegistration/${id}`);
}
export function remove({ ids }) {
    return request(`/api/officeManage/visitorRegistration/visitorRegistration`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'DELETE',
        body: JSON.stringify(ids),
    });
}

