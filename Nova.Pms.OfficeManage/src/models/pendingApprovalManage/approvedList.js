import * as approvedService  from '../../services/pendingApprovalManage';
import * as commonDataService from '../../services/commonData';
import { message } from 'antd';
import { PAGE_SIZE } from '../../constants';
export default {
    namespace: 'approvedList',
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
            
            var approvedList = { ...state.approvedList, [key]: value };
            return { ...state, approvedList };
        },
        updateApprovedList(state, { payload: { approvedList } }) {
            
            var approvedList = { ...state.approvedList, ...approvedList }
            return { ...state, approvedList };
        },
    },
    effects: {
        *getData({ payload: { page = 1, filterStr = '', pageSize = PAGE_SIZE } }, { call, put }) {
            
            const { data } = yield call(approvedService.getApprovedList, { page: page, filterStr: filterStr, pageSize: pageSize });
            
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
                type: 'updateApprovedList',
                payload: {
                    approvedList: {
                        regionId: initialRegion.id,
                    }
                }
            }); 
        },

        *setApprovedListData({ payload: { id } }, { put, call }) {
            const { data: approvedList } = yield call(approvedService .getApprovedListData, { id });
            yield put({
                type: "updateState",
                payload: {
                    approvedList,
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

        
        
     
        *editApproval({ payload: approval }, { call, put, select }) {
            
            const { data } = yield call(approvedService.editApproval, approval);
            message.success(data.message, 3);
            //yield put(routerRedux.push("/documentList"));
        },
       
        *addApprovedComment({ payload: personStatus }, { call, put, select }) {

            const { data } = yield call(approvedService.addApprovedComment, personStatus);
            message.success(data.message, 3);
            yield put({
                type: 'reload',
            });
            //yield put(routerRedux.push("/documentList"));
        },

        

        *batchAddComment({ payload: personStatus }, { call, put, select }) {

            const { data } = yield call(approvedService.batchAddComment, personStatus);
            message.success(data.message, 3);
            //yield put(routerRedux.push("/documentList"));
        },
        

        *changeApprovedList({ payload: approvedList }, { call, put, select }) {
            
            yield put({
                type: 'updateState',
                payload: {
                    approvedList: approvedList.approvedList
                }
            });
        },
        
        *editApprovedList({ payload: approvedList }, { call, put, select }) {
            
            const { data } = yield call(approvedService .editApprovedList, approvedList);
            message.success(data.message, 3);
            yield put({
                type: 'reload',
            });
        },


        *reload(action, { put, select }) {
            
            const page = yield select(state => state.approvedList.page);
            
            const filterStr = yield select(state => state.approvedList.filterStr);
            const pageSize = yield select(state => state.approvedList.pageSize);
            yield put({ type: 'getData', payload: { page, filterStr, pageSize} });
        }
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                if (pathname === '/approvedList') {
                    dispatch({ type: 'getData', payload: query });
                }
            });
        },
    },
};
