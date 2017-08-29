import * as articleRegistrationService from '../../services/articleRegistrationManage';
import * as commonDataService from '../../services/commonData';

import { message } from 'antd';
import { PAGE_SIZE } from '../../constants';
export default {
    namespace: 'articleRegistrationList',
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
        userList:[],
        regionList: [],
        articleRegistration: {
            regionId: null,
            name: null,
            quantity:null,
            carryPerson: null,
            idCardNo: null,
            phone: null,
            takeOutDate :null,
            takeInDate : null,
            operatorId: null,
            createDate: null,
            remark: null 
        },
    },
    reducers: {
        updateState(state, { payload}) {
            return { ...state, ...payload  };
        },
        updateArticleRegistration(state, { payload: { articleRegistration} }) {
            var articleRegistration = { ...state.articleRegistration, ...articleRegistration }
            return { ...state, articleRegistration};
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
            var articleRegistration = { ...state.articleRegistration, [key]: value };
            return { ...state, articleRegistration };
        }
    },
    effects: {
        *getData({ payload: { page = 1, filterStr = '', pageSize = PAGE_SIZE} }, { call, put }) {
            const { data } = yield call(articleRegistrationService.getAll, { page: page, filterStr: filterStr, pageSize: pageSize });
            const { data: regionList } = yield call(commonDataService.getRegionList);
            const { data: userList } = yield call(commonDataService.getStaffList);
            const { data: initialUser } = yield call(commonDataService.getCurrentStaff);
            const { data: initialRegion } = yield call(commonDataService.getCurrentRegion);
            yield put({
                type: 'updateState',
                payload: {
                    list: data.data,
                    total: parseInt(data.total, 10),
                    page: parseInt(page, 10),
                    pageSize: parseInt(pageSize, 10),
                    filterStr: filterStr,
                    regionList: regionList,
                    userList: userList,
                }
            }); 

            yield put({
                type: 'updateArticleRegistration',
                payload: {
                    articleRegistration: {
                        regionId: initialRegion.id,
                        operatorId: initialUser.id,
                    }
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
            const { data } = yield call(articleRegistrationService.remove, ids);
            message.success(data.message, 3);

            yield put({ type: 'reload' });
        },
     
        *addArticleRegistration({ payload: articleRegistration }, { call, put, select }) {
            const { data } = yield call(articleRegistrationService.create, articleRegistration);
            message.success(data.message, 3);  
            yield put({
                type: 'changeArticleRegistration',
                payload: {
                    articleRegistration: articleRegistration.articleRegistration
                }
            });

            yield put({ type: 'reload' });
        },

        *changeArticleRegistration({ payload: articleRegistration }, { call, put, select }) {
            yield put({
                type: 'updateState',
                payload: {
                    articleRegistration: articleRegistration.articleRegistration
                }
            });
        },
        
        *editArticleRegistration({ payload: articleRegistration }, { call, put, select }) {
            const { data } = yield call(articleRegistrationService.edit, articleRegistration);
            message.success(data.message, 3);
            yield put({
                type: 'reload',
            });
        },


        *reload(action, { put, select }) {
            const page = yield select(state => state.articleRegistrationList.page);
            const filterStr = yield select(state => state.articleRegistrationList.filterStr);
            const pageSize = yield select(state => state.articleRegistrationList.pageSize);
            yield put({ type: 'getData', payload: { page, filterStr, pageSize } });
        }
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                if (pathname === '/articleRegistrationList') {
                    dispatch({ type: 'getData', payload: query });
                }
            });
        },
    },
};
