import request from '../utils/request';
import { PAGE_SIZE } from '../constants';

//export function getData({page, filterStr}) {
//    return request(`/api/officeManage/documentCategorylist/${page}/${PAGE_SIZE}/${filterStr}`);
//}

export function getData(pageInfo) {
    return request('/api/officeManage/documentCategorylist', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(pageInfo),
    });
}

export function create(values) {
    return request('/api/officeManage/createDocumentCategoryCategory', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(values.values),
    });
}

export function getDocumentCategoryData({id}) {
    return request(`/api/officeManage/getDocumentCategoryData/${id}`);
}

export function edit({values}) {
    return request('/api/officeManage/editDocumentCategory', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(values),
    });
}

export function remove({ids}) {
    return request(`/api/officeManage/deleteCategory`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'DELETE',
        body: JSON.stringify({ ids:ids}),
	  });
}


