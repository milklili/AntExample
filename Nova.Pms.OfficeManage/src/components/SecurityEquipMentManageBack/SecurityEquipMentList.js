import React from 'react';
import { connect } from 'dva';
import {
    Table,
    Pagination,
    Popconfirm,
    Button,
    Input,
    Select,
    Alert,
    Row,
    Col,
    Form,
    Modal,
    Menu,
    Dropdown,
    Icon,
    DatePicker,
    message
} from 'antd';
import { routerRedux, Link } from 'dva/router';
import styles from './securityEquipMentList.css';
import moment from 'moment';
import { PAGE_SIZE } from '../../constants';

function SecurityEquipMentList({
    dispatch,
    list: dataSource,
    loading, total,
    page: current,
    filterStr
}) {

    const FormItem = Form.Item;
    const RangePicker = DatePicker.RangePicker;

    class MoreActions extends React.Component {
        state = {
            visible: false,
        };
        handleMenuClick = (e) => {
            if (e.key === '3') {
                this.setState({ visible: false });
            }
        }
        handleVisibleChange = (flag) => {
            this.setState({ visible: flag });
        }

        deleteHandler = (ids) => {
            dispatch({
                type: 'securityEquipMentList/remove',
                payload: { ids}
            });
        }

        editSecurityEquipMent = (id) => {
            dispatch(routerRedux.push({
                pathname: '/editSecurityEquipMent',
                query: { id },
            }));
        }

        //debugger;
        watchSecurityEquipMent = (id) => {
            debugger;
            dispatch(routerRedux.push({
                pathname: '/watchSecurityEquipMent',
                query: { id },
            }));
        }

        render() {
            //更多操作
            var recordId = this.props.recordId;
            const menu = (
                <Menu>
                    <Menu.Item key="0">
                        <a onClick={this.deleteHandler.bind(this, [recordId])}>删除</a>
                    </Menu.Item>
                    <Menu.Item key="1">
                        <a onClick={this.deleteHandler.bind(null, recordId)}>更改状态</a>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <a onClick={this.deleteHandler.bind(null, recordId)}>审核</a>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <a onClick={this.deleteHandler.bind(null, recordId)}>撤销审核</a>
                    </Menu.Item>
                </Menu>
        );
            return (
                <Dropdown overlay={menu}
                          onVisibleChange={this.handleVisibleChange}
                          visible={this.state.visible}
                          trigger={['click']}
                >
                    <a className="ant-dropdown-link" href="#">
                        更多 <Icon type="down" />
                    </a>
                </Dropdown>
            );
        }
    }

   

    class SecurityEquipMentListForm extends React.Component {
        state = {
            selectedRowKeys: [],  // Check here to configure the default column
            filteredInfo: null,
            sortedInfo: null,
            isShowAdvancedSearch: false,
        };


        handleSubmit = (e) => {
            e.preventDefault();
            this.props.form.validateFields((err, values) => {
                if (!err) {
                    dispatch(routerRedux.push({
                        pathname: '/securityEquipMentList',
                        query: { page: current, filterStr },
                    }));
                }
            });
        }

        //过滤及排序
        tableHandleChange = (pagination, filters, sorter) => {
            console.log('Various parameters', pagination, filters, sorter);
            this.setState({
                filteredInfo: filters,
                sortedInfo: sorter,
            });
        }
        clearFilters = () => {
            this.setState({ filteredInfo: null });
        }
        clearAll = () => {
            this.setState({
                filteredInfo: null,
                sortedInfo: null,
            });
        }
        setAgeSort = () => {
            this.setState({
                sortedInfo: {
                    order: 'descend',
                    columnKey: 'age',
                },
            });
        }


        deleteHandler = (ids) => {
            debugger;
            dispatch({
                type: 'securityEquipMentList/remove',
                payload: { ids}
            });
        }

        editSecurityEquipMent = (id) => {
            dispatch(routerRedux.push({
                pathname: '/editSecurityEquipMent',
                query: { id },
            }));
        }

        
        watchSecurityEquipMent = (id) => {
            debugger;
            dispatch(routerRedux.push({
                pathname: '/watchSecurityEquipMent',
                query: { id },
            }));
        }
        pageChangeHandler = (page) => {
            dispatch(routerRedux.push({
                pathname: '/securityEquipMentList',
                query: { page, filterStr },
            }));
        }

        searchHandler = (filterStr) => {
            dispatch(routerRedux.push({
                pathname: '/securityEquipMentList',
                query: { page: 1, filterStr },
            }));
        }

        onSelectChange = (selectedRowKeys) => {
            this.setState({ selectedRowKeys });
            dispatch({
                type: 'securityEquipMentList/select',
                payload: selectedRowKeys,
            });
        }

        showAdvancedSearch= () => {
            //const { isShowAdvancedSearch } = this.state;
            this.setState({ isShowAdvancedSearch: true });
        }

        closeAdvancedSearch = () => {
            //const { isShowAdvancedSearch } = this.state;
            this.setState({ isShowAdvancedSearch: false });
            debugger;
            var searchInfos = [];
            for (var item in this.form) {

                searchInfos.push()
            }

            searchInfo = [];

        }
        handleReset = () => {
            this.props.form.resetFields();
        }
        render() {
           
            const { getFieldDecorator} = this.props.form;
            const formItemLayout = {
                labelCol: { span: 8 },
                wrapperCol: { span: 16 },
            };
            debugger;
            const isShowAdvancedSearch = this.state.isShowAdvancedSearch;


            const { selectedRowKeys } = this.state;
            const rowSelection = {
                selectedRowKeys,
                onChange: this.onSelectChange,
            };
            const selectLength = selectedRowKeys.length;
            const hasSelected = selectLength > 0;
            const iseditSecurityEquipMent = selectLength == 1;
            const selectInfo = "已选择" + selectLength + "项数据";
            const searchInfo = {};
            const Search = Input.Search;

            debugger;
            let { sortedInfo, filteredInfo } = this.state;
            sortedInfo = sortedInfo || {};
            filteredInfo = filteredInfo || {};

            const columns = [
                {
                    title: "序号",
                    dataIndex: "id",
                    key: "id",
                    sorter: (a, b) => a.id - b.id,
                    sortOrder: sortedInfo.columnKey === 'id' && sortedInfo.order,
                },
                {
                    title: "名称",
                    dataIndex: "name",
                    key: "name",
                    sorter: (a, b) => a.name.length - b.name.length,
                    sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order,
                },
                {
                    title: "类型",
                    dataIndex: "type",
                    key: "type",
                    filters: [
                        { text: '消防设施设备', value: '消防设施设备' },
                        { text: '消防器材', value: '消防器材' },
                        { text: '保安器材', value: '保安器材' },
                    ],
                    filteredValue: filteredInfo.state || null,
                    onFilter: (value, record) => record.state.includes(value),
                    sorter: (a, b) => a.type.length - b.type.length,
                    sortOrder: sortedInfo.columnKey === 'type' && sortedInfo.order,
                },
                {
                    title: "责任部门",
                    dataIndex: "departmentName",
                    key: "departmentName",
                    sorter: (a, b) => a.departmentName.length - b.departmentName.length,
                    sortOrder: sortedInfo.columnKey === 'officeManagementCategoryId' && sortedInfo.order,
                },
                {
                    title: "管理区",
                    dataIndex: "regionName",
                    key: "regionName",
                    sorter: (a, b) => a.regionName.length - b.regionName.length,
                    sortOrder: sortedInfo.columnKey === 'regionName' && sortedInfo.order,
                },
                {
                    title: "地点/区域",
                    dataIndex: "place",
                    key: "place",
                    sorter: (a, b) => a.place.length - b.place.length,
                    sortOrder: sortedInfo.columnKey === 'place' && sortedInfo.order,
                },
                {
                    title: "数量",
                    dataIndex: "quantity",
                    key: "quantity",
                    sorter: (a, b) => a.quantity - b.quantity,
                    sortOrder: sortedInfo.columnKey === 'quantity' && sortedInfo.order,
                },
                {
                    title: "型号规格",
                    dataIndex: "specificationModel",
                    key: "specificationModel",
                    sorter: (a, b) => a.specificationModel.length - b.specifiactionModel.length,
                    sortOrder: sortedInfo.columnKey === 'specificationModel' && sortedInfo.order,
                },
                {
                    title: "责任人",
                    dataIndex: "responsibilityPersonName",
                    key: "responsibilityPersonName",
                    sorter: (a, b) => a.responsibilityPersonName.length - b.responsibilityPersonName.length,
                    sortOrder: sortedInfo.columnKey === 'responsibilityPersonName' && sortedInfo.order,
                },
                {
                    title: '操作',
                    key: 'operation',
                    fixed: 'right',
                    width: 150,
                    render: (text, record) => (
                        <span className={styles.operation}>
                            <a onClick={this.editSecurityEquipMent.bind(null, record.id)}>编辑</a>
                            <a onClick={this.watchSecurityEquipMent.bind(null, record.id)}>查看</a>
                            <Popconfirm title="确定要删除该安保器材吗?" onConfirm={this.deleteHandler.bind(null, [record.id])}>
                                <a >删除</a>
                            </Popconfirm>

                        </span>
                    )
                },
            ];

            return (
                <div className={styles.normal}>
                    <div>
                        <div className={styles.ListButton}>

                            <Row gutter={8}>
                                <Col span={16} style={{ textAlign: 'left' }}>
                                    <h1>
                                        安防区域及器材管理
                                    </h1>
                                </Col>
                                <Col span={8} style={{ textAlign: 'right' }}>
                                    <Search
                                        placeholder="Search"
                                        style={{ width: 200}}
                                        size='large'
                                        onSearch={filterStr => this.searchHandler(filterStr)}
                                    />
                                    <a style={{ marginLeft: 8, fontSize: 12 }} onClick={this.showAdvancedSearch} >
                                        高级搜索
                                    </a>
                                </Col>
                            </Row>
                        </div>

                        
                            
                        <div>
                            
                            {
                                isShowAdvancedSearch
                                &&
                            <div className={styles.normal}>
                                <div className={styles.searchForm}>
                                    <div>
                                        <Form onSubmit={this.handleSubmit}>
                                            <Row gutter={60}>
                                                <Col span={8}>
                                                    <FormItem {...formItemLayout} label="名称:">
                                                        {getFieldDecorator('name', {
                                                            // initialValue: workingPlan.name,
                                                        })(<Input />)}
                                                    </FormItem>
                                                </Col>
                                                <Col span={8}>
                                                    <FormItem {...formItemLayout} label="地点/区域:">
                                                        {getFieldDecorator('place', {
                                                            // initialValue: workingPlan.place,
                                                        })(<Input />)}

                                                    </FormItem>
                                                </Col>
                                                <Col span={8}>
                                                    <FormItem {...formItemLayout} label="登记日期">
                                                            {getFieldDecorator('createDate', {
                                                                initialValue: moment(new Date(), 'YYYY-MM-DD'),
                                                            })(<DatePicker style={{ width: '100%' }} />)}

                                                    </FormItem>
                                                </Col>
                                            </Row>
                                            <Row gutter={60}>
                                                <Col span={8}>
                                                    <FormItem {...formItemLayout} label="责任人">
                                                        {getFieldDecorator('responsibilityPersonName', {
                                                            // initialValue: workingPlan.responsibilityPersonName,
                                                            })(
                                                                <Select
                                                                    mode="multiple"
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
                                                <Col span={8}>
                                                    <FormItem {...formItemLayout} label="责任部门">
                                                        {getFieldDecorator('departmentName', {
                                                            // initialValue: workingPlan.departmentName,
                                                            })(
                                                                <Select
                                                                    mode="multiple"
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
                                                <Col span={8}>                                                 
                                                        <FormItem
                                                            {...formItemLayout}
                                                            label="类型"
                                                            //hasFeedback
                                                        >
                                                            {getFieldDecorator('type', {                                      
                                                            })(                                                            
                                                            <Select
                                                                mode="multiple"
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
                                            <Row>
                                                <Col span={24} style={{ textAlign: 'right' }}>
                                                    <Button type="primary" htmlType="submit" >搜索</Button>
                                                    <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
                                                        重置
                                                    </Button>
                                                    <a style={{ marginLeft: 8, fontSize: 12 }} onClick={this.closeAdvancedSearch}>
                                                        简易搜索<Icon type={isShowAdvancedSearch ? 'up' : 'down'} />
                                                    </a>
                                                </Col>
                                            </Row>
                                        </Form>
                                    </div>
                                </div>
                            </div>
                            }
                        </div>

                        <div  className={styles.workingPlanList}>
                            <div>
                                <div className={styles.ListButton}>

                                    <Row gutter={8}>
                                        <Col span={16}>
                                            <Link to="/createSecurityEquipMent"><Button >器材登记</Button></Link>
                                            <Popconfirm title="确定要删除该安保器材吗?" onConfirm={this.deleteHandler.bind(this, selectedRowKeys)}>
                                                <Button disabled={!hasSelected}>批量删除</Button>
                                            </Popconfirm>
                                            <Button type="primary" disabled>导出</Button>
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                            {
                                hasSelected
                                &&
                                (
                                    <Alert
                                        message={selectInfo}
                                        type="info"
                                        showIcon
                                    />
                                )
                            }
                            <Table
                                bordered
                                rowSelection={rowSelection}
                                columns={columns}
                                dataSource={dataSource}
                                loading={loading}
                                rowKey={record => record.id}
                                pagination={false}
                                scroll={{ x: 2500 }}
                                onChange={this.tableHandleChange}
                            />
                            <Pagination
                                className="ant-table-pagination"
                                total={total}
                                current={current}
                                pageSize={PAGE_SIZE}
                                onChange={this.pageChangeHandler}
                                showTotal={total => `总计${total}条`}
                            />
                        </div>
                    </div>
                </div>
            );
        }
    }


    const NormalSecurityEquipMentListForm = Form.create()(SecurityEquipMentListForm);
    return (<NormalSecurityEquipMentListForm />);
}

function mapStateToProps(state) {
    const {
        list,
        total,
        page,
        filterStr
    } = state.securityEquipMentList;
    return {
        loading: state.loading.models.securityEquipMentList,
        list,
        total,
        page,
        filterStr
    };
}

export default connect(mapStateToProps)(SecurityEquipMentList);

