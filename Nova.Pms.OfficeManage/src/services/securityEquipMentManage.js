import request from '../utils/request';
import queryString from 'query-string';
import { PAGE_SIZE } from '../constants';

//export function securityEquipMentList({page, filterStr}) {
//    return request(`/api/officeManage/securityEquipMentList/${page}/${PAGE_SIZE}`);
//}
export function securityEquipMentList(pageInfo) {
    var params = queryString.stringify({...pageInfo});
    return request('/api/officeManage/securityEquipMentModules/securityEquipMentList?'+params, {
        method: 'GET'
    }); 
}

export function addSecurityEquipMent(securityEquipMent) {
    return request('/api/officeManage/securityEquipMentModules/securityEquipMent', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(securityEquipMent.securityEquipMent),
    });
}

export function editSecurityEquipMent(securityEquipMent) {
    return request('/api/officeManage/securityEquipMentModules/securityEquipMent', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'Put',
        body: JSON.stringify(securityEquipMent.securityEquipMent),
    });
}

export function remove({ids}) {
    return request(`/api/officeManage/securityEquipMentModules/securityEquipMent`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'DELETE',
        body: JSON.stringify(ids),
    });
}

export function getSecurityEquipMent({ id }) {
    return request(`/api/officeManage/securityEquipMentModules/securityEquipMent/${id}`);
}







