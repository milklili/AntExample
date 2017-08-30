import * as securityScheduleService from '../../services/securityScheduleManage';
import * as commonDataService from '../../services/commonData';
import { message } from 'antd';
import { PAGE_SIZE } from '../../constants';
export default {
    namespace: 'securityScheduleList',
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
        securitySchedule: {
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
            
            return { ...state, ...payload  };
            
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
            
            var securitySchedule = { ...state.securitySchedule, [key]: value };
            return { ...state, securitySchedule };
        },
        updateSecuritySchedule(state, { payload: { securitySchedule } }) {
            
            var securitySchedule = { ...state.securitySchedule, ...securitySchedule }
            return { ...state, securitySchedule };
        },
    },
    effects: {
        *getData({ payload: { page = 1, filterStr = '', pageSize = PAGE_SIZE } }, { call, put }) {
            
            const { data } = yield call(securityScheduleService.getData, { page: page, filterStr: filterStr, pageSize: pageSize });
            
            const { data: regionList } = yield call(commonDataService.getRegionList);
            const { data: initialRegion } = yield call(commonDataService.getCurrentRegion);
            
            yield put({
                type: 'updateState',
                payload: {
                    list: data.data,
                    total: parseInt(data.total, 10),
                    page: parseInt(page, 10),
                    pageSize: parseInt(pageSize,10),
                    filterStr: filterStr,
                    regionList: regionList,
                }
            }); 

            yield put({
                type: 'updateSecuritySchedule',
                payload: {
                    securitySchedule: {
                        regionId: initialRegion.id,
                    }
                }
            }); 
        },

        *setsSecurityScheduleData({ payload: { id } }, { put, call }) {
            const { data: securitySchedule } = yield call(securityScheduleService.getSecurityScheduleData, { id });
            yield put({
                type: "updateState",
                payload: {
                    securitySchedule,
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
     
        *addSecuritySchedule({ payload: securitySchedule }, { call, put, select }) {
            
            const { data } = yield call(securityScheduleService.addSecuritySchedule, securitySchedule);
            message.success(data.message, 3);  
            
            yield put({
                type: 'changeSecuritySchedule',
                payload: {
                    securitySchedule: securitySchedule.securitySchedule
                }
            });

            yield put({ type: 'reload' });
        },

        *changeSecuritySchedule({ payload: securitySchedule }, { call, put, select }) {
            
            yield put({
                type: 'updateState',
                payload: {
                    securitySchedule: securitySchedule.securitySchedule
                }
            });
        },
        
        *editSecuritySchedule({ payload: securitySchedule }, { call, put, select }) {
            
            const { data } = yield call(securityScheduleService.editSecuritySchedule, securitySchedule);
            message.success(data.message, 3);
            yield put({
                type: 'reload',
            });
        },


        *reload(action, { put, select }) {
            
            const page = yield select(state => state.securityScheduleList.page);
            
            const filterStr = yield select(state => state.securityScheduleList.filterStr);
            const pageSize = yield select(state => state.securityScheduleList.pageSize);
            yield put({ type: 'getData', payload: { page, filterStr, pageSize } });
        }
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                if (pathname === '/securityScheduleList') {
                    dispatch({ type: 'getData', payload: query });
                }
            });
        },
    },
};
