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
    Steps ,

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
const Step = Steps.Step;

const ApprovalInformationForm = Form.create()(
    (props) => {
         
        const { form,  approval } = props;
         
        const { getFieldDecorator } = form;

        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 18 },
        };
       
        const uploadAttachments = {
            name: "file",
            action: "api/saas/uploadAttachments",
            headers: {
                authorization: "authorization-text"
            },
           
            fileList: approval.attachments.map(attachment => {
                 
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

        const uploadPictures = {
            name: "file",
            action: "api/saas/uploadAttachments",
            headers: {
                authorization: "authorization-text"
            },
            //onChange: this.uploadPicturesOnChange,
            fileList: approval.attachments.map(attachment => {
                 
                if (attachment.fileType == 0) {
                    return {
                        uid: attachment.id,
                        name: attachment.fileName,
                        status: "done",
                        url: attachment.filePath
                    };
                }
            }).filter(function (n) { return n != undefined }),
            
        };



         
        const titleContent = approval.content;
        const titleCode =" 审批编号" + approval.code;
        return (
            <div >
                <div >
                    <h2><span>{titleContent}</span><span className={styles.title}>{titleCode}</span></h2>
                    
                </div>
                <br />
                申请信息
                <div className={styles.approvalInformationRows}>
                    <Row gutter={20} >
                        <Col span={8}>
                            <Col span={4}>
                                <span>申请人:</span>
                            </Col>
                            <Col span={20}>
                                <span>{approval.approvalPersonName}</span>
                            </Col>
                        </Col>
                        <Col span={8}>
                            <Col span={4}>
                                <span>管理区:</span>
                            </Col>
                            <Col span={20}>
                                <span>{approval.regionName}</span>
                            </Col>
                        </Col>
                        <Col span={8}>
                            <Col span={4}>
                                <span>申请类型:</span>
                            </Col>
                            <Col span={20}>
                                <span>{approval.typeStr}</span>
                            </Col>
                        </Col>
                    </Row>
                </div>

                <div className={styles.approvalInformationRows}>
                    <Row gutter={20}>
                        <Col span={8}>

                            <Col span={4}>
                                <span>申请时间:</span>
                            </Col>
                            <Col span={20}>
                                <span>{(new Date(approval.creatDate)).toLocaleDateString()}</span>
                            </Col>
                        </Col>
                        <Col span={16}>

                            <Col span={2}>
                                <span>申请详情:</span>
                            </Col>
                            <Col span={22}>
                                <span>{approval.details}</span>
                            </Col>
                        </Col>

                    </Row>

                </div>
                <div className={styles.approvalInformationRows} >
                    <Row gutter={20}>
                        <Col span={8}>
                            <Col span={4}>
                                <span>附件</span>
                            </Col>
                            <Col span={20} className={styles.attachments}>

                                <Upload {...uploadAttachments} disabled>

                                </Upload>
                            </Col>
                            
                    </Col>
                    <Col span={8}>

                        <Col span={4}>
                            <span>图片:</span>
                        </Col>
                        <Col span={20} className={styles.attachments}>

                                <Upload {...uploadPictures} disabled >

                                </Upload>
                        </Col>
                    </Col>

                </Row>
                </div>
                <br />
            </div>
            
        );
    }
);
const NormalApprovalInformationForm = Form.create(
    {
        constructor(props) {
            // super(props);
        },

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
        
    },

)(ApprovalInformationForm);


function ShowApproval({
    dispatch,
    total,
    current,
    approval,
}) {

    class ApprovalInformation extends React.Component {

        constructor(props) {
            super(props);
            this.dispatch = props.dispatch;
            
        }
        
        saveFormRef = (form) => {
            this.form = form;
        }
       
        render() {
            return (
                <span>
                   
                    {(<NormalApprovalInformationForm
                        approval={this.props.approval}
                        ref={this.saveFormRef}
                        
                    />)}
                </span>
            );
        }
    };

    class ApprovalDetailesSteps extends React.Component {

        constructor(props) {
            super(props);
            
            this.dispatch = props.dispatch;

        }

        render() {
           
             
            const approvalDetailsSteps = this.props.approval.approvalDetail.map(value => {
                if (value.operateTime != null) {
                    return <Step title={value.nameAndOperate} description={<div><span>{value.remark}</span> <br /> <span>{(new Date(value.operateTime)).toLocaleString()}</span></div>}/>
                }else {
                    return <Step title={value.nameAndOperate} description={value.remark} />
                }

                
            });

            return (
                <div>
                    <br />
                    <div className={styles.titleStyle}><h3>审批详情</h3></div>
                    <Steps direction="vertical" size="small" current={this.props.current}>
                        {approvalDetailsSteps}
                    </Steps>
                </div>
            );
        }
    };

    class ApprovalStatusMessage extends React.Component {

        constructor(props) {
            super(props);
           
            this.dispatch = props.dispatch;

        }
        
        render() {
            var message = "", description = "", type = "";
            if (this.props.approval.status == 1) {
                message = "审批完成（同意）";
                description = "你所提交的信息已经审核通过，请及时跟进申请状况。";
                type = "success";
            }
            if (this.props.approval.status == 2){
                message = "审批完成（拒绝）";
                description = "你所提交的信息已经被拒绝，请及时跟进申请状况。";
                type = "error";
            }
            if (this.props.approval.status == 3) {
                message = "审批中";
                description = "你所提交的信息正在等待审核，请及时跟进申请状况。";
                type = "info";
            }
            if (this.props.approval.status == 4) {
                message = "已撤回";
                description = "你所提交的信息已被撤回，请及时跟进申请状况。";
                type = "warning";
            }
             
            const isApprovalStatus = (this.props.approval.status != null)
            return (
                <div>
                    {isApprovalStatus  &&
                        <Alert
                        message={[message]}
                        description={[description]}
                        type={type}
                        showIcon
                        />}
                </div>
            );
        }
    };
    
    class WorkAttendance extends React.Component {
        state = {
            selectedRowKeys: [], // Check here to configure the default column
            selectedRows:[]
        };
        
        render() {
            const Search = Input.Search;
            const { getFieldDecorator } = this.props.form;
           
      
            return (
                <div className={styles.normal}>
                    <div className={styles.ListButton}>
                        {(<ApprovalStatusMessage
                            approval={approval}
                        />)}
                        
                    </div>
                    <hr></hr>
                    <div className={styles.informationStyle}>
                        {(<ApprovalInformation
                            approval={approval}
                        />)}
                        
                        <hr></hr>
                        {(<ApprovalDetailesSteps
                            approval={approval}
                            current={current}
                        />)}
                        <hr></hr>
                        <br />
                        <div stye={styles.titleStyle}><h3>抄送人</h3></div>
                        <br />
                        <span>抄送人(审批通过后，通知抄送人)：{approval.sendPersonNames}</span>
                    </div>
                   
                </div>
            );
        }
    }

    const WorkAttendanceForm = Form.create()(WorkAttendance);
    return <WorkAttendanceForm />;
}

function mapStateToProps(state) {
    const {
        total,
        current,
        approval,
       
    } = state.showApproval;
     
    return {
        loading: state.loading.models.showApproval,
        total,
        current,
        approval,
        
    };
}

export default connect(mapStateToProps)(ShowApproval);




