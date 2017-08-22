import * as approvalService  from '../../services/approvalManage';
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
        //initiatedList: {
        //    id: null,
        //    typeStr:null,
        //    content: null,
        //    regionName: null,
        //    creatDate: null,
        //    completeDate: null,
        //    statusStr: null,
        //    suitorPersonName: null,
        //    approvalPersonName: null,
        //},
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
            var initiatedList = { ...state.initiatedList, [key]: value };
            return { ...state, initiatedList };
        },
        updateInitiatedList(state, { payload: { initiatedList } }) {
            debugger;
            var initiatedList = { ...state.initiatedList, ...initiatedList }
            return { ...state, initiatedList };
        },
    },
    effects: {
        *getData({ payload: { page = 1, filterStr = '', pageSize = PAGE_SIZE } }, { call, put }) {
            debugger;
            const { data } = yield call(approvalService.getInitiatedList, { page: page, filterStr: filterStr, pageSize: pageSize });
            debugger;
            const { data: regionList } = yield call(approvalService .getRegionList);
            const { data: initialRegion } = yield call(approvalService .getInitialRegion);
            const { data: staffList } = yield call(approvalService .getAllStaffList);
            const { data: cleaningAreaList } = yield call(approvalService .getAllCleaningAreaList);
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
            debugger;
            const { data } = yield call(approvalService .deleteApproval, ids);
            message.success(data.message, 3);

            yield put({ type: 'reload' });
        },
        *revokedApproval({ payload: ids }, { call, put, select }) {
            debugger;
            const { data } = yield call(approvalService.revokedApproval, ids);
            message.success(data.message, 3);

            yield put({ type: 'reload' });
        },

        
     
        *editApproval({ payload: approval }, { call, put, select }) {
            
            const { data } = yield call(approvalService.editApproval, approval);
            message.success(data.message, 3);
            yield put({ type: 'reload' });
            //yield put(routerRedux.push("/documentList"));
        },
        *addComment({ payload: personStatus }, { call, put, select }) {

            const { data } = yield call(approvalService.addComment, personStatus);
            message.success(data.message, 3);
            yield put({ type: 'reload' });
            //yield put(routerRedux.push("/documentList"));
        },
        

        *changeInitiatedList({ payload: initiatedList }, { call, put, select }) {
            debugger;
            yield put({
                type: 'updateState',
                payload: {
                    initiatedList: initiatedList.initiatedList
                }
            });
        },
        
        *editInitiatedList({ payload: initiatedList }, { call, put, select }) {
            debugger;
            const { data } = yield call(approvalService .editInitiatedList, initiatedList);
            message.success(data.message, 3);
            yield put({
                type: 'reload',
            });
        },


        *reload(action, { put, select }) {
            debugger;
            const page = yield select(state => state.initiatedList.page);
            debugger;
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
