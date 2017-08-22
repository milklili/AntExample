import React from 'react';
import { connect } from 'dva';
import { Table, Pagination, Popconfirm, Modal, Button, Form, Input, Menu, Dropdown, Icon, DatePicker, Upload, message, Row, Col, Select } from 'antd';
import { routerRedux } from 'dva/router';
import moment from 'moment';
import styles from './ContractList.css';

const FormItem = Form.Item;
const Option = Select.Option;
const CollectionCreateForm = Form.create()(
    (props) => {
        const { visible, onCancel, onCreate, form } = props;        
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
                title="新建其他联系人"
                okText="确定"
                onCancel={onCancel}
                onOk={onCreate}>
                <Form>
                    <Row gutter={8}>
                        <Col span={12}>
                            <FormItem {...formItemLayout} label="姓名">
                                {getFieldDecorator('name', {
                                    rules: [{ required: true, message: 'Please input the name of User!' }],
                                })(<Input />)}
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem {...formItemLayout} label="性别" >
                                {getFieldDecorator('sex', { initialValue: "男" })(<Select style={{ width: 120 }}>
                                    <Option value="0">男</Option>
                                    <Option value="1">女</Option>
                                </Select>)}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={8}>
                        <Col span={12}>
                            <FormItem {...formItemLayout} label="称呼" >
                                {getFieldDecorator('salutation')(<Input />)}
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem {...formItemLayout} label="职位" >
                                {getFieldDecorator('position')(<Input />)}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={8}>
                        <Col span={12}>
                            <FormItem {...formItemLayout} label="手机" >
                                {getFieldDecorator('mobile')(<Input />)}
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem  {...formItemLayout} label="微信" >
                                {getFieldDecorator('weixin')(<Input />)}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={8}>
                        <Col span={24}>
                            <FormItem  {...formItemRow} label="备注">
                                {getFieldDecorator('remark')(<Input type="textarea" />)}
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        );
    }
);

const CollectionEditForm = Form.create()(
    (props) => {
        const { visible, onCancel, onCreate, form, userData} = props;
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
                title="编辑其他联系人"
                okText="确定"
                onCancel={onCancel}
                onOk={onCreate}>
                <Form>
                    <Row gutter={8}>
                        <Col span={12}>
                            <FormItem {...formItemLayout} label="姓名">
                                {getFieldDecorator('name', {
                                    initialValue: userData.name,
                                    rules: [{ required: true, message: 'Please input the name of User!' }],
                                })(<Input />)}
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem {...formItemLayout} label="性别" >
                                {getFieldDecorator('sex', { initialValue: userData.sex == 0 || userData.sex == "男" ? "男" : "女" })(<Select style={{ width: 120 }}>
                                    <Option value="0">男</Option>
                                    <Option value="1">女</Option>
                                </Select>)}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={8}>
                        <Col span={12}>
                            <FormItem {...formItemLayout} label="称呼" >
                                {getFieldDecorator('salutation', {
                                    initialValue: userData.salutation,
                                })(<Input />)}
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem {...formItemLayout} label="职位" >
                                {getFieldDecorator('position', {
                                    initialValue: userData.position,
                                })(<Input />)}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={8}>
                        <Col span={12}>
                            <FormItem {...formItemLayout} label="手机" >
                                {getFieldDecorator('mobile', {
                                    initialValue: userData.mobile,
                                })(<Input />)}
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem  {...formItemLayout} label="微信" >
                                {getFieldDecorator('weixin', {
                                    initialValue: userData.weixin,
                                })(<Input />)}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={8}>
                        <Col span={24}>
                            <FormItem  {...formItemRow} label="备注">
                                {getFieldDecorator('remark', {
                                    initialValue: userData.remark,
                                })(<Input type="textarea" />)}
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        );
    }
);

