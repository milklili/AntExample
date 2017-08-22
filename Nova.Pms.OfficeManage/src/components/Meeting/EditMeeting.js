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

class MeetingForm extends React.Component {
    state = {
        unfilled: 0
    };
    closeUnfilledInfo = () => {
        const unfilled = 0;
        this.setState({ unfilled });
    };
    cancel = () => {
        this.props.dispatch(
            routerRedux.push({
                pathname: "/meeting"
            })
        );
    };
    selectRegion = (value) => {
        this.props.dispatch({
            type: "editMeeting/selectRegion",
            payload: value
        });
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const unfilled = 0;
                this.setState({ unfilled });

                this.props.dispatch({
                    type: "editMeeting/editMeeting",
                    payload: values
                });
            } else {
                const unfilled = Object.values(err).length;
                this.setState({ unfilled });
            }
        });
    };
    handleNumberValidate = (rule, value, callback) => {
        if (value != null && value != "" && !((/^[A-Za-z0-9]+$/).test(value))) {
            callback('序号格式错误');
        }
        callback();
    } 
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
        const formItemRowLayout = {
            labelCol: {
                xs: {
                    span: 24
                },
                sm: {
                    span: 2
                }
            },
            wrapperCol: {
                xs: {
                    span: 24
                },
                sm: {
                    span: 22
                }
            }
        }
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

        const regionOptions = this.props.regions.map(value =>
            <Option key={value.id} value={value.id}>{value.name}</Option>
        );
        const meetingCategoryOptions = this.props.meetingCategorys.map(value =>
            <Option key={value.id} value={value.id}>{value.name}</Option>
        );
        const staffOptions = this.props.staffs.map(value =>
            <Option key={value.id} value={value.id}>{value.name}</Option>
        );
        const departmentOptions = this.props.departments.map(value =>
            <Option key={value.id} value={value.id}>{value.name}</Option>
        );
        const isSelectRegion = this.props.formData.regionId != null && this.props.formData.regionId > 0;

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
                                })(<Select onChange={this.selectRegion} placeholder="请选择">{regionOptions}</Select>)}
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem {...formItemLayout} label="开始时间">
                                {getFieldDecorator("startDate", {
                                    getValueProps: value => {
                                        return { value: value ? moment(value) : value };
                                    }
                                })(<DatePicker placeholder="请输入" style={{ width: '100%' }}/>)}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={8}>
                        <Col span={12}>
                            <FormItem {...formItemLayout} label="部门">
                                {getFieldDecorator("departmentId", {
                                })(<Select disabled={!isSelectRegion} placeholder="请选择">{departmentOptions}</Select>)}
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem {...formItemLayout} label="结束时间">
                                {getFieldDecorator("endDate", {
                                    getValueProps: value => {
                                        return { value: value ? moment(value) : value };
                                    }
                                })(<DatePicker laceholder="请输入" style={{ width: '100%' }}/>)}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={8}>
                        <Col span={12}>
                            <FormItem {...formItemLayout} label="序号">
                                {getFieldDecorator("number", {
                                    rules: [{ type: "string", max: 8, required: true, message: "请填写序号" },
                                    {
                                        validator: this.handleNumberValidate
                                    },
                                    ]
                                })(<Input placeholder="请输入8位由数字和字母组成的序号"/>)}
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem {...formItemLayout} label="地点">
                                {getFieldDecorator("place", {
                                })(<Input placeholder="请输入"/>)}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={8}>
                        <Col span={12}>
                            <FormItem {...formItemLayout} label="会议名称">
                                {getFieldDecorator("name", {
                                    rules: [{ required: true, message: "请填写会议名称" }]
                                })(<Input placeholder="请输入"/>)}
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem {...formItemLayout} label="召集人">
                                {getFieldDecorator("convenorId", {
                                })(<Select placeholder="请选择" disabled={!isSelectRegion}>{staffOptions}</Select>)}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={8}>
                        <Col span={12}>
                            <FormItem {...formItemLayout} label="会议类别">
                                {getFieldDecorator("officeManagementCategoryId", {
                                    rules: [{ required: true, message: "请选择会议类别" }]
                                })(<Select placeholder="请选择">{meetingCategoryOptions}</Select>)}
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem {...formItemLayout} label="主持人">
                                {getFieldDecorator("compereId", {
                                })(<Select placeholder="请选择" disabled={!isSelectRegion}>{staffOptions}</Select>)}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={8}>
                        <Col span={24}>
                            <FormItem {...formItemRowLayout} label="参加人员">
                                {getFieldDecorator("members", {
                                })(<Select placeholder="请选择" mode="multiple" disabled={!isSelectRegion}>{staffOptions}</Select>)}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={8}>
                        <Col span={24}>
                            <FormItem {...formItemRowLayout} label="会议主题">
                                {getFieldDecorator("meetingTheme", {
                                    rules: [{ type: "string", max: 50, message: "已超过50个字" }]
                                })(<Input placeholder="请输入"/>)}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={8}>
                        <Col span={24}>
                            <FormItem {...formItemRowLayout} label="会议内容">
                                {getFieldDecorator("meetingContent", {
                                    rules: [{ type: "string", max: 300, message: "已超过300个字" }]
                                })(<Input type="textarea" placeholder="请输入"/>)}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={8}>
                        <Col span={24}>
                            <FormItem {...formItemRowLayout} label="备注">
                                {getFieldDecorator("remark", {
                                })(<Input type="textarea" placeholder="请输入"/>)}
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

const WrappedMeetingEditForm = Form.create({
    mapPropsToFields(props) {
        const fields = {};
        Object.keys(props.formData).forEach(key => {
            fields[key] = {
                value: props.formData[key]
            };
        });
        return {
            ...fields
        };
    },
    onFieldsChange(props, changedFields) {
        const key = Object.keys(changedFields)[0];
        props.dispatch({
            type: "editMeeting/changeField",
            payload: {
                key,
                value: changedFields[key].value
            }
        });
    }
})(MeetingForm);

function mapStateToProps(state) {
    const { regions, meetingCategorys, departments, staffs, formData } = state.editMeeting;
    return {
        regions,
        meetingCategorys,
        departments,
        staffs,
        formData
    };
}

export default connect(mapStateToProps)(WrappedMeetingEditForm);
