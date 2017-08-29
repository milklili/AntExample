import * as categoryManageService from '../../services/category';
import { routerRedux } from 'dva/router';
import { message } from 'antd';

export default {
    namespace: 'editPlanType',
    state: {
        planTypeCategory: {
            id: 0,
            type: null,
            name: null,
            remark: null
        } 
    },
    reducers: {
        updateState(state, {payload: { planTypeCategory}}) {
            return { ...state, planTypeCategory };
        },
        changeField(state, { payload: { key, value } }) {
            var planTypeCategory = { ...state.planTypeCategory, [key]: value };
            return { ...state, planTypeCategory };
        }
    },
    effects: {
        *getDocumentCategoryData({ payload: { id } }, { put, call }) {
            const {data} = yield call(categoryManageService.get, { id });
            yield put({
                type: 'updateState',
                payload: {
                    planTypeCategory: data
                }
            });           
        },
        *editPlanType({}, { call, put, select }) {
            const planTypeCategory = yield select(state => state.editPlanType.planTypeCategory);
            const values = {
                id: planTypeCategory.id,
                name: planTypeCategory.name,
                remark: planTypeCategory.remark
            };
            const {data} = yield call(categoryManageService.save, { values });
            message.success(data.message, 3);
            yield put(routerRedux.push('/planTypeList'));
        }

    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                if (pathname === '/editPlanType') {
                    dispatch({ type: 'getDocumentCategoryData', payload: query });
                }
            });
        },
    },
};
