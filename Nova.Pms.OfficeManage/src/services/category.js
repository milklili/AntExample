import request from '../utils/request';
import queryString from 'query-string';
import { PAGE_SIZE } from '../constants';

//export function getData({page, filterStr}) {
//    return request(`/api/officeManage/documentCategorylist/${page}/${PAGE_SIZE}/${filterStr}`);
//}

export function getAll(parameter) {
    debugger;
    var params = queryString.stringify({...parameter});
    return request('/api/officeManage/category?'+params, {
        method: 'GET'
    });
}

export function create({values,type}) {
    return request(`/api/officeManage/category?type=${type}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(values),
    });
}

export function get({id}) {
    return request(`/api/officeManage/category/${id}?type=Document`);
}

export function save({values}) {
    return request('/api/officeManage/category?type=Document', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'PUT',
        body: JSON.stringify(values),
    });
}

export function remove({ids}) {
    return request(`/api/officeManage/category`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'DELETE',
        body: JSON.stringify(ids)
	  });
}


