import * as categoryManageService from '../../services/category';
import { routerRedux } from 'dva/router';
import { message } from 'antd';

export default {
    namespace: 'createMeetingCategory',
    state: {
        meetingCategory: {
            name: null,
            remark: null
        }
    },
    reducers: {
        updateState(state, {payload: { meetingCategory}}) {
            return { ...state, meetingCategory };
        },
        changeField(state, { payload: { key, value } }) {
            var meetingCategory = { ...state.meetingCategory, [key]: value };
            return { ...state, meetingCategory };
        }
    },
    effects: {
        *setMeetingCategory({ }, { put }) {
            yield put({
                type: 'updateState',
                payload: {
                    meetingCategory: {
                        name: null,
                        remark: null
                    }
                }
            });
        },
        *addMeetingCategory({ payload: values }, { call, put }) {
            yield put({
                type: 'updateState',
                payload: {
                    meetingCategory: values
                }
            });
            const {data} = yield call(categoryManageService.create, { values:values,type:'Meeting' });
            message.success(data.message, 3);
            yield put(routerRedux.push('/meetingCategoryList'));
        }


    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                if (pathname === '/createMeetingCategory') {
                    dispatch({ type: 'setMeetingCategory', payload: query });
                }
            });
        },
    },
};

