import request from '../utils/request';
import { PAGE_SIZE } from '../constants';

//export function getData({page, filterString}) {
//    return request(`/api/officeManage/meetingList/${page}/${PAGE_SIZE}/${filterString}`);
//}
export function getData(pageInfo) {
    debugger;
    return request('/api/officeManage/meetingList', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(pageInfo),
    });
}
export function getRegion() {
    return request(`/api/officeManage/getRegion`);
}
export function getMeetingCategoryList() {
    return request(`/api/officeManage/getMeetingCategoryList`);
}
export function getDepartmentByRegionId({id}) {
    return request(`/api/officeManage/getDepartmentByRegionId/${id}`);
}
export function getStaffByRegionId({id}) {
    return request(`/api/officeManage/getStaffByRegionId/${id}`);
}
export function create(values) {
    return request('/api/officeManage/createMeetingRecord', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(values.values),
    });
}
export function getMeetingData({id}) {
    return request(`/api/officeManage/getMeetingData/${id}`);
}
export function edit({val}) {
    return request('/api/officeManage/editMeeting', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(val),
    });
}
export function remove({ids}) {
    return request(`/api/officeManage/deleteMeeting`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'DELETE',
        body: JSON.stringify({ ids: ids }),
    });
}
