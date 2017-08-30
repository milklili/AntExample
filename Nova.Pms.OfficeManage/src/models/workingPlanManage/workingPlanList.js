import * as workingPlanManageService from '../../services/workingPlanManage';
import * as commonDataService from '../../services/commonData';
import { message } from 'antd';
import { PAGE_SIZE } from '../../constants';
export default {
    namespace: 'workingPlanList',
    state: {
        list: [],
        total: null,
        page: null,
        filterStr: '',
        pageSize:null,
    },
    reducers: {
        updateState(state, {payload: {data: list, total, page, filterStr,pageSize}}) {
            return { ...state, list, total, page, filterStr,pageSize };
            
        },

        changeField(state, { payload: { key, value } }) {
            var workingPlan = { ...state.workingPlan, [key]: value };
            return { ...state, workingPlan };
        }

    },
    effects: {
        *getWorkingPlanList({ payload: { page = 1, filterStr = '', pageSize = PAGE_SIZE} }, { call, put }) {
            const { data, headers } = yield call(workingPlanManageService.getWorkingPlanlist, { page: page, filterStr: filterStr, pageSize: pageSize });
            
            yield put({
                type: 'updateState',
                payload: {
                    data: data.data,
                    total: parseInt(data.total, 10),
                    page: parseInt(page, 10),
                    pageSize: parseInt(pageSize, 10),
                    filterStr: filterStr
                }
            });
            
        },

        *remove({ payload: ids }, { call, put }) {
            const { data } = yield call(workingPlanManageService.remove, ids);
            message.success(data.message, 3);
            yield put({ type: 'reload' });
        },


        *reviewWorkingPlan({ payload: ids }, { call, put, select }) {
            const { data } = yield call(workingPlanManageService.reviewWorkingPlan, ids);
            message.success(data.message, 3);
            yield put({ type: 'reload' });
        },
        *cancellationAuditWorkingPlan({ payload: ids }, { call, put, select }) {
            const { data } = yield call(workingPlanManageService.cancellationAuditWorkingPlan, ids);
            message.success(data.message, 3);
            yield put({ type: 'reload' });
        },

        *changeWorkingPlanState({ payload: { changeStateModel} }, { call, put }) {
            const { data } = yield call(workingPlanManageService.changeWorkingPlanState, { changeStateModel });
            message.success(data.message, 3);
            yield put({ type: 'reload' });

        },

        *reload(action, { put, select }) {
            const page = yield select(state => state.workingPlanList.page);
            const filterStr = yield select(state => state.workingPlanList.filterStr);
            const pageSize = yield select(state => state.workingPlanList.pageSize);
            yield put({ type: 'getWorkingPlanList', payload: { page, filterStr,pageSize } });
        }
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                if (pathname === '/workingPlanList') {
                    dispatch({ type: 'getWorkingPlanList', payload: query });
                }
            });
        },
    },
};

