import request from '../utils/request';
import queryString from 'query-string';
import { PAGE_SIZE } from '../constants';

//export function getData({ page, filterStr }) {
//    return request(`/api/officeManage/getWorkAttendanceList/${page}/${PAGE_SIZE}`);
//}
export function getData(pageInfo) {
    var params = queryString.stringify({...pageInfo});
    return request('/api/officeManage/workAttendance?'+params, {
        method: 'GET'
    });
}

export function getWorkAttendanceInformation({ id }) {
    return request(`/api/officeManage/workAttendance/WorkAttendance/${id}`);
} 
export function getDetailWorkAttendanceList({ id, page}) {
    var params = queryString.stringify({page:page,pageSize:PAGE_SIZE});
    return request(`/api/officeManage/workAttendance/detailWorkAttendanceList/${id}?`+params, {
        method: 'GET'
    });
}

export function addWorkAttendance(addWorkAttendance) {
    return request(`/api/officeManage/workAttendance/workAttendance`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'Post',
        body: JSON.stringify(addWorkAttendance.addWorkAttendance)
    });
}
export function editWorkAttendance(editWorkAttendance) {
    return request(`/api/officeManage/workAttendance/workAttendance`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'PUT',
        body: JSON.stringify(editWorkAttendance.editWorkAttendance)
    });
}
export function addStaff(addStaff) {
    return request(`/api/officeManage/workAttendance/staff`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'Post',
        body: JSON.stringify(addStaff.addStaff)
    });
}


export function remove({ id }) {
    return request(`/api/officeManage/workAttendance/workAttendance/${id}`, {
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


