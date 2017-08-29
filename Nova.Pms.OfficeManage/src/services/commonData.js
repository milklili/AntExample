import request from '../utils/request';
import queryString from 'query-string';
import { PAGE_SIZE } from '../constants';

export function getCurrentRegion() {
    return request(`/api/officeManage/commonData/getCurrentRegion`);
}

export function getCurrentStaff() {
    return request(`/api/officeManage/commonData/getCurrentStaff`);
}

export function getRegionList() {
    return request(`/api/officeManage/commonData/getRegionList`);
}

export function getStaffList() {
    return request(`/api/officeManage/commonData/getStaffList`);
}

export function getDepartmentList() {
    return request(`/api/officeManage/commonData/getDepartmentList`);
}

export function getDepartmentByRegionId({ id }) {
    return request(`/api/officeManage/commonData/getDepartmentByRegionId?id=${id}`);
}

export function getDocumentCategoryList() {
    return request(`/api/officeManage/commonData/getDocumentCategoryList`);
}

export function getMeetingCategoryList() {
    return request(`/api/officeManage/commonData/getMeetingCategoryList`);
}

export function getWorkingPlanCategoryList() {
    return request(`/api/officeManage/commonData/getWorkingPlanCategoryList`);
}

export function getStaffByRegionId({id}) {
    return request(`/api/officeManage/commonData/getStaffByRegionId?id=${id}`);
}

export function cleaningAreaList() {
    return request(`/api/officeManage/commonData/cleaningAreaList`);
}

export function getStaffDataById({id}) {
    return request(`/api/officeManage/commonData/getStaffDataById?id=${id}`);
}
