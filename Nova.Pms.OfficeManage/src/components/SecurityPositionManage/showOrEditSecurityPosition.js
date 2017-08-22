import React from 'react';
import { connect } from 'dva';
import { Table, Breadcrumb, Alert, TimePicker, Pagination, Popconfirm, Modal, Button, Form, Input, Menu, Dropdown, Icon, DatePicker, Upload, message, Row, Col, Select } from 'antd';
import { routerRedux, Link } from 'dva/router';
import moment from 'moment';
import { PAGE_SIZE } from '../../constants';
import styles from './SecurityPositionManage.css';

const Option = Select.Option;
const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;


const AddSecurityPositionMembersForm = Form.create()(
    (props) => {
        const { visible, onCancel, onCreate, form, information, securityPositionMembers, securityPositionInformation, staffList, securityDutyPlanList, dispatch, isHoursEdit, handleAttendanceTypeChange, } = props;
        const { getFieldDecorator } = form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 18 },
        };
        const formItemRow = {
            labelCol: { span: 3 },
            wrapperCol: { span: 21 },
        };
        const staffOptions = staffList.map(value =>
            <Option key={value.id} value={value.id}>{value.name}</Option>
        );
        const securityDutyPlanOptions = securityDutyPlanList.map(value =>
            <Option key={value.id} value={value.id}>{value.name}</Option>
        );
        const securityDutyPlanOndutyDateOptions = securityDutyPlanList.map(value =>
            <Option key={value.id} value={value.id}>{value.ondutyDate}</Option>
        );
         
        const spInformation = securityPositionInformation;
        return (
            <Modal
                visible={visible}
                title="添加保安岗的保安人员"
                okText="确定"
                onCancel={onCancel}
                onOk={onCreate}>
                <Form>
                    <Row gutter={8}>
                        <Col span={24}>
                            <FormItem {...formItemLayout} label="保安姓名">
                                {getFieldDecorator('staffId', {
                                    rules: [{ required: true, message: "请选择保安姓名" }]
                                    //initialValue: (information != null && information.name != null) ? information.name : null,
                                })(<Select
                                    mode="combobox "
                                    placeholder="请选择"
                                    style={{ width: '100%' }}
                                >{staffOptions}
                                </Select>)}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={8}>
                        <Col span={24}>
                            <FormItem {...formItemLayout} label="值班方案" >
                                {getFieldDecorator('securityDutyPlanId', {
                                    //initialValue: securityPositionInformation.type,
                                    rules: [{ required: true, message: "请选择值班方案" }]
                                })(<Select
                                    mode="combobox "
                                    placeholder="请选择"
                                    style={{ width: '100%' }}
                                    onChange={handleAttendanceTypeChange}
                                >
                                    {securityDutyPlanOptions}
                                </Select>)}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={8}>
                        <Col span={24}>
                            <FormItem {...formItemLayout} label="值班时间" >
                                {getFieldDecorator('onDutyDate', {
                                    //initialValue: [moment(securityPositionInformation.startDate), moment(securityPositionInformation.endDate)],
                                    //rules: [{ required: true, message: "请选择考勤时间" }],
                                    getValueProps: value => {
                                         
                                        return { value: value ? [moment(value[0]), moment(value[1])] : value };
                                    }
                                })(<RangePicker style={{ width: '100%' }}
                                    format="LT"
                                    disabled
                                />)}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={8}>
                        <Col span={24}>
                            <FormItem  {...formItemLayout} label="备注"
                               
                            >
                                {getFieldDecorator('remark', {
                                    rules: [{ type: "string", max: 50, message: "已超过50个字" }]
                                })(<Input
                                    
                                    />)}
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        );
    }
);
const NormalAddSecurityPositionMembersForm = Form.create(
    {
        mapPropsToFields(props) {

            const fields = {};

            Object.keys(props.securityPositionInformation).forEach(key => {
                fields[key] = {
                    value: props.securityPositionInformation[key]
                };
            });
            return {
                ...fields
            };
        },
    },

)(AddSecurityPositionMembersForm);


class NormalAddSecurityPositionMembers extends React.Component {

