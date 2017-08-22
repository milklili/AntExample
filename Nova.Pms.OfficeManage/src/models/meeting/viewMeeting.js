import { routerRedux } from 'dva/router';
import { message } from 'antd';
import * as meetingService from '../../services/meeting';

export default {
    namespace: 'viewMeeting',
    state: {
        regions: [],
        meetingCategorys: [],
        departments: [],
        staffs: [],
        formData: {
            id: null,
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
    },
    effects: {
        *getData({ payload: { id } }, { put, call }) {
            const { data: formData } = yield call(meetingService.getMeetingData, { id });
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
    },
    subscriptions: {
        setup({history, dispatch}) {
            return history.listen(({pathname, query}) => {
                if (pathname === '/viewMeeting') {
                    dispatch({ type: 'getData', payload: query })
                }
            })
        }
    },
};
