import * as cleaningToolManageService from '../../services/cleaningToolManage';
import { routerRedux } from 'dva/router';
import { message } from 'antd';

export default {
    namespace: 'showOrEditCleaningTool',
    state: {
        information: {
            regionId: null,
            staffId: null,
            departmentId: null,
            number:null,
            role: null,
            staffStatus: null,        
        },
        cleaningTool: {
            cleaningToolData:[],
            total: null,
            page: null,
        }, 
        regionList: [],
        departmentList: [],
        staffList:[],

    },
    reducers: {
        load(state, { payload }) {
            debugger;
            return { ...state, ...payload };
        },
        changeField(state, { payload: { key, value } }) {
            var Information = { ...state.Information, [key]: value };
            return { ...state, Information };
        }
    },
    effects: {
        *getCleaningToolData({ payload: { id, page = 1 } }, { put, call }) {
            debugger;
            const { data: information } = yield call(cleaningToolManageService.getCleaningToolInformation, { id });
            debugger;
            const { data } = yield call(cleaningToolManageService.getDetailCleaningToolList, { id, page });
            debugger;
            const { data: staffList } = yield call(cleaningToolManageService.getAllStaffList);
            debugger;
            const { data: regionList } = yield call(cleaningToolManageService.getRegionList);
            debugger;
            const { data: departmentList } = yield call(cleaningToolManageService.getAllDepartmentList);
            debugger
            yield put({
                type: "load",
                payload: {
                    information: information,
                    regionList: regionList,
                    staffList: staffList,
                    departmentList: departmentList,
                    cleaningTool: {
                        cleaningToolData: data.data,
                        total: parseInt(data.total, 10),
                        page: parseInt(page, 10),
                     }, 
                }
            });
        },

        *editCleaningTool({ payload: editCleaningTool }, { call, put, select }) {
            const { data } = yield call(cleaningToolManageService.editCleaningTool, editCleaningTool);
            message.success(data.message, 3);
            yield put({
                type: 'reload',               
            });
        }, 

        *remove({ payload: id }, { call, put }) {
            const { data } = yield call(cleaningToolManageService.remove, id);
            message.success(data.message, 3);
            yield put({ type: 'reload' });
        },
        *removeCleaningToolItems({ payload: id }, { call, put }) {
            const { data } = yield call(cleaningToolManageService.removeCleaningToolItems, id);
            message.success(data.message, 3);
            yield put({ type: 'reload' });
        },

        

        *reload(action, { put, select }) {
            const id = yield select(state => state.showOrEditCleaningTool.information.id);
            debugger;
            const page = yield select(state => state.showOrEditCleaningTool.cleaningTool.page);
            debugger;
            
            yield put({ type: 'getCleaningToolData', payload: { page, id} });
        },

        *editReceiveOrReturnToolItems({ payload: cleaningToolItems }, { call, put, select }) {
            debugger;
            const { data } = yield call(cleaningToolManageService.editReceiveOrReturnToolItems, cleaningToolItems);
            debugger;
            message.success(data.message, 3);
            yield put({ type: 'reload' });
        },

    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                debugger;
                if (pathname === '/showOrEditCleaningTool') {
                    dispatch({ type: 'getCleaningToolData', payload: query });
                }
            });
        },
    },
};

