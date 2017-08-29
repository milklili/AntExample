import * as pendingApprovalService  from '../../services/pendingApprovalManage';
import * as commonDataService from '../../services/commonData';
import { message } from 'antd';
import { PAGE_SIZE } from '../../constants';
export default {
    namespace: 'pendingApprovalList',
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
            debugger;
            return { ...state, ...payload  };
            debugger;
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
            debugger;
            var pendingApprovalList = { ...state.pendingApprovalList, [key]: value };
            return { ...state, pendingApprovalList };
        },
        updatePendingApprovalList(state, { payload: { pendingApprovalList } }) {
            debugger;
            var pendingApprovalList = { ...state.pendingApprovalList, ...pendingApprovalList }
            return { ...state, pendingApprovalList };
        },
    },
    effects: {
        *getData({ payload: { page = 1, filterStr = '', pageSize = PAGE_SIZE } }, { call, put }) {
            debugger;
            const { data } = yield call(pendingApprovalService.getPendingApprovalList, { page: page, filterStr: filterStr, pageSize: pageSize });
            debugger;
            const { data: regionList } = yield call(commonDataService.getRegionList);
            const { data: initialRegion } = yield call(commonDataService.getCurrentRegion);
            const { data: staffList } = yield call(commonDataService.getStaffList);
            const { data: cleaningAreaList } = yield call(commonDataService.cleaningAreaList);
            debugger;
            debugger;
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
                type: 'updatePendingApprovalList',
                payload: {
                    pendingApprovalList: {
                        regionId: initialRegion.id,
                    }
                }
            }); 
        },

        *setPendingApprovalListData({ payload: { id } }, { put, call }) {
            const { data: pendingApprovalList } = yield call(pendingApprovalService .getPendingApprovalListData, { id });
            yield put({
                type: "updateState",
                payload: {
                    pendingApprovalList,
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
            debugger;
            const { data } = yield call(pendingApprovalService .deleteApproval, ids);
            message.success(data.message, 3);

            yield put({ type: 'reload' });
        },
        *revokedApproval({ payload: ids }, { call, put, select }) {
            debugger;
            const { data } = yield call(pendingApprovalService.revokedApproval, ids);
            message.success(data.message, 3);

            yield put({ type: 'reload' });
        },
        *addOpinions({ payload: personStatus }, { call, put, select }) {

            const { data } = yield call(pendingApprovalService.addOpinions, personStatus);
            message.success(data.message, 3);
            yield put({
                type: 'reload',
            });
            //yield put(routerRedux.push("/documentList"));
        },
        *addPendingComment({ payload: personStatus }, { call, put, select }) {

            const { data } = yield call(pendingApprovalService.addPendingComment, personStatus);
            message.success(data.message, 3);
            yield put({
                type: 'reload',
            });
            //yield put(routerRedux.push("/documentList"));
        },
        
        *batchAddComment({ payload: personStatus }, { call, put, select }) {

            const { data } = yield call(pendingApprovalService.batchAddComment, personStatus);
            message.success(data.message, 3);
            yield put({
                type: 'reload',
            });
            //yield put(routerRedux.push("/documentList"));
        },
        *transferApproval({ payload: personStatus }, { call, put, select }) {

            const { data } = yield call(pendingApprovalService.transferApproval, personStatus);
            message.success(data.message, 3);
            yield put({
                type: 'reload',
            });
            //yield put(routerRedux.push("/documentList"));
        },
        
        

        *changePendingApprovalList({ payload: pendingApprovalList }, { call, put, select }) {
            debugger;
            yield put({
                type: 'updateState',
                payload: {
                    pendingApprovalList: pendingApprovalList.pendingApprovalList
                }
            });
        },
        
        *editPendingApprovalList({ payload: pendingApprovalList }, { call, put, select }) {
            debugger;
            const { data } = yield call(pendingApprovalService .editPendingApprovalList, pendingApprovalList);
            message.success(data.message, 3);
            yield put({
                type: 'reload',
            });
        },


        *reload(action, { put, select }) {
            debugger;
            const page = yield select(state => state.pendingApprovalList.page);
            debugger;
            const filterStr = yield select(state => state.pendingApprovalList.filterStr);
            const pageSize = yield select(state => state.pendingApprovalList.pageSize);
            yield put({ type: 'getData', payload: { page, filterStr, pageSize} });
        }
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                if (pathname === '/pendingApprovalList') {
                    dispatch({ type: 'getData', payload: query });
                }
            });
        },
    },
};
