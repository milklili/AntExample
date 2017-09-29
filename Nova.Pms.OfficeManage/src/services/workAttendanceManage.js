import request from '../utils/request'
import queryString from 'query-string'
import { PAGE_SIZE } from '../constants'

// export function getData({ page, filterStr }) {
//    return request(`/api/officeManage/getWorkAttendanceList/${page}/${PAGE_SIZE}`);
// }
export function getData (pageInfo) {
  var params = queryString.stringify({ ...pageInfo })
  return request(`/api/officeManage/workAttendance?${params}`, {
    method: 'GET',
  })
}

export function getWorkAttendanceInformation ({ id }) {
  return request(`/api/officeManage/workAttendance/WorkAttendance/${id}`)
}
export function getDetailWorkAttendanceList ({ id, page }) {
  var params = queryString.stringify({ page, pageSize: PAGE_SIZE })
  return request(
    `/api/officeManage/workAttendance/detailWorkAttendanceList/${id}?${params}`,
    {
      method: 'GET',
    }
  )
}

export function addWorkAttendance (data) {
  return request('/api/officeManage/workAttendance/workAttendance', {
    method: 'Post',
    body: JSON.stringify(data),
  })
}
export function editWorkAttendance (data) {
  console.log(data)
  return request('/api/officeManage/workAttendance/workAttendance', {
    method: 'PUT',
    body: JSON.stringify(data),
  })
}
export function addStaff (data) {
  return request('/api/officeManage/workAttendance/staff', {
    method: 'Post',
    body: JSON.stringify(data.addStaff),
  })
}

export function remove ({ id }) {
  return request(`/api/officeManage/workAttendance/workAttendance/${id}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'DELETE',

    // body: JSON.stringify(id),
  })
}

export function edit ({ editWorkAttendance }) {
  return request('/api/officeManage/editWorkAttendance', {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(editWorkAttendance.editWorkAttendance),
  })
}
