import * as categoryManageService from '../../services/category';
import { routerRedux } from 'dva/router';
import { message } from 'antd';

export default {
    namespace: 'editDocumentCategory',
    state: {
        documentCategory: {
            id: 0,
            type: null,
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
        *getDocumentCategoryData({ payload: { id } }, { put, call }) {
            const {data} = yield call(categoryManageService.get, { id });
            yield put({
                type: 'updateState',
                payload: {
                    documentCategory: data
                }
            });
        },
        *editDocumentCategory({}, { call, put, select }) { 
            const documentCategory = yield select(state => state.editDocumentCategory.documentCategory);
            const values = {
                id: documentCategory.id,
                name: documentCategory.name,
                remark: documentCategory.remark
            }
            const {data} = yield call(categoryManageService.save, { values });
            message.success(data.message, 3);
            yield put(routerRedux.push('/officeManageList'));
        }
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                if (pathname === '/editDocumentCategory') {
                    dispatch({ type: 'getDocumentCategoryData', payload: query });
                }
            });
        },
    },
};
