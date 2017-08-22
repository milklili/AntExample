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
    Icon,
    Modal,
    Radio,
    message,
    Validation,
    Upload,
    //RangePicker,
} from 'antd';
import { routerRedux, Link } from 'dva/router';
import styles from './PendingApproval.css';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
import { PAGE_SIZE } from '../../constants';

const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;
const RadioGroup = Radio.Group;
const Option = Select.Option;

const EditInitiatedForm = Form.create()(
    (props) => {
        const { visible, onCancel, onCreate, form, dispatch, uploadAttachments, uploadPictures, regionList, picturesFileList, attachmentsFileList, selectRegion, staffList, approval, uploadFiles, initialRegion } = props;
        const { getFieldDecorator } = form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 18 },
        };
        const formItemRow = {
            labelCol: { span: 3 },
            wrapperCol: { span: 21 },
        };
        debugger;
        const regionOptions = regionList.map(value =>
            <Option key={value.id} value={value.id}>{value.name}</Option>
        );
        const staffOptions = staffList.map(value =>
            <Option key={value.staffId} value={value.staffId}>{value.staffName}</Option>
        );




        return (
            <Modal
                visible={visible}

                title="查看审批详情"
                okText="确定"
                onCancel={onCancel}
                onOk={onCreate}>
                <Form>
                    <Row gutter={8}>
                        <Col span={24}>
                            <FormItem {...formItemLayout} label="管理区">
                                {getFieldDecorator('regionId', {
                                    //initialValue: staffName
                                    rules: [{ required: true, message: "请选择管理区" }]
                                })(
                                    <Select
                                        mode="combox"
                                        placeholder="请选择"
                                        style={{ width: '100%' }}
                                        disabled
                                    >{regionOptions}
                                    </Select>
                                    )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={8}>
                        <Col span={24}>
                            <FormItem {...formItemLayout} label="审批编号" >
                                {getFieldDecorator('code', {
                                    rules: [{ required: true, message: "请输入审批编号" }]
                                })(<Input disabled/>)}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={8}>
                        <Col span={24}>
                            <FormItem {...formItemLayout} label="审批类型" >
                                {getFieldDecorator('type', {

                                })(<Select disabled>
                                    <Option value={0}>通用审批</Option>
                                </Select>)}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={8}>
                        <Col span={24}>
                            <FormItem {...formItemLayout} label="申请内容" >
                                {getFieldDecorator('content', {
                                    rules: [{ type: "string", required: true, max: 30, message: "请正确输入申请内容,最大长度为30" }]
                                })(<Input disabled/>)}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={8}>
                        <Col span={24}>
                            <FormItem {...formItemLayout} label="审批详情" >
                                {getFieldDecorator('details', {
                                    rules: [{ type: "string", required: true, max: 300, message: "请正确输入审批详情,最大长度为300" }]
                                })(<Input disabled/>)}
                            </FormItem>

                        </Col>
                    </Row>
                    <Row gutter={8}>
                        <Col span={24}>
                            <FormItem {...formItemLayout} label="审批人">
                                {getFieldDecorator('approvalPersonId', {
                                    //initialValue: staffName
                                    rules: [{ required: true, message: "请选择审批人" }]
                                })(
                                    <Select
                                        mode="multiple"
                                        placeholder="请选择"
                                        style={{ width: '100%' }}
                                       
                                        disabled
                                    >{staffOptions}
                                    </Select>
                                    )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={8}>
                        <Col span={24}>
                            <FormItem {...formItemLayout} label="抄送人">
                                {getFieldDecorator('sendPersonId', {
                                    //initialValue: staffName
                                    //rules: [{ required: true, message: "请选择抄送人" }]
                                })(
                                    <Select
                                        mode="multiple"
                                        placeholder="请选择"
                                        style={{ width: '100%' }}
                                       
                                        disabled
                                    >{staffOptions}
                                    </Select>
                                    )}
                            </FormItem>
                        </Col>
                    </Row>

                    <Row gutter={8}>
                        <Col span={24}>
                            <FormItem {...formItemLayout} label="添加图片">
                                <Upload {...uploadPictures} disabled>
                                    
                                </Upload>
                            </FormItem>
                        </Col>
                    </Row>

                    <Row gutter={8}>
                        <Col span={24}>
                            <FormItem {...formItemLayout} label="添加附件">
                                <Upload {...uploadAttachments} disabled>
                                    
                                </Upload>
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        );
    }  
);

