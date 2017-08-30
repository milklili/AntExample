import * as cleaningToolService from '../../services/cleaningToolManage';
import * as commonDataService from '../../services/commonData';
import { message } from 'antd';
import { PAGE_SIZE } from '../../constants';
export default {
    namespace: 'cleaningToolList',
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
        regionList:[],
        staffList: [],
        departmentList:[],
        cleaningTool: {
            id: null,
            regionId: null,
            name: null,
            type: null,
            registerDate: null,
            remark: null,
            count:null,
        },

        cleaningToolItems: {

        },
        initialRegion:null,
    },
    reducers: {
        updateState(state, { payload: { data: list, total, page, filterStr, staffList, regionList, departmentList, initialRegion, pageSize } }) {
            return { ...state, list, total, page, filterStr, staffList, regionList, departmentList, initialRegion, pageSize };
        },
        updateRegion(state, { payload: { regions } }) {
            return { ...state, regions };
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
            
            var cleaningTool = { ...state.cleaningTool, [key]: value };
            return { ...state, cleaningTool };
        }
    },
    effects: {
        *getData({ payload: { page = 1, filterStr = '', pageSize = PAGE_SIZE } }, { call, put }) {
            
            const { data } = yield call(cleaningToolService.getAll, { page: page, filterStr: filterStr, pageSize: pageSize });
            const { data: staffList } = yield call(commonDataService.getStaffList);
            const { data: regionList } = yield call(commonDataService.getRegionList);
            const { data: departmentList } = yield call(commonDataService.getDepartmentList);
            const { data: initialRegion } = yield call(commonDataService.getCurrentRegion);

            
            yield put({
                type: 'updateState',
                payload: {
                    data: data.data,
                    total: parseInt(data.total, 10),
                    page: parseInt(page, 10),
                    pageSize: parseInt(pageSize, 10),
                    filterStr: filterStr,
                    staffList: staffList,
                    regionList: regionList,
                    departmentList: departmentList,
                    initialRegion: initialRegion,
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
            const { data } = yield call(cleaningToolService.remove, ids);
            message.success(data.message, 3);

            yield put({ type: 'reload' });
        },

        *addCleaningTool({ payload: cleaningTool }, { call, put, select }) {
            const { data } = yield call(cleaningToolService.create, cleaningTool);
            message.success(data.message, 3);
            yield put({ type: 'reload' });
        },
        *receiveOrReturnToolItems({ payload: cleaningToolItems }, { call, put, select }) {
            const { data } = yield call(cleaningToolService.receiveOrReturnToolItems, cleaningToolItems);
            message.success(data.message, 3);
            yield put({ type: 'reload' });
        },
        
       
        *reload(action, { put, select }) {
            const page = yield select(state => state.cleaningToolList.page);
            const filterStr = yield select(state => state.cleaningToolList.filterStr);
            const pageSize = yield select(state => state.cleaningToolList.pageSize);
            yield put({ type: 'getData', payload: { page, filterStr, pageSize} });
        }
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                if (pathname === '/cleaningToolList') {
                    dispatch({ type: 'getData', payload: query });
                }
            });
        },
    },
};
