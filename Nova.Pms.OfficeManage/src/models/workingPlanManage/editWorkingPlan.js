import * as workingPlanManageService from '../../services/workingPlanManage';
import * as commonDataService from '../../services/commonData';
import { routerRedux } from 'dva/router';
import { message } from 'antd';

export default {
    namespace: 'editWorkingPlan',
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

    },
    reducers: {
        load(state, { payload }) {
            return { ...state, ...payload };
        },
        regionChanged(state, { payload }) {
            const initialSelected = {
                departmentId: null,
                convenorId: null,
                headId: null,
                workingPlanMembers: []
            };
            let workingPlan = { ...state.workingPlan, ...initialSelected };
            return { ...state, ...payload, workingPlan };
        },

        changeField(state, { payload: { key, value } }) {
            var workingPlan = { ...state.workingPlan, [key]: value };
            return { ...state, workingPlan };
        }
    },
    effects: {
        *getWorkingPlan({ payload: { id } }, { put, call }) {
            const { data: workingPlan } = yield call(workingPlanManageService.getWorkingPlanEditData, { id });
            const { data: regionList } = yield call(commonDataService.getRegionList);
            const { data: officeManagementCategoryList } = yield call(commonDataService.getWorkingPlanCategoryList);
            id = workingPlan.regionId;

            const { data: departmentList } = yield call(commonDataService.getDepartmentByRegionId, { id });
            const { data: staffList } = yield call(commonDataService.getStaffByRegionId, { id });

            yield put({
                type: "load",
                payload: {
                    workingPlan,
                    regionList,
                    officeManagementCategoryList,
                    departmentList,
                    staffList
                }
            });

        },

        *editWorkingPlan({ payload: values }, { call, put, select }) {
            let workingPlan = yield select(state => state.editWorkingPlan.workingPlan);
            const val = Object.assign(workingPlan, values);
            const { data } = yield call(workingPlanManageService.edit, { val });
            message.success(data.message, 3);
            yield put(routerRedux.push('/workingPlanList'));
        },

       
        *selectRegion({ payload: id }, { put, call }) {
            debugger
            const { data: departmentList } = yield call(workingPlanManageService.getDepartmentList, { id });
            debugger
            const { data: staffList } = yield call(workingPlanManageService.getStaffList, { id });
            debugger
            yield put({
                type: "regionChanged",
                payload: {
                    departmentList,
                    staffList
                }
            });
        },



    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                if (pathname === '/editWorkingPlan') {
                    dispatch({ type: 'getWorkingPlan', payload: query });
                }
            });
        },
    },
};

