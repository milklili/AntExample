import * as cleaningAreaService from '../../services/cleaningAreaManage';
import { message } from 'antd';
import { PAGE_SIZE } from '../../constants';
export default {
    namespace: 'cleaningAreaList',
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
        cleaningArea: {
            id:null,
            regionId: null,
            regionName:null,
            areaCode: null,
            areaName: null,
            place:null,
            requirement:null,
            staffId: null,
            staffName: null,
            isOutsourced:null,
            createUserId: null,
            createUserName: null,
            createDate:null,
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
            var cleaningArea = { ...state.cleaningArea, [key]: value };
            return { ...state, cleaningArea };
        },
        updateCleaningArea(state, { payload: { cleaningArea } }) {
            debugger;
            var cleaningArea = { ...state.cleaningArea, ...cleaningArea }
            return { ...state, cleaningArea };
        },
    },
    effects: {
        *getData({ payload: { page = 1, filterStr = '', pageSize = PAGE_SIZE } }, { call, put }) {
            debugger;
            const { data } = yield call(cleaningAreaService.getData, { page: page, filterStr: filterStr, pageSize: pageSize });
            debugger;
            const { data: regionList } = yield call(cleaningAreaService.getRegionList);
            const { data: initialRegion } = yield call(cleaningAreaService.getInitialRegion);
            const { data: staffList } = yield call(cleaningAreaService.getAllStaffList);


            debugger;
            yield put({
                type: 'updateState',
                payload: {
                    list: data.data,
                    total: parseInt(data.total, 10),
                    page: parseInt(page, 10),
                    filterStr: filterStr,
                    pageSize: parseInt(pageSize, 10),
                    regionList: regionList,
                    staffList: staffList,
                    initialRegion: initialRegion,
                }
            }); 

            yield put({
                type: 'updateCleaningArea',
                payload: {
                    cleaningArea: {
                        regionId: initialRegion.id,
                    }
                }
            }); 
        },

        *setCleaningAreaData({ payload: { id } }, { put, call }) {
            const { data: cleaningArea } = yield call(cleaningAreaService.getCleaningAreaData, { id });
            yield put({
                type: "updateState",
                payload: {
                    cleaningArea,
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
            const { data } = yield call(cleaningAreaService.remove, ids);
            message.success(data.message, 3);

            yield put({ type: 'reload' });
        },
     
        *addCleaningArea({ payload: cleaningArea }, { call, put, select }) {
            const { data } = yield call(cleaningAreaService.addCleaningArea, cleaningArea);
            message.success(data.message, 3);  
            debugger;
            yield put({
                type: 'changeCleaningArea',
                payload: {
                    cleaningArea: cleaningArea.cleaningArea
                }
            });

            yield put({ type: 'reload' });
        },

        *changeCleaningArea({ payload: cleaningArea }, { call, put, select }) {
            debugger;
            yield put({
                type: 'updateState',
                payload: {
                    cleaningArea: cleaningArea.cleaningArea
                }
            });
        },
        
        *editCleaningArea({ payload: cleaningArea }, { call, put, select }) {
            debugger;
            const { data } = yield call(cleaningAreaService.editCleaningArea, cleaningArea);
            message.success(data.message, 3);
            yield put({
                type: 'reload',
            });
        },


        *reload(action, { put, select }) {
            debugger;
            const page = yield select(state => state.cleaningAreaList.page);
            debugger;
            const filterStr = yield select(state => state.cleaningAreaList.filterStr);
            const pageSize = yield select(state => state.cleaningAreaList.pageSize);
            yield put({ type: 'getData', payload: { page, filterStr, pageSize } });
        }
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                if (pathname === '/cleaningAreaList') {
                    dispatch({ type: 'getData', payload: query });
                }
            });
        },
    },
};
