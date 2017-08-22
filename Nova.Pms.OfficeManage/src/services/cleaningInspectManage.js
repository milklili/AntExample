import request from '../utils/request';
import { PAGE_SIZE } from '../constants';
//export function getData({ page, filterStr }) {
//    return request(`/api/officeManage/getVisitorRegistrationList/${page}/${PAGE_SIZE}`);
//}
export function getData(pageInfo) {
    return request('/api/officeManage/getCleanInspectList', {
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

export function addCleaningInspect(cleaningInspect) {
    debugger;
    return request(`/api/officeManage/addCleaningInspect`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'Post',
        body: JSON.stringify(cleaningInspect.cleaningInspect)
    });
}




export function editCleaningInspect({ cleaningInspect }) {
    debugger;
    return request('/api/officeManage/editCleaningInspect', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(cleaningInspect),
    });
}


export function remove({ ids }) {
    debugger;
    return request(`/api/officeManage/deleteCleaningInspect`, {
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
export function getAllCleaningAreaList() {
    debugger;
    return request(`/api/officeManage/getAllCleaningAreaList`);
}
