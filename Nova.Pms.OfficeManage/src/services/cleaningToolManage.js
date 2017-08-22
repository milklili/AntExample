import request from '../utils/request';
import { PAGE_SIZE } from '../constants';

export function getData(pageInfo) {
    debugger;
    return request('/api/officeManage/getCleaningToolList', {
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

export function getDepartmentList({ id }) {
    return request(`/api/officeManage/getDepartmentList/${id}`);
}


export function addCleaningTool(cleaningTool) {
    debugger;
    return request(`/api/officeManage/addCleaningTool`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'Post',
        body: JSON.stringify(cleaningTool.cleaningTool)
    });
}


export function receiveOrReturnToolItems(cleaningToolItems) {
    debugger;
    return request(`/api/officeManage/receiveOrReturnToolItems`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'Post',
        body: JSON.stringify(cleaningToolItems.cleaningToolItems)
    });
}
export function editReceiveOrReturnToolItems(cleaningToolItems) {
    debugger;
    return request(`/api/officeManage/editReceiveOrReturnToolItems`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'Post',
        body: JSON.stringify(cleaningToolItems.cleaningToolItems)
    });
}

export function remove({ ids }) {
    debugger;
    return request(`/api/officeManage/deleteCleaningTool`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'DELETE',
        body: JSON.stringify({ ids: ids }),
    });
}

export function removeCleaningToolItems({ id }) {
    return request(`/api/officeManage/deleteCleaningToolItems/${id}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'DELETE',
        //body: JSON.stringify(id),
    });
}




export function getCleaningToolInformation({ id }) {
debugger;
    return request(`/api/officeManage/getCleaningToolInformation/${id}`);
} 
export function getDetailCleaningToolList({ id, page}) {
    debugger;
    return request(`/api/officeManage/getCleaningToolItemsList/${id}/${page}/${PAGE_SIZE}`);
}

export function getAllStaffList() {
    return request(`/api/officeManage/getAllStaffList`);
}
export function getAllDepartmentList() {
    return request(`/api/officeManage/getAllDepartmentList`);
}

export function getInitialRegion() {
    debugger;
    return request(`/api/officeManage/getInitialRegion`);
}


