import request from '../utils/request';
import queryString from 'query-string';
import { PAGE_SIZE } from '../constants';

export function getData({page, filterStr}) {
	return request(`/api/saas/list/${page}/${PAGE_SIZE}/${filterStr}`);
}

export function remove(id){
		return request(`/api/saas/delete/${id}`, {
			method: 'DELETE',
		});
}

