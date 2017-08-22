import * as officeManageService from '../../services/officeManage';
import { message } from 'antd';
import { PAGE_SIZE } from '../../constants';
export default {
    namespace: 'officeManageList',
    state: {
        list: [],
        total: 0,
        page: null,
        filterStr: '',
        pageSize: null,
    },
    reducers: {
        updateState(state, { payload: { data: list, total, page, filterStr, pageSize}}) {
            return { ...state, list, total, page, filterStr, pageSize };
        },   
    },
    effects: {
        *getData({ payload: { page = 1, filterStr = '', pageSize = PAGE_SIZE} }, { call, put }) {
            const { data, headers } = yield call(officeManageService.getData, { page: page, filterStr: filterStr, pageSize: pageSize });
            yield put({
                type: 'updateState',
                payload: {
                    data: data.data,
                    total: parseInt(data.total, 10),
                    page: parseInt(page, 10),
                    pageSize: parseInt(pageSize, 10),
                    filterStr: filterStr
                }
            });
        },

        *remove({ payload: ids }, { call, put, select }) {
            const {data} = yield call(officeManageService.remove, ids);
            message.success(data.message, 3);

            yield put({ type: 'reload' });       
        },

        *reload(action, { put, select }) {
            const page = yield select(state => state.officeManageList.page);
            const filterStr = yield select(state => state.officeManageList.filterStr);
            const pageSize = yield select(state => state.officeManageList.pageSize);
            yield put({ type: 'getData', payload: { page, filterStr, pageSize } });
        }
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                if (pathname === '/officeManageList') {
                    dispatch({ type: 'getData', payload: query });
                }
            });
        },
    },
};
