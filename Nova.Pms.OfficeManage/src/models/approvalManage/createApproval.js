import * as approvalService from '../../services/approvalManage';
import * as commonDataService from '../../services/commonData';
import { message } from 'antd';
import { routerRedux } from "dva/router";
import { PAGE_SIZE } from '../../constants';
export default {
    namespace: 'createApproval',
    state: {     
        staffList:[],
        regionList:[],
        approval: {
            regionId: null,
            code: null,
            type: null,
            status: null,
            content: null,
            details: null,
            attachments: [],
            personStatus: [],
            approvalId: [],
            sendId:[],
        },
        personStatus: [],
        initialRegion: null,
        attachments: [],
    },
    reducers: {
        updateState(state, { payload}) {      
            return { ...state, ...payload  };           
        },      
        changeField(state, { payload: { key, value } }) {       
            var approval = { ...state.approval, [key]: value };
            return { ...state, approval };
        },
        regionChanged(state, { payload }) {
            const initialSelected = {
                approvalId: [],
                sendId: [],
            };      
            let { personStatus } = state;
            var length = personStatus.length;
            if (length >= 0) {
                personStatus.splice(0, length);
            }
            //this.setState({ personStatus });
            let approval = { ...state.approval, ...initialSelected };
            return { ...state, ...payload, approval, personStatus };
        },
        sendIdChanged(state, { payload }) {      
            let { personStatus } = state;
            personStatus.push(payload.data);
            //this.setState({ personStatus });
            //let approval = { ...state.approval, ...initialSelected };
            return { ...state, personStatus };      
        },
        sendIdDeselect(state, { payload }) {    
            let person = state.personStatus.find(person => (person.personId == payload.value && person.approvalPersonType == 2));
            var index = state.personStatus.indexOf(person);
            if (index >= 0) {
                state.personStatus.splice(index, 1);
            }       
            return state;        
        },
        approvalIdChanged(state, { payload }) {    
            let { personStatus } = state;
            personStatus.push(payload.data);  
            return { ...state, personStatus };       
        },
        approvalIdDeselect(state, { payload }) {   
            let person = state.personStatus.find(person => (person.personId == payload.value && person.approvalPersonType == 1));
            var index = state.personStatus.indexOf(person);
            if (index >= 0) {
                state.personStatus.splice(index, 1);
            }     
            return state;     
        },
        addAttachments(state, { payload: { files } }) {
            let maxId = state.attachments.length + 1;
            const attachments = state.attachments;
            for (let file of files) {
                file.id = maxId;
                file.key = maxId;
                file.fileType = 1;
                attachments.push(file);
                maxId++;
            }
            return { ...state, attachments };      
        },
        removeAttachment(state, { payload: model }) {     
            let file = state.attachments.find(
                file => file.uid == model.uid
            );
            var index = state.attachments.indexOf(file);
            const attachments = state.attachments;
            if (index >= 0) {
                attachments.splice(index, 1);
            }
            return { ...state, attachments };    
        },
        addPictures(state, { payload: { files } }) {  
            let maxId = state.attachments.length + 1;
            const attachments = state.attachments;
            for (let file of files) {
                file.id = maxId;
                file.key = maxId;
                file.fileType = 0;
                attachments.push(file);
                maxId++;
            }
            return { ...state, attachments };
        },
        removePicture(state, { payload: model }) {   
            let file = state.attachments.find(
                file => file.uid == model.uid
            );
            var index = state.attachments.indexOf(file);
            const attachments = state.attachments;
            if (index >= 0) {
                attachments.splice(index, 1);
            }
            return { ...state, attachments };      
        },
        removeAllPicture(state, { }) {
            const attachments = state.attachments;
            attachments.splice(0, attachments.length);
            return { ...state, attachments };
        },
    },
    effects: {
        *getData({ payload: { page = 1, filterStr = '' } }, { call, put }) {  
            const { data: regionList } = yield call(commonDataService.getRegionList);
            const { data: initialRegion } = yield call(commonDataService.getCurrentRegion);
            debugger;
            const id = initialRegion.id;
            debugger;
            const { data: staffList } = yield call(commonDataService.getStaffByRegionId, { id});
            const date = new Date();
 
            const randCode = () => {       
                var num = Math.random().toString();
                if (num.substr(num.length - 13, 1) === '0') {
                    return randCode(13);
                }
                return num.substring(num.length - 13);
            };
            const padStr = (i) =>  {
                return (i < 10) ? "0" + i : "" + i;
            }
            const code = padStr(date.getFullYear()).toString() + padStr(date.getMonth() + 1).toString() + padStr(date.getDate()).toString() + randCode();
            
            yield put({
                type: 'updateState',
                payload: {
                    regionList: regionList,
                    staffList: staffList, 
                    initialRegion: initialRegion,
                    isShowModal: true,
                    personStatus: [],
                    attachments: [],
                    approval: {
                        regionId: initialRegion.id,
                        code: code,
                        type: 0,
                        status: null,
                        content: null,
                        details: null,
                        attachments: [],
                        personStatus: [],
                        approvalId: [],
                        sendId: [],
                    },
                }
            }); 
        },
        *resetData({  }, { call, put }) {
            const { data: regionList } = yield call(commonDataService.getRegionList);
            const { data: initialRegion } = yield call(commonDataService.getCurrentRegion);
            const id = initialRegion.id;
            const { data: staffList } = yield call(commonDataService.getStaffByRegionId, { id });
          
            yield put({
                type: 'updateState',
                payload: {
                    regionList: regionList,
                    staffList: staffList,
                    initialRegion: initialRegion,
                    isShowModal: true,
                    personStatus: [],
                    attachments: [],
                    approval: {
                        regionId: initialRegion.id,
                        //code: code,
                        type: 0,
                        status: null,
                        content: null,
                        details: null,
                        attachments: [],
                        personStatus: [],
                        approvalId: [],
                        sendId: [],
                    },
                }
            });
        },
        *uploadAttachments({ payload: { file, model } }, { call, put }) {   
            yield put({ type: "addAttachments", payload: { files: file } });
        },
        *removeAttachments({ payload: uid }, { call, put }) {     
            yield put({ type: "removeAttachment", payload: { uid: uid } });
        },
        *uploadPictures({ payload: { file } }, { call, put }) {
            yield put({ type: "addPictures", payload: { files: file } });
        },
        *removePictures({ payload: uid }, { call, put }) {      
            yield put({ type: "removePicture", payload: { uid: uid } });
        },
        *removeAllPictures({ }, { call, put }) {
            yield put({ type: "removeAllPicture" });
        },
        *selectRegion({ payload: id }, { put, call }) {     
            const { data: staffList } = yield call(commonDataService.getStaffByRegionId, { id });
            yield put({
                type: "regionChanged",
                payload: {
                    staffList
                }
            });
        },
        *onSendIdChange({ payload: value }, { put, call }) {          
            let data = { approvalOperationType: 0, approvalPersonType: 2, personId: value, remark: "" };
            yield put({
                type: "sendIdChanged",
                payload: {
                    data
                }
            });
        },
        *onApprovalIdChange({ payload: value }, { put, call }) {         
            let data = { approvalOperationType: 0, approvalPersonType: 1, personId: value, remark: "" };
            yield put({
                type: "approvalIdChanged",
                payload: {
                    data
                }
            });
        },  
        *onSendIdDeselect({ payload: value }, { put, call }) {
            yield put({
                type: "sendIdDeselect",
                payload: {
                    value
                }
            });
        },
        *onApprovalIdDeselect({ payload: value }, { put, call }) {
            yield put({
                type: "approvalIdDeselect",
                payload: {
                    value
                }
            });
        },     
        *addApproval({ payload: approval }, { call, put, select }) {
            const { data } = yield call(approvalService.create, approval); 
            message.success(data.message, 3);
            yield put(routerRedux.push("/initiatedList"));
        },
        *changeApproval({ payload: approval }, { call, put, select }) {
            yield put(routerRedux.push("/initiatedList"));
        },
        *reload(action, { put, select }) {   
            const page = yield select(state => state.approvalList.page);    
            const filterStr = yield select(state => state.approvalList.filterStr);
            yield put({ type: 'getData', payload: { page, filterStr } });
        }
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                if (pathname === '/createApproval') {
                    dispatch({ type: 'getData', payload: query });
                }
            });
        },
    },
};
