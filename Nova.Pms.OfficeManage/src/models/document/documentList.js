import * as documentService from '../../services/document';
import { message } from 'antd';
import { PAGE_SIZE } from '../../constants';

export default {
    namespace: 'documentList',
    state: {
        list: [],
        total: null,
        page: null,
        filterStr: null,
        pageSize:null,
        regions: [],
        documentCategory: [],
        users: [],
        seniorSearch: false,
        seniorSearchData: {
            regionId: null,
            documentCategoryId: null,
            auditState: null,
            auditorId: null,
            operatorId: null,
            fileDate:[],
            name: null,
            number: null,
            regionName: null,
            documentCategoryName: null,
            auditorName: null,
            operatorName: null,
        },
    },
    reducers: {
        updateState(state, { payload: { data: list, total, page, filterStr, pageSize}}) {
            return { ...state, list, total, page, filterStr, pageSize};
        },
        updateRegion(state, {payload: {regions}}) {
            return { ...state, regions };
        },
        updateDocumentCategory(state, {payload: {documentCategory}}) {
            return { ...state, documentCategory };
        },
        updateUsers(state, {payload: {users}}) {
            return { ...state, users };
        },

        updateSeniorSearchToggle(state, {payload: {seniorSearch}}) {
            return { ...state, seniorSearch };
        },
        updateSeniorSearchData(state, {payload: {seniorSearchData}}){
            return { ...state, seniorSearchData };
        },
        resetSeniorSearchData(state) {
            let seniorSearchData={
                regionId: null,
                documentCategoryId: null,
                auditState: null,
                auditorId: null,
                operatorId: null,
                fileDate: [],
                name: null,
                number: null,
                regionName: null,
                documentCategoryName: null,
                auditorName: null,
                operatorName: null,
            };
            return { ...state, seniorSearchData };
        },
    },
    effects: {
        *getData({ payload: { page = 1, filterStr = '', pageSize = PAGE_SIZE} }, { call, put }) {
            const { data } = yield call(documentService.getData, { page: page, filterStr: filterStr, pageSize: pageSize });
            const {data:region} = yield call(documentService.getRegionList);
            const {data:documentCategory} = yield call(documentService.getDocumentCategoryList);
            const {data:user} = yield call(documentService.getUsers);

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
            yield put({
                type: 'updateRegion',
                payload: {
                    regions: region,
                }
            });
            yield put({
                type: 'updateDocumentCategory',
                payload: {
                    documentCategory: documentCategory,
                }
            });
            yield put({
                type: 'updateUsers',
                payload: {
                    users: user,
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
            let regions = yield select(state => state.documentList.regions);
            let documentCategory = yield select(state => state.documentList.documentCategory);
            let users = yield select(state => state.documentList.users);

            let seniorSearchData = {
                regionId: null,
                documentCategoryId: null,
                auditState: null,
                auditorId: null,
                operatorId: null,
                fileDate: [],
                name: null,
                number: null,
                regionName: null,
                documentCategoryName: null,
                auditorName: null,
                operatorName: null,
            }
            seniorSearchData.regionId = values.regionId;
            const region = regions.find(region => region.id == values.regionId);
            if (region != null) {
                seniorSearchData.regionName = region.code;
            }
            
            seniorSearchData.documentCategoryId = values.documentCategoryId;
            const category = regions.find(documentCategory => documentCategory.id == values.documentCategoryId);
            if (category != null) {
                seniorSearchData.documentCategoryName = category.name;
            }
           
            seniorSearchData.auditState = values.auditState;
            seniorSearchData.auditorId = values.auditorId;
            const auditor = users.find(auditor => auditor.id == values.auditorId);
            if (auditor != null) {
                seniorSearchData.auditorName = auditor.name;
            }
           
            seniorSearchData.operatorId = values.operatorId;
            const operator = users.find(operator => operator.id == values.operatorId);
            if (operator != null) {
                seniorSearchData.operatorName = operator.name;
            }
            seniorSearchData.fileDate = values.fileDate;
            seniorSearchData.name = values.name;
            seniorSearchData.number = values.number;
               
            
            yield put({
                type: 'updateSeniorSearchData',
                payload: {
                    seniorSearchData: seniorSearchData
                }
            });
            //const {data} = yield call(officeManageService.create, { values });
            //if (data.state == "SUCCESS") {
            //    message.success(data.message, 3);
            //    yield put(routerRedux.push('/officeManageList'));
            //} else {
            //    message.error(data.message, 3);
            //}
        },

        *resetSeniorSearch({}, { call, put, select }) {
            yield put({
                type: 'resetSeniorSearchData'              
            });
        },

        *remove({ payload: ids }, { call, put, select }) {
            const {data} = yield call(documentService.remove, ids);
            message.success(data.message, 3);
            yield put({ type: 'reload' });
        },

        *auditDocuments({ payload: ids }, { call, put, select }) {
            const {data} = yield call(documentService.auditDocuments, ids);
            message.success(data.message, 3);
            yield put({ type: 'reload' });
        },

        *cancelAuditDocuments({ payload: ids }, { call, put, select }) {
            const {data} = yield call(documentService.cancelAuditDocuments, ids);
            message.success(data.message, 3);
            yield put({ type: 'reload' });
        },

        *deleteDocumentAttachments({ payload: ids }, { call, put, select }) {
            const {data} = yield call(documentService.deleteDocumentAttachments, ids);
            message.success(data.message, 3);
            yield put({ type: 'reload' });
        },

        *addFiles({ payload: values }, { call, put, select }) {
            const {data} = yield call(documentService.addDocumentAttachments, values);
            message.success(data.message, 3);          
            yield put({ type: 'reload' });      
        },

        *reload(action, { put, select }) {
            const page = yield select(state => state.documentList.page);
            const filterStr = yield select(state => state.documentList.filterStr);
            const pageSize = yield select(state => state.documentList.pageSize);
            yield put({ type: 'getData', payload: { page, filterStr, pageSize} });
        }
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                if (pathname === '/documentList') {
                    dispatch({ type: 'getData', payload: query });
                }
            });
        },
    },
};
