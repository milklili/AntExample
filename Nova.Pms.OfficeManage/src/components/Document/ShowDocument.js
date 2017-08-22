import React from 'react';
import { connect } from 'dva';
import { Button, Form, Input, message, Row, Col, Alert, Select, DatePicker, Upload } from 'antd';
import { routerRedux } from 'dva/router';
import moment from 'moment';
import styles from './Document.css';

class NormalDocumentCategoryForm extends React.Component {
    cancle = () => {
        this.props.dispatch(routerRedux.push({
            pathname: '/documentList',
        }));
    }
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
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    push: 0,
                },
                sm: {
                    span: 20,
                    push: 4,
                },
            },
        };

        const uploadFiles = {
            name: 'file',
            headers: {
                authorization: 'authorization-text',
            },
            fileList: this.props.documentData.attachments.map(attachment => {
                return {
                    uid: attachment.id,
                    name: attachment.fileName,
                    status: "done",
                    url: attachment.filePath
                };
            }),
        };


        const regionsOptions = this.props.regions.map(value => <Option key={value.id} value={value.id}>{value.name}</Option>);
        const documentCategoryOptions = this.props.documentCategory.map(value => <Option key={value.id} value={value.id}>{value.name}</Option>);

        return (
            <div>
                <Form>
                    <Row gutter={8}>
                        <Col span={12}>
                            <FormItem {...formItemLayout} label="管理区">
                                {
                                    getFieldDecorator(
                                        'regionId',
                                        {
                                            //initialValue: this.props.documentData.regionId,
                                        }
                                    )(<Select disabled>{regionsOptions}</Select>)
                                }
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem {...formItemLayout} label="归档时间">
                                {getFieldDecorator('fileDate', {
                                    getValueProps: value => {
                                        return { value: value ? moment(value) : value };
                                    }
                                })(<DatePicker disabled style={{ width: '100%' }}/>)}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={8}>
                        <Col span={12}>
                            <FormItem {...formItemLayout} label="文档编号">
                                {getFieldDecorator('number', {
                                    //initialValue: this.props.documentData.number,
                                })(<Input disabled />)}
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem {...formItemLayout} label="起效时间">
                                {getFieldDecorator('startDate', {
                                    getValueProps: value => {
                                        return { value: value ? moment(value) : value };
                                    }
                                })(<DatePicker disabled style={{ width: '100%' }}/>)}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={8}>
                        <Col span={12}>
                            <FormItem {...formItemLayout} label="文档名称">
                                {getFieldDecorator('name', {
                                    //initialValue: this.props.documentData.name,
                                })(<Input disabled />)}
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem {...formItemLayout} label="失效时间">
                                {getFieldDecorator('endDate', {
                                    getValueProps: value => {
                                        return { value: value ? moment(value) : value };
                                    }
                                })(<DatePicker disabled style={{ width: '100%' }}/>)}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={8}>
                        <Col span={12}>
                            <Row gutter={8}>
                                <FormItem {...formItemLayout} label="文档类型" >
                                    {getFieldDecorator("documentCategoryId", {
                                        rules: [{ required: true, message: "请选择文档类型" }]
                                    })(<Select placeholder="请选择" disabled>{documentCategoryOptions}</Select>)}
                                </FormItem>
                            </Row>
                            <Row gutter={8}>
                                <FormItem {...formItemLayout} label="版本">
                                    {getFieldDecorator("version", {})(<Input disabled/>)}
                                </FormItem>
                            </Row>
                        </Col>
                        <Col span={12}>
                            <FormItem {...formItemLayout} label="备注">
                                {getFieldDecorator('remark', {
                                    //initialValue: this.props.documentData.remark,
                                })(<Input type="textarea" disabled rows={4}/>)}
                            </FormItem>
                        </Col>
                    </Row>
                    
                    <Row gutter={8}>
                        <Col span={12}>
                            <FormItem {...formItemLayout} label="附件">
                                <Upload {...uploadFiles} disabled>
                                </Upload>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={8}>
                        <Col span={12}>
                            <FormItem {...tailFormItemLayout} label="">
                                <Button type="default" onClick={this.cancle}>返回</Button>
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
            </div>
        );
    }
}
const DocumentCategoryForm = Form.create({
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
    
})(NormalDocumentCategoryForm);

function mapStateToProps(state) {
    const { regions, documentCategory, documentData } = state.showDocument;  
    return {
        loading: state.loading.models.showDocument,
        regions,
        documentCategory,
        documentData,
    };
}

export default connect(mapStateToProps)(DocumentCategoryForm);