const NormalEditInitiatedForm = Form.create(
    {
        mapPropsToFields(props) {
            const fields = {};
            Object.keys(props.approval).forEach(key => {
                fields[key] = {
                    value: props.approval[key]
                };
            });
            return {
                ...fields
            };
        }, 
       
        onFieldsChange(props, changedFields) {
            debugger;
            props.onChange(changedFields);

        },
    },

)(EditInitiatedForm);

const CommentApprovalForm = Form.create()(
    (props) => {
        const { visible, onCancel, onCreate, form,personStatus } = props;
        debugger;
        const { getFieldDecorator } = form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 18 },
        };
        const formItemRow = {
            labelCol: { span: 3 },
            wrapperCol: { span: 21 },
        };
       
        return (
            <Modal
                visible={visible}

                title="审批评论"
                okText="确定"
                onCancel={onCancel}
                onOk={onCreate}>
                <Form>
                    <Row gutter={8}>
                        <Col span={24}>
                            <FormItem {...formItemLayout} label="评论内容">
                                {getFieldDecorator('remark', {
                                    //initialValue: staffName
                                    rules: [{ required: true, message: "请输入评论内容" }]
                                })(
                                    <Input type= "textarea" rows= {10} />
                                    )}
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        );
    }
);

const NormalCommentApprovalForm = Form.create(
    {
        mapPropsToFields(props) {
            debugger;
            const fields = {};
            debugger;
            if (props.personStatus){
                Object.keys(props.personStatus).forEach(key => {
                    fields[key] = {
                        value: props.personStatus[key]
                    };
                });
            }
            
            return {
                ...fields
            };
        },
        //onFieldsChange(props, changedFields) {
        //    debugger;
        //    props.onChange(changedFields);

        //},
    },

)(CommentApprovalForm);


