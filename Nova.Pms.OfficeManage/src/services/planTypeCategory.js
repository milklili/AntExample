import request from '../utils/request';
import { PAGE_SIZE } from '../constants';

//export function getData_plan({ page, filterStr }) {
//    debugger;
//    return request(`/api/officeManage/workingPlanCategorylist/${page}/${PAGE_SIZE}/${filterStr }`);
//}

export function getData_plan(pageInfo) {
    debugger;
    return request('/api/officeManage/workingPlanCategorylist', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(pageInfo),
    });
}

export function remove({ids}) {
    return request(`/api/officeManage/deleteCategory`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'DELETE',
        body: JSON.stringify({ ids: ids }),
    });
}

export function edit_plan({values}) {
    return request('/api/officeManage/editWorkingPlanCategory', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(values),
    });
}

export function getPlanTypeData({id}) {
    return request(`/api/officeManage/getWorkingPlanData/${id}`);
}

export function create_plan(values) {
    return request('/api/officeManage/createWorkingPlanCategoryCategory', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(values.values),
    });
}