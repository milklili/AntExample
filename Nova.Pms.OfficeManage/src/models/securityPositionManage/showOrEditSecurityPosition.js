import * as securityPositionManageService from '../../services/securityPositionManage';
import { routerRedux } from 'dva/router';
import { message } from 'antd';

export default {
    namespace: 'showOrEditSecurityPosition',
    state: {
        information: {
            id:null,
            regionId: null,
            quantity: null,
            positionCode: null,
            workingDays:null,
            positionName: null,
            restDays: null, 
            positionPlace: null,
            startDate:null
        },
        securityPosition: {
            securityPositionData:[],
            total: null,
            page: null,
        }, 
        securityPositionMembers: {
            id: null,
            staffId: null,
            securityDutyPlanId: null,
            securityPositionId: null,
            startDate: null,
            endDate: null,
            remark: null,
            staffName: null,
            securityDutyPlanName:null,
        },
        regionList: [],
        departmentList: [],
        staffList: [],
        securityDutyPlanList: [],
        action: {
            isAdd: false,
            isShow: false,
            isEdit:false,
        },
    },
    reducers: {
        load(state, { payload }) {
            debugger;
            return { ...state, ...payload };
        },
        changeField(state, { payload: { key, value } }) {
            debugger;
            var information = { ...state.information, [key]: value };
            return { ...state, information };
            debugger;
        },
        
        addSecurityPositionMember(state, { payload: { securityPositionMembers, model } }) {
            debugger;
            let maxId = state.securityPosition.securityPositionData.length + 1;
            securityPositionMembers.id = maxId;
            securityPositionMembers.key = maxId; 
            var securityPositionData = state.securityPosition.securityPositionData;
            var total = state.securityPosition.total+1;
            securityPositionData.push(securityPositionMembers);
            var securityPosition = { ...state.securityPosition, securityPositionData, total };
            debugger;
            return { ...state, securityPosition };
        },
        editSecurityPositionMember(state, { payload: { securityPositionMembers, model } }) {
            debugger;
            let securityPositionData = state.securityPosition.securityPositionData.find(securityPositionData => securityPositionData.id == securityPositionMembers.id);
            debugger;
            Object.assign(securityPositionData, securityPositionMembers);
            return state;          
        },

        removeSecurityPositionMember(state, { payload: model }) {
            debugger;
            let securityPositionData = state.securityPosition.securityPositionData.find(securityPositionData => securityPositionData.id == model.id);
            var index = state.securityPosition.securityPositionData.indexOf(securityPositionData);
            if (index >= 0) {
                state.securityPosition.securityPositionData.splice(index, 1);
                securityPositionData = state.securityPosition.securityPositionData;
                var total = state.securityPosition.total -1;
                var securityPosition = { ...state.securityPosition, securityPositionData, total };

                debugger;
                return { ...state, securityPosition };
            }
            return { ...state };
        },
        
    },
    effects: {
        *getSecurityPositionData({ payload: { id, page = 1,action }}, { put, call }) {
            debugger;

            const { data: regionList } = yield call(securityPositionManageService.getRegionList);
            if (action == "isAdd") {
                yield put({
                    type: "load",
                    payload: {
                        regionList: regionList,

                        action: {
                            isAdd: true,
                        },
                    }
                });
            } else {

                const { data: information } = yield call(securityPositionManageService.getSecurityPositionInformation, { id });
                const { data: staffList } = yield call(securityPositionManageService.getStaffList, { id: information.regionId });

                const { data: securityDutyPlanList } = yield call(securityPositionManageService.getSecurityDutyPlanList, { regionId: information.regionId });
                
                debugger;
                const { data } = yield call(securityPositionManageService.getDetailSecurityPositionList, { id});
                debugger;
                const { data: departmentList } = yield call(securityPositionManageService.getAllDepartmentList);
                if (action == "isEdit") {
                    yield put({
                        type: "load",
                        payload: {
                            information: information,
                            regionList: regionList,
                            staffList: staffList,
                            departmentList: departmentList,
                            securityPosition: {
                                securityPositionData: data.data,
                                total: parseInt(data.total, 10),
                                page: parseInt(page, 10),
                            },
                            action: {
                                isEdit: true,
                            },
                            securityDutyPlanList: securityDutyPlanList,
                        }
                    });
                }
                if (action == "isShow") {
                    yield put({
                        type: "load",
                        payload: {
                            information: information,
                            regionList: regionList,
                            staffList: staffList,
                            departmentList: departmentList,
                            securityPosition: {
                                securityPositionData: data.data,
                                total: parseInt(data.total, 10),
                                page: parseInt(page, 10),
                            },
                            action: {
                                isShow: true,
                            },
                            securityDutyPlanList: securityDutyPlanList,
                        }
                    });
                }        
            }
        },


        *selectRegion({ payload: id }, { put, call }) {
            const { data: staffList } = yield call(securityPositionManageService.getStaffList, { id: id });

            const { data: securityDutyPlanList } = yield call(securityPositionManageService.getSecurityDutyPlanList, { regionId: id });
            yield put({
                type: "load",
                payload: {
                    staffList: staffList,
                    securityDutyPlanList: securityDutyPlanList,
                    securityPosition: {
                        securityPositionData: [],
                        total: null,
                        page: null,
                    },
                }
            });
        },



        *addSecurityPosition({ payload: securityPosition}, { call, put, select }) {
            debugger;
            const { data } = yield call(securityPositionManageService.addSecurityPosition, securityPosition);
            message.success(data.message, 3);
            
            yield put(routerRedux.push("/securityPositionList"));
        }, 

        *addSecurityPositionMembers({ payload: { securityPositionMembers, model } }, { call,put}) {
            debugger;
            const { data: staff } = yield call(securityPositionManageService.getStaffData, { staffId: securityPositionMembers.staffId });
            const { data: securityDutyPlan } = yield call(securityPositionManageService.getSecurityDutyPlanData, { securityDutyPlanId: securityPositionMembers.securityDutyPlanId });

            securityPositionMembers.staffName = staff.name;
            securityPositionMembers.securityDutyPlanName = securityDutyPlan.name;
            securityPositionMembers.startDate = securityDutyPlan.startDate;
            securityPositionMembers.endDate = securityDutyPlan.endDate;

            yield put({ type: 'addSecurityPositionMember', payload: { securityPositionMembers: securityPositionMembers, model: model } });
        },

        *editSecurityPositionMembers({ payload: { securityPositionMembers, model } }, { call, put }) {
            debugger;
            const { data: staff } = yield call(securityPositionManageService.getStaffData, { staffId: securityPositionMembers.staffId });
            const { data: securityDutyPlan } = yield call(securityPositionManageService.getSecurityDutyPlanData, { securityDutyPlanId: securityPositionMembers.securityDutyPlanId });

            securityPositionMembers.staffName = staff.name;
            securityPositionMembers.securityDutyPlanName = securityDutyPlan.name;
            securityPositionMembers.startDate = securityDutyPlan.startDate;
            securityPositionMembers.endDate = securityDutyPlan.endDate;

            yield put({ type: 'editSecurityPositionMember', payload: { securityPositionMembers: securityPositionMembers, model: model } });
        },

       
        *editSecurityPosition({ payload: securityPosition }, { call, put, select }) {
            const { data } = yield call(securityPositionManageService.editSecurityPosition, securityPosition);
            message.success(data.message, 3);
            
            yield put(routerRedux.push("/securityPositionList"));
        }, 

       
        *removeSecurityPositionMembers({ payload: id }, { call, put }) {
            debugger;
            yield put({ type: 'removeSecurityPositionMember', payload: { id: id } });
        },

        *reload(action, { put, select }) {
            debugger;
            const id = yield select(state => state.showOrEditSecurityPosition.information.id);
            debugger;
            const operate = yield select(state => state.showOrEditSecurityPosition.action);
            const page = yield select(state => state.showOrEditSecurityPosition.securityPosition.page);
            debugger;
            
            yield put({ type: 'getSecurityPositionData', payload: { page, id, action: Object.keys(operate) } });
        }

    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                debugger;
                if (pathname === '/showOrEditSecurityPosition') {
                    dispatch({ type: 'getSecurityPositionData', payload: query });
                }
            });
        },
    },
};

