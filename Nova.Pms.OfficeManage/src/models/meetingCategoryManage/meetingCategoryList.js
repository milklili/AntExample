import { message } from 'antd'
import { PAGE_SIZE } from '../../constants'
import * as categoryManageService from '../../services/category'

export default {
  namespace: 'meetingCategoryList',
  state: {
    list: [],
    total: 0,
    page: null,
    filterStr: '',
    pageSize: null,
  },
  reducers: {
    updateState (
      state,
      { payload: { data: list, total, page, filterStr, pageSize } }
    ) {
      return { ...state, list, total, page, filterStr, pageSize }
    },
  },
  effects: {
    *getMeetingCategorylist (
      { payload: { page = 1, filterStr = '', pageSize = PAGE_SIZE } },
      { call, put }
    ) {
      const parameter = {
        page,
        filterStr,
        pageSize,
        type: 'Meeting',
      }
      const { data } = yield call(
        categoryManageService.getAll,
        parameter
      )

      yield put({
        type: 'updateState',
        payload: {
          data: data.data,
          total: parseInt(data.total, 10),
          page: parseInt(page, 10),
          pageSize: parseInt(pageSize, 10),
          filterStr,
        },
      })
    },

    *remove ({ payload: ids }, { call, put, select }) {
      const { data } = yield call(categoryManageService.remove, ids)
      message.success(data.message, 3)

      yield put({ type: 'reload' })
    },

    *reload (action, { put, select }) {
      const page = yield select(state => state.meetingCategoryList.page)
      const filterStr = yield select(
        state => state.meetingCategoryList.filterStr
      )
      const pageSize = yield select(
        state => state.meetingCategoryList.pageSize
      )
      yield put({
        type: 'getMeetingCategorylist',
        payload: { page, filterStr, pageSize },
      })
    },
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/meetingCategoryList') {
          dispatch({ type: 'getMeetingCategorylist', payload: query })
        }
      })
    },
  },
}
