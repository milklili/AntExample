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
import styles from './ApprovalManage.css';
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
        const { visible, onCancel, onCreate, form, dispatch, uploadAttachments, uploadPictures, onSendIdChange, onSendIdDeselect,onApprovalIdDeselect, onApprovalIdChange, regionList, picturesFileList, attachmentsFileList, selectRegion, staffList, approval, uploadFiles, initialRegion } = props;
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
        const staffOptions = staffList.map(value =>
            <Option key={value.staffId} value={value.staffId}>{value.staffName}</Option>
        );




        return (
            <Modal
                visible={visible}

                title="编辑审批"
                okText="确定"
                onCancel={onCancel}
                onOk={onCreate}>
                <Form>
                    <Row gutter={8}>
                        <Col span={24}>
                            <FormItem {...formItemLayout} label="管理�>
                                {getFieldDecorator('regionId', {
                                    //initialValue: staffName
                                    rules: [{ required: true, message: "请选择管理� }]
                                })(
                                    <Select
                                        mode="combox"
                                        placeholder="请选择"
                                        onChange={selectRegion}
                                        style={{ width: '100%' }}
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
                                    rules: [{ required: true, message: "请输入审批编� }]
                                })(<Input disabled />)}
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
                                    rules: [{ type: "string", required: true, max: 30, message: "请正确输入申请内�最大长度为30" }]
                                })(<Input />)}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={8}>
                        <Col span={24}>
                            <FormItem {...formItemLayout} label="审批详情" >
                                {getFieldDecorator('details', {
                                    rules: [{ type: "string", required: true, max: 300, message: "请正确输入审批详�最大长度为300" }]
                                })(<Input />)}
                            </FormItem>

                        </Col>
                    </Row>
                    <Row gutter={8}>
                        <Col span={24}>
                            <FormItem {...formItemLayout} label="审批�>
                                {getFieldDecorator('approvalPersonId', {
                                    //initialValue: staffName
                                    rules: [{ required: true, message: "请选择审批� }]
                                })(
                                    <Select
                                        mode="multiple"
                                        placeholder="请选择"
                                        style={{ width: '100%' }}
                                        onSelect={onApprovalIdChange}
                                        onDeselect={onApprovalIdDeselect}
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
                                        onChange={onSendIdChange}
                                        onDeselect={onSendIdDeselect}
                                    >{staffOptions}
                                    </Select>
                                    )}
                            </FormItem>
                        </Col>
                    </Row>

                    <Row gutter={8}>
                        <Col span={24}>
                            <FormItem {...formItemLayout} label="添加图片">
                                <Upload {...uploadPictures} >
                                    <a>点击添加（最�张）</a>
                                </Upload>
                            </FormItem>
                        </Col>
                    </Row>

                    <Row gutter={8}>
                        <Col span={24}>
                            <FormItem {...formItemLayout} label="添加附件">
                                <Upload {...uploadAttachments} >
                                    <a>点击添加 （单个附件应小于2M�/a>
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
            
            props.onChange(changedFields);

        },
    },

)(EditInitiatedForm);

