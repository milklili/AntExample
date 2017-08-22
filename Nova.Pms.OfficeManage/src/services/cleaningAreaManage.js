import request from '../utils/request';
import { PAGE_SIZE } from '../constants';
//export function getData({ page, filterStr }) {
//    return request(`/api/officeManage/getVisitorRegistrationList/${page}/${PAGE_SIZE}`);
//}
export function getData(pageInfo) {
    return request('/api/officeManage/getCleanAreaList', {
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

export function addCleaningArea(cleaningArea) {
    debugger;
    return request(`/api/officeManage/addCleaningArea`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'Post',
        body: JSON.stringify(cleaningArea.cleaningArea)
    });
}




export function editCleaningArea({ cleaningArea }) {
    debugger;
    return request('/api/officeManage/editCleaningArea', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(cleaningArea),
    });
}


export function remove({ ids }) {
    debugger;
    return request(`/api/officeManage/deleteCleaningArea`, {
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
export function getAllStaffList() {
    debugger;
    return request(`/api/officeManage/getAllStaffList`);
}
