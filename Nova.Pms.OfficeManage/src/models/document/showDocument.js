import * as documentService from '../../services/document';
import * as commonDataService from '../../services/commonData';
import { routerRedux } from 'dva/router';
import { message } from 'antd';

export default {
    namespace: 'showDocument',
    state: {
        regions: [],
        documentCategory: [],
        documentData: {
            id: null,
            regionId: null,
            fileDate: null,
            number: null,
            startDate: null,
            name: null,
            endDate: null,
            documentCategoryId: null,
            remark: null,
            version: null,
            attachments: [],
        }
    },
    reducers: {
        updateDocumentData(state, {payload}) {
            return { ...state, ...payload };
        },  
    },
    effects: {
        *getData({ payload: { id } }, { call, put }) {
            const {data: document} = yield call(documentService.getDocumentById, { id });
            const {data: region} = yield call(commonDataService.getRegionList);
            const {data: documentCategory} = yield call(commonDataService.getDocumentCategoryList);
         
            yield put({
                type: 'updateDocumentData',
                payload: {
                    documentData: document,
                    regions: region,
                    documentCategory: documentCategory,
                }
            });                   
        },     
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                if (pathname === '/showDocument') {
                    dispatch({ type: 'getData', payload: query });
                }
            });
        },
    },
};
