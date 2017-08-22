import request from '../utils/request';
import { PAGE_SIZE } from '../constants';

export function createApproval(approval) {
    debugger;
    return request('/api/officeManage/createApproval', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(approval.approval),
    });
}
export function editApproval(approval) {
    debugger;
    return request('/api/officeManage/editApproval', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(approval.approval),
    });
}
export function addOpinions(personStatus) {
    debugger;
    return request('/api/officeManage/addOpinions', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(personStatus.personStatus),
    });
}
export function addPendingComment(personStatus) {
    debugger;
    return request('/api/officeManage/addPendingComment', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(personStatus.personStatus),
    });
}

//我已审批的 添加评论
export function addApprovedComment(personStatus) {
    debugger;
    return request('/api/officeManage/addApprovedComment', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(personStatus.personStatus),
    });
}

//抄送我的添加评论
export function addSendApprovalComment(personStatus) {
    debugger;
    return request('/api/officeManage/addSendApprovalComment', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(personStatus.personStatus),
    });
}





export function batchAddComment(personStatus) {
    debugger;
    return request('/api/officeManage/batchAddComment', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(personStatus.personStatus),
    });
}
export function transferApproval(personStatus) {
    debugger;
    return request('/api/officeManage/transferApproval', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(personStatus.personStatus),
    });
}


export function deleteApproval({ ids }) {
    debugger;
    return request(`/api/officeManage/deleteApproval`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'DELETE',
        body: JSON.stringify({ ids: ids }),
    });
}

export function revokedApproval({ ids }) {
    debugger;
    return request(`/api/officeManage/revokedApproval`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ ids: ids }),
    });
}



export function getRegion() {
    return request(`/api/officeManage/getRegion`);
}
export function getRegionList() {
    debugger;
    return request(`/api/officeManage/getRegionList`);
}

export function getAllStaffList() {
    return request(`/api/officeManage/getAllStaffList`);
}

export function getInitialRegion() {
    debugger;
    return request(`/api/officeManage/getInitialRegion`);
}

export function getPendingApprovalList(pageInfo) {
    return request('/api/officeManage/getPendingApprovalList', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(pageInfo),
    });
}
export function getApprovedList(pageInfo) {
    return request('/api/officeManage/getApprovedList', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(pageInfo),
    });
}
export function getSendApprovalList(pageInfo) {
    return request('/api/officeManage/getSendApprovalList', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(pageInfo),
    });
}



export function getAllCleaningAreaList() {
    debugger;
    return request(`/api/officeManage/getAllCleaningAreaList`);
}