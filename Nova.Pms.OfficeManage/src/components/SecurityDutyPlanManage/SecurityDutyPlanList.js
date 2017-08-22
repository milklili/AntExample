import React, { Component } from 'react';
import { connect } from 'dva';
import {
    Dropdown,
    Menu,
    Table,
    Pagination,
    Popconfirm,
    Button,
    Input,
    Alert,
    Form,
    Card,
    Row,
    Col,
    Select,
    DatePicker,
    TimePicker ,
    Icon,
    Modal,
    Radio,
    Validation,
    //RangePicker,
} from 'antd';
import { routerRedux, Link } from 'dva/router';
import styles from './SecurityDutyPlanManage.css';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
import { PAGE_SIZE } from '../../constants';

const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;
const RadioGroup = Radio.Group;
const Option = Select.Option;

const AddSecurityDutyPlanForm = Form.create()(
    (props) => {
        const { visible, onCancel, onCreate, form, dispatch, regionList, securityDutyPlan, isAddOrEdit,  handleDaysValidate } = props;
        const { getFieldDecorator } = form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 18 },
        };
        const formItemRow = {
            labelCol: { span: 3 },
            wrapperCol: { span: 21 },
        };
        const regionOptions = regionList.map(value =>
            <Option key={value.id} value={value.id}>{value.name}</Option>
        ); 

        return (
            <Modal
                visible={visible}

                title="值班方案"
                okText="确定"
                onCancel={onCancel}
                onOk={onCreate}> 
                <Form>
                    <Row gutter={8}>
                        <Col span={24}>
                            <FormItem {...formItemLayout} label="管理区">
                                {getFieldDecorator('regionId', {
                                    //initialValue: staffName
                                    rules: [{ required: isAddOrEdit, message: "请选择管理区" }]
                                })(
                                    <Select
                                        mode="combox"
                                        placeholder="请选择"
                                        style={{ width: '100%' }}
                                        disabled={!isAddOrEdit}
                                >{regionOptions}
                                    </Select>
                                    )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={8}>
                        <Col span={24}>
                            <FormItem {...formItemLayout} label="方案编号" >
                                {getFieldDecorator('number', {
                                    rules: [{ type: "string", max: 16, message: "请正确输入方案编号，最大长度为16" }]     
                                })(<Input disabled={!isAddOrEdit}/>)}
                            </FormItem>
                        </Col>
                    </Row>
                    
                    <Row gutter={8}>
                        <Col span={24}>
                            <FormItem  {...formItemLayout} label="方案名称">
                                {getFieldDecorator('name', {                         
                                    rules: [{ type: "string", required: isAddOrEdit, max: 30, message: "请正确输入方案名称，最大长度为30" }]     
                                })(<Input disabled={!isAddOrEdit}/>)}                            
                            </FormItem>
                           
                        </Col>
                    </Row>
                    <Row gutter={8}>
                        <Col span={24}>
                            <FormItem {...formItemLayout} label="每月工作总天数" >
                                {getFieldDecorator('workingDays', {
                                    rules: [
                                    {
                                        validator: handleDaysValidate
                                    },
                                    ]
                                   
                                })(<Input disabled={!isAddOrEdit}/>)}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={8}>
                        <Col span={24}>
                            <FormItem {...formItemLayout} label="每月休息天数" >
                                {getFieldDecorator('restDays', {
                                    rules: [
                                        {
                                            validator: handleDaysValidate
                                        },
                                    ]
                                })(<Input disabled={!isAddOrEdit} />)}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={8}>
                        <Col span={24}>
                            <FormItem {...formItemLayout} label="值班开始时间" >
                                {getFieldDecorator('startDate', {

                                    rules: [{ required: isAddOrEdit, message: "请选择值班开始时间" }],
                                    getValueProps: value => {
                                        //if (!(value)) {
                                        //    securityDutyPlan.startDate = moment(new Date(), 'YYYY-MM-DD HH:mm:ss');
                                        //}
                                        return { value: value ? moment(value) : value };
                                    }
                                })(<TimePicker style={{ width: '100%' }}
                                    format='HH:mm'
                                    disabled={!isAddOrEdit}
                                />)}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={8}>
                        <Col span={24}>
                            <FormItem {...formItemLayout} label="值班结束时间" >
                                {getFieldDecorator('endDate', {
                                    rules: [{ required: isAddOrEdit, message: "请选择值班结束时间" }],
                                    getValueProps: value => {
                                        return { value: value ? moment(value) : value };
                                    }
                                })(<TimePicker style={{ width: '100%' }}
                                    format='HH:mm'
                                    //showTime
                                    disabled={!isAddOrEdit}
                                />)}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={8}>
                        <Col span={24}>
                            <FormItem  {...formItemLayout} label="备注">
                                {getFieldDecorator('remark', {
                                    rules: [{ type: "string", max: 30, message: "已超过30个字" }]   
                                })(<Input disabled={!isAddOrEdit} />)}
                            </FormItem>                          
                        </Col>
                    </Row>
                </Form>
            </Modal>
        );
    }  
);

