import * as cleaningAreaService from '../../services/cleaningAreaManage'
import * as commonDataService from '../../services/commonData'
import { message } from 'antd'
import { PAGE_SIZE } from '../../constants'

export default {
  namespace: 'cleaningAreaList',
  state: {
    list: [],
    total: null,
    page: null,
    filterStr: null,
    pageSize: null,
    seniorSearch: false,
    seniorSearchData: {
      staffName: null,
      attendanceInterval: null,
    },
    initialRegion: null,
    regionList: [],
    staffList: [],
    cleaningArea: {
      id: null,
      regionId: null,
      regionName: null,
      areaCode: null,
      areaName: null,
      place: null,
      requirement: null,
      staffId: null,
      staffName: null,
      isOutsourced: null,
      createUserId: null,
      createUserName: null,
      createDate: null,
      remark: null,
    },
  },
  reducers: {
    updateState (state, { payload }) {
      return { ...state, ...payload }
    },

    updateSeniorSearchToggle (state, { payload: { seniorSearch } }) {
      return { ...state, seniorSearch }
    },
    updateSeniorSearchData (state, { payload: { seniorSearchData } }) {
      return { ...state, seniorSearchData }
    },
    resetSeniorSearchData (state) {
      let seniorSearchData = {
        staffName: null,
        attendanceInterval: null,
      }
      return { ...state, seniorSearchData }
    },

    changeField (state, { payload: { key, value } }) {
      const cleaningArea = { ...state.cleaningArea, [key]: value }
      return { ...state, cleaningArea }
    },
    updateCleaningArea (state, { payload: { cleaningArea } }) {
      const newCleaningArea = { ...state.cleaningArea, ...cleaningArea }
      return { ...state, cleaningArea: newCleaningArea }
    },
  },
  effects: {
    *getData (
      { payload: { page = 1, filterStr = '', pageSize = PAGE_SIZE } },
      { call, put }
    ) {
      const { data } = yield call(cleaningAreaService.getAll, {
        page,
        filterStr,
        pageSize,
      })
      const { data: regionList } = yield call(commonDataService.getRegionList)
      const { data: initialRegion } = yield call(
        commonDataService.getCurrentRegion
      )
      const { data: staffList } = yield call(commonDataService.getStaffList)

      yield put({
        type: 'updateState',
        payload: {
          list: data.data,
          total: parseInt(data.total, 10),
          page: parseInt(page, 10),
          filterStr,
          pageSize: parseInt(pageSize, 10),
          regionList,
          staffList,
          initialRegion,
        },
      })

      yield put({
        type: 'updateCleaningArea',
        payload: {
          cleaningArea: {
            regionId: initialRegion.id,
          },
        },
      })
    },

    *setCleaningAreaData ({ payload: { id } }, { put, call }) {
      const {
        data: cleaningArea,
      } = yield call(cleaningAreaService.getCleaningAreaData, { id })
      yield put({
        type: 'updateState',
        payload: {
          cleaningArea,
        },
      })
    },

    *seniorSearchToggle ({ payload: seniorSearch }, { put }) {
      yield put({
        type: 'updateSeniorSearchToggle',
        payload: {
          seniorSearch,
        },
      })
    },

    *seniorSearch ({ payload: values }, { call, put, select }) {
      let seniorSearchData = {
        staffName: null,
        attendanceInterval: null,
      }
      seniorSearchData.staffName = values.staffName
      seniorSearchData.attendanceInterval = values.attendanceInterval

      yield put({
        type: 'updateSeniorSearchData',
        payload: {
          seniorSearchData,
        },
      })
    },

    *resetSeniorSearch ({}, { call, put, select }) {
      yield put({
        type: 'resetSeniorSearchData',
      })
    },

    *remove ({ payload: ids }, { call, put, select }) {
      const { data } = yield call(cleaningAreaService.remove, ids)
      message.success(data.message, 3)

      yield put({ type: 'reload' })
    },

    *addCleaningArea ({ payload: cleaningArea }, { call, put, select }) {
      const { data } = yield call(cleaningAreaService.create, cleaningArea)
      message.success(data.message, 3)
      yield put({
        type: 'changeCleaningArea',
        payload: {
          cleaningArea: cleaningArea.cleaningArea,
        },
      })

      yield put({ type: 'reload' })
    },

    *changeCleaningArea ({ payload: cleaningArea }, { call, put, select }) {
      yield put({
        type: 'updateState',
        payload: {
          cleaningArea: cleaningArea.cleaningArea,
        },
      })
    },

    *editCleaningArea ({ payload: cleaningArea }, { call, put, select }) {
      const { data } = yield call(cleaningAreaService.edit, cleaningArea)
      message.success(data.message, 3)
      yield put({
        type: 'reload',
      })
    },

    *reload (action, { put, select }) {
      const page = yield select(state => state.cleaningAreaList.page)
      const filterStr = yield select(state => state.cleaningAreaList.filterStr)
      const pageSize = yield select(state => state.cleaningAreaList.pageSize)
      yield put({ type: 'getData', payload: { page, filterStr, pageSize } })
    },
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/cleaningAreaList') {
          dispatch({ type: 'getData', payload: query })
        }
      })
    },
  },
}
