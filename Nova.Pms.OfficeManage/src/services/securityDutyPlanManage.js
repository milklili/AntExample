import request from '../utils/request';
import { PAGE_SIZE } from '../constants';

//export function getData({ page, filterStr }) {
//    return request(`/api/officeManage/getSecurityDutyPlanList/${page}/${PAGE_SIZE}`);
//}
export function getData(pageInfo) {
    return request('/api/officeManage/getSecurityDutyPlanList', {
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
export function getInitialRegion() {
    debugger;
    return request(`/api/officeManage/getInitialRegion`);
}






export function addSecurityDutyPlan(securityDutyPlan) {
    debugger;
    return request(`/api/officeManage/addsecurityDutyPlan`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'Post',
        body: JSON.stringify(securityDutyPlan.securityDutyPlan)
    });
}




export function editSecurityDutyPlan({ securityDutyPlan }) {
    debugger;
    return request('/api/officeManage/editSecurityDutyPlan', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(securityDutyPlan),
    });
}

export function getSecurityDutyPlanData({ id }) {
    return request(`/api/officeManage/getSecurityDutyPlanData/${id}`);
}
export function remove({ ids }) {
    debugger;
    return request(`/api/officeManage/deleteSecurityDutyPlan`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'DELETE',
        body: JSON.stringify({ ids: ids }),
    });
}


