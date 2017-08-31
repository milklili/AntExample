import * as contractListService from '../../services/contractsManage';
import { message } from 'antd';
import { PAGE_SIZE } from '../../constants';

export default {
    namespace: 'contractList',
    state: {
        list: [],
        total: 0,
        page: null,
        filterStr: ''
    },
    reducers: {
        updateState(state, {payload: {data: list, total, page, filterStr}}) {
            return { ...state, list, total, page, filterStr };
        },
    },
    effects: {
        *getData({ payload: { page = 1, filterStr = '', pageSize = PAGE_SIZE} }, { call, put }) {
            const {data, headers} = yield call(contractListService.getAll, { page: page, filterStr: filterStr, pageSize: pageSize });
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
            const { data } = yield call(contractListService.remove, ids);
            message.success(data.message, 3);

            yield put({ type: 'reload' });
        },
        *reload(action, { put, select }) {
            const page = yield select(state => state.contractList.page);
            const filterStr = yield select(state => state.contractList.filterStr);
            yield put({ type: 'getData', payload: { page, filterStr } });
        },
        //*patch({ payload: { id, values } }, { call, put, select }) {
        //    yield call(contractListService.edit, id, values);
        //    const page = yield select(state => state.contractList.page);
        //    yield put({ type: 'getData', payload: { page } });
        //},
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                if (pathname === '/contractList') {
                    dispatch({ type: 'getData', payload: query });
                }
            });
        },
    },
};
