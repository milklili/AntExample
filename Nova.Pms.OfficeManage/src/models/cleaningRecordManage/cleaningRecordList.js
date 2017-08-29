import * as cleaningRecordService from '../../services/cleaningRecordManage';
import * as commonDataService from '../../services/commonData';
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
            var cleaningRecord = { ...state.cleaningRecord, [key]: value };
            return { ...state, cleaningRecord };
        },
        updateCleaningRecord(state, { payload: { cleaningRecord } }) {
            var cleaningRecord = { ...state.cleaningRecord, ...cleaningRecord }
            return { ...state, cleaningRecord };
        },
    },
    effects: {
        *getData({ payload: { page = 1, filterStr = '', pageSize = PAGE_SIZE } }, { call, put }) {
            const { data } = yield call(cleaningRecordService.getAll, { page: page, filterStr: filterStr, pageSize: pageSize });
            const { data: regionList } = yield call(commonDataService.getRegionList);
            const { data: initialRegion } = yield call(commonDataService.getCurrentRegion);
            const { data: staffList } = yield call(commonDataService.getStaffList);
            const { data: cleaningAreaList } = yield call(commonDataService.cleaningAreaList);
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
            const { data } = yield call(cleaningRecordService.remove, ids);
            message.success(data.message, 3);

            yield put({ type: 'reload' });
        },
     
        *addCleaningRecord({ payload: cleaningRecord }, { call, put, select }) {
            const { data } = yield call(cleaningRecordService.create, cleaningRecord);
            message.success(data.message, 3);  
            yield put({
                type: 'changeCleaningRecord',
                payload: {
                    cleaningRecord: cleaningRecord.cleaningRecord
                }
            });
            yield put({ type: 'reload' });
        },

        *changeCleaningRecord({ payload: cleaningRecord }, { call, put, select }) {
            yield put({
                type: 'updateState',
                payload: {
                    cleaningRecord: cleaningRecord.cleaningRecord
                }
            });
        },
        
        *editCleaningRecord({ payload: cleaningRecord }, { call, put, select }) {
            const { data } = yield call(cleaningRecordService.edit, cleaningRecord);
            message.success(data.message, 3);
            yield put({
                type: 'reload',
            });
        },

        *reload(action, { put, select }) {
            const page = yield select(state => state.cleaningRecordList.page);
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