    constructor(props) {

        super(props);
        this.state = {
            visible: false,
            isHoursEdit: false,
        };

        this.dispatch = props.dispatch;
    }
    showModal = () => {
         
        if (this.props.information.regionId == null) {
            message.warning('请选择管理区');
        } else {
            this.setState({ visible: true });
        }

        
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

            values.securityPositionId = this.props.information.id;

            this.props.dispatch({
                type: 'showOrEditSecurityPosition/addSecurityPositionMembers',
                payload: { securityPositionMembers: values, model: this.props.information },
            });

            form.resetFields();
            this.setState({ visible: false });
        });

    }
    saveFormRef = (form) => {
        this.form = form;
    }
    handleAttendanceTypeChange = (value) => {

        const form = this.form;
        
        var startDate;
        var endDate;
        var ondutyDate = this.props.securityDutyPlanList.forEach(function (x) {

            if (x.id == value) {

                startDate = x.startDate;
                endDate = x.endDate;
            } 
        });
        form.setFieldsValue({
            //'onDutyDate': [moment(startDate, 'YYYY-MM-DD HH:mm:ss'), moment(endDate, 'YYYY-MM-DD HH:mm:ss')],
            'onDutyDate': [moment(startDate), moment(endDate)],
        });
    }

    render() {


        const staffList = this.props.staffList;
        const staffOptions = this.props.staffList.map(value =>
            <Option key={value.staffId} value={value.staffId}>{value.staffName}</Option>
        );
        const securityDutyPlanOptions = this.props.securityDutyPlanList.map(value =>
            <Option key={value.id} value={value.id}>{value.name}</Option>
        );
        const securityDutyPlanOndutyDateOptions = this.props.securityDutyPlanList.map(value =>
            <Option key={value.id} value={value.id}>{value.ondutyDate}</Option>
        );
         
        const isAdd = this.props.information == null;
         
        return (
            <span>
                <div className={styles.ListButton}>
                    <Button onClick={this.showModal}>添加</Button>
                </div>
                {(<NormalAddSecurityPositionMembersForm
                    information={this.props.information}
                    securityPositionMembers={this.props.securityPositionMembers}
                    securityDutyPlanList={this.props.securityDutyPlanList}
                    securityPositionInformation={this.props.securityPositionInformation}
                    staffList={this.props.staffList}
                    dispatch={this.props.dispatch}
                    ref={this.saveFormRef}
                    isHoursEdit={this.state.isHoursEdit}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                    handleAttendanceTypeChange={this.handleAttendanceTypeChange}
                />)}
            </span>
        );
    }
};


class NormalEditSecurityPositionMembers extends React.Component {

    constructor(props) {

        super(props);
        this.state = {
            visible: false,
            isHoursEdit: false,
        };

        this.dispatch = props.dispatch;
    }
    showModal = () => {
        this.setState({ visible: true });
        const form = this.form;
         
        if (this.props.information.regionId != this.props.securityPositionInformation.regionId) {
            form.setFieldsValue({
                'staffId': null,
                'securityDutyPlanId': null,
            });
        }
        form.setFieldsValue({
            'onDutyDate': [moment(this.props.securityPositionInformation.startDate), moment(this.props.securityPositionInformation.endDate)],
        });
       
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
      
            values.securityPositionId = this.props.information.id;
            values.id = this.props.id;
             
           
            this.props.dispatch({
                type: 'showOrEditSecurityPosition/editSecurityPositionMembers',
                payload: { securityPositionMembers: values, model: this.props.information },
            });
            form.resetFields();
            this.setState({ visible: false });
        });

    }
    saveFormRef = (form) => {
        this.form = form;
    }
    handleAttendanceTypeChange = (value) => {
         
        const form = this.form;

        var startDate;
        var endDate;
        var ondutyDate = this.props.securityDutyPlanList.forEach(function (x) {
            
            if (x.id == value) {
               
                startDate = x.startDate;
                endDate = x.endDate;
            }
        });
        
        form.setFieldsValue({
            'onDutyDate': [moment(startDate), moment(endDate)],
        });
    }

    render() {
      
        const staffList = this.props.staffList;
        const staffOptions = this.props.staffList.map(value =>
            <Option key={value.staffId} value={value.staffId}>{value.staffName}</Option>
        );
        const securityDutyPlanOptions = this.props.securityDutyPlanList.map(value =>
            <Option key={value.id} value={value.id}>{value.name}</Option>
        );
        const securityDutyPlanOndutyDateOptions = this.props.securityDutyPlanList.map(value =>
            <Option key={value.id} value={value.id}>{value.ondutyDate}</Option>
        );
        return (
            <span>
                <a onClick={this.showModal} >编辑</a>
               
                {(<NormalAddSecurityPositionMembersForm
                    information={this.props.information}
                    securityPositionMembers={this.props.securityPositionMembers}
                    securityDutyPlanList={this.props.securityDutyPlanList}
                    securityPositionInformation={this.props.securityPositionInformation}
                    staffList={this.props.staffList}
                    dispatch={this.props.dispatch}
                    ref={this.saveFormRef}
                    isHoursEdit={this.state.isHoursEdit}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                    handleAttendanceTypeChange={this.handleAttendanceTypeChange}
                />)}
            </span>
        );
    }
};


