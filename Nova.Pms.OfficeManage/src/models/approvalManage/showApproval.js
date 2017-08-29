import * as approvedService from '../../services/approvalManage';
import * as commonDataService from '../../services/commonData';
import { message } from 'antd';
import { PAGE_SIZE } from '../../constants';
export default {
    namespace: 'showApproval',
    state: {
        approval: {
            id: null,
            code: null,
            status: null,
            approvalPersonName: null,
            regionName: null,
            typeStr: null,
            content:null,
            creatDate: null,
            details: null,
            attachments: [],
            sendPersonNames: null,
            approvalDetail:[],
        },
        total: null,
        current:null,
    },
    reducers: {
        updateState(state, { payload }) {           
            return { ...state, ...payload };         
        },
       
        changeField(state, { payload: { key, value } }) {      
            var  showApproval = { ...state. showApproval, [key]: value };
            return { ...state,  showApproval };
        },
       
    },
    effects: {
        *getData({ payload: { id } }, { call, put }) {  
            const { data } = yield call(approvedService.get, { id }); 
            yield put({
                type: 'updateState',
                payload: {
                    approval: data.information,
                    total: data.total,
                    current:data.current,
                }
            });
        },
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                if (pathname === '/showApproval') {          
                    dispatch({ type: 'getData', payload: query });
                }
            });
        },
    },
};
