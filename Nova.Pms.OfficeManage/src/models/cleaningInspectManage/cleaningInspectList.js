import * as cleaningInspectService from '../../services/cleaningInspectManage';
import * as commonDataService from '../../services/commonData';
import { message } from 'antd';
import { PAGE_SIZE } from '../../constants';
export default {
    namespace: 'cleaningInspectList',
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
        cleaningInspect: {
            id:null,
            regionId: null,
            regionName: null,
            cleaningAreaId: null,
            cleaningAreaName: null,
            leadId: null,
            leadName: null,
            rummagerId: null,
            rummagerName: null,
            inspectDate:null,
            content: null,
            result:null,
            resultStr: null,
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
            var cleaningInspect = { ...state.cleaningInspect, [key]: value };
            return { ...state, cleaningInspect };
        },
        
        updateCleaningInspect(state, { payload: { cleaningInspect } }) {
            var cleaningInspect = { ...state.cleaningInspect, ...cleaningInspect }
            return { ...state, cleaningInspect };
        },
    },
    effects: {
        *getData({ payload: { page = 1, filterStr = '', pageSize = PAGE_SIZE } }, { call, put }) {
            const { data } = yield call(cleaningInspectService.getAll, { page: page, filterStr: filterStr, pageSize: pageSize });
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
                type: 'updateCleaningInspect',
                payload: {
                    cleaningInspect: {
                        regionId: initialRegion.id,
                    }
                }
            }); 
        },

        *setCleaningInspectData({ payload: { id } }, { put, call }) {
            const { data: cleaningInspect } = yield call(cleaningInspectService.getCleaningInspectData, { id });
            yield put({
                type: "updateState",
                payload: {
                    cleaningInspect,
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
            const { data } = yield call(cleaningInspectService.remove, ids);
            message.success(data.message, 3);

            yield put({ type: 'reload' });
        },
     
        *addCleaningInspect({ payload: cleaningInspect }, { call, put, select }) {
            const { data } = yield call(cleaningInspectService.create, cleaningInspect);
            message.success(data.message, 3);  
            yield put({
                type: 'changeCleaningInspect',
                payload: {
                    cleaningInspect: cleaningInspect.cleaningInspect
                }
            });
            yield put({ type: 'reload' });
        },

        *changeCleaningInspect({ payload: cleaningInspect }, { call, put, select }) {
            yield put({
                type: 'updateState',
                payload: {
                    cleaningInspect: cleaningInspect.cleaningInspect
                }
            });
        },
        
        *editCleaningInspect({ payload: cleaningInspect }, { call, put, select }) {
            const { data } = yield call(cleaningInspectService.edit, cleaningInspect);
            message.success(data.message, 3);
            yield put({
                type: 'reload',
            });
        },

        *reload(action, { put, select }) {
            const page = yield select(state => state.cleaningInspectList.page);
            const filterStr = yield select(state => state.cleaningInspectList.filterStr);
            const pageSize = yield select(state => state.cleaningInspectList.pageSize);
            yield put({ type: 'getData', payload: { page, filterStr, pageSize} });
        }
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                if (pathname === '/cleaningInspectList') {
                    dispatch({ type: 'getData', payload: query });
                }
            });
        },
    },
};
