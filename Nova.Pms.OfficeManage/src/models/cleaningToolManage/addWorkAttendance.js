import * as workAttendanceManageService from '../../services/workingPlanManage';
import { routerRedux } from 'dva/router';
import { message } from 'antd';

export default {
    namespace: 'showOrEditWorkAttendance',
    state: {
        addWorkAttendance: {

            staffId: null,
           
            type:null,

            attendanceDate: null,
            hours: null, 

        },

    },
    reducers: {
        load(state, { payload }) {
            return { ...state, ...payload };
        },

        updateState(state, { payload }) {
            return { ...state, ...payload };
        },
        changeField(state, { payload: { key, value } }) {
            var addWorkAttendance = { ...state.addWorkAttendance, [key]: value };
            return { ...state, addWorkAttendance };
        }
    },
    effects: {
        *setWorkAttendance({ value }, { put, call }) {
            yield put({
                type: 'updateState',
                payload: {
                    addWorkAttendance: value
                }
            })
        },

    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                if (pathname === '/createWorkingPlan') {
                    dispatch({ type: 'setWorkingPlan', payload: query });
                }
            });
        },
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                if (pathname === '/addWorkAttendance') {
                    dispatch({ type: 'setWorkAttendance', payload: value });
                }
            });
        },
    },
};