function editContract({ dispatch, cityData, streetRegisterData, streetWarkingData, contacts, contract, files, loading}) {
    var options = {
        province: 0,               //省份,可以为地区编码或者名称
        city: 0,                   //城市,可以为地区编码或者名称
        area: 0,                   //地区,可以为地区编码或者名称
        required: true,            //是否必须选一个
    };

    var areaList = GetAreaList(options, cityData);

    var registerAreaList = {}, workAreaList = {};
    var registerOptions = Object.assign({}, options), workOptions = Object.assign({}, options);

    var provinceObj = areaList.province.find(province => province.name == contract.registeredProvince);
    if (provinceObj) {
        registerOptions.province = provinceObj.code;
        registerAreaList = GetAreaList(registerOptions, cityData);
    } else
    {
        registerAreaList = areaList;
    }
    
    var cityObj = registerAreaList.city.find(city => city.name == contract.registeredCity);
    if (cityObj)
    {
        registerOptions.city = cityObj.code;
        registerAreaList = GetAreaList(registerOptions, cityData);
    }
    var areaObj = registerAreaList.area.find(city => city.name == contract.registeredTown);
    if (areaObj)
    {
        registerOptions.area = areaObj.code;
        registerAreaList = GetAreaList(registerOptions, cityData);
    }

    if (contract.registeredStreet && registerOptions.area != 0 && JSON.stringify(streetRegisterData) =="{}") {
        dispatch({
            type: 'editContract/GetStreet',
            payload: { code: registerOptions.area, type: 1 },
        });
    }

    for (let street in streetRegisterData) {
        registerAreaList.town.push({ code: street, name: streetRegisterData[street] });
    }

    var provinceObj = areaList.province.find(province => province.name == contract.workingProvince);
    if (provinceObj) {
        workOptions.province = provinceObj.code;
        workAreaList = GetAreaList(workOptions, cityData);
    } else {
        workAreaList = areaList;
    }

    var cityObj = workAreaList.city.find(city => city.name == contract.workingCity);
    if (cityObj) {
        workOptions.city = cityObj.code;
        workAreaList = GetAreaList(workOptions, cityData);
    }
    var areaObj = workAreaList.area.find(city => city.name == contract.workingTown);
    if (areaObj) {
        workOptions.area = areaObj.code;
        workAreaList = GetAreaList(workOptions, cityData);
    }

    if (contract.workingStreet && workOptions.area != 0 && JSON.stringify(streetWarkingData)=="{}") {
        dispatch({
            type: 'editContract/GetStreet',
            payload: { code: workOptions.area, type: 2 },
        });
    }

    for (let street in streetWarkingData) {
        workAreaList.town.push({ code: street, name: streetWarkingData[street] });
    }
    
    function deleteHandler(id) {
        dispatch({
            type: 'editContract/remove',
            payload: id,
        });
    };
    function cancle() {
        dispatch(routerRedux.push({
            pathname: '/contractList',
        }));
    };
    const props = {
        name: 'file',
        action: 'api/saas/uploadAttachments',
        headers: {
            authorization: 'authorization-text',
        },
        onChange(info) {
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
                dispatch({
                    type: 'editContract/addAttachment',
                    payload: { file: info.file.response, model: contract },
                });
            } else if (info.file.status === "removed") {
                dispatch({
                    type: 'editContract/removeAttachment',
                    payload: info.file.uid,
                });
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        defaultFileList: files,
    };

    const columns = [
        {
            title: '操作',
            key: 'operation',
            render: (text, record) => (
                <span className={styles.operation}>
                    <EditUser userData={record} />
                    <Popconfirm title="确定要删除该用户吗?" onConfirm={deleteHandler.bind(null, record.id)}>
                        <a href="">删除</a>
                    </Popconfirm>
                </span>
            ),
        },
        {
            title: "姓名",
            dataIndex: 'name',
            key: "name"
        },
        {
            title: "性别",
            dataIndex: 'sex',
            key: 'sex',
            render: (text, record) => (
                record.sex === 0 || record.sex === "男" ? "男" : "女"
            ),
        },
        {
            title: "称呼",
            dataIndex: 'salutation',
            key: "salutation"
        },
        {
            title: "职位",
            dataIndex: 'position',
            key: "position"
        },
        {
            title: "微信",
            dataIndex: "weixin",
            key: "weixin"
        },
        {
            title: "备注",
            dataIndex: "remark",
            key: "remark"
        }
    ];

    class AddUser extends React.Component {
        state = {
            visible: false,
        };
        showModal = () => {
            this.setState({ visible: true });
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
                dispatch({
                    type: 'editContract/addUser',
                    payload: { userModel: values, model: contract },
                });
                form.resetFields();
                this.setState({ visible: false });
            });
        }
        saveFormRef = (form) => {
            this.form = form;
        }
        render() {
            return (
                <div>
                    <Button type="primary" onClick={this.showModal}>添加联系人</Button>
                    <CollectionCreateForm
                        ref={this.saveFormRef}
                        visible={this.state.visible}
                        onCancel={this.handleCancel}
                        onCreate={this.handleCreate}
                    />
                </div>
            );
        }
    };

    class EditUser extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                visible: false,
            };
        }
        showModal = () => {
            this.setState({ visible: true });
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
                values.id = this.props.userData.id;
                dispatch({
                    type: 'editContract/editUser',
                    payload: { userModel: values, model: contract },
                });
                form.resetFields();
                this.setState({ visible: false });
            });
        }
        saveFormRef = (form) => {
            this.form = form;
        }
        render() {
            return (
                <span>
                    <a onClick={this.showModal}>编辑</a>
                    <CollectionEditForm userData={this.props.userData}
                        ref={this.saveFormRef}
                        visible={this.state.visible}
                        onCancel={this.handleCancel}
                        onCreate={this.handleCreate}
                    />
                </span>
            );
        }
    };


    class NormalContractFrom extends React.Component {
        handleSubmit = (e) => {
            e.preventDefault();
            this.props.form.validateFields((err, values) => {
                if (!err) {
                    dispatch({
                        type: 'editContract/updateContract',
                        payload: values,
                    });
                }
            });
        };
        handleRegisterProvinceChange = (value) => {
            registerOptions.province = value;
            registerAreaList = GetAreaList(registerOptions, cityData);

            contract.registeredProvince = registerAreaList.province.find(province => province.code == value).name;
            contract.registeredCity = registerAreaList.city.length > 0 ? registerAreaList.city[0].name : "所在市";
            contract.registeredTown = registerAreaList.area.length > 0 ? registerAreaList.area[0].name : "所在县";
            contract.registeredStreet = registerAreaList.town.length > 0 ? egisterAreaList.town[0].name : "所在街道";
        };
        onRegisterCityChange = (value) => {
            registerOptions.city = value;
            registerAreaList = GetAreaList(registerOptions, cityData);

            contract.registeredCity = registerAreaList.city.find(city => city.code == value).name;
            contract.registeredTown = registerAreaList.area.length > 0 ? registerAreaList.area[0].name : "所在县";
            contract.registeredStreet = registerAreaList.town.length > 0 ? egisterAreaList.town[0].name : "所在街道";
        };
        onRegisterAreaChange = (value) => {
            contract.registeredTown = registerAreaList.area.find(area => area.code == value).name;
            contract.registeredStreet = "所在街道";
            dispatch({
                type: 'editContract/GetStreet',
                payload: { code: value, type: 1 },
            });
        };

        handleWorkingProvinceChange = (value) => {
            workOptions.province = value;
            workAreaList = GetAreaList(workOptions, cityData);

            contract.workingProvince = workAreaList.province.find(province => province.code == value).name;
            contract.workingCity = workAreaList.city.length > 0 ? workAreaList.city[0].name : "所在市";
            contract.workingTown = workAreaList.area.length > 0 ? workAreaList.area[0].name : "所在县";
            contract.workingStreet = workAreaList.town.length > 0 ? workAreaList.town[0].name : "所在街道";
        };
        onWorkingCityChange = (value) => {
            workOptions.city = value;
            workAreaList = GetAreaList(workOptions, cityData);

            contract.workingCity = workAreaList.city.find(city => city.code == value).name;
            contract.workingTown = workAreaList.area.length > 0 ? workAreaList.area[0].name : "所在县";
            contract.workingStreet = workAreaList.town.length > 0 ? workAreaList.town[0].name : "所在街道";
        };
        onWorkingAreaChange = (value) => {
            contract.workingTown = workAreaList.area.find(area => area.code == value).name;
            contract.workingStreet = "所在街道";
            dispatch({
                type: 'editContract/GetStreet',
                payload: { code: value, type: 2 },
            });
        };
        render() {
            const { getFieldDecorator, getFieldValue } = this.props.form;
            const formItemLayout = {
                labelCol: { span: 8 },
                wrapperCol: { span: 16 },
            };
            const formItemRow = {
                labelCol: { span: 4 },
                wrapperCol: { span: 20 },
            };
            const registerProvinceOptions = registerAreaList.province.map(province => <Option key={province.code}>{province.name}</Option>);
            const registerCityOptions = registerAreaList.city.map(city => <Option key={city.code}>{city.name}</Option>);
            const registerAreaOptions = registerAreaList.area.map(area => <Option key={area.code}>{area.name}</Option>);
            const registerTownOptions = registerAreaList.town.map(town => <Option key={town.code}>{town.name}</Option>);            

            const workingProvinceOptions = workAreaList.province.map(province => <Option key={province.code}>{province.name}</Option>);
            const workingCityOptions = workAreaList.city.map(city => <Option key={city.code}>{city.name}</Option>);
            const workingAreaOptions = workAreaList.area.map(area => <Option key={area.code}>{area.name}</Option>);
            const workingTownOptions = workAreaList.town.map(town => <Option key={town.code}>{town.name}</Option>);

            return (
                <div>
                    <Form onSubmit={this.handleSubmit}>
                        <Row gutter={8}>
                            <Col span={12}>
                                <FormItem {...formItemLayout} label="客户名称">
                                    {getFieldDecorator('customerName', {
                                        initialValue: contract.customerName,
                                        rules: [{ required: true, message: 'Please input the name!' }],
                                    })(<Input />)}
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem {...formItemLayout} label="法人代表">
                                    {getFieldDecorator('legalRepresentative', {
                                        initialValue: contract.legalRepresentative,
                                        rules: [{ required: true, message: 'Please input the legal Representative!' }],
                                    })(<Input />)}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row gutter={8}>
                            <Col span={12}>
                                <FormItem {...formItemLayout} label="统一社会信用代码">
                                    {getFieldDecorator('uniformSocialCreditCode', {
                                        initialValue: contract.uniformSocialCreditCode,
                                    })(<Input />)}
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem {...formItemLayout} label="电话">
                                    {getFieldDecorator('telephone', {
                                        initialValue: contract.telephone,
                                    })(<Input />)}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row gutter={8}>
                            <Col span={24}>
                                <FormItem {...formItemRow} label="注册地址">
                                    {registerProvinceOptions.length > 0 && getFieldDecorator('registeredProvince', {initialValue: contract.registeredProvince })
                                        (<Select style={{ width: 120}} onChange={this.handleRegisterProvinceChange}>{registerProvinceOptions}</Select>)}
                                    {registerCityOptions.length > 0 && getFieldDecorator('registeredCity', { initialValue: contract.registeredCity })
                                        (<Select style={{ width: 120 }}  onChange={this.onRegisterCityChange}>{registerCityOptions}</Select>)}
                                    {registerAreaOptions.length > 0 && getFieldDecorator('registeredTown', { initialValue: contract.registeredTown })
                                        (<Select style={{ width: 120 }} onChange={this.onRegisterAreaChange}>{registerAreaOptions}</Select>)}
                                    {registerTownOptions.length > 0 && getFieldDecorator('registeredStreet', {initialValue: contract.registeredStreet })
                                        (<Select style={{ width: 120 }}>{registerTownOptions}</Select>)}
                                    {getFieldDecorator('registeredDetail', {
                                        initialValue: contract.registeredDetail,
                                        rules: [{ required: true, message: 'Please input the registered address!' }],
                                    })(<Input />)}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row gutter={8}>
                            <Col span={24}>
                                <FormItem {...formItemRow} label="办公地址">
                                    {workingProvinceOptions.length > 0 && getFieldDecorator('workingProvince', { initialValue: contract.workingProvince })
                                        (<Select style={{ width: 120 }} onChange={this.handleWorkingProvinceChange}>{workingProvinceOptions}</Select>)}
                                    {workingCityOptions.length > 0 && getFieldDecorator('workingCity', { initialValue: contract.workingCity })
                                        (<Select style={{ width: 120 }} onChange={this.onWorkingCityChange}>{workingCityOptions}</Select>)}
                                    {workingAreaOptions.length > 0 && getFieldDecorator('workingTown', { initialValue: contract.workingTown  })
                                        (<Select style={{ width: 120 }} onChange={this.onWorkingAreaChange}>{workingAreaOptions}</Select>)}
                                    {workingTownOptions.length > 0 && getFieldDecorator('workingStreet', { initialValue: contract.workingStreet  })
                                        (<Select style={{ width: 120 }}>{workingTownOptions}</Select>)}
                                    {getFieldDecorator('workingDetail', {
                                        initialValue: contract.workingDetail 
                                    })(<Input />)}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row gutter={8}>
                            <Col span={12}>
                                <FormItem {...formItemLayout} label="数据库名">
                                    {getFieldDecorator('database', {
                                        initialValue: contract.database,
                                        rules: [{ required: true, message: 'Please input the database!' }],
                                    })(<Input />)}
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem {...formItemLayout} label="域名">
                                    {getFieldDecorator('website', {
                                        initialValue: contract.website,
                                        rules: [{ required: true, message: 'Please input the website!' }],
                                    })(<Input />)}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row gutter={8}>
                            <Col span={12}>
                                <FormItem {...formItemLayout} label="合同生效日期">
                                    {getFieldDecorator('contractBeginTime', {
                                        initialValue: moment(contract.contractBeginTime, 'YYYY-MM-DD'),
                                        rules: [{ required: true, message: 'Please input the contract begin time!' }],
                                    })(<DatePicker />)}
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem {...formItemLayout} label="合同结束日期">
                                    {getFieldDecorator('contractEndTime', {
                                        initialValue: moment(contract.contractEndTime, 'YYYY-MM-DD')
                                    })(<DatePicker />)}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row gutter={8}>
                            <Col span={12}>
                                <Row gutter={8}>
                                    <Col span={8}><span className={styles.editRow}>合同附件:</span></Col>
                                    <Col span={16}><Upload {...props}><Button><Icon type="upload" />上传</Button></Upload></Col>
                                </Row>
                            </Col>
                            <Col span={12}>
                                <FormItem {...formItemLayout} label="合同编号">
                                    {getFieldDecorator('contractNum', {
                                        initialValue: contract.contractNum,
                                        rules: [{ required: true, message: 'Please input the contract number!' }],
                                    })(<Input />)}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row gutter={8}>
                            <Col span={4}>
                                <span className={styles.editRow}>主要联系人:</span>
                            </Col>
                            <Col span={20}>
                                <Row gutter={8}>
                                    <Col span={12}>
                                        <FormItem {...formItemLayout} label="姓名">
                                            {getFieldDecorator('primaryName', {
                                                initialValue: contract.primaryName,
                                                rules: [{ required: true, message: 'Please input the name of User!' }],
                                            })(<Input />)}
                                        </FormItem>
                                    </Col>
                                    <Col span={12}>
                                        <FormItem {...formItemLayout} label="性别" >
                                            {getFieldDecorator('primarySex', { initialValue: contract.primarySex == 0 || contract.primarySex == "男"?"男":"女" })(<Select style={{ width: 120 }}>
                                                <Option value="0">男</Option>
                                                <Option value="1">女</Option>
                                            </Select>)}
                                        </FormItem>
                                    </Col>
                                </Row>
                                <Row gutter={8}>
                                    <Col span={12}>
                                        <FormItem {...formItemLayout} label="称呼" >
                                            {getFieldDecorator('primarySalutation', {
                                                initialValue: contract.primarySalutation,
                                            })(<Input />)}
                                        </FormItem>
                                    </Col>
                                    <Col span={12}>
                                        <FormItem {...formItemLayout} label="职位" >
                                            {getFieldDecorator('primaryPosition', {
                                                initialValue: contract.primaryPosition,
                                            })(<Input />)}
                                        </FormItem>
                                    </Col>
                                </Row>
                                <Row gutter={8}>
                                    <Col span={12}>
                                        <FormItem {...formItemLayout} label="手机" >
                                            {getFieldDecorator('primaryMobile', {
                                                initialValue: contract.primaryMobile,
                                            })(<Input />)}
                                        </FormItem>
                                    </Col>
                                    <Col span={12}>
                                        <FormItem  {...formItemLayout} label="微信" >
                                            {getFieldDecorator('primaryWeixin', {
                                                initialValue: contract.primaryWeixin,
                                            })(<Input />)}
                                        </FormItem>
                                    </Col>
                                </Row>
                                <Row gutter={8}>
                                    <Col span={24}>
                                        <FormItem  {...formItemRow} label="备注">
                                            {getFieldDecorator('primaryRemark', {
                                                initialValue: contract.primaryRemark,
                                            })(<Input type="textarea" />)}
                                        </FormItem>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row gutter={8}>
                            <Col span={4}>
                                <span className={styles.editRow}>其他联系人:</span>
                            </Col>
                            <Col span={20}>
                                <AddUser />
                                <Table dataSource={contacts} columns={columns} />
                            </Col>
                        </Row>
                        <Row gutter={8}>
                            <Col span={24}>
                                <FormItem  {...formItemRow} label="备注">
                                    {getFieldDecorator('contractRemark', {
                                        initialValue: contract.contractRemark,
                                    })(<Input type="textarea" rows={4} />)}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row gutter={8}>
                            <Col span={24}>
                                <div className={styles.btnRow}>
                                    <Button type="primary" className={styles.btnPadding} htmlType="submit" size="large">保存</Button>
                                    <Button type="primary" style={{ fontSize: 18 }} onClick={cancle}>取消</Button>
                                </div>
                            </Col>
                        </Row>
                    </Form>
                </div>);
        }
    };

    const ContractFrom = Form.create({
        onFieldsChange(props, changedFields) {
            switch (Object.keys(changedFields)[0]) {
                case "customerName":
                    contract.customerName = changedFields.customerName.value;
                    break;
                case "legalRepresentative":
                    contract.legalRepresentative = changedFields.legalRepresentative.value;
                    break;
                case "uniformSocialCreditCode":
                    contract.uniformSocialCreditCode = changedFields.uniformSocialCreditCode.value;
                    break;
                case "telephone":
                    contract.telephone = changedFields.telephone.value;
                    break;
                case "registeredDetail":
                    contract.registeredDetail = changedFields.registeredDetail.value;
                    break;
                case "workingDetail":
                    contract.workingDetail = changedFields.workingDetail.value;
                    break;
                case "database":
                    contract.database = changedFields.database.value;
                    break;
                case "website":
                    contract.website = changedFields.website.value;
                    break;
                case "contractBeginTime":
                    contract.contractBeginTime = changedFields.contractBeginTime.value;
                    break;
                case "contractEndTime":
                    contract.contractEndTime = changedFields.contractEndTime.value;
                    break;
                case "contractNum":
                    contract.contractNum = changedFields.contractNum.value;
                    break;
                case "primaryName":
                    contract.primaryName = changedFields.primaryName.value;
                    break;
                case "primarySex":
                    contract.primarySex = changedFields.primarySex.value;
                    break;
                case "primarySalutation":
                    contract.primarySalutation = changedFields.primarySalutation.value;
                    break;
                case "primaryPosition":
                    contract.primaryPosition = changedFields.primaryPosition.value;
                    break;
                case "primaryMobile":
                    contract.primaryMobile = changedFields.primaryMobile.value;
                    break;
                case "primaryWeixin":
                    contract.primaryWeixin = changedFields.primaryWeixin.value;
                    break;
                case "primaryRemark":
                    contract.primaryRemark = changedFields.primaryRemark.value;
                    break;
                case "contractRemark":
                    contract.contractRemark = changedFields.contractRemark.value;
                    break;
                case "registeredStreet":
                    contract.registeredStreet = changedFields.registeredStreet.value;
                    break;
                case "workingStreet":
                    contract.workingStreet = changedFields.workingStreet.value;
                    break;
            }
        },
    })(NormalContractFrom);

    return (<div className={styles.subContent}><ContractFrom /></div>);
}

