import * as visitorRegistrationService from '../../services/visitorRegistrationManage';
import { message } from 'antd';
import { PAGE_SIZE } from '../../constants';
export default {
    namespace: 'visitorRegistrationList',
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
        visitorRegistration: {
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
            var visitorRegistration = { ...state.visitorRegistration, [key]: value };
            return { ...state, visitorRegistration };
        },
        updateVisitorRegistration(state, { payload: { visitorRegistration } }) {
            debugger;
            var visitorRegistration = { ...state.visitorRegistration, ...visitorRegistration }
            return { ...state, visitorRegistration };
        },
    },
    effects: {
        *getData({ payload: { page = 1, filterStr = '', pageSize = PAGE_SIZE } }, { call, put }) {
            debugger;
            const { data } = yield call(visitorRegistrationService.getData, { page: page, filterStr: filterStr, pageSize: pageSize });
            debugger;
            const { data: regionList } = yield call(visitorRegistrationService.getRegionList);
            const { data: initialRegion } = yield call(visitorRegistrationService.getInitialRegion);
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
                type: 'updateVisitorRegistration',
                payload: {
                    visitorRegistration: {
                        regionId: initialRegion.id,
                    }
                }
            }); 
        },

        *setVisitorRegistrationData({ payload: { id } }, { put, call }) {
            const { data: visitorRegistration } = yield call(visitorRegistrationService.getVisitorRegistrationData, { id });
            yield put({
                type: "updateState",
                payload: {
                    visitorRegistration,
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
            const { data } = yield call(visitorRegistrationService.remove, ids);
            message.success(data.message, 3);

            yield put({ type: 'reload' });
        },
     
        *addVisitorRegistration({ payload: visitorRegistration }, { call, put, select }) {
            const { data } = yield call(visitorRegistrationService.addVisitorRegistration, visitorRegistration);
            message.success(data.message, 3);  
            debugger;
            yield put({
                type: 'changeVisitorRegistration',
                payload: {
                    visitorRegistration: visitorRegistration.visitorRegistration
                }
            });

            yield put({ type: 'reload' });
        },

        *changeVisitorRegistration({ payload: visitorRegistration }, { call, put, select }) {
            debugger;
            yield put({
                type: 'updateState',
                payload: {
                    visitorRegistration: visitorRegistration.visitorRegistration
                }
            });
        },
        
        *editVisitorRegistration({ payload: visitorRegistration }, { call, put, select }) {
            debugger;
            const { data } = yield call(visitorRegistrationService.editVisitorRegistration, visitorRegistration);
            message.success(data.message, 3);
            yield put({
                type: 'reload',
            });
        },


        *reload(action, { put, select }) {
            debugger;
            const page = yield select(state => state.visitorRegistrationList.page);
            debugger;
            const filterStr = yield select(state => state.visitorRegistrationList.filterStr); pageSize
            const pageSize = yield select(state => state.visitorRegistrationList.pageSize); 
            yield put({ type: 'getData', payload: { page, filterStr, pageSize } });
        }
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                if (pathname === '/visitorRegistrationList') {
                    dispatch({ type: 'getData', payload: query });
                }
            });
        },
    },
};
