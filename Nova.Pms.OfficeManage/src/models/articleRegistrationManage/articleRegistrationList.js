import * as articleRegistrationService from '../../services/articleRegistrationManage';
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
            debugger;
            return { ...state, ...payload  };
            debugger;
        },
        updateArticleRegistration(state, { payload: { articleRegistration} }) {
            debugger;
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
            debugger;
            var articleRegistration = { ...state.articleRegistration, [key]: value };
            return { ...state, articleRegistration };
        }
    },
    effects: {
        *getData({ payload: { page = 1, filterStr = '', pageSize = PAGE_SIZE} }, { call, put }) {
            debugger;
            const { data } = yield call(articleRegistrationService.getData, { page: page, filterStr: filterStr, pageSize: pageSize });
            debugger;
            const { data: regionList } = yield call(articleRegistrationService.getRegionList);
            const { data: userList } = yield call(articleRegistrationService.getUserList);
            const { data: initialUser } = yield call(articleRegistrationService.getInitialUser);
            debugger;
            const { data: initialRegion } = yield call(articleRegistrationService.getInitialRegion);
            debugger;
            
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

        *setArticleRegistrationData({ payload: { id } }, { put, call }) {
            const { data: articleRegistration } = yield call(articleRegistrationService.getArticleRegistrationData, { id });
            yield put({
                type: "updateState",
                payload: {
                    articleRegistration,
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
            const { data } = yield call(articleRegistrationService.remove, ids);
            message.success(data.message, 3);

            yield put({ type: 'reload' });
        },
     
        *addArticleRegistration({ payload: articleRegistration }, { call, put, select }) {
            debugger;
            const { data } = yield call(articleRegistrationService.addArticleRegistration, articleRegistration);
            message.success(data.message, 3);  
            debugger;
            yield put({
                type: 'changeArticleRegistration',
                payload: {
                    articleRegistration: articleRegistration.articleRegistration
                }
            });

            yield put({ type: 'reload' });
        },

        *changeArticleRegistration({ payload: articleRegistration }, { call, put, select }) {
            debugger;
            yield put({
                type: 'updateState',
                payload: {
                    articleRegistration: articleRegistration.articleRegistration
                }
            });
        },
        
        *editArticleRegistration({ payload: articleRegistration }, { call, put, select }) {
            debugger;
            const { data } = yield call(articleRegistrationService.editArticleRegistration, articleRegistration);
            message.success(data.message, 3);
            yield put({
                type: 'reload',
            });
        },


        *reload(action, { put, select }) {
            debugger;
            const page = yield select(state => state.articleRegistrationList.page);
            debugger;
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
