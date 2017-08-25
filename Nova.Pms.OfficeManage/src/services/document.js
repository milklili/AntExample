import request from '../utils/request';
import { PAGE_SIZE } from '../constants';

//export function getData({page, filterStr}) {
//    return request(`/api/officeManage/documentation/${page}/${PAGE_SIZE}`);
//}
export function getData(pageInfo) {
    return request('/api/officeManage/DocumentationList', {
        headers: {
            'Content-Type': 'application/json'
        },	  
        method: 'POST',
        body: JSON.stringify(pageInfo),
    });
}
export function getRegionList() {
    return request(`/api/officeManage/GetRegionList`);
}
export function getDocumentCategoryList() {
    return request(`/api/officeManage/getDocumentCategoryList`);
}
export function getUsers() {
    return request(`/api/officeManage/getUsersList`);
}
export function create(values) {
    return request('/api/officeManage/createDocument', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(values.val),
    });
}
export function getDocumentById({id}) {
    return request(`/api/officeManage/getDocumentById/${id}`);
}
export function edit({val}) {
    return request('/api/officeManage/editDocument', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(val),
    });
}
export function remove({ids}) {
    return request(`/api/officeManage/deleteDocument`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'DELETE',
        body: JSON.stringify({ ids: ids }),
    });
}
export function auditDocuments({ids}) {
    return request(`/api/officeManage/auditDocuments`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ ids: ids }),
    });
}
export function cancelAuditDocuments({ids}) {
    return request(`/api/officeManage/cancelAuditDocuments`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ ids: ids }),
    });
}
export function deleteDocumentAttachments({ids}) {
    return request(`/api/officeManage/deleteDocumentAttachments`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'DELETE',
        body: JSON.stringify({ ids: ids }),
    });
}
export function addDocumentAttachments(data) {
    return request(`/api/officeManage/addDocumentAttachments`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'Post',
        body: JSON.stringify(data),
    });
}
