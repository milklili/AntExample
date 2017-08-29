import request from '../utils/request';
import queryString from 'query-string';
import { PAGE_SIZE } from '../constants';

//export function getData({ page, filterStr }) {
//    return request(`/api/officeManage/getSecurityPositionList/${page}/${PAGE_SIZE}`);
//}
export function getData(pageInfo) {
    var params = queryString.stringify({...pageInfo});
    return request('/api/officeManage/securityPosition/securityPositionList?'+params, {
        method: 'GET'
    });
}

export function getSecurityDutyPlanList({ regionId}) {
    return request(`/api/officeManage/securityPosition/securityDutyPlanList?RegionId=${regionId}`);
}

export function getSecurityPositionInformation({ id }) {
    return request(`/api/officeManage/securityPosition/securityPositionInformation/${id}`);
} 
export function getDetailSecurityPositionList({ id}) {
    return request(`/api/officeManage/securityPosition/detailSecurityPositionList/${id}`);
}

export function addSecurityPosition(securityPosition) {
    return request(`/api/officeManage/securityPosition/SecurityPosition`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'Post',
        body: JSON.stringify(securityPosition)
    });
}
export function addSecurityPositionMembers(securityPositionMembers) {
    return request(`/api/officeManage/securityPosition/securityPositionMembers`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'Post',
        body: JSON.stringify(securityPositionMembers.securityPositionMembers)
    });
}

export function getSecurityDutyPlanData({ securityDutyPlanId }) {
    return request(`/api/officeManage/securityPosition/securityDutyPlanData/${securityDutyPlanId}`);
}

export function editSecurityPosition(securityPosition) {
    return request(`/api/officeManage/securityPosition/securityPosition`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'PUT',
        body: JSON.stringify(securityPosition)
    });
}
export function editSecurityPositionMembers(securityPositionMembers) {
    return request(`/api/officeManage/securityPosition/securityPositionMembers`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'PUT',
        body: JSON.stringify(securityPositionMembers.securityPositionMembers)
    });
}


export function removeSecurityPositionMembers({ id }) {
    return request(`/api/officeManage/securityPosition/securityPositionMembers/${id}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'DELETE',
        //body: JSON.stringify(id),
    });
}
export function removeSecurityPosition({ id }) {
    return request(`/api/officeManage/securityPosition/securityPositionMembers/${id}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'DELETE',
        //body: JSON.stringify(id),
    });
}

export function edit({ editWorkAttendance }) {
    return request('/api/officeManage/workAttendance/workAttendance', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'PUT',
        body: JSON.stringify(editWorkAttendance.editWorkAttendance),
    });
}


