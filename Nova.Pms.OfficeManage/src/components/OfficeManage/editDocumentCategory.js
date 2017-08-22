import React from 'react';
import { connect } from 'dva';
import { Button, Form, Input, message, Row, Col, Alert } from 'antd';
import { routerRedux } from 'dva/router';
import styles from './OfficeManage.css';


class NormalDocumentCategoryForm extends React.Component {
    state = {
        unfilled: 0
    };
    closeUnfilledInfo = () => {
        const unfilled = 0;
        this.setState({ unfilled });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const unfilled = 0;
                this.setState({ unfilled });
                this.props.dispatch({
                    type: 'editDocumentCategory/editDocumentCategory',
                });
            } else {
                const unfilled = Object.values(err).length;
                this.setState({ unfilled });
            }
        });
    };
    cancle = () => {
        this.props.dispatch(routerRedux.push({
            pathname: '/officeManageList',
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
                    span: 10,
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
                    span: 10,
                    push: 4,
                },
            },
        };
        const { unfilled } = this.state;
        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    {unfilled > 0 &&
                        <Row gutter={8}>
                            <Col span={20}>
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
                        <Col span={20}>
                            <FormItem {...formItemLayout} label="文档类别名称">
                                {getFieldDecorator('name', {
                                    rules: [{ required: true, type: "string", max: 30, message: "请输入文档类别名称,不超过30个字!" }]
                                })(<Input />)}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={8}>
                        <Col span={20}>
                            <FormItem  {...formItemLayout} label="备注">
                                {getFieldDecorator('remark', {
                                    rules: [{ type: "string", max: 300, message: "请输入备注,不超过300个字!" }]
                                })(<Input type="textarea" />)}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={8}>
                        <Col span={20}>
                            <FormItem {...tailFormItemLayout} label="">
                                <Button type="primary" htmlType="submit" >保存</Button>
                                <Button type="default" onClick={this.cancle}>取消</Button>
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
        Object.keys(props.documentCategory).forEach(key => {
            fields[key] = {
                value: props.documentCategory[key]
            };
        });
        return {
            ...fields
        };
    },
    onFieldsChange(props, changedFields) {
        const key = Object.keys(changedFields)[0];
        props.dispatch({
            type: "editDocumentCategory/changeField",
            payload: {
                key,
                value: changedFields[key].value
            }
        });
    }
})(NormalDocumentCategoryForm);

function mapStateToProps(state) {
    const { documentCategory } = state.editDocumentCategory;
    return {
        documentCategory
    };
}

export default connect(mapStateToProps)(DocumentCategoryForm);
