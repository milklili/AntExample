import * as categoryManageService from '../../services/category';
import { routerRedux } from 'dva/router';
import { message } from 'antd';

export default {
    namespace: 'createPlanType',
    state: {
        planTypeCategory: {
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
        *setPlanTypeCategory({ }, { put }) {
            yield put({
                type: 'updateState',
                payload: {
                    planTypeCategory: {
                        name: null,
                        remark: null
                    }
                }
            });
        },
        *addPlanType({ payload: values }, { call, put }) {          
            const {data} = yield call(categoryManageService.create, { values:values,type:'WorkingPlan' });
            message.success(data.message, 3);
            yield put(routerRedux.push('/planTypeList'));
        }
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                if (pathname === '/createPlanType') {
                    dispatch({ type: 'setPlanTypeCategory', payload: query });
                }
            });
        },
    },
};
