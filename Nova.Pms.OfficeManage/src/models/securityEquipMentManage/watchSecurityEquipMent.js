import * as securityEquipMentManageService from '../../services/securityEquipMentManage';
import { routerRedux } from 'dva/router';
import { message } from 'antd';

export default {
    namespace: 'watchSecurityEquipMent',
        state: {
            securityEquipMent: {
                region: null,
                name: null,

                id: null,
                type: null,
                place: null,
                specifiactionModel: null,
                responsibilityPerson: null,
                quantity: null,
                department: null,
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
    },
    effects: {
        *getSecurityEquipMent({ payload: { id } }, { put, call }) {
            debugger;
            const { data: securityEquipMent } = yield call(
                securityEquipMentManageService.getSecurityEquipMent, { id }
            );
            const { data: regionList } = yield call(securityEquipMentManageService.getRegionList);
            id = securityEquipMent.regionId;
            const { data: departmentList } = yield call(securityEquipMentManageService.getDepartmentList, { id });
            const { data: staffList } = yield call(securityEquipMentManageService.getStaffList, { id });

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

    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                debugger;
                if (pathname === '/watchSecurityEquipMent') {
                    dispatch({ type: 'getSecurityEquipMent', payload: query });
                }
            });
        },
    },
};

