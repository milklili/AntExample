import * as workAttendanceManageService from '../../services/workAttendanceManage';
import * as commonDataService from '../../services/commonData';
import { routerRedux } from 'dva/router';
import { message } from 'antd';

export default {
    namespace: 'showOrEditWorkAttendance',
    state: {
        information: {
            regionId: null,
            staffId: null,
            departmentId: null,
            number:null,
            role: null,
            staffStatus: null,        
        },
        workAttendance: {
            workAttendanceData:[],
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
        *getWorkAttendanceData({ payload: { id, page = 1 } }, { put, call }) {

            const { data: information } = yield call(workAttendanceManageService.getWorkAttendanceInformation, { id });
            const { data } = yield call(workAttendanceManageService.getDetailWorkAttendanceList, { id, page });
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
                    workAttendance: {
                        workAttendanceData: data.data,
                        total: parseInt(data.total, 10),
                        page: parseInt(page, 10),
                     }, 
                }
            });
        },

        *editWorkAttendance({ payload: editWorkAttendance }, { call, put, select }) {
            const { data } = yield call(workAttendanceManageService.editWorkAttendance, editWorkAttendance);
            message.success(data.message, 3);
            yield put({
                type: 'reload',               
            });
        }, 

        *remove({ payload: id }, { call, put }) {
            const { data } = yield call(workAttendanceManageService.remove, id);
            message.success(data.message, 3);
            yield put({ type: 'reload' });
        },

        *reload(action, { put, select }) {
            const id = yield select(state => state.showOrEditWorkAttendance.information.id);
            debugger;
            const page = yield select(state => state.showOrEditWorkAttendance.workAttendance.page);
            debugger;
            
            yield put({ type: 'getWorkAttendanceData', payload: { page, id} });
        }

    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                debugger;
                if (pathname === '/showOrEditWorkAttendance') {
                    dispatch({ type: 'getWorkAttendanceData', payload: query });
                }
            });
        },
    },
};

