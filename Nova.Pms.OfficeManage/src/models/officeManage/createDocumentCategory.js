import * as officeManageService from '../../services/category';
import { routerRedux } from 'dva/router';
import { message } from 'antd';

export default {
    namespace: 'createDocumentCategory',
    state: {
        documentCategory: {
            name: null,
            remark: null
        }
    },
    reducers: {
        updateState(state, {payload: { documentCategory}}) {
            return { ...state, documentCategory };
        },
        changeField(state, { payload: { key, value } }) {
            var documentCategory = { ...state.documentCategory, [key]: value };
            return { ...state, documentCategory };
        }
    },
    effects: {
        *setDocumentCategory({ }, { put }) {
            yield put({
                type: 'updateState',
                payload: {
                    documentCategory: {
                        name: null,
                        remark: null
                    }
                }
            });
        },
        *addDocumentCategory({ payload: values }, { call, put }) {          
            const {data} = yield call(officeManageService.create, { values });
            message.success(data.message, 3);
            yield put(routerRedux.push('/officeManageList'));
        }

         
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                if (pathname === '/createDocumentCategory') {
                    dispatch({ type: 'setDocumentCategory', payload: query });
                }
            });
        },
    },
};