function SendApprovalList({
    dispatch,
    setStore,
    list: dataSource,
    loading,
    total,
    page: current,
    filterStr,
    pageSize,
    seniorSearchData,
    seniorSearch,
    regionList,
    staffList,
    initialRegion,
    cleaningAreaList,
    approval,
}) {

    class EditInitiated extends React.Component {

        constructor(props) {
            super(props);
            this.state = {
                visible: false,
                staffList: this.props.staffList,
                approval: this.props.approval,
                attachments: [],
                pictures: [],
                attachmentsFileList: [],
                picturesFileList: [],
                personStatus: [],
            };
            this.dispatch = props.dispatch;
            
        }
        showModal = (e) => {
            e.preventDefault();

            var approval = this.props.approval;
            var staffList = this.props.staffList.map(function (x) {
                if (x.staffRegionId == approval.regionId) {
                    return x;
                }
            });
            staffList = staffList.filter(function (n) { return n != undefined });

            var approvalPersonId = this.props.approval.personStatus.map(function (x) {
                if (x.approvalPersonType == 1) {
                    return x.personId;
                }
            });
            approvalPersonId = approvalPersonId.filter(function (n) { return n != undefined });

            var sendPersonId = this.props.approval.personStatus.map(function (x) {
                if (x.approvalPersonType == 2) {
                    return x.personId;
                }
            });
            sendPersonId = sendPersonId.filter(function (n) { return n != undefined });
            debugger;
            var approval = { ...this.state.approval, approvalPersonId,sendPersonId };
            debugger;
            this.setState({
                approval: { ...this.state.approval, ...approval },
            });
            debugger;
            var attachments = this.props.approval.attachments.map(function (x) {
                if (x.fileType == 1) {
                    return x;
                }
            });
            attachments = attachments.filter(function (n) { return n != undefined });
            debugger;
            var pictures = this.props.approval.attachments.map(function (x) {
                if (x.fileType == 0) {
                    return x;
                }
            });
            pictures = pictures.filter(function (n) { return n != undefined });
            debugger;
            this.setState({
                personStatus: this.props.approval.personStatus,
                staffList: staffList,
                visible: true,
                attachments: attachments,
                pictures: pictures,
            });
           // this.setState({ visible: true });
            
        }


        uploadAttachments = {
            name: "file",
            action: "api/saas/uploadAttachments",
            headers: {
                authorization: "authorization-text"
            },
            //onChange: this.uploadAttachmentsOnChange,
            //this.uploadAttachmentsOnChange,
            fileList: this.props.approval.attachments.map(attachment => {
                debugger;
                if (attachment.fileType == 0) {
                    debugger;
                    return {
                        uid: attachment.id,
                        name: attachment.fileName,
                        status: "done",
                        url: attachment.filePath
                    };
                }
                
            }).filter(function (n) { return n != undefined }),
            //defaultFileList: fileList.filter(function (n) { return n != undefined }),
        };

        uploadPictures = {
            name: "file",
            action: "api/saas/uploadAttachments",
            headers: {
                authorization: "authorization-text"
            },
            //onChange: this.uploadPicturesOnChange,
            fileList: this.props.approval.attachments.map(attachment => {
                debugger;
                if (attachment.fileType == 1) {
                    return {
                        uid: attachment.id,
                        name: attachment.fileName,
                        status: "done",
                        url: attachment.filePath
                    };
                }
            }).filter(function (n) { return n != undefined }),
            //defaultFileList: fileList.filter(function (n) { return n != undefined }),

        };
        

        handleCancel = () => {
            this.setState({ visible: false });
        }
        handleCreate = () => {
            this.setState({ visible: false });
        }
        saveFormRef = (form) => {
            this.form = form;
        }
       
        handleFormChange = (changedFields) => {
            debugger;
            const key = Object.keys(changedFields)[0];
            const value = changedFields[key].value;

            let data = { [key]: value };


            if (key == "regionId") {
                data = { approvalId: null, sendId: null, [key]: value };
            }

            var approval = { ...this.state.approval, ...data };
            this.setState({
                approval: { ...this.state.approval, ...approval },
            });
        }
        render() {
            return (
                <span>
                    <a onClick={this.showModal} >查看</a>
                    {(<NormalEditInitiatedForm
                        regionList={this.props.regionList}
                        staffList={this.state.staffList}
                        dispatch={this.props.dispatch}
                        uploadAttachments={this.uploadAttachments}
                        uploadPictures={this.uploadPictures}
                        fileList={this.state.fileList}
                        attachmentsFileList={this.state.attachmentsFileList}
                        picturesFileList={this.state.picturesFileList}
                       
                        ref={this.saveFormRef}
                        visible={this.state.visible}
                        onCancel={this.handleCancel}
                        onCreate={this.handleCreate}
                        approval={this.state.approval}
                        onChange={this.handleFormChange}
                        
                    />)}
                </span>
            );
        }
    };


    class CommentApproval extends React.Component {

        constructor(props) {
            super(props);
            debugger;
            this.state = {
                visible: false,
                personStatus: [],
            };
            this.dispatch = props.dispatch;

        }
        showModal = (e) => {
            debugger;
            e.preventDefault();
            this.setState({
                visible: true,
                personStatus: this.props.approval.approvalPersonStatus,
            });
            // this.setState({ visible: true });

        }


        handleCancel = () => {
            this.setState({ visible: false });
        }
        handleCreate = () => {
            const form = this.form;
            debugger;
            form.validateFields((err, values) => {
                if (err) {
                    return;
                }
                values.id = this.props.approval.approvalPersonStatus.id;
                values.approvalId = this.props.approval.id;
                values.personId = this.props.approval.approvalPersonStatus.personId;
                //values.attachments = this.state.attachments.concat(this.state.pictures);
                debugger;
                this.props.dispatch({
                    type: 'sendApprovalList/addSendApprovalComment',
                    payload: { personStatus: values },
                });
                form.resetFields();
                this.setState({ visible: false });
            });

        }
        saveFormRef = (form) => {
            this.form = form;
        }

        //handleFormChange = (changedFields) => {
        //    debugger;
        //    const key = Object.keys(changedFields)[0];
        //    const value = changedFields[key].value;

        //    let data = { [key]: value };
        //    let { personStatus } = this.state;
        //    //data = { a: null, sendId: null, [key]: value };
        //    personStatus.push(data);
        //    //this.setState({ personStatus });
        //    //var personStatus = { ...this.state,data };
        //    this.setState({
        //        personStatus: { ...this.state.personStatus, ...personStatus },
        //    });
        //}
        render() {
            return (
                <span>
                    <a onClick={this.showModal} >评论</a>
                    {(<NormalCommentApprovalForm
                        dispatch={this.props.dispatch}
                        ref={this.saveFormRef}
                        visible={this.state.visible}
                        onCancel={this.handleCancel}
                        onCreate={this.handleCreate}
                        personStatus={this.state.personStatus}
                        //onChange={this.handleFormChange} 
                    />)}
                </span>
            );
        }
    };


    class BatchCommentApproval extends React.Component {

        constructor(props) {
            super(props);
            debugger;
            this.state = {
                visible: false,
                personStatus: [],
            };
            this.dispatch = props.dispatch;

        }
        showModal = (e) => {
            debugger;
            e.preventDefault();
            this.setState({
                visible: true,
                personStatus: this.props.approval.approvalPersonStatus,
            });
            // this.setState({ visible: true });

        }


        handleCancel = () => {
            this.setState({ visible: false });
        }
        handleCreate = () => {
            const form = this.form;
            debugger;
            form.validateFields((err, values) => {
                if (err) {
                    return;
                }
                debugger;
                //values.id = this.props.approval.id;
                values.ids = this.props.approval.map(x => x.approvalPersonStatus.id);
                //values.ids = this.props.approval;
               
                if (this.props.operate == "agree") {
                    values.approvalOperationType = 1;
                };
                if (this.props.operate == "refuse") {
                    values.approvalOperationType = 2;
                };
                
                debugger;
                this.props.dispatch({
                    type: 'sendApprovalList/batchAddComment',
                    payload: { personStatus: values },
                });
                form.resetFields();
                this.setState({ visible: false });
            });

        }
        saveFormRef = (form) => {
            this.form = form;
        }

        //handleFormChange = (changedFields) => {
        //    debugger;
        //    const key = Object.keys(changedFields)[0];
        //    const value = changedFields[key].value;

        //    let data = { [key]: value };
        //    let { personStatus } = this.state;
        //    //data = { a: null, sendId: null, [key]: value };
        //    personStatus.push(data);
        //    //this.setState({ personStatus });
        //    //var personStatus = { ...this.state,data };
        //    this.setState({
        //        personStatus: { ...this.state.personStatus, ...personStatus },
        //    });
        //}
        render() {
            var operate = "";
            if (this.props.operate == "agree") {
                operate = "批量同意";
            };
            if (this.props.operate == "refuse") {
                operate = "批量拒绝";
            };
           
            return (
                <span>
                    <Button onClick={this.showModal} >{operate}</Button>
                    {(<NormalCommentApprovalForm
                        dispatch={this.props.dispatch}
                        ref={this.saveFormRef}
                        visible={this.state.visible}
                        onCancel={this.handleCancel}
                        onCreate={this.handleCreate}
                        personStatus={this.state.personStatus}
                        operate={this.props.operate}
                    //onChange={this.handleFormChange} 
                    />)}
                </span>
            );
        }
    };

    class WorkAttendance extends React.Component {
        state = {
            selectedRowKeys: [], // Check here to configure the default column
            selectedRows:[]
        };
        openSeniorSearch = () => {
            dispatch({
                type: "sendApprovalList/seniorSearchToggle",
                payload: true
            });
        };
        closeSeniorSearch = () => {
            dispatch({
                type: "sendApprovalList/seniorSearchToggle",
                payload: false
            });
        };
        seniorSearchHandler = e => {
            e.preventDefault();
            this.props.form.validateFields((err, values) => {
                if (!err) {
                    dispatch({
                        type: "sendApprovalList/seniorSearch",
                        payload: values
                    });
                }
            });
        };
        resetSeniorSearch = () => {
            dispatch({
                type: "sendApprovalList/resetSeniorSearch"
            });
        };


        showWorkAttendance = (id) => {
            dispatch(routerRedux.push({
                pathname: '/showOrEditWorkAttendance',
                query: { id },
            }));
        }
        editWorkAttendance = (id) => {
            dispatch(routerRedux.push({
                pathname: '/showOrEditWorkAttendance',
                query: { id },
            }));
        }
        deleteApproval = (ids) => {
            debugger;
            dispatch({
                type: 'sendApprovalList/deleteApproval',
                payload: { ids }
            });
        }
        revokedApproval = (ids) => {
            debugger;
            dispatch({
                type: 'sendApprovalList/revokedApproval',
                payload: { ids }
            });
        }
        
        pageChangeHandler = (page) => {
            dispatch(
                routerRedux.push({
                    pathname: "/sendApprovalList",
                    query: { page, filterStr,pageSize }
                })
            );
        };
        searchHandler = filterStr => {
            dispatch(
                routerRedux.push({
                    pathname: "/sendApprovalList",
                    query: { page: 1, filterStr, pageSize}
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
                    pathname: "/sendApprovalList",
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
                    title: "审批类型",
                    dataIndex: "typeStr",
                    key: "type",
                    width: 120
                },
                {
                    title: "审批摘要",
                    dataIndex: "content",
                    key: "content",
                    width: 150
                },
                {
                    title: "管理区",
                    dataIndex: "regionName",
                    key: "regionName",
                    width: 120
                },
                {
                    title: "发起时间",
                    dataIndex: "creatDate",
                    key: "creatDate",
                    width: 120,
                    render: (text, approval) => (
                        approval.creatDate != null ? (new Date(approval.creatDate)).toLocaleDateString() : null
                    ),
                },
                {
                    title: "完成时间",
                    dataIndex: "completeDate",
                    key: "completeDate",
                    width: 120,
                    render: (text, approval) => (
                        approval.completeDate != null ? (new Date(approval.completeDate)).toLocaleDateString() : null
                    ),
                },
                {
                    title: "状态",
                    dataIndex: "statusStr",
                    key: "statusStr",
                    width: 100,
                   
                },
                {
                    title: "申请人",
                    dataIndex: "suitorPersonName",
                    key: "suitorPersonName",
                    width: 150,
                },
               
                {
                    title: "审批人",
                    dataIndex: "approvalPersonName",
                    key: "approvalPersonName",
                    width: 250
                },
                {
                    title: "操作",
                    fixed: "right",
                    width: 80,
                    render: (text, record) =>
                        <span>
                            <EditInitiated
                                regionList={regionList}
                                staffList={staffList}
                                initialRegion={initialRegion}
                                dispatch={dispatch}
                                approval={record}
                            />
                            &nbsp;
                            <CommentApproval
                                dispatch={dispatch}
                                approval={record}
                            />
                            
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
            const Inspect = selectedRows;

            return (
                <div className={styles.normal}>
                    <div className={styles.ListButton}>
                        <Row>
                            <Col span={16} style={{ textAlign: 'left' }}>
                                <h1>
                                    抄送我的
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
                                    <FormItem {...formItemLayout} label="审批类型">
                                        {getFieldDecorator("type", {

                                        })(<Select ></Select>)}
                                    </FormItem>
                                </Col>
                                    <Col span={8}>
                                        <FormItem {...formItemLayout} label="申请人">
                                        {getFieldDecorator("suitorPersonId", {

                                        })(<Select ></Select>)}
                                        </FormItem>
                                    </Col>
                                    <Col span={8}>
                                        <FormItem {...formItemLayout} label="审批人">
                                        {getFieldDecorator("approvalPersonId", {

                                            })(<Select ></Select>)}
                                        </FormItem>
                                    </Col>
                                </Row>
                                <Row gutter={8}>
                                    <Col span={8}>

                                        <FormItem  {...formItemLayout} label="审批摘要">
                                        {getFieldDecorator('content', {
                                        })(<Input />)}
                                        </FormItem>
                                    </Col>
                                    <Col span={8}>
                                        <FormItem {...formItemLayout} label="状态">
                                            {getFieldDecorator("status", {

                                            })(<Select ></Select>)}
                                        </FormItem>
                                    </Col>
                                    <Col span={8}>
                                        <FormItem {...formItemLayout} label="发起时间">
                                            {getFieldDecorator("createDate", {
                                            //initialValue: seniorSearchData.handlePersonId
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
                        rowKey={approval => approval.id}
                        scroll={{ x: "102%" }}                        
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

    const WorkAttendanceForm = Form.create()(WorkAttendance);
    return <WorkAttendanceForm />;
}

function mapStateToProps(state) {
    const {
        list,
        total,
        page,
        filterStr,
        pageSize,
        regionList,
        staffList,
        initialRegion,
        cleaningAreaList,
        approval,
        seniorSearchData,
        seniorSearch
    } = state.sendApprovalList;
    debugger;
    return {
        loading: state.loading.models.sendApprovalList,
        list,
        total,
        page,
        filterStr,
        pageSize,
        regionList,
        staffList,
        initialRegion,
        cleaningAreaList,
        approval,
        seniorSearchData,
        seniorSearch
    };
}

export default connect(mapStateToProps)(SendApprovalList);




