import React from "react";
import { connect } from "dva";
import {
    Button,
    Form,
    Input,
    message,
    Row,
    Col,
    Alert,
    Select,
    DatePicker,
    Upload
} from "antd";
import { routerRedux } from "dva/router";
import moment from "moment";
import "moment/locale/zh-cn";
moment.locale("zh-cn");
//import styles from "./Document.css";

class DocumentEditForm extends React.Component {
    state = {
        unfilled: 0,
        attachments: [],
        fileList: [],
    };

    beforeAttachmentsOnChange = file => {
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('单个附件应小于2M');
        }
        return isLt2M;
    };

    uploadOnChange = info => {
        
        if (info.file.status === "done") {
            
            message.success(`${info.file.name} 文件上传成功`);
            this.props.dispatch({
                type: "editDocument/addUploadFiles",
                payload: { file: info.file.response }
            });
        } else if (info.file.status === "removed") {
            
            this.props.dispatch({
                type: "editDocument/removeUploadFiles",
                payload: info.file.uid
            });
        } else if (info.file.status === "error") {
            message.error(`${info.file.name} 文件上传失败.`);
        }
    }
    
    //uploadOnChange = info => {
    //    let { attachments } = this.state;
    //    let fileList = info.fileList;

    //    // filter successfully uploaded files according to response from server
    //    fileList.filter(file => {
    //        if (file.response) {
    //            message.success(`${info.file.name} 文件上传成功.`);
    //            let maxId = attachments.length + 1;
    //            for (let file of file.response) {
    //                file.id = maxId;
    //                attachments.push(file);
    //                maxId++;
    //            }
    //            fileList = [];
    //            attachments.forEach(function (currentfile) {
    //                var file = {};
    //                file.uid = currentfile.id;
    //                file.name = currentfile.fileName;
    //                file.status = "done";
    //                file.url = currentfile.filePath;
    //                fileList.push(file);
    //            });
    //        }
    //    });
    //    //remove
    //    if (info.file.status === "removed") {
    //        let file = attachments.find(file => file.id == info.file.uid);
    //        var index = attachments.indexOf(file);
    //        if (index >= 0) {
    //            attachments.splice(index, 1);
    //        }
    //    } else if (info.file.status === "error") {
    //        message.error(`${info.file.name} 文件上传失败.`);
    //    }
    //    this.setState({ fileList, attachments });
    //};

    closeUnfilledInfo = () => {
        const unfilled = 0;
        this.setState({ unfilled });
    };

    cancel = () => {

        this.props.dispatch(
            routerRedux.push({
                pathname: "/documentList",
            })
        );
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const unfilled = 0;
                this.setState({ unfilled });
                values.attachments = this.state.attachments;
                this.props.dispatch({
                    type: "editDocument/editDocument",
                    payload: values
                });
            } else {
                const unfilled = Object.values(err).length;
                this.setState({ unfilled });
            }
        });
    };

    uploadFiles = {
        name: "file",
        action: "api/saas/uploadAttachments",
        headers: {
            authorization: "authorization-text"
        },
        onChange: this.uploadOnChange,
        beforeUpload: this.beforeAttachmentsOnChange,
        defaultFileList: this.props.documentData.attachments.map(attachment => {
            
            return {
                uid: attachment.id,
                name: attachment.fileName,
                status: "done",
                url: attachment.filePath
            };
        })
    };
    render() {
        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: {
                    span: 24
                },
                sm: {
                    span: 4
                }
            },
            wrapperCol: {
                xs: {
                    span: 24
                },
                sm: {
                    span: 20
                }
            }
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    push: 0
                },
                sm: {
                    span: 20,
                    push: 4
                }
            }
        };

        const FormItem = Form.Item;

        const { unfilled } = this.state;

        const regionsOptions = this.props.regions.map(value =>
            <Option key={value.id} value={value.id}>{value.name}</Option>
        );
        const documentCategoryOptions = this.props.documentCategories.map(value =>
            <Option key={value.id} value={value.id}>{value.name}</Option>
        );
        
        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    {unfilled > 0 &&
                        <Row gutter={8}>
                            <Col span={12}>
                                <FormItem {...tailFormItemLayout}>
                                    <Alert
                                        message={`有${unfilled}处未填写，请修正后保存`}
                                        type="error"
                                        showIcon
                                        closeText="x"
                                        onClose={this.closeUnfilledInfo}
                                    />
                                </FormItem>
                            </Col>
                        </Row>}

                    <Row gutter={8}>
                        <Col span={12}>
                            <FormItem {...formItemLayout} label="管理区" hasFeedback>
                                {getFieldDecorator("regionId", {
                                    rules: [{ required: true, message: "请选择管理区" }]
                                })(<Select placeholder="请选择">{regionsOptions}</Select>)}
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem {...formItemLayout} label="归档时间">
                                {getFieldDecorator("fileDate", {
                                    getValueProps: value => {
                                        return { value: value ? moment(value) : value };
                                    }
                                })(<DatePicker placeholder="请选择日期" style={{ width: '100%' }} showTime format="YYYY-MM-DD HH:mm:ss" />)}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={8}>
                        <Col span={12}>
                            <FormItem {...formItemLayout} label="文档编号">
                                {getFieldDecorator("number", {
                                    rules: [{ required: true, type: "string", max: 10, message: "请填写文档编号,长度不超过10" },
                                    {
                                        validator: this.handleNumberValidate
                                    },
                                    ]
                                })(<Input />)}
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem {...formItemLayout} label="起效时间">
                                {getFieldDecorator("startDate", {
                                    getValueProps: value => {
                                        return { value: value ? moment(value) : value };
                                    }
                                })(<DatePicker placeholder="请选择日期" style={{ width: '100%' }} />)}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={8}>
                        <Col span={12}>
                            <FormItem {...formItemLayout} label="文档名称" hasFeedback>
                                {getFieldDecorator("name", {
                                    rules: [{ required: true, type: "string", max: 10, message: "请填写文档名称,长度不超过10" },
                                    {
                                        validator: this.handleNumberValidate
                                    },
                                    ]
                                })(<Input />)}
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem {...formItemLayout} label="失效时间">
                                {getFieldDecorator("endDate", {
                                    getValueProps: value => {
                                        return { value: value ? moment(value) : value };
                                    }
                                })(<DatePicker placeholder="请选择日期" style={{ width: '100%' }} />)}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={8}>
                        <Col span={12}>
                            <Row gutter={8}>
                                <FormItem {...formItemLayout} label="文档类型" hasFeedback>
                                    {getFieldDecorator("documentCategoryId", {
                                        rules: [{ required: true, message: "请选择文档类型" }]
                                    })(<Select placeholder="请选择">{documentCategoryOptions}</Select>)}
                                </FormItem>
                            </Row>
                            <Row gutter={8}>
                                <FormItem {...formItemLayout} label="版本">
                                    {getFieldDecorator("version", {})(<Input />)}
                                </FormItem>
                            </Row>

                        </Col>
                        <Col span={12}>
                            <FormItem {...formItemLayout} label="备注">
                                {getFieldDecorator("remark", {
                                    rules: [{ type: "string", max: 100, message: "已超过100个字" }]
                                })(<Input type="textarea" placeholder="请输入" rows={4} />)}
                            </FormItem>
                        </Col>
                    </Row>

                    <Row gutter={8}>
                        <Col span={12}>
                            <FormItem {...formItemLayout} label="添加附件">
                                <Upload {...this.uploadFiles } >
                                    <a>点击添加（单个附件应小于2M）</a>
                                </Upload>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={8}>
                        <Col span={12}>
                            <FormItem {...tailFormItemLayout} label="">
                                <Button type="primary" htmlType="submit">保存</Button>
                                <Button type="default" onClick={this.cancel}>取消</Button>
                            </FormItem>

                        </Col>
                    </Row>
                </Form>
            </div>
        );
    }
}

const WrappedDocumentEditForm = Form.create({
    mapPropsToFields(props) {
        const fields = {};
        Object.keys(props.documentData).forEach(key => {
            fields[key] = {
                value: props.documentData[key]
            };
        });
        return {
            ...fields
        };
    },
    onFieldsChange(props, changedFields) {
        const key = Object.keys(changedFields)[0];
        props.dispatch({
            type: "editDocument/changeField",
            payload: {
                key,
                value: changedFields[key].value
            }
        });
    }
})(DocumentEditForm);

function mapStateToProps(state) {
    return {
        loading: state.loading.models.editDocument,
        ...state.editDocument
    };
}

export default connect(mapStateToProps)(WrappedDocumentEditForm);
