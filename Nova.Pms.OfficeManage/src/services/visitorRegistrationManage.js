import request from '../utils/request';
import { PAGE_SIZE } from '../constants';
//export function getData({ page, filterStr }) {
//    return request(`/api/officeManage/getVisitorRegistrationList/${page}/${PAGE_SIZE}`);
//}
export function getData(pageInfo) {
    return request('/api/officeManage/getVisitorRegistrationList', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(pageInfo),
    });
}
export function getRegionList() {
    debugger;
    return request(`/api/officeManage/getRegionList`);
}

export function addVisitorRegistration(visitorRegistration) {
    debugger;
    return request(`/api/officeManage/addVisitorRegistration`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'Post',
        body: JSON.stringify(visitorRegistration.visitorRegistration)
    });
}




export function editVisitorRegistration({ visitorRegistration }) {
    debugger;
    return request('/api/officeManage/editVisitorRegistration', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(visitorRegistration),
    });
}

export function getVisitorRegistrationData({ id }) {
    return request(`/api/officeManage/getVisitorRegistrationData/${id}`);
}
export function remove({ ids }) {
    debugger;
    return request(`/api/officeManage/deleteVisitorRegistration`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'DELETE',
        body: JSON.stringify({ ids: ids }),
    });
}
export function getInitialRegion() {
    debugger;
    return request(`/api/officeManage/getInitialRegion`);
}
