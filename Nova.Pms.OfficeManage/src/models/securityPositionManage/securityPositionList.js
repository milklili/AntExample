import * as securityPositionService from '../../services/securityPositionManage';
import { message } from 'antd';
import { PAGE_SIZE } from '../../constants';
export default {
    namespace: 'securityPositionList',
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

        staffList: [],
        addSecurityPosition: {
            staffId: null,
            type: null,
            attendanceDate: null,
            hours: null,
        },
    },
    reducers: {
        updateState(state, { payload: { data: list, total, page, filterStr, staffList, pageSize } }) {
            debugger;
            return { ...state, list, total, page, filterStr, staffList, pageSize };
            debugger;
        },
        updateRegion(state, { payload: { regions } }) {
            return { ...state, regions };
        },
        updateDocumentCategory(state, { payload: { documentCategory } }) {
            return { ...state, documentCategory };
        },
        updateUsers(state, { payload: { users } }) {
            return { ...state, users };
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
            var addSecurityPosition = { ...state.addSecurityPosition, [key]: value };
            return { ...state, addSecurityPosition };
        }
    },
    effects: {
        *getData({ payload: { page = 1, filterStr = '', pageSize = PAGE_SIZE } }, { call, put }) {
            debugger;
            const { data } = yield call(securityPositionService.getData, { page: page, filterStr: filterStr, pageSize: pageSize });
            const { data: staffList } = yield call(securityPositionService.getAllStaffList);

            debugger;
            yield put({
                type: 'updateState',
                payload: {
                    data: data.data,
                    total: parseInt(data.total, 10),
                    page: parseInt(page, 10),
                    pageSize: parseInt(pageSize, 10),
                    filterStr: filterStr,
                    staffList: staffList,
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

        *removeSecurityPosition({ payload: id }, { call, put, select }) {
            const { data } = yield call(securityPositionService.removeSecurityPosition, id);
            message.success(data.message, 3);

            yield put({ type: 'reload' });
        },

        *addSecurityPosition({ payload: addSecurityPosition }, { call, put, select }) {
            const { data } = yield call(securityPositionService.addSecurityPosition, addSecurityPosition);
            message.success(data.message, 3);
            yield put({ type: 'reload' });
        },
        *addStaff({ payload: addStaff }, { call, put, select }) {
            const { data } = yield call(securityPositionService.addStaff, addStaff);
            message.success(data.message, 3);
            debugger;
            yield put({ type: 'reload' });
        },
        

        *auditDocuments({ payload: ids }, { call, put, select }) {
            const { data } = yield call(documentService.auditDocuments, ids);
            message.success(data.message, 3);
            yield put({ type: 'reload' });
        },

        *cancelAuditDocuments({ payload: ids }, { call, put, select }) {
            const { data } = yield call(documentService.cancelAuditDocuments, ids);
            message.success(data.message, 3);
            yield put({ type: 'reload' });
        },

        *deleteDocumentAttachments({ payload: ids }, { call, put, select }) {
            const { data } = yield call(documentService.deleteDocumentAttachments, ids);
            message.success(data.message, 3);
            yield put({ type: 'reload' });
        },

        *addFiles({ payload: values }, { call, put, select }) {
            const { data } = yield call(documentService.addDocumentAttachments, values);
            message.success(data.message, 3);
            yield put({ type: 'reload' });
        },

        *reload(action, { put, select }) {
            debugger;
            const page = yield select(state => state.securityPositionList.page);
            debugger;
            const filterStr = yield select(state => state.securityPositionList.filterStr);
            const pageSize = yield select(state => state.securityPositionList.pageSize);
            yield put({ type: 'getData', payload: { page, filterStr, pageSize } });
        }
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                if (pathname === '/securityPositionList') {
                    dispatch({ type: 'getData', payload: query });
                }
            });
        },
    },
};
