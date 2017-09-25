import queryString from 'query-string'
import request from '../utils/request'
import { PAGE_SIZE } from '../constants'

// export function getData({ page, filterStr }) {
//    return request(`/api/officeManage/getSecurityDutyPlanList/${page}/${PAGE_SIZE}`);
// }
export function getData (pageInfo) {
  const params = queryString.stringify({ ...pageInfo })
  return request(
    `/api/officeManage/securityDutyPlan/securityDutyPlanList?${params}`,
    {
      method: 'GET',
    }
  )
}

export function save (securityDutyPlan, type = 0) {
  const method = type ? 'put' : 'post'
  return request('/api/officeManage/securityDutyPlan/securityDutyPlan', {
    method,
    body: JSON.stringify(securityDutyPlan),
  })
}
export function remove ({ ids }) {
  return request('/api/officeManage/securityDutyPlan/securityDutyPlan', {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'DELETE',
    body: JSON.stringify(ids),
  })
}
