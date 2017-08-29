import * as sendApprovalService  from '../../services/pendingApprovalManage';
import * as commonDataService from '../../services/commonData';
import { message } from 'antd';
import { PAGE_SIZE } from '../../constants';
export default {
    namespace: 'sendApprovalList',
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
            var sendApprovalList = { ...state.sendApprovalList, [key]: value };
            return { ...state, sendApprovalList };
        },
        updateSendApprovalList(state, { payload: { sendApprovalList } }) {
            var sendApprovalList = { ...state.sendApprovalList, ...sendApprovalList }
            return { ...state, sendApprovalList };
        },
    },
    effects: {
        *getData({ payload: { page = 1, filterStr = '', pageSize = PAGE_SIZE } }, { call, put }) {
            const { data } = yield call(sendApprovalService.getSendApprovalList, { page: page, filterStr: filterStr, pageSize: pageSize });
            const { data: regionList } = yield call(commonDataService.getRegionList);
            const { data: initialRegion } = yield call(commonDataService.getCurrentRegion);
            const { data: staffList } = yield call(commonDataService.getStaffList);
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
                    initialRegion: initialRegion,
                }
            }); 

            yield put({
                type: 'updateSendApprovalList',
                payload: {
                    sendApprovalList: {
                        regionId: initialRegion.id,
                    }
                }
            }); 
        },

        *setSendApprovalListData({ payload: { id } }, { put, call }) {
            const { data: sendApprovalList } = yield call(sendApprovalService .getSendApprovalListData, { id });
            yield put({
                type: "updateState",
                payload: {
                    sendApprovalList,
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

       
        *addSendApprovalComment({ payload: personStatus }, { call, put, select }) {
            const { data } = yield call(sendApprovalService.addSendApprovalComment, personStatus);
            message.success(data.message, 3);
            yield put({
                type: 'reload',
            });
        },


        *reload(action, { put, select }) {
            const page = yield select(state => state.sendApprovalList.page);
            const filterStr = yield select(state => state.sendApprovalList.filterStr);
            const pageSize = yield select(state => state.sendApprovalList.pageSize);
            yield put({ type: 'getData', payload: { page, filterStr, pageSize } });
        }
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                if (pathname === '/sendApprovalList') {
                    dispatch({ type: 'getData', payload: query });
                }
            });
        },
    },
};
