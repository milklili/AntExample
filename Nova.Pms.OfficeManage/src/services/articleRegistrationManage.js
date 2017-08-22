import request from '../utils/request';
import { PAGE_SIZE } from '../constants';
//export function getData({ page, filterStr }) {
//    return request(`/api/officeManage/getArticleRegistrationList/${page}/${PAGE_SIZE}`);
//}
export function getData(pageInfo) {
    return request('/api/officeManage/getArticleRegistrationList', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(pageInfo),
    });
}
export function getRegionList() {
    return request(`/api/officeManage/getRegionList`);
}
export function getUserList() {
    return request(`/api/officeManage/getUserList`);
}


export function getInitialRegion() {
    debugger;
    return request(`/api/officeManage/getInitialRegion`);
}
export function getInitialUser() {
    return request(`/api/officeManage/getInitialUser`);
}
export function addArticleRegistration(articleRegistration) {
    debugger;
    return request(`/api/officeManage/addArticleRegistration`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'Post',
        body: JSON.stringify(articleRegistration.articleRegistration)
    });
}




export function editArticleRegistration({ articleRegistration }) {
    debugger;
    return request('/api/officeManage/editArticleRegistration', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(articleRegistration),
    });
}

export function getArticleRegistrationData({ id }) {
    return request(`/api/officeManage/getArticleRegistrationData/${id}`);
}
export function remove({ ids }) {
    debugger;
    return request(`/api/officeManage/deleteArticleRegistration`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'DELETE',
        body: JSON.stringify({ ids: ids }),
    });
}

