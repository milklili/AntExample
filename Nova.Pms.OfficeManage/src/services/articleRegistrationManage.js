import request from '../utils/request';
import queryString from 'query-string';
import { PAGE_SIZE } from '../constants';

export function getAll(pageInfo) {
    var params = queryString.stringify({...pageInfo});
    return request('/api/officeManage/ArticleRegistration?'+params, {
        method: 'GET'
    });
}

export function create(articleRegistration) {
    return request(`/api/officeManage/ArticleRegistration`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'Post',
        body: JSON.stringify(articleRegistration.articleRegistration)
    });
}

export function edit({ articleRegistration }) {
    return request('/api/officeManage/ArticleRegistration', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'PUT',
        body: JSON.stringify(articleRegistration),
    });
}

export function remove({ ids }) {
    return request(`/api/officeManage/ArticleRegistration`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'DELETE',
        body: JSON.stringify(ids),
    });
}