const EssentialInformationForm = Form.create()(
    (props) => {
        const { visible, onCancel, onCreate, form, handleDaysValidate,handlePeopleValidate,information,  securityPositionMembers, regionList, action, dispatch, selectRegion } = props;
        const { getFieldDecorator } = form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 18 },
        };
        const formItemRow = {
            labelCol: { span: 3 },
            wrapperCol: { span: 21 },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    push: 0,
                },
                sm: {
                    span: 22,
                    push: 2,
                },
            },
        };
        const regionOptions = regionList.map(value =>
            <Option key={value.id} value={value.id}>{value.name}</Option>
        );
        
        var isShow = false;
        if (Object.keys(action) == "isShow"){
            isShow = true;
        }
         
    
        return (
            <div >
                <Form>
                    
                <Row gutter={20}>
                    <Col span={12}>
                        <FormItem {...formItemLayout} label="管理区">
                            {getFieldDecorator('regionId', {
                                 rules: [{ required: true, message: "请选择管理区" }]
                            })(
                                <Select
                                    style={{ width: '100%' }}
                                    disabled={isShow}
                                    onChange={selectRegion}
                                >
                                    {regionOptions}
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                    <Col span={12}>
                        <FormItem {...formItemLayout} label="岗位人数">
                            {getFieldDecorator("quantity", {
                                    rules: [{ required: true, message: "请输入岗位人数" },
                                        {
                                            validator: handlePeopleValidate
                                        }
                                    ]
                            })(<Input disabled={isShow} />)}
                        </FormItem>
                    </Col>
                </Row>
                <Row gutter={20}>
                    <Col span={12}>
                        <FormItem {...formItemLayout} label="岗位代码">
                            {getFieldDecorator('positionCode', {
                                rules: [{ required: true,type:"string",max:30, message: "请输入岗位代码" }]
                            })(
                                (<Input disabled={isShow} />)
                            )}
                        </FormItem>
                    </Col>
                    <Col span={12}>
                        <FormItem {...formItemLayout} label="每月工作总天数">
                                {getFieldDecorator('workingDays', {
                                    rules: [
                                        {
                                            validator: handleDaysValidate
                                        },
                                    ]
                            })(<Input disabled={isShow} />)}
                        </FormItem>
                    </Col>
                </Row>

                <Row gutter={20}>
                    <Col span={12}>
                        <FormItem {...formItemLayout} label="岗位名称">
                            {getFieldDecorator('positionName', {
                                rules: [{ required: true,type:"string",max:50, message: "请输入岗位名称" }]
                            })(<Input disabled={isShow} />)}
                        </FormItem>
                    </Col>
                    <Col span={12}>
                        <FormItem {...formItemLayout} label="每月休息天数">
                                {getFieldDecorator('restDays', {
                                    rules: [
                                        {
                                            validator: handleDaysValidate
                                        },
                                    ]
                            })(<Input disabled={isShow} />)}
                        </FormItem>
                    </Col>
                </Row>
                <Row gutter={20}>
                    <Col span={12}>
                        <FormItem {...formItemLayout} label="岗位地址">
                            {getFieldDecorator('positionPlace', {
                                rules: [{ required: true,type:"string",max:50, message: "请输入岗位地址" }]
                            })(<Input disabled={isShow} />)}
                        </FormItem>
                    </Col>
                    <Col span={12}>
                        <FormItem {...formItemLayout} label="开始值班时间">
                            {getFieldDecorator('startDate', {
                                rules: [{ required: true, message: "请选择开始值班时间" }],
                                getValueProps: value => {
                                    return { value: value ? moment(value) : value };
                                }
                            })(<DatePicker style={{ width: '100%' }}
                                format="YYYY-MM-DD HH:mm:ss"
                                disabled={isShow}
                            />)}
                        </FormItem>
                        
                    </Col>
                </Row>
                </Form>
                <div className={styles.title}>
                    <h1>保安人员</h1>
                    <hr></hr>
                </div>
               
                
            </div>
        );
    }
);
const NormalEssentialInformationForm = Form.create(
    {
        constructor(props) {
            // super(props);
        },

        mapPropsToFields(props) {
             
            const fields = {};
          
            Object.keys(props.information).forEach(key => {
                fields[key] = {
                    value: props.information[key]
                };
            });
            return {
                ...fields
            };
        },
        onFieldsChange(props, changedFields) {
             
            const key = Object.keys(changedFields)[0];
             
            props.dispatch({
                type: "showOrEditSecurityPosition/changeField",
                payload: {
                    key,
                    value: changedFields[key].value
                }
            });
        },

    }

)(EssentialInformationForm);


