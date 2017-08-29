import * as categoryManageService from '../../services/category';
import { routerRedux } from 'dva/router';
import { message } from 'antd';

export default {
    namespace: 'editMeetingCategory',
    state: {
        meetingCategory: {
            id: 0,
            type: null,
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
        *getMeetingCategoryData({ payload: { id } }, { put, call }) {
            const {data} = yield call(categoryManageService.get, { id });
            yield put({
                type: 'updateState',
                payload: {
                    meetingCategory: data
                }
            });
        },
        *editMeetingCategory({ }, { call, put, select }) {
            const meetingCategory = yield select(state => state.editMeetingCategory.meetingCategory);
            const values = {
                id: meetingCategory.id,
                name: meetingCategory.name,
                remark: meetingCategory.remark
            }
            const {data} = yield call(categoryManageService.save, { values });
            message.success(data.message, 3);
            yield put(routerRedux.push('/meetingCategoryList'));
        }

    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                if (pathname === '/editMeetingCategory') {
                    dispatch({ type: 'getMeetingCategoryData', payload: query });
                }
            });
        },
    },
};

