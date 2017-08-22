import * as securityEventsService from '../../services/securityEventsManage';
import { message } from 'antd';
import { PAGE_SIZE } from '../../constants';
export default {
    namespace: 'securityEventsList',
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
        securityEvents: {
            regionId: null,
            name: null,
            type: null,
            responsibilityPersonId: null,
            handlePersonId: null,
            occurrenceDateTime: null,
            occurrencePlace: null,
            content: null,
            result: null,
            remark: null,
        },
    },
    reducers: {
        updateState(state, { payload}) {
            debugger;
            return { ...state, ...payload  };
            debugger;
        },
        updateRegion(state, { payload: { regions } }) {
            return { ...state, regions };
        },
        updateDocumentCategory(state, { payload: { documentCategory } }) {
            return { ...state, documentCategory };
        },
        updateUsers(state, { payload: { users } }) {
            return { ...state, users };
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
            var securityEvents = { ...state.securityEvents, [key]: value };
            return { ...state, securityEvents };
        },
        updateSecurityEvents(state, { payload: { securityEvents } }) {
            debugger;
            var securityEvents = { ...state.securityEvents, ...securityEvents }
            return { ...state, securityEvents };
        },
    },
    effects: {
        *getData({ payload: { page = 1, filterStr = '', pageSize = PAGE_SIZE } }, { call, put }) {
            debugger;
            const { data } = yield call(securityEventsService.getData, { page: page, filterStr: filterStr, pageSize: pageSize });
            const { data: regionList } = yield call(securityEventsService.getRegionList);
            const { data: initialRegion } = yield call(securityEventsService.getInitialRegion);
            debugger;
            yield put({
                type: 'updateState',
                payload: {
                    list: data.data,
                    total: parseInt(data.total, 10),
                    pageSize: parseInt(pageSize, 10),
                    page: parseInt(page, 10),
                    filterStr: filterStr,
                    regionList: regionList,
                }
            });
            yield put({
                type: 'updateSecurityEvents',
                payload: {
                    securityEvents: {
                        regionId: initialRegion.id,
                    }
                }
            }); 
        },

        *setSecurityEventsData({ payload: { id } }, { put, call }) {
            const { data: securityEvents } = yield call(securityEventsService.getSecurityEventsData, { id });
            yield put({
                type: "updateState",
                payload: {
                    securityEvents,
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
            const { data } = yield call(securityEventsService.remove, ids);
            message.success(data.message, 3);

            yield put({ type: 'reload' });
        },
     
        *addSecurityEvents({ payload: securityEvents }, { call, put, select }) {
            const { data } = yield call(securityEventsService.addSecurityEvents, securityEvents);
            message.success(data.message, 3);
            debugger;
            yield put({
                type: 'changeSecurityEvents',
                payload: {
                    securityEvents: securityEvents.securityEvents
                }
            });
            debugger
            yield put({ type: 'reload' });
        },
        
        *changeSecurityEvents({ payload: securityEvents }, { call, put, select }) {
            debugger;
            yield put({
                type: 'updateState',
                payload: {
                    securityEvents: securityEvents.securityEvents
                }
            });
        },
        *editSecurityEvents({ payload: securityEvents }, { call, put, select }) {
            debugger;
            const { data } = yield call(securityEventsService.editSecurityEvents, securityEvents);
            message.success(data.message, 3);
            yield put({
                type: 'reload',
            });
        },


        *reload(action, { put, select }) {
            debugger;
            const page = yield select(state => state.securityEventsList.page);
            debugger;
            const filterStr = yield select(state => state.securityEventsList.filterStr);
            const pageSize = yield select(state => state.securityEventsList.pageSize);
            yield put({ type: 'getData', payload: { page, filterStr, pageSize } });
        }
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                if (pathname === '/securityEventsList') {
                    dispatch({ type: 'getData', payload: query });
                }
            });
        },
    },
};
