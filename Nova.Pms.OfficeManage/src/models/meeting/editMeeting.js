import { routerRedux } from 'dva/router';
import { message } from 'antd';
import * as meetingService from '../../services/meeting';

export default {
    namespace: 'editMeeting',
    state: {
        regions: [],
        meetingCategorys: [],
        departments: [],
        staffs: [],
        formData: {
            id:null,
            regionId: null,
            departmentId: null,
            number: null,
            name: null,
            officeManagementCategoryId: null,
            startDate: null,
            endDate: null,
            place: null,
            convenorId: null,
            compereId: null,
            meetingTheme: null,
            meetingContent: null,
            remark: null,
            members: []
        },
    },
    reducers: {
        load(state, { payload }) {
            return { ...state, ...payload };
        },
        regionChanged(state, { payload }) {
            const initialSelected = {
                departmentId: null,
                convenorId: null,
                compereId: null,
                members: []
            };
            let formData = { ...state.formData, ...initialSelected };
            return { ...state, ...payload, formData };
        },
        changeField(state, { payload: { key, value } }) {
            var formData = { ...state.formData, [key]: value };
            return { ...state, formData };
        }
    },
    effects: {
        *getData({ payload: { id } }, { put, call }) {
            const { data: formData } = yield call(meetingService.getMeetingData, {id});
            const { data: regions } = yield call(meetingService.getRegion);
            const { data: meetingCategorys } = yield call(meetingService.getMeetingCategoryList);
            id = formData.regionId;
            const { data: departments } = yield call(meetingService.getDepartmentByRegionId, { id });
            const { data: staffs } = yield call(meetingService.getStaffByRegionId, { id });
            yield put({
                type: "load",
                payload: {
                    formData,
                    regions,
                    meetingCategorys,
                    departments,
                    staffs
                }
            });
        },
        *selectRegion({payload: id}, { put, call }) {
            const { data: departments } = yield call(meetingService.getDepartmentByRegionId, { id });
            const { data: staffs } = yield call(meetingService.getStaffByRegionId, { id });
            yield put({
                type: "regionChanged",
                payload: {
                    departments,
                    staffs
                }
            });           
        },
        *editMeeting({ payload: values }, { call, put, select }) {
            let formData = yield select(state => state.editMeeting.formData);
            const val = Object.assign(formData, values);
            const { data } = yield call(meetingService.edit, { val });
            message.success(data.message, 3);
            yield put(routerRedux.push('/meeting'));
        }
    },
    subscriptions: {
        setup({history, dispatch}) {
            return history.listen(({pathname, query}) => {
                if (pathname === '/editMeeting') {
                    dispatch({ type: 'getData', payload: query })
                }
            })
        }
    },
};