const CommentApprovalForm = Form.create()(
    (props) => {
        const { visible, onCancel, onCreate,form } = props;
        
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
                                    rules: [{ required: true, message: "请填写评论内� }]
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
            
            const fields = {};
            
            Object.keys(props.personStatus).forEach(key => {
                fields[key] = {
                    value: props.personStatus[key]
                };
            });
            return {
                ...fields
            };
        },
        //onFieldsChange(props, changedFields) {
        //    
        //    props.onChange(changedFields);

        //},
    },

)(CommentApprovalForm);


function InitiatedList({
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
            
            var approval = { ...this.state.approval, approvalPersonId,sendPersonId };
            
            this.setState({
                approval: { ...this.state.approval, ...approval },
            });
            
            var attachments = this.props.approval.attachments.map(function (x) {
                if (x.fileType == 1) {
                    return x;
                }
            });
            attachments = attachments.filter(function (n) { return n != undefined });
            
            var pictures = this.props.approval.attachments.map(function (x) {
                if (x.fileType == 0) {
                    return x;
                }
            });
            pictures = pictures.filter(function (n) { return n != undefined });
            
            this.setState({
                personStatus: this.props.approval.personStatus,
                staffList: staffList,
                visible: true,
                attachments: attachments,
                pictures: pictures,
            });
           // this.setState({ visible: true });
            
        }
       
        selectRegion = (value) => {
            var staffList = this.props.staffList.map(function (x) {
                if (x.staffRegionId == value) {
                    return x;
                }
            });
            staffList = staffList.filter(function (n) { return n != undefined });
            
            let { personStatus } = this.state;

            var length = personStatus.length;
            if (length >= 0) {
                personStatus.splice(0, length);
            }
            this.setState({ personStatus });
            this.setState({
                staffList: staffList,
               
            });
            
        }

        onSendIdChange = (value) => {
            let { personStatus } = this.state;
            
           var length = value.length;
            //let personStatusList = [];
           let data = { approvalOperationType: 0, approvalPersonType: 2, personId: value[length-1], remark: "" };
            
            personStatus.push(data);
            this.setState({ personStatus });
            
            //var approval = { ...this.state.approval, ...data };
            //this.setState({
            //    approval: { ...this.state.approval, ...approval },
            //});
        };
        onApprovalIdChange = (value) => {
            let { personStatus } = this.state;
            //let personStatusList = [];
            //var length = value.length;
            let data = { approvalOperationType: 0, approvalPersonType: 1, personId: value, remark: "" };
            
            personStatus.push(data);
            this.setState({ personStatus });
            
            //var approval = { ...this.state.approval, ...data };
            //this.setState({
            //    approval: { ...this.state.approval, ...approval },
            //});
        };
        onApprovalIdDeselect = (value) => {
            
            let { personStatus } = this.state;
            //let personStatusList = [];

            let person = personStatus.find(person => (person.personId == value && person.approvalPersonType == 1));
            var index = personStatus.indexOf(person);
            if (index >= 0) {
                personStatus.splice(index, 1);
            }
            this.setState({ personStatus });
            
            //var approval = { ...this.state.approval, ...data };
            //this.setState({
            //    approval: { ...this.state.approval, ...approval },
            //});
        };

        onSendIdDeselect = (value) => {
            
            let { personStatus } = this.state;
            //let personStatusList = [];

            let person = personStatus.find(person => (person.personId == value && person.approvalPersonType == 2));
            var index = personStatus.indexOf(person);
            if (index >= 0) {
                personStatus.splice(index, 1);
            }
            this.setState({ personStatus });
            
            //var approval = { ...this.state.approval, ...data };
            //this.setState({
            //    approval: { ...this.state.approval, ...approval },
            //});
        };


        uploadAttachmentsOnChange = info => {
            
            let { attachments } = this.state;
            let fileList = info.fileList;
            
            // filter successfully uploaded files according to response from server
            fileList.filter(file => {
                if (file.response) {
                    
                    message.success(`${info.file.name} 文件上传成功.`);
                    let maxId = attachments.length + 1;
                    for (let file of file.response) {
                        file.id = maxId;
                        file.fileType = 1;
                        attachments.push(file);
                        maxId++;
                    }
                    fileList = [];
                    
                    attachments.forEach(function (currentfile) {
                        var file = {};
                        file.uid = currentfile.id;
                        file.name = currentfile.fileName;
                        file.status = "done";
                        file.url = currentfile.filePath;
                        fileList.push(file);
                    });
                }
            });
            //remove
            if (info.file.status === "removed") {
                let file = attachments.find(file => file.id == info.file.uid);
                var index = attachments.indexOf(file);
                if (index >= 0) {
                    attachments.splice(index, 1);
                }
            } else if (info.file.status === "error") {
                message.error(`${info.file.name} 文件上传失败.`);
            }
            
            this.setState({ attachmentsFileList: fileList, attachments });
        };
        uploadPicturesOnChange = info => {
            let { pictures } = this.state;
            let fileList = info.fileList;
            
            // filter successfully uploaded files according to response from server
            fileList.filter(file => {
                if (file.response) {
                    message.success(`${info.file.name} 文件上传成功.`);
                    let maxId = pictures.length + 1;
                    for (let file of file.response) {
                        file.id = maxId;
                        file.fileType = 0;
                        pictures.push(file);
                        maxId++;
                    }
                    fileList = [];
                    pictures.forEach(function (currentfile) {
                        var file = {};
                        file.uid = currentfile.id;
                        file.name = currentfile.fileName;
                        file.status = "done";
                        file.url = currentfile.filePath;
                        fileList.push(file);
                    });
                }
            });
            //remove
            if (info.file.status === "removed") {
                let file = pictures.find(file => file.id == info.file.uid);
                var index = pictures.indexOf(file);
                if (index >= 0) {
                    pictures.splice(index, 1);
                }
            } else if (info.file.status === "error") {
                message.error(`${info.file.name} 文件上传失败.`);
            }
            this.setState({ picturesFileList: fileList, pictures });
        };

        beforePicturesOnChange = file => {
            let { pictures } = this.state;
            let fileList = file.fileList;
            
            const isJPG = ((file.type.toLowerCase() === 'image/jpeg')
                || (file.type.toLowerCase() === 'image/bmp')
                || (file.type.toLowerCase() === 'image/png')
                || (file.type.toLowerCase() === 'image/jpg')
                || (file.type.toLowerCase() === 'image/tiff')
                || (file.type.toLowerCase() === 'image/gif')
                || (file.type.toLowerCase() === 'image/pcx')
                || (file.type.toLowerCase() === 'image/tga')
                || (file.type.toLowerCase() === 'image/exif')
                || (file.type.toLowerCase() === 'image/fpx')
                || (file.type.toLowerCase() === 'image/svg')
                || (file.type.toLowerCase() === 'image/psd')
                || (file.type.toLowerCase() === 'image/cdr')
                || (file.type.toLowerCase() === 'image/pcd')
                || (file.type.toLowerCase() === 'image/dxf')
                || (file.type.toLowerCase() === 'image/ufo')
                || (file.type.toLowerCase() === 'image/eps')
                || (file.type.toLowerCase() === 'image/ai')
                || (file.type.toLowerCase() === 'image/raw')
                || (file.type.toLowerCase() === 'image/wmf'));
            if (!isJPG) {
                message.error('请选择图片上传!');
            }
            const isMax = pictures.length < 9;
            //var exitPictures = pictures.length;
            if (!isMax) {
                message.error('图片最多上��');
            }
            return isJPG && isMax;
        };

        beforeAttachmentsOnChange = file => {
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isLt2M) {
                message.error('单个附件应小�M');
            }
            return isLt2M;
        };

        uploadAttachments = {
            name: "file",
            action: `${window.location.host}/api/officeManage/uploadAttachments`,
            headers: {
                authorization: "authorization-text"
            },
            onChange: this.uploadAttachmentsOnChange,
            //this.uploadAttachmentsOnChange,
            beforeUpload: this.beforeAttachmentsOnChange,

            defaultFileList: approval.attachments.map(attachment => {
                
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

        uploadPictures = {
            name: "file",
            action: `${window.location.host}/api/officeManage/uploadAttachments`,
            headers: {
                authorization: "authorization-text"
            },
            onChange: this.uploadPicturesOnChange,
            beforeUpload: this.beforePicturesOnChange,
            defaultFileList: approval.attachments.map(attachment => {
                
                if (attachment.fileType == 0) {
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
            this.setState ({
                visible: false,
                staffList: this.props.staffList,
                approval: this.props.approval,
                attachments: [],
                pictures: [],
                attachmentsFileList: [],
                picturesFileList: [],
                personStatus: [],
            });
            //this.props.dispatch({
            //    type: 'initiatedList/editApproval',
            //    payload: { approval: values },
            //});
            this.props.dispatch(
                routerRedux.push({
                    pathname: "/initiatedList",
                    query: { page: current, filterStr ,pageSize}
                })
            );
            this.setState({ visible: false });
        }
        handleCreate = () => {
            const form = this.form;
            
            form.validateFields((err, values) => {
                if (err) {
                    return;
                }
                values.id = this.props.approval.id;
                values.personStatus = this.state.personStatus;
                values.attachments = this.state.attachments.concat(this.state.pictures);
                this.props.dispatch({
                    type: 'initiatedList/editApproval',
                    payload: { approval: values },
                });
                form.resetFields();
                this.setState({ visible: false });
            });
        }
        saveFormRef = (form) => {
            this.form = form;
        }
       
        handleFormChange = (changedFields) => {
            
            const key = Object.keys(changedFields)[0];
            const value = changedFields[key].value;

            let data = { [key]: value };


            if (key == "regionId") {
                data = { approvalPersonId: [], sendPersonId: [], [key]: value };
            }

            var approval = { ...this.state.approval, ...data };
            this.setState({
                approval: { ...this.state.approval, ...approval },
            });
        }
        render() {
            return (
                <span>
                    <a onClick={this.showModal} >编辑</a>
                    {(<NormalEditInitiatedForm
                        regionList={this.props.regionList}
                        staffList={this.state.staffList}
                        dispatch={this.props.dispatch}
                        uploadAttachments={this.uploadAttachments}
                        uploadPictures={this.uploadPictures}
                        fileList={this.state.fileList}
                        attachmentsFileList={this.state.attachmentsFileList}
                        picturesFileList={this.state.picturesFileList}
                        onApprovalIdDeselect={this.onApprovalIdDeselect}
                        onSendIdDeselect={this.onSendIdDeselect}
                        ref={this.saveFormRef}
                        visible={this.state.visible}
                        onCancel={this.handleCancel}
                        onCreate={this.handleCreate}
                        approval={this.state.approval}
                        onChange={this.handleFormChange}
                        selectRegion={this.selectRegion}
                        onSendIdChange={this.onSendIdChange}
                        onApprovalIdChange={this.onApprovalIdChange}
                    />)}
                </span>
            );
        }
    };

    class CommentApproval extends React.Component {

        constructor(props) {
            super(props);
            
            this.state = {
                visible: false,
                personStatus: [],
            };
            this.dispatch = props.dispatch;

        }
        showModal = (e) => {
            
            e.preventDefault();
            this.setState({
                visible: true,
                personStatus: [],
            });
            // this.setState({ visible: true });

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
                //values.id = this.props.approval.id;
                values.approvalId = this.props.approval.id;
                //values.attachments = this.state.attachments.concat(this.state.pictures);
                
                this.props.dispatch({
                    type: 'initiatedList/addComment',
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
        //    
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

    class WorkAttendance extends React.Component {
        state = {
            selectedRowKeys: [], // Check here to configure the default column
            selectedRows:[]
        };
        openSeniorSearch = () => {
            dispatch({
                type: "initiatedList/seniorSearchToggle",
                payload: true
            });
        };
        closeSeniorSearch = () => {
            dispatch({
                type: "initiatedList/seniorSearchToggle",
                payload: false
            });
        };
        seniorSearchHandler = e => {
            e.preventDefault();
            this.props.form.validateFields((err, values) => {
                if (!err) {
                    dispatch({
                        type: "initiatedList/seniorSearch",
                        payload: values
                    });
                }
            });
        };
        resetSeniorSearch = () => {
            dispatch({
                type: "initiatedList/resetSeniorSearch"
            });
        };

        
        showApproval = (id) => {
            
            dispatch(routerRedux.push({
                pathname: '/showApproval',
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
            
            dispatch({
                type: 'initiatedList/deleteApproval',
                payload: { ids }
            });
        }
        revokedApproval = (ids) => {
            
            dispatch({
                type: 'initiatedList/revokedApproval',
                payload: { ids }
            });
        }
        
        pageChangeHandler = (page) => {
            dispatch(
                routerRedux.push({
                    pathname: "/initiatedList",
                    query: { page, filterStr,pageSize, }
                })
            );
        };
        searchHandler = filterStr => {
            dispatch(
                routerRedux.push({
                    pathname: "/initiatedList",
                    query: { page: 1, filterStr, pageSize }
                })
            );
        };
        onSelectChange = (selectedRowKeys, selectedRows) => {
            this.setState({ selectedRowKeys });
            this.setState({ selectedRows });
        };
        onShowSizeChange = (current, pageSize) => {
            
            dispatch(
                routerRedux.push({
                    pathname: "/initiatedList",
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
                    title: "管理�,
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
                    render: (text, Inspect) => (
                        approval.completeDate != null ? (new Date(approval.completeDate)).toLocaleDateString() : null
                    ),
                },
                {
                    title: "状�,
                    dataIndex: "statusStr",
                    key: "statusStr",
                    width: 100,
                   
                },
                {
                    title: "申请�,
                    dataIndex: "suitorPersonName",
                    key: "suitorPersonName",
                    width: 150,
                },
               
                {
                    title: "审批�,
                    dataIndex: "approvalPersonName",
                    key: "approvalPersonName",
                    width: 250
                },
                {
                    title: "操作",
                    fixed: "right",
                    width: 160,
                    render: (text, record) =>
                        <span>
                            <a onClick={this.showApproval.bind(null, record.id)}>查看</a>
                            &nbsp;
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
                             &nbsp;
                            <Popconfirm title="确定要撤销该审批记�" onConfirm={this.revokedApproval.bind(null, [record.id])}>
                                <a >撤销</a>
                             </Popconfirm>
                             &nbsp;
                            <Popconfirm title="确定要删除该审批记录?" onConfirm={this.deleteApproval.bind(null, [record.id])}>
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
            const selectInfo = "已选择" + selectLength + "项数据�;

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
                                    我发起的审批
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
                                        <FormItem {...formItemLayout} label="申请�>
                                        {getFieldDecorator("suitorPersonId", {

                                        })(<Select ></Select>)}
                                        </FormItem>
                                    </Col>
                                    <Col span={8}>
                                        <FormItem {...formItemLayout} label="审批�>
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
                                        <FormItem {...formItemLayout} label="状�>
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
                    <div className={styles.info}><span >共搜索到{total}条数�/span></div>
                    
                    <div className={styles.ListButton}>
                    <Row gutter={10} >
                            <Col span={8}>

                                <Popconfirm title="确定要撤销该审批记录吗?" onConfirm={this.revokedApproval.bind(this, selectedRowKeys)}>
                                    <Button disabled={!hasSelected}>批量撤销</Button>
                                </Popconfirm>
                                <Popconfirm title="确定要删除该审批记录�" onConfirm={this.deleteApproval.bind(this, selectedRowKeys)}>
                                    <Button disabled={!hasSelected}>批量删除</Button>
                                </Popconfirm>
                                
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
                        rowKey={Inspect => Inspect.id}
                        scroll={{ x: "110%" }}                        
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
    } = state.initiatedList;
    return {
        loading: state.loading.models.initiatedList,
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

export default connect(mapStateToProps)(InitiatedList);




