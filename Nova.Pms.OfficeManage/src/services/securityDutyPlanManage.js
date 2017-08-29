import request from '../utils/request';
import queryString from 'query-string';
import { PAGE_SIZE } from '../constants';

//export function getData({ page, filterStr }) {
//    return request(`/api/officeManage/getSecurityDutyPlanList/${page}/${PAGE_SIZE}`);
//}
export function getData(pageInfo) {
    var params = queryString.stringify({...pageInfo});
    return request('/api/officeManage/securityDutyPlan/securityDutyPlanList?'+params, {
        method: 'GET'
    });
}

export function addSecurityDutyPlan(securityDutyPlan) {
    return request(`/api/officeManage/securityDutyPlan/securityDutyPlan`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'Post',
        body: JSON.stringify(securityDutyPlan.securityDutyPlan)
    });
}

export function editSecurityDutyPlan({ securityDutyPlan }) {
    return request('/api/officeManage/securityDutyPlan/securityDutyPlan', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'Put',
        body: JSON.stringify(securityDutyPlan),
    });
}
export function remove({ ids }) {
    return request(`/api/officeManage/securityDutyPlan/securityDutyPlan`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'DELETE',
        body: JSON.stringify(ids),
    });
}


