import * as securityEquipMentManageService from '../../services/securityEquipMentManage';
import * as workingPlanManageService from '../../services/workingPlanManage';
import * as commonDataService from '../../services/commonData';
import { routerRedux } from 'dva/router';
import { message } from 'antd';

export default {
    namespace: 'createSecurityEquipMent',
    state: {
        securityEquipMent: {
            regionId: null,
            regionName: null,
            name: null,

            id: null,
            type: null,
            place: null,
            SpecificationModel: null,
            responsibilityPersonId: null,
            responsibilityPersonName:null,
            quantity: null,
            departmentId: null,
            departmentName:null,
            remark: null,              
        },
        regionList: [],
        departmentList: [],
        staffList: [],
    },
    reducers: {
        load(state, { payload }) {
            return { ...state, ...payload };
        },

        regionChanged(state, { payload }) {
            const initialSelected = {
                departmentId: null,
                responsibilityPersonId: null,                
            };
            let securityEquipMent = { ...state.securityEquipMent, ...initialSelected };
            return { ...state, ...payload, securityEquipMent };
        },

        changeField(state, { payload: { key, value } }) {
            var securityEquipMent = { ...state.securityEquipMent, [key]: value };
            return { ...state, securityEquipMent };
        }
    },
    effects: {
        *setSecurityEquipMent({ }, { put, call }) {
            const { data: regionList } = yield call(commonDataService.getRegionList);
            yield put({
                type: 'load',
                payload: {
                    regionList,
                }
            });
        },
        *addSecurityEquipMent({ payload: values }, { call, put, select }) {
            let securityEquipMent = yield select(
                state => state.createSecurityEquipMent.securityEquipMent
            );
            const val = Object.assign(securityEquipMent, values);
            const { data } = yield call(securityEquipMentManageService.create, { val });
            message.success(data.message, 3);
            yield put(routerRedux.push("/securityEquipMentList"));
        },

        *selectRegion({ payload: id }, { put, call }) {
            const { data: departmentList } = yield call(commonDataService.getDepartmentByRegionId, { id });
            const { data: staffList } = yield call(commonDataService.getStaffByRegionId, { id });
            yield put({
                type: "regionChanged",
                payload: {
                    departmentList,
                    staffList,
                }
            });
        },


    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                if (pathname === '/createSecurityEquipMent') {
                    dispatch({ type: 'setSecurityEquipMent', payload: query });
                }
            });
        },
    },
};