function mapStateToProps(state) {
    const { cityData, streetRegisterData, streetWarkingData, contract} = state.editContract;
    var files = [];
    if (contract.attachments != undefined) {
        contract.attachments.forEach(function (currentFile) {
            var file = {};
            file.uid = currentFile.id;
            file.name = currentFile.fileName;
            file.status = 'done';
            file.url = currentFile.filePath;
            files.push(file);
        });
    }

    return {
        loading: state.loading.models.createContract,
        cityData: cityData,
        streetRegisterData: streetRegisterData,
        streetWarkingData: streetWarkingData,
        contacts: contract.contacts,
        contract: contract,
        files: files,
    };
}

function GetAreaList(options, cityData) {
    var province = [], city = [], area = [], town = [];
    var hasCity = false;       //判断是非有地级城市
    for (var code in cityData) {
        if (!(code % 1e4)) {     //获取所有的省级行政单位
            province.push({ code: code, name: cityData[code] });

            if (options.required && !options.province) {
                if (options.city && !(options.city % 1e4)) {  //省未填，并判断为直辖市
                    options.province = options.city;
                } else {
                    options.province = code;
                }
            } else if (cityData[code].indexOf(options.province) > -1) {
                options.province = isNaN(options.province) ? code : options.province;
            }
        } else {
            var p = code - options.province;
            if (options.province && p > 0 && p < 1e4) {    //同省的城市或地区
                if (!(code % 100)) {
                    hasCity = true;
                    city.push({ code: code, name: cityData[code] });
                    if (options.required && !options.city) {
                        options.city = code;
                    } else if (cityData[code].indexOf(options.city) > -1) {
                        options.city = isNaN(options.city) ? code : options.city;
                    }
                } else if (p > 9000) {                   //省直辖县级行政单位
                    city.push({ code: code, name: cityData[code] });
                    if (options.required && !options.city) {
                        options.city = code;
                    } else if (cityData[code].indexOf(options.city) > -1) {
                        options.city = isNaN(options.city) ? code : options.city;
                    }
                } else if (hasCity) {                  //非直辖市
                    var c = code - options.city;
                    if (options.city && c > 0 && c < 100) {     //同个城市的地区
                        area.push({ code: code, name: cityData[code] });
                        if (options.required && !options.area) {
                            options.area = code;
                        } else if (cityData[code].indexOf(options.area) > -1) {
                            options.area = isNaN(options.area) ? code : options.area;
                        }
                    }
                } else {         
                    city.push({ code: code, name: cityData[code] });//直辖市
                    if (options.area) {
                        options.city = options.area;
                        options.area = '';
                    }
                    if (options.required && !options.city) {
                        options.city = code;
                    } else if (cityData[code].indexOf(options.city) > -1) {
                        options.city = isNaN(options.city) ? code : options.city;
                    }
                }
            }
        }
    }
    

    var areaModel = new Object();

    areaModel.province = province;
    areaModel.city = city;
    areaModel.area = area;
    areaModel.town = town;
    return areaModel;
}

export default connect(mapStateToProps)(editContract);