class NormalEssentialInformation extends React.Component {

    constructor(props) {
         
        super(props);
        this.state = {
            visible: false,
            isHoursEdit: false,
        };
         
        this.dispatch = props.dispatch;
    }
    validateEssentialForm = () => {
        const form = this.form;
         
        form.validateFields((err, values) => {
             
            if (!err) {
                this.props.handleValidateEssential();
            }
        });

    }

    handleDaysValidate = (rule, value, callback) => {
         
        if (value != null && value != "" && (!((/^[0-9]+.?[0-9]*$/).test(value)) || parseInt(value)>31)) {
            callback('天数格式错误');
        }
        callback();
    } 
    handlePeopleValidate = (rule, value, callback) => {
         
        if (value != null && value != "" && !((/^[0-9]+.?[0-9]*$/).test(value))) {
            callback('岗位人数格式错误');
        }
        callback();
    } 
    saveFormRef = (form) => {
        this.form = form;
    }

    render() {
       
        return (
            <span>

                {(<NormalEssentialInformationForm
                    ref={this.saveFormRef}
                    validateEssentialForm={this.validateEssentialForm}
                    handleValidateEssential={this.props.handleValidateEssential}
                    regionList={this.props.regionList}
                    action={this.props.action}
                    handleDaysValidate={this.handleDaysValidate}
                    handlePeopleValidate={this.handlePeopleValidate}
                    validateEssential={this.props.validateEssential}
                    information={this.props.information}
                    securityPositionMembers={this.props.securityPositionMembers}
                    dispatch={this.props.dispatch}
                    selectRegion={this.props.selectRegion}
                />)}
            </span>
        );
    }
};


class NormalSecurityPositionForm extends React.Component {

    state = {
        validateEssential: false,
        //isHoursEdit: false,
    };
    cancle = () => {
        this.props.dispatch(routerRedux.push({
            pathname: '/securityPositionList',
        }));
    }

    pageChangeHandler = page => {

        const id = this.props.information.id;
        this.props.dispatch({
            type: 'showOrEditSecurityPosition/getSecurityPositionData',
            payload: { page,id }
        });
    };

    deleteSecurityPositionMembers = (id) => {
        this.props.dispatch({
            type: 'showOrEditSecurityPosition/removeSecurityPositionMembers',
            payload:id,
        });
    }


    cancle = () => {

        this.props.dispatch(routerRedux.push({
            pathname: '/securityPositionList',
        }));
    };

    selectRegion = (value) => {
         
        this.props.dispatch({
            type: "showOrEditSecurityPosition/selectRegion",
            payload: value
        });
    }
    handleValidateEssential = (event) => {
       
        const unfilled = 0;
        this.setState({ unfilled });
         
        var securityPosition = this.props.information;
        securityPosition.securityPositionMembers = this.props.securityPosition.securityPositionData;

        if (Object.keys(this.props.action) == "isAdd") {
            this.props.dispatch({
                type: 'showOrEditSecurityPosition/addSecurityPosition',
                payload: securityPosition,
            });
        }
        if (Object.keys(this.props.action) == "isEdit" || Object.keys(this.props.action) == "isShow") {
            this.props.dispatch({
                type: 'showOrEditSecurityPosition/editSecurityPosition',
                payload: securityPosition,
            });
        } 

    }


    handleSubmit = (e) => {
        
        e.preventDefault();

        this.refs.validateEssentialForm.validateEssentialForm();
    };

