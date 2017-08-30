import React from 'react';
import { connect } from 'dva';
import { Table, Pagination, Popconfirm, Modal, Button, Form, Input, Menu, Dropdown, Icon, DatePicker, Upload, message, Row, Col, Select } from 'antd';
import { routerRedux } from 'dva/router';
import moment from 'moment';
import styles from './workingPlanList.css';

const Option = Select.Option;
const FormItem = Form.Item;


class NormalWorkingPlanForm extends React.Component {
    cancle = () => {
        this.props.dispatch(routerRedux.push({
            pathname: '/workingPlanList',
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


        const regionOptions = this.props.regionList.map(value =>
            <Option key={value.id} value={value.id}>{value.name}</Option>
        );
        const departmentOptions = this.props.departmentList.map(value =>
            <Option key={value.id} value={value.id}>{value.name}</Option>
        );
        const staffOptions = this.props.staffList.map(value =>
            <Option key={value.id} value={value.id}>{value.name}</Option>
        );
        const officeManagementCategoryOptions = this.props.officeManagementCategoryList.map(value =>
            <Option key={value.id} value={value.id}>{value.name}</Option>
        );
        
        const userOptions = this.props.userList.map(value =>
            <Option key={value.id} value={value.id}>{value.name}</Option>
        );

        return (
            <div>             
                    <Form onSubmit={this.handleSubmit} >
                        <div className={styles.title}>
                            <h1>基本信息</h1>
                            <hr></hr>
                        </div>
                        <Row gutter={20}>
                            <Col span={12}>
                                <FormItem {...formItemLayout} label="管理区">
                                    {getFieldDecorator('regionId', {
                                    })(
                                        <Select
                                            style={{ width: '100%' }}
                                            disabled
                                        >
                                        {regionOptions}
                                        </Select>
                                        )}
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem {...formItemLayout} label="计划开始时间">
                                {getFieldDecorator('startDate', {
                                    getValueProps: value => {
                                        return { value: value ? moment(value) : value };
                                    }
                                })(<DatePicker style={{ width: '100%' }} disabled />)}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row gutter={20}>
                            <Col span={12}>
                                <FormItem {...formItemLayout} label="部门">
                                    {getFieldDecorator('departmentId', {
                                    })(
                                        <Select
                                            style={{ width: '100%' }}
                                            disabled
                                        >
                                        {departmentOptions}
                                        </Select>
                                        )}
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem {...formItemLayout} label="计划结束时间">
                                {getFieldDecorator('endDate', {
                                    getValueProps: value => {
                                        return { value: value ? moment(value) : value };
                                    }
                                })(<DatePicker style={{ width: '100%' }} disabled />)}
                                </FormItem>
                            </Col>
                        </Row>

                        <Row gutter={20}>
                            <Col span={12}>
                                <FormItem {...formItemLayout} label="序号">
                                    {getFieldDecorator('number', {
                                    })(<Input disabled />)}
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem {...formItemLayout} label="地点">
                                    {getFieldDecorator('place', {
                                    })(<Input disabled />)}
                                </FormItem>
                            </Col>
                        </Row>

                        <Row gutter={20}>
                            <Col span={12}>
                                <row>
                                    <FormItem {...formItemLayout} label="计划名称">
                                        {getFieldDecorator('name', {  
                                        })(<Input disabled />)}
                                    </FormItem>
                                </row>
                                <row>
                                    <FormItem {...formItemLayout} label="计划类别">
                                        {getFieldDecorator('officeManagementCategoryId', {
                                        })(
                                            <Select
                                                style={{ width: '100%' }}
                                                disabled

                                        >
                                            {officeManagementCategoryOptions}
                                            </Select>
                                            )}
                                    </FormItem>
                                </row>
                            </Col>
                            <Col span={12}>
                                <FormItem {...formItemLayout} label="计划内容">
                                    {getFieldDecorator('planContent', {  
                                    })(<Input type="textarea" rows={4} disabled />)}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row gutter={20}>
                            <Col span={12}>
                                <FormItem {...formItemLayout} label="召集人">
                                    {getFieldDecorator("headId", {
                                    })(<Select disabled>{staffOptions}</Select>)}
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem {...formItemLayout} label="创建人">
                                    {getFieldDecorator("operatorId", {
                                })(<Select disabled>{userOptions}</Select>)}
                                </FormItem>
                            </Col>
                        </Row>

                        <Row gutter={20}>
                            <Col span={12}>
                                <FormItem {...formItemLayout} label="负责人">
                                    {getFieldDecorator('convenorId', {
                                    })(<Select disabled>{staffOptions}</Select>)}
                                </FormItem>
                            </Col>
                            <Col span={12} >
                                <FormItem {...formItemLayout} label="创建时间">
                                {getFieldDecorator('actualEndDate', {  
                                    getValueProps: value => {
                                        return { value: value ? moment(value) : value };
                                    }
                                    })(<DatePicker disabled style={{ width: '100%' }} />)}
                                </FormItem>
                            </Col>
                        </Row>

                        <Row gutter={20}>
                            <Col span={12}>
                                <FormItem {...formItemLayout} label="参加人员">
                                    {getFieldDecorator("workingPlanMembers", {
                                })(<Select mode="multiple" disabled>{staffOptions}</Select>)}
                                </FormItem>
                            </Col>
                            <Col span={12} >
                                <FormItem {...formItemLayout} label="状态">
                                    {getFieldDecorator('state', {
                                    })(
                                        <Select
                                            style={{ width: '100%' }}
                                            disabled
                                        >
                                            <Option value={0}>未开始</Option>
                                            <Option value={1}>进行中</Option>
                                            <Option value={2}>已完成</Option>
                                            <Option value={3}>暂停</Option>
                                        </Select>
                                        )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row type="flex" justify="start">
                            <Col span={24}>
                            <FormItem {...formLongItemLayout} label="备注">
                                    {getFieldDecorator('remark', {
                                    })
                                        (<Input type="textarea" rows={4} disabled />)}
                                </FormItem>
                            </Col>
                        </Row>
                        <div className={styles.title}>
                            <h1>审核信息</h1>
                            <hr></hr>
                        </div>
                        <Row gutter={20}>
                            <Col span={12}>
                                <FormItem {...formItemLayout} label="审核状态">
                                {getFieldDecorator('auditState', {

                                })(<Select
                                        style={{ width: '100%' }}
                                        disabled
                                    >
                                    <Option value={true}>已审核</Option>
                                    <Option value={false}>未审核</Option>
                                </Select>)}
                                </FormItem>
                            </Col>
                            <Col span={12} >
                                <FormItem {...formItemLayout} label="审核时间">
                                {getFieldDecorator('auditDate', {
                                    getValueProps: value => {
                                        return { value: value ? moment(value) : value };
                                    }
                                    })(<DatePicker style={{ width: '100%' }} disabled />)}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row gutter={20}>
                            <Col span={12}>
                                <FormItem {...formItemLayout} label="审核人">
                                    {getFieldDecorator("auditorId", {
                                    })(<Select disabled>{userOptions}</Select>)}
                                </FormItem>
                            </Col>
                        </Row>
                        <div className={styles.title}>
                            <h1>完成情况</h1>
                            <hr></hr>
                        </div>
                        <Row gutter={20}>
                            <Col span={12}>
                                <FormItem {...formItemLayout} label="实际开始时间">
                                {getFieldDecorator('actualStartDate', {
                                    getValueProps: value => {
                                        return { value: value ? moment(value) : value };
                                    }
                                    })(<DatePicker style={{ width: '100%' }} disabled />)}
                                </FormItem>
                            </Col>
                            <Col span={12} >
                                <FormItem {...formItemLayout} label="实际结束时间">
                                {getFieldDecorator('actualEndDate', {
                                    getValueProps: value => {
                                        return { value: value ? moment(value) : value };
                                    }
                                    })(<DatePicker style={{ width: '100%' }} disabled />)}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row gutter={20}>
                            <Col span={24}>
                            <FormItem {...formLongItemLayout} label="完成情况">
                                    {getFieldDecorator('completion', {
                                    })(<Input type="textarea" rows={4} disabled />)}
                            </FormItem>
                            </Col>
                        </Row>
                        <Row gutter={20}>
                            <Col span={24}>
                                <FormItem {...tailFormItemLayout}>
                                    <Button type="primary" onClick={this.cancle}>返回</Button>
                                </FormItem>
                            </Col>
                        </Row>
                    </Form>
            </div>
        );
    }
}
const WorkingPlanForm = Form.create({
    mapPropsToFields(props) {
        const fields = {};
        Object.keys(props.workingPlan).forEach(key => {
            fields[key] = {
                value: props.workingPlan[key]
            };
        });
        return {
            ...fields
        };
    }
})(NormalWorkingPlanForm);

function mapStateToProps(state) {
    const { workingPlan, regionList, departmentList, staffList, officeManagementCategoryList, userList } = state.watchWorkingPlan;
    return {
        workingPlan,
        regionList,
        departmentList,
        staffList,
        officeManagementCategoryList,
        userList,
    };
}

export default connect(mapStateToProps)(WorkingPlanForm);