import request from '../utils/request';
import { PAGE_SIZE } from '../constants';
//export function getData({ page, filterStr }) {
//    return request(`/api/officeManage/getVisitorRegistrationList/${page}/${PAGE_SIZE}`);
//}
export function getData(pageInfo) {
    return request('/api/officeManage/getCleanRecordList', {
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

export function addCleaningRecord(cleaningRecord) {
    debugger;
    return request(`/api/officeManage/addCleaningRecord`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'Post',
        body: JSON.stringify(cleaningRecord.cleaningRecord)
    });
}




export function editCleaningRecord({ cleaningRecord }) {
    debugger;
    return request('/api/officeManage/editCleaningRecord', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(cleaningRecord),
    });
}


export function remove({ ids }) {
    debugger;
    return request(`/api/officeManage/deleteCleaningRecord`, {
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
