import request from '../utils/request';
import queryString from 'query-string';

export function create(values) {
    return request('/api/saas/createContract', {
    	headers: {
		    'Content-Type': 'application/json'
	  	},
        method: 'POST',
        body: JSON.stringify(values.val),
    });
}

export function getCityData() {
    return request('http://passer-by.com/data_location/list.json');
}

export function getStreet(code) {
    
    return request(`http://passer-by.com/data_location/town/${code.code}.json`)
}