import * as cleaningToolManageService from '../../services/cleaningToolManage';
import * as commonDataService from '../../services/commonData';
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
            return { ...state, ...payload };
        },
        changeField(state, { payload: { key, value } }) {
            var Information = { ...state.Information, [key]: value };
            return { ...state, Information };
        }
    },
    effects: {
        *getCleaningToolData({ payload: { id, page = 1 } }, { put, call }) {
            const { data: information } = yield call(cleaningToolManageService.getCleaningToolInformation, { id });
            const { data } = yield call(cleaningToolManageService.getDetailCleaningToolList, { id, page });
            const { data: staffList } = yield call(commonDataService.getStaffList);
            const { data: regionList } = yield call(commonDataService.getRegionList);
            const { data: departmentList } = yield call(commonDataService.getDepartmentList);

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
            const page = yield select(state => state.showOrEditCleaningTool.cleaningTool.page);
            
            yield put({ type: 'getCleaningToolData', payload: { page, id} });
        },

        *editReceiveOrReturnToolItems({ payload: cleaningToolItems }, { call, put, select }) {
            const { data } = yield call(cleaningToolManageService.edit, cleaningToolItems);
            message.success(data.message, 3);
            yield put({ type: 'reload' });
        },

    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                if (pathname === '/showOrEditCleaningTool') {
                    dispatch({ type: 'getCleaningToolData', payload: query });
                }
            });
        },
    },
};

