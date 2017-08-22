import * as securityEquipMentService from '../../services/securityEquipMentManage';
import { message } from 'antd';
import { PAGE_SIZE } from '../../constants';
export default {
    namespace: 'securityEquipMentList',
    state: {
        list: [],
        total: null,
        page: null,
        filterStr: null,
        pageSize:null,
        seniorSearch: false,
        seniorSearchData: {
            staffName: null,
            attendanceInterval: null,
        },

        securityEquipMent: {
            regionId: null,
            regionName: null,
            name: null,

            id: null,
            type: null,
            place: null,
            specificationModel: null,
            responsibilityPersonId: null,
            responsibilityPersonName: null,
            quantity: null,
            departmentId: null,
            departmentName: null,
            remark: null,
        },
        initialRegion: null,
        regionList: [],
        departmentList: [],
        staffList: [],
       // visible:false,
    },
    reducers: {
        updateState(state, { payload }) {
            debugger;
            return { ...state, ...payload };
            debugger;
        },

        updateSeniorSearchToggle(state, { payload: { seniorSearch } }) {
            return { ...state, seniorSearch };
        },
        updateSeniorSearchData(state, { payload: { seniorSearchData } }) {
            return { ...state, seniorSearchData };
        },
        resetSeniorSearchData(state) {
            let seniorSearchData = {
                staffName: null,
                attendanceInterval: null,
            };
            return { ...state, seniorSearchData };
        },

        changeField(state, { payload: { key, value } }) {
            debugger;
            var securityEquipMent = { ...state.securityEquipMent, [key]: value };
            return { ...state, securityEquipMent };
        },
        updateSecurityEquipMent(state, { payload: { securityEquipMent } }) {
            debugger;
            var securityEquipMent = { ...state.securityEquipMent, ...securityEquipMent }
            return { ...state, securityEquipMent };
        },

        regionChanged(state, { payload }) {
            const initialSelected = {
                departmentId: null,
               // responsibilityPersonId: null,
            };
            let securityEquipMent = { ...state.securityEquipMent, ...initialSelected };
            return { ...state, ...payload, securityEquipMent };
        },

    },
    effects: {
        *getData({ payload: { page = 1, filterStr = '', pageSize = PAGE_SIZE } }, { call, put }) {
            debugger;
            const { data } = yield call(securityEquipMentService.securityEquipMentList, { page: page, filterStr: filterStr, pageSize: pageSize });
            debugger;
            const { data: regionList } = yield call(securityEquipMentService.getRegionList);
            const { data: initialRegion } = yield call(securityEquipMentService.getInitialRegion);
            const { data: staffList } = yield call(securityEquipMentService.getAllStaffList);
            const { data: departmentList } = yield call(securityEquipMentService.getAllDepartmentList);
            debugger;
            yield put({
                type: 'updateState',
                payload: {
                    list: data.data,
                    total: parseInt(data.total, 10),
                    page: parseInt(page, 10),
                    pageSize: parseInt(pageSize, 10),
                    filterStr: filterStr,
                    regionList: regionList,
                    staffList: staffList,
                    departmentList: departmentList,
                    initialRegion: initialRegion,
                }
            });

            yield put({
                type: 'updateSecurityEquipMent',
                payload: {
                    securityEquipMent: {
                        regionId: initialRegion.id,
                    }
                }
            });
        },

        *setSecurityEquipMentData({ payload: { id } }, { put, call }) {
            const { data: securityEquipMent } = yield call(securityEquipMentService.getSecurityEquipMentData, { id });
            yield put({
                type: "updateState",
                payload: {
                    securityEquipMent,
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

            let seniorSearchData = {
                staffName: null,
                attendanceInterval: null,
            }
            seniorSearchData.staffName = values.staffName;
            seniorSearchData.attendanceInterval = values.attendanceInterval;

            yield put({
                type: 'updateSeniorSearchData',
                payload: {
                    seniorSearchData: seniorSearchData
                }
            });
        },

        *resetSeniorSearch({ }, { call, put, select }) {
            yield put({
                type: 'resetSeniorSearchData'
            });
        },

        *remove({ payload: ids }, { call, put, select }) {
            debugger;
            const { data } = yield call(securityEquipMentService.remove, ids);
            message.success(data.message, 3);

            yield put({ type: 'reload' });
        },

        *addSecurityEquipMent({ payload: securityEquipMent }, { call, put, select }) {
            debugger;
            const { data } = yield call(securityEquipMentService.addSecurityEquipMent, securityEquipMent);
            debugger;
            message.success(data.message, 3);
            debugger;
            yield put({
                type: 'changeSecurityEquipMent',
                payload: {
                    securityEquipMent: securityEquipMent.securityEquipMent
                }
            });

            yield put({ type: 'reload' });
        },


        *selectRegion({ payload: id }, { put, call }) {
            debugger;
            const { data: departmentList } = yield call(securityEquipMentService.getDepartmentList, { id });
            debugger;
            const { data: staffList } = yield call(securityEquipMentService.getStaffList, { id });
            debugger;
            yield put({
                type: "regionChanged",
                payload: {
                    departmentList,
                    staffList,
                   // visible: true,

                }
            });
        },

        *changeSecurityEquipMent({ payload: securityEquipMent }, { call, put, select }) {
            debugger;
            yield put({
                type: 'updateState',
                payload: {
                    securityEquipMent: securityEquipMent.securityEquipMent
                }
            });
        },

        *editSecurityEquipMent({ payload: securityEquipMent }, { call, put, select }) {
            debugger;
            const { data } = yield call(securityEquipMentService.editSecurityEquipMent, securityEquipMent);
            message.success(data.message, 3);
            yield put({
                type: 'reload',
            });
        },


        *reload(action, { put, select }) {
            debugger;
            const page = yield select(state => state.securityEquipMentList.page);
            debugger;
            const filterStr = yield select(state => state.securityEquipMentList.filterStr);
            const pageSize = yield select(state => state.securityEquipMentList.pageSize);
            yield put({ type: 'getData', payload: { page, filterStr, pageSize } });
        }
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                if (pathname === '/securityEquipMentList') {
                    dispatch({ type: 'getData', payload: query });
                }
            });
        },
    },
};


