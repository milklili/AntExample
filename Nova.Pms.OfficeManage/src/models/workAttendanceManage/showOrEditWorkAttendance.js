import { message } from 'antd'
import * as workAttendanceManageService
  from '../../services/workAttendanceManage'
import * as commonDataService from '../../services/commonData'

export default {
  namespace: 'showOrEditWorkAttendance',
  state: {
    information: {
      regionId: null,
      staffId: null,
      departmentId: null,
      number: null,
      role: null,
      staffStatus: null,
    },
    workAttendance: {
      workAttendanceData: [],
      total: null,
      page: null,
    },
    regionList: [],
    departmentList: [],
    staffList: [],
  },
  reducers: {
    load (state, { payload }) {
      return { ...state, ...payload }
    },
    changeField (state, { payload: { key, value } }) {
      const Information = { ...state.Information, [key]: value }
      return { ...state, Information }
    },
  },
  effects: {
    *getWorkAttendanceData ({ payload: { id, page = 1 } }, { put, call }) {
      const {
        data: information,
      } = yield call(workAttendanceManageService.getWorkAttendanceInformation, {
        id,
      })
      const {
        data,
      } = yield call(workAttendanceManageService.getDetailWorkAttendanceList, {
        id,
        page,
      })
      const { data: staffList } = yield call(commonDataService.getStaffList)
      const { data: regionList } = yield call(commonDataService.getRegionList)
      const { data: departmentList } = yield call(
        commonDataService.getDepartmentList
      )

      yield put({
        type: 'load',
        payload: {
          information,
          regionList,
          staffList,
          departmentList,
          workAttendance: {
            workAttendanceData: data.data,
            total: parseInt(data.total, 10),
            page: parseInt(page, 10),
          },
        },
      })
    },

    *editWorkAttendance (
      { payload: { values } },
      { call, put, select }
    ) {
      const { information } = yield select(state => state.showOrEditWorkAttendance)
      const postData = { ...information, ...values }
      const { data } = yield call(
        workAttendanceManageService.editWorkAttendance,
        postData
      )
      message.success(data.message, 3)
      yield put({
        type: 'reload',
      })
    },

    *remove ({ payload: id }, { call, put }) {
      const { data } = yield call(workAttendanceManageService.remove, id)
      message.success(data.message, 3)
      yield put({ type: 'reload' })
    },

    *reload (action, { put, select }) {
      const id = yield select(
        state => state.showOrEditWorkAttendance.information.id
      )

      const page = yield select(
        state => state.showOrEditWorkAttendance.workAttendance.page
      )

      yield put({ type: 'getWorkAttendanceData', payload: { page, id } })
    },
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/showOrEditWorkAttendance') {
          dispatch({ type: 'getWorkAttendanceData', payload: query })
        }
      })
    },
  },
}
