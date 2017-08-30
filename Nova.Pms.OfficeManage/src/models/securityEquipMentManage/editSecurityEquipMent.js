import * as securityEquipMentManageService from '../../services/securityEquipMentManage';
import * as commonDataService from '../../services/commonData';
import { routerRedux } from 'dva/router';
import { message } from 'antd';

export default {
    namespace: 'editSecurityEquipMent',
        state: {
            securityEquipMent: {
                regionId: null,
                name: null,

                id: null,
                type: null,
                place: null,
                SpecificationModel: null,
                responsibilityPersonId: null,
                quantity: null,
                departmentId: null,
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
                responsibilityPersonId:null,
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
        *getSecurityEquipMent({ payload: { id } }, { put, call }) {
            const { data: securityEquipMent } = yield call(
                securityEquipMentManageService.getSecurityEquipMent, { id }
            );
            const { data: regionList } = yield call(commonDataService.getRegionList);
            id = securityEquipMent.regionId;
            const { data: departmentList } = yield call(commonDataService.getDepartmentByRegionId, { id });
            const { data: staffList } = yield call(commonDataService.getStaffByRegionId, { id });

            yield put({
                type: "load",
                payload: {
                    regionList,
                    departmentList,
                    staffList,
                    securityEquipMent,
                }
            });
        },

        *selectRegion({ payload: id }, { put, call }) {
            debugger
            const { data: departmentList } = yield call(securityEquipMentManageService.getDepartmentList, { id });
            debugger
            const { data: staffList } = yield call(securityEquipMentManageService.getStaffList, { id });
            debugger
            yield put({
                type: "regionChanged",
                payload: {
                    departmentList,
                    staffList
                }
            });
        },

      
        *editSecurityEquipMent({ payload: values }, { call, put, select }) {
            let securityEquipMent = yield select(state => state.editSecurityEquipMent.securityEquipMent);
            const val = Object.assign(securityEquipMent, values);
            const { data } = yield call(securityEquipMentManageService.edit, { val });
            message.success(data.message, 3);
            yield put(routerRedux.push("/securityEquipMentList"));
        },
    },
    subscriptions: {
        setup({ dispatch, history }) {
            
            return history.listen(({ pathname, query }) => {
                if (pathname === '/editSecurityEquipMent') {
                    dispatch({ type: 'getSecurityEquipMent', payload: query });
                }
            });
        },
    },
};

