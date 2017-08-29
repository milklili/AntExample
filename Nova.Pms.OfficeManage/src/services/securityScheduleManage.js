import request from '../utils/request';
import queryString from 'query-string';
import { PAGE_SIZE } from '../constants';

//export function getData({ page, filterStr }) {
//    return request(`/api/officeManage/getSecurityScheduleList/${page}/${PAGE_SIZE}`);
//}
export function getData(pageInfo) {
    var params = queryString.stringify({...pageInfo});
    return request('/api/officeManage/securitySchedule/securityScheduleList?'+params, {
        method: 'GET'
    });
}



