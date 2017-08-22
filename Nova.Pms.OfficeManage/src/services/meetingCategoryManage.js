import request from '../utils/request';
import { PAGE_SIZE } from '../constants';

//export function getMeetingCategorylist({page, filterStr}) {
//    return request(`/api/officeManage/meetingCategorylist/${page}/${PAGE_SIZE}/${filterStr}`);
//}
export function getMeetingCategorylist(pageInfo) {
    return request('/api/officeManage/meetingCategorylist', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(pageInfo),
    });
}

export function create(values) {
    return request('/api/officeManage/createMeetingCategoryCategory', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(values.values),
    });
}

export function getMeetingCategoryData({id}) {
    return request(`/api/officeManage/getMeetingCategoryData/${id}`);
}
export function edit({values}) {
    return request('/api/officeManage/editMeetingCategory', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(values),
    });
}


export function remove({ids}) {
    return request(`/api/officeManage/deleteCategory`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'DELETE',
        body: JSON.stringify({ ids:ids}),
    });
}



