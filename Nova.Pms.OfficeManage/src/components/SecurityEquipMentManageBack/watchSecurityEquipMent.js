import React from 'react';
import { connect } from 'dva';
import { Table, Pagination, Popconfirm, Modal, Button, Form, Input, Menu, Dropdown, Icon, DatePicker, Upload, message, Row, Col, Select } from 'antd';
import { routerRedux } from 'dva/router';
import moment from 'moment';
import styles from './securityEquipMentList.css';

const Option = Select.Option;
const FormItem = Form.Item;



class NormalWatchSecurityEquipMentFormForm extends React.Component {
    cancle = () => {
        this.props.dispatch(routerRedux.push({
            pathname: '/securityEquipMentList',
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


        const regionOptions = this.props.regionList.map(value =>
            <Option key={value.id} value={value.id}>{value.name}</Option>
        );
        const departmentOptions = this.props.departmentList.map(value =>
            <Option key={value.id} value={value.id}>{value.name}</Option>
        );
        const responsibilityPersonOptions = this.props.staffList.map(value =>
            <Option key={value.id} value={value.id}>{value.name}</Option>
        );

        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <Row gutter={8}>
                        <Col span={16}>
                            <FormItem {...formItemLayout} label="管理区">
                                {getFieldDecorator('regionId', {
                                    initialValue: this.props.securityEquipMent.regionId,
                                })(
                                    <Select
                                        mode="combobox "
                                        placeholder="请选择"
                                        //onChange={handleChange}
                                        style={{ width: '100%' }}
                                        disabled
                                    >
                                        {regionOptions}
                                    </Select>

                                    )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={8}>
                        <Col span={16}>
                            <FormItem {...formItemLayout} label="名称">
                                {getFieldDecorator('name', {
                                    initialValue: this.props.securityEquipMent.name,
                                })(<Input disabled />)}
                            </FormItem>

                        </Col>
                    </Row>
                    <Row gutter={8}>
                        <Col span={16}>
                            <FormItem
                                {...formItemLayout}
                                label="类型"
                            //hasFeedback
                            >
                                {getFieldDecorator('type', {
                                    initialValue: this.props.securityEquipMent.type,
                                })(
                                    <Select
                                        mode="combox"
                                        placeholder="请选择"
                                        //onChange={handleChange}
                                        style={{ width: '100%' }}
                                        disabled
                                    >
                                       
                                    </Select>

                                    )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={8}>
                        <Col span={16}>
                            <FormItem {...formItemLayout} label="地点/区域">
                                {getFieldDecorator('place', {
                                    initialValue: this.props.securityEquipMent.place,
                                })(<Input disabled />)}
                            </FormItem>
                        </Col>

                    </Row>
                    <Row gutter={8}>
                        <Col span={16}>
                            <FormItem {...formItemLayout} label="规格型号">
                                {getFieldDecorator('SpecificationModel', {
                                    initialValue: this.props.securityEquipMent.specificationModel,
                                })(<Input disabled />)}
                            </FormItem>
                        </Col>

                    </Row>
                    <Row gutter={8}>
                        <Col span={16}>
                            <FormItem
                                {...formItemLayout}
                                label="责任人"
                            //hasFeedback
                            >
                                {getFieldDecorator('responsibilityPersonId', {
                                    initialValue: this.props.securityEquipMent.responsibilityPersonId,
                                })(
                                    <Select
                                        mode="combox"
                                        placeholder="请选择"
                                        //onChange={handleChange}
                                        style={{ width: '100%' }}
                                        disabled
                                    >
                                        {responsibilityPersonOptions}
                                    </Select>

                                    )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={8}>
                        <Col span={16}>
                            <FormItem
                                {...formItemLayout}
                                label="责任部门"
                            //hasFeedback
                            >
                                {getFieldDecorator('departmentId', {
                                    initialValue: this.props.securityEquipMent.departmentId,
                                })(
                                    <Select
                                        mode="combox"
                                        placeholder="请选择"
                                        style={{ width: '100%' }}
                                        disabled
                                    >
                                        {departmentOptions}
                                    </Select>

                                    )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={8}>
                        <Col span={16}>
                            <FormItem {...formItemLayout} label="数量">
                                {getFieldDecorator('quantity', {
                                    initialValue: this.props.securityEquipMent.quantity,
                                })(<Input disabled />)}
                            </FormItem>
                        </Col>

                    </Row>
                    <Row gutter={8}>
                        <Col span={16}>
                            <FormItem {...formItemLayout} label="备注">
                                {getFieldDecorator('remak', {
                                    initialValue: this.props.securityEquipMent.remark,
                                })(<Input disabled />)}
                            </FormItem>
                        </Col>

                    </Row>
                    <Row gutter={8}>
                        <Col span={16}>
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
const WatchSecurityEquipMentForm = Form.create()(NormalWatchSecurityEquipMentFormForm);

function mapStateToProps(state) {
    const { securityEquipMent, regionList, departmentList, staffList } = state.watchSecurityEquipMent;
    return {
        loading: state.loading.models.watchSecurityEquipMent,
        securityEquipMent: securityEquipMent,
        regionList: regionList,
        departmentList: departmentList,
        staffList: staffList,
    };
}

export default connect(mapStateToProps)(WatchSecurityEquipMentForm);