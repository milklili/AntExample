import * as approvalService  from '../../services/approvalManage';
import * as commonDataService from '../../services/commonData';
import { message } from 'antd';
import { PAGE_SIZE } from '../../constants';
export default {
    namespace: 'initiatedList',
    state: {
        list: [],
        total: null,
        page: null,
        filterStr: null,
        pageSize:null,
        seniorSearch: false,
        seniorSearchData: {
            staffName: null,
            attendanceInterval: null,
        },
        initialRegion:null,
        regionList: [],
        staffList: [],
        approval: {
            regionId: null,
            code: null,
            type: null,
            status: null,
            content: null,
            details: null,
            attachments: [],
            personStatus: [],
        },
    },
    reducers: {
        updateState(state, { payload}) {
            return { ...state, ...payload  };
        },
        
        updateSeniorSearchToggle(state, { payload: { seniorSearch } }) {
            return { ...state, seniorSearch };
        },
        updateSeniorSearchData(state, { payload: { seniorSearchData } }) {
            return { ...state, seniorSearchData };
        },
        resetSeniorSearchData(state) {
            let seniorSearchData = {
                staffName: null,
                attendanceInterval: null,
            };
            return { ...state, seniorSearchData };
        },

        changeField(state, { payload: { key, value } }) {
            var initiatedList = { ...state.initiatedList, [key]: value };
            return { ...state, initiatedList };
        },
        updateInitiatedList(state, { payload: { initiatedList } }) {
            var initiatedList = { ...state.initiatedList, ...initiatedList }
            return { ...state, initiatedList };
        },
    },
    effects: {
        *getData({ payload: { page = 1, filterStr = '', pageSize = PAGE_SIZE } }, { call, put }) {
            const { data } = yield call(approvalService.getAll, { page: page, filterStr: filterStr, pageSize: pageSize });
            const { data: regionList } = yield call(commonDataService.getRegionList);
            const { data: initialRegion } = yield call(commonDataService.getCurrentRegion);
            const { data: staffList } = yield call(commonDataService.getStaffList);
            const { data: cleaningAreaList } = yield call(commonDataService.cleaningAreaList);
            yield put({
                type: 'updateState',
                payload: {
                    list: data.data,
                    total: parseInt(data.total, 10),
                    page: parseInt(page, 10),
                    pageSize: parseInt(pageSize, 10),
                    filterStr: filterStr,
                    regionList: regionList,
                    staffList: staffList,
                    cleaningAreaList: cleaningAreaList,
                    initialRegion: initialRegion,
                }
            }); 

            yield put({
                type: 'updateInitiatedList',
                payload: {
                    initiatedList: {
                        regionId: initialRegion.id,
                    }
                }
            }); 
        },

        *setInitiatedListData({ payload: { id } }, { put, call }) {
            const { data: initiatedList } = yield call(approvalService .getInitiatedListData, { id });
            yield put({
                type: "updateState",
                payload: {
                    initiatedList,
                }
            });
        },

        *seniorSearchToggle({ payload: seniorSearch }, { put }) {
            yield put({
                type: 'updateSeniorSearchToggle',
                payload: {
                    seniorSearch: seniorSearch
                }
            });
        },

        *seniorSearch({ payload: values }, { call, put, select }) {
           
            let seniorSearchData = {
                staffName: null,
                attendanceInterval: null,
            }
            seniorSearchData.staffName = values.staffName;
            seniorSearchData.attendanceInterval = values.attendanceInterval;

            yield put({
                type: 'updateSeniorSearchData',
                payload: {
                    seniorSearchData: seniorSearchData
                }
            });
        },

        *resetSeniorSearch({ }, { call, put, select }) {
            yield put({
                type: 'resetSeniorSearchData'
            });
        },

        *deleteApproval({ payload: ids }, { call, put, select }) {
            const { data } = yield call(approvalService.remove, ids);
            message.success(data.message, 3);

            yield put({ type: 'reload' });
        },
        *revokedApproval({ payload: ids }, { call, put, select }) {
            const { data } = yield call(approvalService.revoked, ids);
            message.success(data.message, 3);

            yield put({ type: 'reload' });
        },
  
        *editApproval({ payload: approval }, { call, put, select }) {         
            const { data } = yield call(approvalService.edit, approval);
            message.success(data.message, 3);
            yield put({ type: 'reload' });
            //yield put(routerRedux.push("/documentList"));
        },
        *addComment({ payload: personStatus }, { call, put, select }) {
            const { data } = yield call(approvalService.comment, personStatus);
            message.success(data.message, 3);
            yield put({ type: 'reload' });
            //yield put(routerRedux.push("/documentList"));
        },
        
        *changeInitiatedList({ payload: initiatedList }, { call, put, select }) {
            yield put({
                type: 'updateState',
                payload: {
                    initiatedList: initiatedList.initiatedList
                }
            });
        },
        
        *editInitiatedList({ payload: initiatedList }, { call, put, select }) {
            const { data } = yield call(approvalService .editInitiatedList, initiatedList);
            message.success(data.message, 3);
            yield put({
                type: 'reload',
            });
        },

        *reload(action, { put, select }) {
            const page = yield select(state => state.initiatedList.page);
            const filterStr = yield select(state => state.initiatedList.filterStr);
            const pageSize = yield select(state => state.initiatedList.pageSize);
            yield put({ type: 'getData', payload: { page, filterStr, pageSize } });
        }
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                if (pathname === '/initiatedList') {
                    dispatch({ type: 'getData', payload: query });
                }
            });
        },
    },
};