    render() {
        const FormItem = Form.Item;
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: {
                    span: 24,
                },
                sm: {
                    span: 4,
                },
            },
            wrapperCol: {
                xs: {
                    span: 24,
                },
                sm: {
                    span: 20,
                },
            },
        };

        const formLongItemLayout = {
            labelCol: {
                xs: {
                    span: 24,
                },
                sm: {
                    span: 2,
                },
            },
            wrapperCol: {
                xs: {
                    span: 24,
                },
                sm: {
                    span: 22,
                },
            },
        };

        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    push: 0,
                },
                sm: {
                    span: 22,
                    push: 2,
                },
            },
        };

 
        const columns = [

            {
                title: "序号",
                dataIndex: "id",
                key: "id",
                width: 80
            },
            {
                title: "保安姓名",
                dataIndex: "staffName",
                key: "staffName",
                width: 180,
                
            },
            {
                title: "值班方案",
                dataIndex: "securityDutyPlanName",
                key: "securityDutyPlanName",
                width: 180,
               
            },
            {
                title: "值班开始时间",
                dataIndex: "startDate",
                key: "startDate",
                width: 80,
                render: (text, record) => (
                    record.startDate != null ? (new Date(record.startDate)).toLocaleTimeString() : null
                ),
            },
            {
                title: "值班结束时间",
                dataIndex: "endDate",
                key: "endDate",
                width: 80,
                render: (text, record) => (
                    record.endDate != null ? (new Date(record.endDate)).toLocaleTimeString() : null

                ),
            },
            {
                title: "备注",
                dataIndex: "remark",
                key: "remark",
                width: 300,
            },
            {
                title: "操作",
                //fixed: "right",
                width: 70,
                render: (text, record) =>
                    <span>
                        <NormalEditSecurityPositionMembers
                            information={this.props.information}
                            securityPositionMembers={this.props.securityPositionMembers}
                            securityPositionInformation={record}
                            staffList={this.props.staffList}
                            securityDutyPlanList={this.props.securityDutyPlanList}
                            dispatch={this.props.dispatch}
                            selectRegion={this.selectRegion}
                            id={record.id}
                            />
                        &nbsp;
                        <Popconfirm title="确定要删除该保安人员吗?" onConfirm={this.deleteSecurityPositionMembers.bind(null,record.id)}>
                            <a >删除</a>
                        </Popconfirm>
                        &nbsp;
                        </span>
            }

        ];
        debugger;
        const data = this.props.securityPosition.securityPositionData;
        var pagination = {
            total:this.props.securityPosition.total,
            
            showSizeChanger: true
        };

        return (
            
                <div className={styles.ListButton}>
                <Form onSubmit={this.handleSubmit} >
                    <div className={styles.title}>
                        <h1>基本信息</h1>
                        <hr></hr>
                    </div>
                    <div>
                        <NormalEssentialInformation
                            ref="validateEssentialForm"
                            validateEssential={this.state.validateEssential}
                            handleValidateEssential={this.handleValidateEssential}
                            regionList={this.props.regionList}
                            action={this.props.action}
                            information={this.props.information}
                            securityPositionMembers={this.props.securityPositionMembers}
                            dispatch={this.props.dispatch}
                            selectRegion={this.selectRegion}
                    />
                    <NormalAddSecurityPositionMembers
                        information={this.props.information}
                        securityPositionMembers={this.props.securityPositionMembers}
                        securityPositionInformation={[null]}
                        staffList={this.props.staffList}
                        securityDutyPlanList={this.props.securityDutyPlanList}
                        dispatch={this.props.dispatch}
                    //id={record.id}
                    />
                    <Table
                        bordered
                        columns={columns}
                        dataSource={this.props.securityPosition.securityPositionData}
                        loading={this.props.loading}
                        //rowSelection={rowSelection}
                        rowKey={record => record.id}
                        //scroll={{ x: "110%" }}
                        pagination={pagination}
                    />

                   
                    </div>
                    <div>
                        <FormItem>
                            <Button type="primary"  htmlType="submit" style={{ marginTop: 16 }}>保存</Button>
                            <Button type="default" onClick={this.cancle}>取消</Button>
                        </FormItem>
                    </div>
                    

                </Form>
            </div>
        );
    }
}
const SecurityPositionForm = Form.create({
    mapPropsToFields(props) {
         
        const fields = {};
    
        //Object.keys(props.securityPosition).forEach(key => {
        //    fields[key] = {
        //        value: props.securityPosition[key]
        //    };
        //});
        return {
            ...fields
        };
    }
})(NormalSecurityPositionForm);


function mapStateToProps(state) {
     
    const { securityPosition, regionList, departmentList, information, securityPositionMembers, securityDutyPlanList, staffList,action } = state.showOrEditSecurityPosition;
    return {
        securityPosition: securityPosition,
        regionList: regionList,
        departmentList: departmentList,
        information: information,
        securityPositionMembers: securityPositionMembers,
        staffList: staffList,
        securityDutyPlanList: securityDutyPlanList,
        action: action,
    };
}

export default connect(mapStateToProps)(SecurityPositionForm);


















