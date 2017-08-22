import React from 'react';
import { connect } from 'dva';
import {
    Table,
    Pagination,
    Popconfirm,
    Alert, Modal,
    Button,
    Form,
    Input,
    Menu,
    Dropdown,
    Icon,
    DatePicker,
    Upload,
    message,
    Row,
    Col,
    Select,
} from 'antd';
import { routerRedux } from 'dva/router';
import moment from 'moment';
import styles from './securityEquipMentList.css';

const Option = Select.Option;
const FormItem = Form.Item;



class SecurityEquipMentCreateForm extends React.Component {

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
                pathname: "/securityEquipMentList"
            })
        );
    };

    selectRegion = (value) => {
        this.props.dispatch({
            type: "createSecurityEquipMent/selectRegion",
            payload: value
        });
    }

    handleSubmit = e => {
        e.preventDefault();
        debugger;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const unfilled = 0;
                this.setState({ unfilled });

                this.props.dispatch({
                    type: "createSecurityEquipMent/addSecurityEquipMent",
                    payload: values
                });
            } else {
                const unfilled = Object.values(err).length;
                this.setState({ unfilled });
            }
        });
    };
    cancel = () => {
        this.props.dispatch(
            routerRedux.push({
                pathname: "/securityEquipMentList"
            })
        );
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

        const regionOptions = this.props.regionList.map(value =>
            <Option key={value.id} value={value.id}>{value.name}</Option>
        );
        const departmentOptions = this.props.departmentList.map(value =>
            <Option key={value.id} value={value.id}>{value.name}</Option>
        );
        const responsibilityPersonOptions = this.props.staffList.map(value =>
            <Option key={value.id} value={value.id}>{value.name}</Option>
        );

        const isSelectRegion = this.props.securityEquipMent.regionId != null && this.props.securityEquipMent.regionId > 0;

        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    {unfilled > 0 &&
                        <Row gutter={8}>
                            <Col span={16}>
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
                        <Col span={16}>
                            <FormItem {...formItemLayout} label="管理区" >
                                {getFieldDecorator('regionId', {
                                    rules: [{ required: true, message: '请选择管理区!' }],
                                })(
                                    <Select
                                        mode="combobox "
                                        placeholder="请选择"
                                        onChange={this.selectRegion}
                                        style={{ width: '100%' }}
                                    >
                                    {regionOptions}
                                    </Select>

                                    )}
                            </FormItem>
                        </Col>                      
                    </Row>
                    <Row gutter={8}>
                        <Col span={16}>                          
                            <FormItem {...formItemLayout} label="名称" placeholder="请输入">
                                {getFieldDecorator('name', {
                                    rules: [{ required: true, message: '请输入名称!' }],
                                })(<Input />)}
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
                                    rules: [{ required: true, message: '请选择类型!' }],
                                })(
                                    <Select
                                        mode="combox"
                                        placeholder="请选择"
                                        //onChange={handleChange}
                                        style={{ width: '100%' }}
                                    >
                                        <Option value="消防设施设备">消防设施设备</Option>
                                        <Option value="消防器材">消防器材</Option>
                                        <Option value="保安器材">保安器材</Option>
                                    </Select>

                                    )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={8}>
                        <Col span={16}>
                            <FormItem {...formItemLayout} label="地点/区域">
                                {getFieldDecorator('place', {
                                    //initialValue: securityEquipMent.name,
                                    rules: [{ required: true, message: '请输入地点/区域!' }],
                                })(<Input />)}
                            </FormItem>
                        </Col>

                    </Row>
                    <Row gutter={8}>
                        <Col span={16}>
                            <FormItem {...formItemLayout} label="规格型号">
                                {getFieldDecorator('SpecificationModel', {
                                    //initialValue: securityEquipMent.name,
                                    rules: [{ required: true, message: '请输入规格型号!' }],
                                })(<Input />)}
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
                                    rules: [{ required: true, message: '请选择责任人!' }],
                                })(
                                    <Select
                                        mode="combox"
                                        placeholder="请选择"
                                        //onChange={handleChange}
                                        style={{ width: '100%' }}
                                        disabled={!isSelectRegion}
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
                                })(
                                    <Select
                                        mode="combox"
                                        placeholder="请选择"
                                        style={{ width: '100%' }}
                                        disabled={!isSelectRegion}
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
                                    //initialValue: securityEquipMent.name,
                                    rules: [{ required: true, message: '请输入数量!'}],
                                })(<Input />)}
                            </FormItem>
                        </Col>

                    </Row>
                    <Row gutter={8}>
                        <Col span={16}>
                            <FormItem {...formItemLayout} label="备注">
                                {getFieldDecorator('remark', {
                                })(<Input />)}
                            </FormItem>
                        </Col>

                    </Row>
                    <Row gutter={8}>
                        <Col span={16}>
                            <FormItem {...tailFormItemLayout}>
                                <Button type="primary" className={styles.btnPadding} htmlType="submit" size="large">保存</Button>
                                <Button type="cancel" onClick={this.cancel}>取消</Button>
                            </FormItem>
                        </Col>
                    </Row>

                </Form>
            </div>
        );
    }
}


const WrappedSecurityEquipMentCreateForm = Form.create({
    mapPropsToFields(props) {
        const fields = {};
        Object.keys(props.securityEquipMent).forEach(key => {
            fields[key] = {
                value: props.securityEquipMent[key]
            };
        });
        return {
            ...fields
        };
    },
    onFieldsChange(props, changedFields) {
        debugger;
        const key = Object.keys(changedFields)[0];
        props.dispatch({
            type: "createSecurityEquipMent/changeField",
            payload: {
                key,
                value: changedFields[key].value
            }
        });
    }
})(SecurityEquipMentCreateForm);

function mapStateToProps(state) {   

    const { securityEquipMent, regionList, departmentList, staffList } = state.createSecurityEquipMent;

    debugger;
    return {
        loading: state.loading.models.createSecurityEquipMent,
        securityEquipMent: securityEquipMent,
        regionList: regionList,
        departmentList: departmentList,
        staffList: staffList,
    };
}
export default connect(mapStateToProps)(WrappedSecurityEquipMentCreateForm);

