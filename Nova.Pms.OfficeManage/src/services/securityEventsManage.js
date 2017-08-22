import request from '../utils/request';
import { PAGE_SIZE } from '../constants';

//export function getData({ page, filterStr }) {
//    return request(`/api/officeManage/getSecurityEventsList/${page}/${PAGE_SIZE}`);
//}
export function getData(pageInfo) {
    return request('/api/officeManage/getSecurityEventsList', {
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

export function addSecurityEvents(securityEvents) {
    debugger;
    return request(`/api/officeManage/addSecurityEvents`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'Post',
        body: JSON.stringify(securityEvents.securityEvents)
    });
}




export function editSecurityEvents({ securityEvents }) {
    debugger;
    return request('/api/officeManage/editSecurityEvents', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(securityEvents),
    });
}

export function getSecurityEventsData({ id }) {
    return request(`/api/officeManage/getSecurityEventsData/${id}`);
}
export function remove({ ids }) {
    debugger;
    return request(`/api/officeManage/deleteSecurityEvents`, {
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

