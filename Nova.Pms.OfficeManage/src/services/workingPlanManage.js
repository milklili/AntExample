import request from '../utils/request';
import queryString from 'query-string';
import { PAGE_SIZE } from '../constants';

//export function getWorkingPlanlist({page, filterStr}) {
//    return request(`/api/officeManage/workingPlanlist/${page}/${PAGE_SIZE}/${filterStr}`);
//}
export function getWorkingPlanlist(pageInfo) {
    var params = queryString.stringify({...pageInfo});
    return request('/api/officeManage/workingPlanModules/?'+params, {
        method: 'GET'
    });
}
export function create(values) {
    return request('/api/officeManage/workingPlanModules', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(values.values),
    });
}


export function getWorkingPlanEditData({id}) {
    return request(`/api/officeManage/workingPlanModules/${id}`);
}

export function edit({ val }) {
    return request('/api/officeManage/workingPlanModules', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'PUT',
        body: JSON.stringify(val),
    });
}

export function remove({ids}) {
    return request(`/api/officeManage/workingPlanModules`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'DELETE',
        body: JSON.stringify(ids),
    });
}


export function reviewWorkingPlan({ ids }) {
    return request(`/api/officeManage/workingPlanModules/review`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'PUT',
        body: JSON.stringify(ids),
    });
}
export function cancellationAuditWorkingPlan({ ids }) {
    return request(`/api/officeManage/workingPlanModules/cancelAudit`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'PUT',
        body: JSON.stringify(ids),
    });
}
export function changeWorkingPlanState( changeStateModel) {
    return request(`/api/officeManage/workingPlanModules/changeState`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'PUT',
        body: JSON.stringify(changeStateModel.changeStateModel)
    });
}





