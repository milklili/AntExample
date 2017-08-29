import request from '../utils/request';
import queryString from 'query-string';
import { PAGE_SIZE } from '../constants';

export function getAll(pageInfo) {
    var params = queryString.stringify({...pageInfo});
    return request('/api/officeManage/documentation?'+params, {
        method: 'GET'
    });

}

export function create(values) {
    return request('/api/officeManage/documentation', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(values.val),
    });
}

export function getDocumentById({id}) {
    return request(`/api/officeManage/documentation/${id}`);
}

export function edit({val}) {
    return request('/api/officeManage/documentation', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'PUT',
        body: JSON.stringify(val),
    });
}
export function remove({ids}) {
    return request(`/api/officeManage/documentation`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'DELETE',
        body: JSON.stringify(ids),
    });
}

export function auditDocuments({ids}) {
    return request(`/api/officeManage/documentation/auditDocuments`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(ids),
    });
}

export function cancelAuditDocuments({ids}) {
    return request(`/api/officeManage/documentation/cancelAuditDocuments`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(ids),
    });
}

export function deleteDocumentAttachments({ids}) {
    return request(`/api/officeManage/documentation/deleteDocumentAttachments`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'DELETE',
        body: JSON.stringify(ids),
    });
}

export function addDocumentAttachments(data) {
    return request(`/api/officeManage/documentation/addDocumentAttachments`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(data),
    });
}
