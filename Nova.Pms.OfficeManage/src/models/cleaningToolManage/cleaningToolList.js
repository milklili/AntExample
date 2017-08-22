import * as cleaningToolService from '../../services/cleaningToolManage';
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
            debugger;
            return { ...state, list, total, page, filterStr, staffList, regionList, departmentList, initialRegion, pageSize };
            debugger;
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
            debugger;
            var cleaningTool = { ...state.cleaningTool, [key]: value };
            return { ...state, cleaningTool };
        }
    },
    effects: {
        *getData({ payload: { page = 1, filterStr = '', pageSize = PAGE_SIZE } }, { call, put }) {
            debugger;
            const { data } = yield call(cleaningToolService.getData, { page: page, filterStr: filterStr, pageSize: pageSize });
            const { data: staffList } = yield call(cleaningToolService.getAllStaffList);
            const { data: regionList } = yield call(cleaningToolService.getRegionList);
            const { data: departmentList } = yield call(cleaningToolService.getAllDepartmentList);
            const { data: initialRegion } = yield call(cleaningToolService.getInitialRegion);

            debugger;
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
            debugger;
            const { data } = yield call(cleaningToolService.remove, ids);
            message.success(data.message, 3);

            yield put({ type: 'reload' });
        },

        *addCleaningTool({ payload: cleaningTool }, { call, put, select }) {
            const { data } = yield call(cleaningToolService.addCleaningTool, cleaningTool);
            message.success(data.message, 3);
            yield put({ type: 'reload' });
        },
        *receiveOrReturnToolItems({ payload: cleaningToolItems }, { call, put, select }) {
            debugger;
            const { data } = yield call(cleaningToolService.receiveOrReturnToolItems, cleaningToolItems);
            message.success(data.message, 3);
            yield put({ type: 'reload' });
        },
        
       
        *reload(action, { put, select }) {
            debugger;
            const page = yield select(state => state.cleaningToolList.page);
            debugger;
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
