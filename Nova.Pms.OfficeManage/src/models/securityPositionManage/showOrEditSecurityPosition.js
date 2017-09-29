import { routerRedux } from 'dva/router'
import { message } from 'antd'
import * as securityPositionManageService
  from '../../services/securityPositionManage'
import * as commonDataService from '../../services/commonData'

export default {
  namespace: 'showOrEditSecurityPosition',
  state: {
    // securityPositionMembers: {
    //   id: null,
    //   staffId: null,
    //   securityDutyPlanId: null,
    //   securityPositionId: null,
    //   startDate: null,
    //   endDate: null,
    //   remark: null,
    //   staffName: null,
    //   securityDutyPlanName: null,
    // },
    information: {
      id: null,
      regionId: null,
      quantity: null,
      positionCode: null,
      workingDays: null,
      positionName: null,
      restDays: null,
      positionPlace: null,
      startDate: null,
    },
    securityPersonnelSelect: -1,
    securityPersonnel: {
      list: [],
      total: null,
      page: null,
    },
    regionList: [],
    departmentList: [],
    staffList: [],
    securityDutyPlanList: [],
    action: 'create', // create新建 update更新 preview查看
    modalVisible: false,
    modalType: 'create', // create新建 update更新
  },
  reducers: {
    save (state, { payload }) {
      return { ...state, ...payload }
    },
    init (state) {
      return {
        ...state,
        information: {
          id: null,
          regionId: null,
          quantity: null,
          positionCode: null,
          workingDays: null,
          positionName: null,
          restDays: null,
          positionPlace: null,
          startDate: null,
        },
        securityPersonnel: {
          list: [],
          total: null,
          page: null,
        },
      }
    },
    changeField (state, { payload: { key, value } }) {
      const information = { ...state.information, [key]: value }
      return { ...state, information }
    },

    showModal (state, { payload: { type, id } }) {
      const securityPersonnelSelect = id || -1
      return { ...state, modalVisible: true, modalType: type, securityPersonnelSelect }
    },

    hideModal (state) {
      return { ...state, modalVisible: false, modalType: '', securityPersonnelSelect: -1 }
    },

    updateSecurityPersonnel (state, { payload: newSecurityPersonnel }) {
      return { ...state, securityPersonnel: newSecurityPersonnel }
    },
  },
  effects: {
    *getSecurityPositionData (
      { payload: { id, page = 1, action = 'create' } },
      { put, call }
    ) {
      const { data: regionList } = yield call(commonDataService.getRegionList)
      yield put({
        type: 'save',
        payload: {
          regionList,
          action,
        },
      })
      const create = action === 'create'
      if (!create) {
        const {
          data: information,
        } = yield call(
          securityPositionManageService.getSecurityPositionInformation,
          { id }
        )
        const {
          data: staffList,
        } = yield call(commonDataService.getStaffByRegionId, {
          id: information.regionId,
        })

        const {
          data: securityDutyPlanList,
        } = yield call(securityPositionManageService.getSecurityDutyPlanList, {
          regionId: information.regionId,
        })

        const {
          data,
        } = yield call(
          securityPositionManageService.getDetailSecurityPositionList,
          { id }
        )

        const { data: departmentList } = yield call(
          commonDataService.getDepartmentList
        )
        yield put({
          type: 'save',
          payload: {
            information,
            staffList,
            departmentList,
            securityPersonnel: {
              list: data.data,
              total: parseInt(data.total, 10),
              page: parseInt(page, 10),
            },
            securityDutyPlanList,
          },
        })
      }
    },

    *selectRegion ({ payload: id }, { put, call }) {
      const {
        data: staffList,
      } = yield call(commonDataService.getStaffByRegionId, { id })

      const {
        data: securityDutyPlanList,
      } = yield call(securityPositionManageService.getSecurityDutyPlanList, {
        regionId: id,
      })
      yield put({
        type: 'save',
        payload: {
          staffList,
          securityDutyPlanList,
          securityPersonnel: {
            list: [],
            total: null,
            page: null,
          },
        },
      })
    },

    *saveData ({ payload: { action } }, { call, put, select }) {
      const needSave = action !== 'preview'
      if (needSave) {
        const { information } = yield select(state => state.showOrEditSecurityPosition)
        const { securityPersonnel: { list } } = yield select(state => state.showOrEditSecurityPosition)
        const postData = {
          ...information,
          securityPositionMembers: [...list],
        }
        const { data } = yield call(
          securityPositionManageService.save,
          postData,
          action === 'update',
        )
        message.success(data.message, 3)
      }
      yield put({
        type: 'init',
      })
      yield put(routerRedux.push('/securityPositionList'))
    },

    *saveSecurityPersonnel (
      { payload: { personnelInfo, update } },
      { call, put, select }
    ) {
      const { data: staff } = yield call(commonDataService.getStaffDataById, {
        id: personnelInfo.staffId,
      })
      const {
        data: securityDutyPlan,
      } = yield call(securityPositionManageService.getSecurityDutyPlanData, {
        securityDutyPlanId: personnelInfo.securityDutyPlanId,
      })

      personnelInfo.staffName = staff.name
      personnelInfo.securityDutyPlanName = securityDutyPlan.name
      personnelInfo.startDate = securityDutyPlan.startDate
      personnelInfo.endDate = securityDutyPlan.endDate

      const { securityPersonnel, securityPersonnelSelect } = yield select(state => state.showOrEditSecurityPosition)
      const list = [...securityPersonnel.list]
      if (update) {
        const seletIndex = list.findIndex(item => item.id === securityPersonnelSelect)
        const oldPersonnelInfo = list[seletIndex]
        list[seletIndex] = { ...oldPersonnelInfo, ...personnelInfo }
      } else {
        const total = list.length + 1
        const saveData = {
          ...personnelInfo,
          id: total,
          key: total,
        }
        list.push(saveData)
      }
      const newSecurityPersonnel = {
        ...securityPersonnel,
        list,
        total: list.length,
      }

      yield put({
        type: 'save',
        payload: {
          securityPersonnel: newSecurityPersonnel,
        },
      })
      yield put({
        type: 'hideModal',
      })
    },

    // *reload (action, { put, select }) {
    //   const id = yield select(
    //     state => state.showOrEditSecurityPosition.information.id
    //   )
    //   const operate = yield select(
    //     state => state.showOrEditSecurityPosition.action
    //   )
    //   const page = yield select(
    //     state => state.showOrEditSecurityPosition.securityPosition.page
    //   )

    //   yield put({
    //     type: 'getSecurityPositionData',
    //     payload: { page, id, action: Object.keys(operate) },
    //   })
    // },
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      dispatch({
        type: 'init',
      })
      return history.listen(({ pathname, query }) => {
        if (pathname === '/showOrEditSecurityPosition') {
          dispatch({ type: 'getSecurityPositionData', payload: query })
        }
      })
    },
  },
}
