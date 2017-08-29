import { routerRedux } from 'dva/router';
import { message } from 'antd';
import * as meetingService from '../../services/meeting';
import * as commonDataService from '../../services/commonData';

export default {
  namespace: 'createMeeting',
  state: {
        regions: [],
        meetingCategorys: [],
        departments: [],
        staffs: [],
        formData:{
            regionId:null,
            departmentId:null,
            number:null,
            name:null,
            officeManagementCategoryId:null,
            startDate:null,
            endDate:null,
            place:null,
            convenorId:null,
            compereId:null,
            meetingTheme:null,
            meetingContent:null,
            remark: null,
            members:[]
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
      *getData({},{ put, call }) {
          const { data: regions } = yield call(commonDataService.getRegionList);
          const { data: meetingCategorys } = yield call(commonDataService.getMeetingCategoryList);
          yield put({
              type: "load",
              payload: {
                  regions,
                  meetingCategorys
              }
          });
      },
      *selectRegion({payload: id}, { put, call }) {
          const { data: departments } = yield call(commonDataService.getDepartmentByRegionId, {id});
          const { data: staffs } = yield call(commonDataService.getStaffByRegionId, {id});
          yield put({
              type: "regionChanged",
              payload: {
                  departments,
                  staffs
              }
          });   
      },
      *addMeeting({ payload: values }, { call, put }) {
          const {data} = yield call(meetingService.create, { values });
          message.success(data.message, 3);
          yield put(routerRedux.push('/meeting'));
      }
  },
  subscriptions: {
    setup({history,dispatch}){
      return history.listen(({pathname,query})=>{
        if (pathname==='/createMeeting'){
          dispatch({type:'getData'})
        }
      })
    }
  },
};
