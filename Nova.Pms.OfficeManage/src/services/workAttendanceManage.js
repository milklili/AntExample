import request from '../utils/request';
import { PAGE_SIZE } from '../constants';

//export function getData({ page, filterStr }) {
//    return request(`/api/officeManage/getWorkAttendanceList/${page}/${PAGE_SIZE}`);
//}
export function getData(pageInfo) {
    debugger;
    return request('/api/officeManage/getWorkAttendanceList', {
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

export function getWorkAttendanceInformation({ id }) {
debugger;
    return request(`/api/officeManage/getWorkAttendanceInformation/${id}`);
} 
export function getDetailWorkAttendanceList({ id, page}) {
    debugger;
    return request(`/api/officeManage/getDetailWorkAttendanceList/${id}/${page}/${PAGE_SIZE}`);
}

export function getAllStaffList() {
    return request(`/api/officeManage/getAllStaffList`);
}
export function getAllDepartmentList() {
    return request(`/api/officeManage/getAllDepartmentList`);
}

export function addWorkAttendance(addWorkAttendance) {
    debugger;
    return request(`/api/officeManage/addWorkAttendance`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'Post',
        body: JSON.stringify(addWorkAttendance.addWorkAttendance)
    });
}
export function editWorkAttendance(editWorkAttendance) {
    debugger;
    return request(`/api/officeManage/editWorkAttendance`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'Post',
        body: JSON.stringify(editWorkAttendance.editWorkAttendance)
    });
}
export function addStaff(addStaff) {
    debugger;
    return request(`/api/officeManage/addStaff`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'Post',
        body: JSON.stringify(addStaff.addStaff)
    });
}


export function remove({ id }) {
    debugger;
    return request(`/api/officeManage/deleteWorkAttendance/${id}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'DELETE',
        //body: JSON.stringify(id),
    });
}

export function edit({ editWorkAttendance }) {
    return request('/api/officeManage/editWorkAttendance', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(editWorkAttendance.editWorkAttendance),
    });
}


