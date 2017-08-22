import * as workingPlanManageService from '../../services/workingPlanManage';
import { routerRedux } from 'dva/router';
import { message } from 'antd';

export default {
    namespace: 'watchWorkingPlan',
    state: {
        workingPlan: {

            name: null,
            remark: null,

            id: null,
            regionId: null,
            departmentId: null,
            //workingPlanType: null,
            OfficeManagementCategoryId: null,

            planContent: null,
            startDate: null,

            endDate: null,
            convenorId: null,
            headId: null,
            workingPlanMembers: [],
            state: null,
            actualStartDate: null,

            actualEndDate: null,
            completion: null,
            place: null,
            operatorId: null,
            createDate: null,
            auditState: null,

            auditorId: null,
            auditDate: null,
        },
        regionList: [],
        departmentList: [],
        staffList: [],
        officeManagementCategoryList: [],
        userList:[],

    },
    reducers: {
        load(state, { payload }) {
            return { ...state, ...payload };
        },
    },
    effects: {
        *getWorkingPlan({ payload: { id } }, { put, call }) {
            const { data: workingPlan } = yield call(workingPlanManageService.getWorkingPlanEditData, { id });
            const { data: regionList } = yield call(workingPlanManageService.getRegionList);
            const { data: officeManagementCategoryList } = yield call(workingPlanManageService.getOfficeManagementCategoryList);
            const { data: userList } = yield call(workingPlanManageService.getUserList);
            id = workingPlan.regionId;
            

            const { data: departmentList } = yield call(workingPlanManageService.getDepartmentList, { id });
            const { data: staffList } = yield call(workingPlanManageService.getStaffList, { id });

            yield put({
                type: "load",
                payload: {
                    workingPlan,
                    regionList,
                    officeManagementCategoryList,
                    departmentList,
                    staffList,
                    userList
                }
            });

        },
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                debugger;
                if (pathname === '/watchWorkingPlan') {
                    dispatch({ type: 'getWorkingPlan', payload: query });
                }
            });
        },
    },
};