const NormalAddSecurityDutyPlanForm = Form.create(
    {
        mapPropsToFields(props) {
            const fields = {};
            Object.keys(props.securityDutyPlan).forEach(key => {
                fields[key] = {
                    value: props.securityDutyPlan[key]
                };
            });
            return {
                ...fields
            };
        }, 

        
    },

)(AddSecurityDutyPlanForm);


function SecurityDutyPlanList({
    dispatch,
    list: dataSource,
    loading,
    total,
    page: current,
    filterStr,
    pageSize,
    seniorSearchData,
    seniorSearch,
    regionList,
    securityDutyPlan,
}) {

    
    class AddSecurityDutyPlan extends React.Component {

        constructor(props) {
            super(props);
            this.state = {
                visible: false,
                isAddOrEdit: true,
  
            };
            this.dispatch = props.dispatch;
        }
        showModal = () => {
            this.setState({ visible: true });
        }
     

        handleCancel = () => {
            const form = this.form;

            form.validateFields((err, values) => {
                debugger;
                dispatch({
                    type: 'securityDutyPlanList/changeSecurityDutyPlan',
                    payload: { securityDutyPlan: values },
                });
                form.resetFields();
                this.setState({ visible: false });
            });
            this.setState({ visible: false });
        }
        handleCreate = () => {
            const form = this.form;
            
            form.validateFields((err, values) => {
                debugger;
                if (err) {
                    return;
                }
                dispatch({
                    type: 'securityDutyPlanList/addSecurityDutyPlan',
                    payload: { securityDutyPlan: values },
                });
                form.resetFields();
                this.setState({ visible: false });
            });
        
        }
       

        handleDaysValidate = (rule, value, callback) => {
            if (value != null && value != "" && !((/^[0-9]+.?[0-9]*$/).test(value))) {
                callback('天数格式错误');
            }
            callback();
        } 
        
        saveFormRef = (form) => {
            this.form = form;
        }
        render() {           
            return (
                <span>
                    <Button type="primary" onClick={this.showModal} >新建</Button>
                    {(<NormalAddSecurityDutyPlanForm
                        regionList={this.props.regionList}
                        dispatch={this.props.dispatch}
                        ref={this.saveFormRef}
                        visible={this.state.visible}
                        isAddOrEdit={this.state.isAddOrEdit}
                        onCancel={this.handleCancel}
                        onCreate={this.handleCreate}
                        handlePhoneValidate={this.handlePhoneValidate}
                        handleDaysValidate={this.handleDaysValidate}
                        securityDutyPlan={this.props.securityDutyPlan}
                    />)}
                </span>
            );
        }
    };

    class EditSecurityDutyPlan extends React.Component {

        constructor(props) {
            super(props);
            this.state = {
                visible: false,
                isAddOrEdit: true
            };
            this.dispatch = props.dispatch;
        }
        showModal = (e) => {
            e.preventDefault();
            this.setState({ visible: true });
            
        }
        handleCancel = () => {
            this.setState({ visible: false });
        }
        handleCreate = () => {
            const form = this.form;

            form.validateFields((err, values) => {
                if (err) {
                    return;
                }
                debugger;
                values.id = this.props.securityDutyPlan.id;
                dispatch({
                    type: 'securityDutyPlanList/editSecurityDutyPlan',
                    payload: { securityDutyPlan: values },
                });
                form.resetFields();
                this.setState({ visible: false });
            });

        }

        handleDaysValidate = (rule, value, callback) => {

            if (value != null && value != "" && !((/^[0-9]+.?[0-9]*$/).test(value))) {
                callback('天数格式错误');
            }
            callback();
        } 

        

        saveFormRef = (form) => {
            this.form = form;
        }

        render() {
            return (
                <span>
                    <a onClick={this.showModal} >编辑</a>
                    {(<NormalAddSecurityDutyPlanForm
                        regionList={this.props.regionList}
                        dispatch={this.props.dispatch}
                        ref={this.saveFormRef}
                        visible={this.state.visible}
                        isAddOrEdit={this.state.isAddOrEdit}
                        onCancel={this.handleCancel}
                        onCreate={this.handleCreate}
                        handlePhoneValidate={this.handlePhoneValidate}
                        handleDaysValidate={this.handleDaysValidate}
                        securityDutyPlan={this.props.securityDutyPlan}
                    />)}
                </span>
            );
        }
    };


    class ShowSecurityDutyPlan extends React.Component {

        constructor(props) {
            super(props);
            this.state = {
                visible: false,
                isAddOrEdit: false,
            };
            this.dispatch = props.dispatch;
        }
        showModal = (e) => {
            debugger;
            e.preventDefault();
            this.setState({ visible: true });

        }
        handleCancel = () => {
            this.setState({ visible: false });
        }
        handleCreate = () => {
            this.setState({ visible: false });

        }
        saveFormRef = (form) => {
            this.form = form;
        }
       
        render() {
            return (
                <span>
                    <a onClick={this.showModal} >查看</a>
                    {(<NormalAddSecurityDutyPlanForm
                        regionList={this.props.regionList}
                        dispatch={this.props.dispatch}
                        ref={this.saveFormRef}
                        visible={this.state.visible}
                        isAddOrEdit={this.state.isAddOrEdit}
                        onCancel={this.handleCancel}
                        onCreate={this.handleCreate}
                       
                        securityDutyPlan={this.props.securityDutyPlan}
                    />)}
                </span>
            );
        }
    };

    class SecurityDutyPlan extends React.Component {
        state = {
            selectedRowKeys: [], // Check here to configure the default column
            selectedRows:[]
        };
        openSeniorSearch = () => {
            dispatch({
                type: "securityDutyPlanList/seniorSearchToggle",
                payload: true
            });
        };
        closeSeniorSearch = () => {
            dispatch({
                type: "securityDutyPlanList/seniorSearchToggle",
                payload: false
            });
        };
        seniorSearchHandler = e => {
            e.preventDefault();
            this.props.form.validateFields((err, values) => {
                if (!err) {
                    dispatch({
                        type: "securityDutyPlanList/seniorSearch",
                        payload: values
                    });
                }
            });
        };
        resetSeniorSearch = () => {
            dispatch({
                type: "securityDutyPlanList/resetSeniorSearch"
            });
        };


        deleteSecurityDutyPlan = (ids) => {
            debugger;
            dispatch({
                type: 'securityDutyPlanList/remove',
                payload: { ids }
            });
        }
        pageChangeHandler = (page) => {
            dispatch(
                routerRedux.push({
                    pathname: "/securityDutyPlanList",
                    query: { page, filterStr, pageSize }
                })
            );
        };
        searchHandler = filterStr => {
            dispatch(
                routerRedux.push({
                    pathname: "/securityDutyPlanList",
                    query: { page: 1, filterStr, pageSize }
                })
            );
        };
        onSelectChange = (selectedRowKeys, selectedRows) => {
            this.setState({ selectedRowKeys });
            this.setState({ selectedRows });
        };
        onShowSizeChange = (current, pageSize) => {
            debugger;
            dispatch(
                routerRedux.push({
                    pathname: "/securityDutyPlanList",
                    query: { page: current, filterStr, pageSize }
                })
            );
        };
        render() {
            const Search = Input.Search;
            const { getFieldDecorator } = this.props.form;
            const formItemLayout = {
                labelCol: {
                    xs: {
                        span: 24
                    },
                    sm: {
                        span: 6
                    }
                },
                wrapperCol: {
                    xs: {
                        span: 24
                    },
                    sm: {
                        span: 18
                    }
                }
            };
            const formItemLongLayout = {
                labelCol: {
                    xs: {
                        span: 24
                    },
                    sm: {
                        span: 3
                    }
                },
                wrapperCol: {
                    xs: {
                        span: 24
                    },
                    sm: {
                        span: 21
                    }
                }
            };
            const columns = [
                
                {
                    title: "管理区",
                    dataIndex: "regionName",
                    key: "regionName",
                    width: 120
                },
                {
                    title: "方案编号",
                    dataIndex: "number",
                    key: "number",
                    width: 120
                },
                {
                    title: "方案名称",
                    dataIndex: "name",
                    key: "name",
                    width: 120
                },
                {
                    title: "值班开始时间",
                    dataIndex: "startDate",
                    key: "startDate",
                    width: 120,
                    render: (text, record) => (
                        record.startDate != null ? (new Date(record.startDate)).toLocaleTimeString() : null
                    ),
                },
                {
                    title: "值班结束时间",
                    dataIndex: "endDate",
                    key: "endDate",
                    width: 120,
                    render: (text, record) => (
                        record.endDate != null ? (new Date(record.endDate)).toLocaleTimeString() : null
                       
                    ),
                },
                {
                    title: "每月工作总天数",
                    dataIndex: "workingDays",
                    key: "workingDays",
                    width: 120,
                },
                {
                    title: "每月休息天数",
                    dataIndex: "restDays",
                    key: "restDays",
                    width: 120,
                },
                {
                    title: "备注",
                    dataIndex: "remark",
                    key: "remark",
                    width: 200
                },
                {
                    title: "操作",
                    fixed: "right",
                    width: 120,
                    render: (text, record) =>
                        <span>
                            <ShowSecurityDutyPlan
                                regionList={regionList}
                                dispatch={dispatch}
                                securityDutyPlan={record}
                                id={record.id}
                            />
                            &nbsp;
                            <EditSecurityDutyPlan
                                regionList={regionList}
                                dispatch={dispatch}
                                securityDutyPlan={record}
                                id={record.id}
                            />
                            &nbsp;                                                       
                            <Popconfirm title="确定要删除该值班方案吗?" onConfirm={this.deleteSecurityDutyPlan.bind(null, [record.id])}>
                                <a >删除</a>
                            </Popconfirm>
                        </span>
                }
            ];




            const idShowSeniorSearchData = true;

            const { selectedRowKeys, selectedRows } = this.state;
            const rowSelection = {
                selectedRowKeys,
                onChange: this.onSelectChange,              
            };
            const selectLength = selectedRowKeys.length;
            const selectInfo = "已选择" + selectLength + "项数据。";

            const isShowAdvancedSearch = this.state.isShowAdvancedSearch;


            const hasSelected = selectLength > 0;
            const searchInfo = {};

            let { sortedInfo, filteredInfo } = this.state;
            sortedInfo = sortedInfo || {};
            filteredInfo = filteredInfo || {};
            const record = selectedRows;

            return (
                <div className={styles.normal}>
                    <div className={styles.ListButton}>
                        <Row>
                            <Col span={16} style={{ textAlign: 'left' }}>
                                <h1>
                                    值班方案
                                </h1>
                            </Col>
                            <Col span={8} style={{ textAlign: "right" }}>
                                <Search
                                    placeholder="Search"
                                    style={{ width: 200 }}
                                    size="large"
                                    onSearch={filterStr => this.searchHandler(filterStr)}
                                />
                                <a style={{ marginLeft: 8 }} onClick={this.openSeniorSearch}>
                                    高级搜索 <Icon type="down" />
                                </a>
                            </Col>
                        </Row>
                    </div>
                   
                    {seniorSearch &&
                        <Card style={{ marginBottom: 10 }} >
                            <Form onSubmit={this.seniorSearchHandler}>
                                <Row gutter={8}>
                                    <Col span={8}>
                                       
                                        <FormItem  {...formItemLayout} label="管理区">
                                        {getFieldDecorator('regionId', {
                                            })(<Input />)}
                                        </FormItem>
                                    </Col>
                                    <Col span={8}>
                                        <FormItem {...formItemLayout} label="方案名称">
                                        {getFieldDecorator("name", {
                                             
                                            })(<Input />)}
                                        </FormItem>
                                    </Col>
                                    <Col span={8}>
                                        <FormItem {...formItemLayout} label="方案编号">
                                        {getFieldDecorator("number", {
                                            //initialValue: seniorSearchData.handlePersonId
                                        })(<Input />)}

                                        </FormItem>
                                    </Col>
                                </Row>
                                <Row gutter={8}>
                                    <Col span={16}>
                                    <FormItem {...formItemLongLayout} label="地址">
                                        {getFieldDecorator("positionPlace", {
                                            //initialValue: seniorSearchData.respondents
                                            })(<Input />)}
                                        </FormItem>
                                    </Col>
                                   
                                    <Col span={8}>
                                        <FormItem {...formItemLayout} label="开始值班时间">
                                        {getFieldDecorator("visitReason", {
                                            //initialValue: seniorSearchData.visitReason
                                        })(<RangePicker />)}

                                        </FormItem>
                                    </Col>
                                </Row>
                                <Row gutter={8}>
                                    <Col span={24} style={{ textAlign: "right" }}>
                                        <Button type="primary" htmlType="submit">搜索</Button>
                                        <Button
                                            style={{ marginLeft: 8 }}
                                            onClick={this.resetSeniorSearch}
                                        >
                                            重置
                                        </Button>
                                        <a
                                            style={{ marginLeft: 8 }}
                                            onClick={this.closeSeniorSearch}
                                        >
                                            收起搜索 <Icon type="up" />
                                        </a>
                                    </Col>
                                </Row>
                            </Form>
                        </Card>}
                    <div className={styles.info}><span >共搜索到{total}条数据</span></div>
                    
                    <div className={styles.ListButton}>
                    <Row gutter={10} >
                            <Col span={8}>

                                <AddSecurityDutyPlan
                                    regionList={regionList}
                                    dispatch={dispatch}
                                    securityDutyPlan={securityDutyPlan}
                                />
                               
                                <Button disabled>导出</Button>
                            </Col>  
                                                  
                    </Row>
                    {
                        hasSelected &&
                        <Alert
                            style={{ marginTop: 15 }}
                            type="info"
                            message={selectInfo}
                            showIcon
                        />
                    }
                    </div>
                    <Table
                        bordered
                        columns={columns}
                        dataSource={dataSource}
                        loading={loading}
                        rowSelection={rowSelection}
                        rowKey={record => record.id}
                        //scroll={{ x: 1800 }}                        
                        pagination={false}
                    />
                    <Pagination
                        className="ant-table-pagination"
                        total={total}
                        current={current}
                        pageSize={pageSize}
                        onChange={this.pageChangeHandler}
                        showTotal={total => `总计${total}条`}
                        onShowSizeChange={this.onShowSizeChange}
                        showSizeChanger
                        showQuickJumper
                    />
                </div>
            );
        }
    }

    const SecurityDutyPlanForm = Form.create()(SecurityDutyPlan);
    return <SecurityDutyPlanForm />;
}

function mapStateToProps(state) {
    const {
        list,
        total,
        page,
        pageSize,
        filterStr,
        regionList,
        securityDutyPlan,
        seniorSearchData,
        seniorSearch
    } = state.securityDutyPlanList;
    return {
        loading: state.loading.models.securityDutyPlanList,
        list,
        total,
        page,
        pageSize, 
        filterStr,
        regionList,
        securityDutyPlan,
        seniorSearchData,
        seniorSearch
    };
}

export default connect(mapStateToProps)(SecurityDutyPlanList);




