import request from '../utils/request';
import queryString from 'query-string';
import { PAGE_SIZE } from '../constants';

export function getAll(pageInfo) {
    var params = queryString.stringify({...pageInfo});
    return request('/api/officeManage/cleaningTool?'+params, {
        method: 'GET'
    });
}

export function create(cleaningTool) {
    return request(`/api/officeManage/cleaningTool`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(cleaningTool.cleaningTool)
    });
}

export function receiveOrReturnToolItems(cleaningToolItems) {
    return request(`/api/officeManage/cleaningTool/receiveOrReturnToolItems`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(cleaningToolItems.cleaningToolItems)
    });
}

export function edit(cleaningToolItems) {
    return request(`/api/officeManage/cleaningTool`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'PUT',
        body: JSON.stringify(cleaningToolItems.cleaningToolItems)
    });
}

export function remove({ ids }) {
    return request(`/api/officeManage/cleaningTool`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'DELETE',
        body: JSON.stringify(ids),
    });
}

export function removeCleaningToolItems({ id }) {
    return request(`/api/officeManage/cleaningTool/deleteCleaningToolItems?id=${id}`, {
        // headers: {
        //     'Content-Type': 'application/json'
        // },
        method: 'DELETE',
        //body: JSON.stringify(id),
    });
}

export function getCleaningToolInformation({ id }) {
    return request(`/api/officeManage/cleaningTool/getCleaningToolInformation?id=${id}`);
} 
export function getDetailCleaningToolList({ id, page}) {
    var params = queryString.stringify({page:page,pageSize:PAGE_SIZE,id:id});
    return request('/api/officeManage/cleaningTool/getCleaningToolItemsList?'+params, {
        method: 'GET'
    });   
}



