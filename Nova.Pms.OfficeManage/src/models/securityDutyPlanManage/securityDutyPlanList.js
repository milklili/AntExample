import * as securityDutyPlanService from '../../services/securityDutyPlanManage';
import { message } from 'antd';
import { PAGE_SIZE } from '../../constants';
export default {
    namespace: 'securityDutyPlanList',
    state: {
        list: [],
        total: null,
        page: null,
        filterStr: null,
        pageSize:null,
        seniorSearch: false,
        seniorSearchData: {
            staffName: null,
            attendanceInterval: null,
        },

        regionList: [],
        securityDutyPlan: {
            regionId: null,
            name: null,
            idCardNo: null,
            phone: null,
            respondents: null,
            visitDate: null,
            leaveDate: null,
            visitReason:null,
        },
    },
    reducers: {
        updateState(state, { payload}) {
            debugger;
            return { ...state, ...payload  };
            debugger;
        },
        
        updateSeniorSearchToggle(state, { payload: { seniorSearch } }) {
            return { ...state, seniorSearch };
        },
        updateSeniorSearchData(state, { payload: { seniorSearchData } }) {
            return { ...state, seniorSearchData };
        },
        resetSeniorSearchData(state) {
            let seniorSearchData = {
                staffName: null,
                attendanceInterval: null,
            };
            return { ...state, seniorSearchData };
        },

        changeField(state, { payload: { key, value } }) {
            debugger;
            var securityDutyPlan = { ...state.securityDutyPlan, [key]: value };
            return { ...state, securityDutyPlan };
        },
        updateSecurityDutyPlan(state, { payload: { securityDutyPlan } }) {
            debugger;
            var securityDutyPlan = { ...state.securityDutyPlan, ...securityDutyPlan }
            return { ...state, securityDutyPlan };
        },
    },
    effects: {
        *getData({ payload: { page = 1, filterStr = '', pageSize = PAGE_SIZE } }, { call, put }) {
            debugger;
            const { data } = yield call(securityDutyPlanService.getData, { page: page, filterStr: filterStr, pageSize: pageSize });
            debugger;
            const { data: regionList } = yield call(securityDutyPlanService.getRegionList);
            const { data: initialRegion } = yield call(securityDutyPlanService.getInitialRegion);
            debugger;
            yield put({
                type: 'updateState',
                payload: {
                    list: data.data,
                    total: parseInt(data.total, 10),
                    page: parseInt(page, 10),
                    pageSize: parseInt(pageSize, 10),
                    filterStr: filterStr,
                    regionList: regionList,
                }
            }); 

            yield put({
                type: 'updateSecurityDutyPlan',
                payload: {
                    securityDutyPlan: {
                        regionId: initialRegion.id,
                    }
                }
            }); 
        },

        *setSecurityDutyPlanData({ payload: { id } }, { put, call }) {
            const { data: securityDutyPlan } = yield call(securityDutyPlanService.getSecurityDutyPlanData, { id });
            yield put({
                type: "updateState",
                payload: {
                    securityDutyPlan,
                }
            });

        },


        *seniorSearchToggle({ payload: seniorSearch }, { put }) {
            yield put({
                type: 'updateSeniorSearchToggle',
                payload: {
                    seniorSearch: seniorSearch
                }
            });
        },

        *seniorSearch({ payload: values }, { call, put, select }) {
           
            let seniorSearchData = {
                staffName: null,
                attendanceInterval: null,
            }
            seniorSearchData.staffName = values.staffName;
            seniorSearchData.attendanceInterval = values.attendanceInterval;

            yield put({
                type: 'updateSeniorSearchData',
                payload: {
                    seniorSearchData: seniorSearchData
                }
            });
        },

        *resetSeniorSearch({ }, { call, put, select }) {
            yield put({
                type: 'resetSeniorSearchData'
            });
        },

        *remove({ payload: ids }, { call, put, select }) {
            debugger;
            const { data } = yield call(securityDutyPlanService.remove, ids);
            message.success(data.message, 3);

            yield put({ type: 'reload' });
        },
     
        *addSecurityDutyPlan({ payload: securityDutyPlan }, { call, put, select }) {
            debugger;
            const { data } = yield call(securityDutyPlanService.addSecurityDutyPlan, securityDutyPlan);
            message.success(data.message, 3);  
            debugger;
            yield put({
                type: 'changeSecurityDutyPlan',
                payload: {
                    securityDutyPlan: securityDutyPlan.securityDutyPlan
                }
            });

            yield put({ type: 'reload' });
        },

        *changeSecurityDutyPlan({ payload: securityDutyPlan }, { call, put, select }) {
            debugger;
            yield put({
                type: 'updateState',
                payload: {
                    securityDutyPlan: securityDutyPlan.securityDutyPlan
                }
            });
        },
        
        *editSecurityDutyPlan({ payload: securityDutyPlan }, { call, put, select }) {
            debugger;
            const { data } = yield call(securityDutyPlanService.editSecurityDutyPlan, securityDutyPlan);
            message.success(data.message, 3);
            yield put({
                type: 'reload',
            });
        },


        *reload(action, { put, select }) {
            debugger;
            const page = yield select(state => state.securityDutyPlanList.page);
            debugger;
            const filterStr = yield select(state => state.securityDutyPlanList.filterStr);
            const pageSize = yield select(state => state.securityDutyPlanList.pageSize);
            yield put({ type: 'getData', payload: { page, filterStr, pageSize } });
        }
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                if (pathname === '/securityDutyPlanList') {
                    dispatch({ type: 'getData', payload: query });
                }
            });
        },
    },
};
