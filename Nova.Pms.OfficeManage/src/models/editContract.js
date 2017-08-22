import * as editContractService from '../services/editContract';
import { routerRedux } from 'dva/router';
import { message } from 'antd';

export default {
    namespace: 'editContract',    
    state: {
        cityData: {},
        streetRegisterData: {},
        streetWarkingData: {},
        contract: {},
    },
    reducers: {
        getData(state, {payload: {cityData, streetData, contract}}) {
            return { ...state, cityData, streetData, contract };
        },
        removeuser(state, {payload: model}) {
            let user = state.contract.contacts.find(user => user.id == model.id);
            var index = state.contract.contacts.indexOf(user);
            if (index >= 0) {
                state.contract.contacts.splice(index, 1);
            }
            return state;
        },
        addContractUser(state, {payload: {ContactModel, model}}) {
            let maxId = state.contract.contacts.length + 1;
            ContactModel.id = maxId;
            ContactModel.key = maxId;
            state.contract.contacts.push(ContactModel);
            return state;
        },

        editContractUser(state, {payload: {ContactModel, model}}) {
            let user = state.contract.contacts.find(user => user.id == ContactModel.id);
            Object.assign(user, ContactModel);
            return state;
        },

        addAttachmentRedux(state, {payload: {files, model}}) {
            let maxId = state.contract.attachments.length + 1;
            for (let file of files) {
                file.id = maxId;
                file.key = maxId;
                state.contract.attachments.push(file);
                maxId++;
            }
            return state;
        },
        removeAttachmentRedux(state, {payload: model}) {
            let file = state.contract.attachments.find(file => file.id == model.uid);
            var index = state.contract.attachments.indexOf(file);
            if (index >= 0) {
                state.contract.attachments.splice(index, 1);
            }
            return state;
        },
        GetStreetRedux(state, {payload: {values, type}}) {
            if (type == 1) {
                state.streetRegisterData = values;
            } else {
                state.streetWarkingData = values;
            }
            return state;
        },
    },
    effects: {
        *getDataById({ payload: id }, { call, put }) {
            const {data:contractData} = yield call(editContractService.getContractDataById, { id });   
            const {data: cityData} = yield call(editContractService.getCityData);
            if (contractData.state == "SUCCESS") {
                yield put({
                    type: 'getData',
                    payload: {
                        cityData: cityData,
                        streetRegisterData: {},
                        streetWarkingData: {},
                        contract: contractData.contract,
                    }
                });
            }
        },
        *remove({ payload: id }, { call, put }) {
            yield put({ type: 'removeuser', payload: { id: id } });
        },
        *addUser({ payload: {userModel, model} }, { call, put }) {
            yield put({ type: 'addContractUser', payload: { ContactModel: userModel, model: model }});
        },
        *editUser({ payload: {userModel, model} }, { call, put }) {
            yield put({ type: 'editContractUser', payload: { ContactModel: userModel, model: model } });
        },
        *addAttachment({ payload: {file, model } }, { call, put }) {
            yield put({ type: 'addAttachmentRedux', payload: { files: file, model: model } });
        },
        *removeAttachment({ payload: uid }, { call, put }) {
            yield put({ type: 'removeAttachmentRedux', payload: { uid: uid } });
        },
        *GetStreet({ payload: {code, type} }, { call, put }) {
            const {data} = yield call(editContractService.getStreet, { code });
            yield put({ type: 'GetStreetRedux', payload: { values: data, type: type } });
        },
        *updateContract({ payload: values }, { call, put, select }) {
            let contract = yield select(state => state.editContract.contract);
            const val = Object.assign(contract, values);
            const {data} = yield call(editContractService.edit, { val });
            if (data.state == "SUCCESS") {
                message.success(data.message, 3);
                yield put(routerRedux.push('/contractList'));
            } else {
                message.error(data.message, 3);
            }
        },
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query  }) => {
                if (pathname === '/editContract') {
                    dispatch({ type: 'getDataById', payload: query  });
                }
            });
        },
    },
};
