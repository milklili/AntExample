import * as cleaningRecordService from '../../services/cleaningRecordManage';
import { message } from 'antd';
import { PAGE_SIZE } from '../../constants';
export default {
    namespace: 'cleaningRecordList',
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
        initialRegion:null,
        regionList: [],
        staffList: [],
        cleaningAreaList:[],
        cleaningRecord: {
            id:null,
            regionId: null,
            regionName: null,
            name:null,
            type: null,
            typeStr: null,
            cleaningAreaId: null,
            cleaningAreaName: null,
            staffName: null,
            staffId: null,
            completeDate: null,
            actualCompleteDate: null,
            content: null,
            state: null,
            stateStr:null,
            remark: null,
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
            var cleaningRecord = { ...state.cleaningRecord, [key]: value };
            return { ...state, cleaningRecord };
        },
        updateCleaningRecord(state, { payload: { cleaningRecord } }) {
            debugger;
            var cleaningRecord = { ...state.cleaningRecord, ...cleaningRecord }
            return { ...state, cleaningRecord };
        },
    },
    effects: {
        *getData({ payload: { page = 1, filterStr = '', pageSize = PAGE_SIZE } }, { call, put }) {
            debugger;
            const { data } = yield call(cleaningRecordService.getData, { page: page, filterStr: filterStr, pageSize: pageSize });
            debugger;
            const { data: regionList } = yield call(cleaningRecordService.getRegionList);
            const { data: initialRegion } = yield call(cleaningRecordService.getInitialRegion);
            const { data: staffList } = yield call(cleaningRecordService.getAllStaffList);
            const { data: cleaningAreaList } = yield call(cleaningRecordService.getAllCleaningAreaList);
            debugger;
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
                    staffList: staffList,
                    cleaningAreaList: cleaningAreaList,
                    initialRegion: initialRegion,
                }
            }); 

            yield put({
                type: 'updateCleaningRecord',
                payload: {
                    cleaningRecord: {
                        regionId: initialRegion.id,
                    }
                }
            }); 
        },

        *setCleaningRecordData({ payload: { id } }, { put, call }) {
            const { data: cleaningRecord } = yield call(cleaningRecordService.getCleaningRecordData, { id });
            yield put({
                type: "updateState",
                payload: {
                    cleaningRecord,
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
            const { data } = yield call(cleaningRecordService.remove, ids);
            message.success(data.message, 3);

            yield put({ type: 'reload' });
        },
     
        *addCleaningRecord({ payload: cleaningRecord }, { call, put, select }) {
            debugger;
            const { data } = yield call(cleaningRecordService.addCleaningRecord, cleaningRecord);
            message.success(data.message, 3);  
            debugger;
            yield put({
                type: 'changeCleaningRecord',
                payload: {
                    cleaningRecord: cleaningRecord.cleaningRecord
                }
            });
            debugger;
            yield put({ type: 'reload' });
        },

        *changeCleaningRecord({ payload: cleaningRecord }, { call, put, select }) {
            debugger;
            yield put({
                type: 'updateState',
                payload: {
                    cleaningRecord: cleaningRecord.cleaningRecord
                }
            });
        },
        
        *editCleaningRecord({ payload: cleaningRecord }, { call, put, select }) {
            debugger;
            const { data } = yield call(cleaningRecordService.editCleaningRecord, cleaningRecord);
            message.success(data.message, 3);
            yield put({
                type: 'reload',
            });
        },


        *reload(action, { put, select }) {
            debugger;
            const page = yield select(state => state.cleaningRecordList.page);
            debugger;
            const filterStr = yield select(state => state.cleaningRecordList.filterStr);
            const pageSize = yield select(state => state.cleaningRecordList.pageSize);
            yield put({ type: 'getData', payload: { page, filterStr, pageSize } });
        }
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                if (pathname === '/cleaningRecordList') {
                    dispatch({ type: 'getData', payload: query });
                }
            });
        },
    },
};
