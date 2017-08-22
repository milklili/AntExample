import * as workingPlanManageService from '../../services/workingPlanManage';
import { routerRedux } from 'dva/router';
import { message } from 'antd';

export default {
    namespace: 'createWorkingPlan',
    state: {
        workingPlan: {
            name: null,
            remark: null,

            id: null,
            regionId: null,
            departmentId: null,
            //workingPlanType: null,
            officeManagementCategoryId: null,

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

            auditor: null,
            auditDate: null,
            
        },
        regionList: [],
        departmentList: [],
        staffList: [],
        officeManagementCategoryList: [],
    },
    reducers: {
        updateState(state, { payload }) {
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

        *setWorkingPlan({}, { put, call }) {
            const { data: regionList } = yield call(workingPlanManageService.getRegionList);
            const { data: officeManagementCategoryList } = yield call(workingPlanManageService.getOfficeManagementCategoryList);
            yield put({
                type: 'updateState',
                payload: {
                    regionList,
                    officeManagementCategoryList,
                    workingPlan:{
                        state:0
                    }
                }
            })
        },

        *selectRegion({ payload: id }, { put, call }) {
            const { data: departmentList } = yield call(workingPlanManageService.getDepartmentList, { id });
            const { data: staffList } = yield call(workingPlanManageService.getStaffList, { id });
            yield put({
                type: "regionChanged",
                payload: {
                    departmentList,
                    staffList
                }
            });
        },
        *addWorkingPlan({ payload: values }, { call, put, select}) {
            
            //const { data } = yield call(workingPlanManageService.create, { values });
            //message.success(data.message, 3);
            //yield put(routerRedux.push('/workingPlanList'));


            let workingPlanData = yield select(
                state => state.createWorkingPlan.workingPlan
            );
            const val = Object.assign(workingPlanData, values);
            const { data } = yield call(workingPlanManageService.create, { values });
            message.success(data.message, 3);
            yield put(routerRedux.push("/workingPlanList"));
        }
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                debugger;
                if (pathname === '/createWorkingPlan') {
                    dispatch({ type: 'setWorkingPlan', payload: query });
                }
            });
        },
    },
};

