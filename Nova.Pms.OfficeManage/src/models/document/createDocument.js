import * as documentService from "../../services/document";
import * as commonDataService from '../../services/commonData';
import { routerRedux } from "dva/router";
import { message } from "antd";
import moment from "moment";
import "moment/locale/zh-cn";
moment.locale("zh-cn");
export default {
    namespace: "createDocument",
    state: {
        regions: [],
        documentCategories: [],
        documentData: {
            regionId: null,
            fileDate: moment(new Date(), 'YYYY-MM-DD HH:mm:ss'),
            number: null,
            startDate: null,
            name: null,
            endDate: null,
            documentCategoryId: null,
            remark: null,
            version: null,
            attachments: []
        }
    },
    reducers: {
        load(state, { payload }) {
            return { ...state, ...payload };
        },

        addAttachment(state, { payload: { files } }) {
            
            let maxId = state.documentData.attachments.length + 1;
            const documentData = state.documentData;
            for (let file of files) {
                file.id = maxId;
                file.key = maxId;
                documentData.attachments.push(file);
                maxId++;
            }
            return { ...state, documentData };
            
        },
        removeAttachment(state, { payload: model }) {
            
            let file = state.documentData.attachments.find(
                file => file.id == model.uid
            );
            var index = state.documentData.attachments.indexOf(file);
            const documentData = state.documentData;
            if (index >= 0) {
                documentData.attachments.splice(index, 1);
            }
            return { ...state, documentData };
        },
        changeField(state, { payload: { key, value } }) {
            var documentData = { ...state.documentData, [key]: value };
            return { ...state, documentData };
        }
    },
    effects: {
        *getData({ }, { call, put }) {
            const { data: regions } = yield call(commonDataService.getRegionList);
            const { data: documentCategories } = yield call(commonDataService.getDocumentCategoryList);

            yield put({
                type: "load",
                payload: {
                    regions,
                    documentCategories
                }
            });
        },

        *addUploadFiles({ payload: { file, model } }, { call, put }) {
            yield put({ type: "addAttachment", payload: { files: file } });
        },
        *removeUploadFiles({ payload: uid }, { call, put }) {
            yield put({ type: "removeAttachment", payload: { uid: uid } });
        },

        *addDocument({ payload: values }, { call, put, select }) {
            let documentData = yield select(
                state => state.createDocument.documentData
            );
            const val = Object.assign(documentData, values);
            const { data } = yield call(documentService.create, { val });
            message.success(data.message, 3);
            yield put(routerRedux.push("/documentList"));
        }
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                if (pathname === "/createDocument") {
                    dispatch({ type: "getData" });
                }
            });
        }
    }
};
