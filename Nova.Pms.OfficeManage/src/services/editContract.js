import request from '../utils/request';

export function getContractDataById(model) {
    return request(`/api/saas/getContract/${model.id.id}`);
}

export function edit(values) {
    return request('/api/saas/editContract', {
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
