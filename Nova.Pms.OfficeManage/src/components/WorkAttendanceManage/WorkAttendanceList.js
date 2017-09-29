import React, { Component } from 'react'
import { connect } from 'dva'
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

  // RangePicker,
} from 'antd'
import { routerRedux, Link } from 'dva/router'
import styles from './AttendanceManage.css'
import moment from 'moment'
import { PAGE_SIZE } from '../../constants'

const FormItem = Form.Item
const RangePicker = DatePicker.RangePicker
const RadioGroup = Radio.Group
const Option = Select.Option

const AddWorkAttendanceForm = Form.create()(props => {
  const {
    visible,
    onCancel,
    onCreate,
    handleHoursValidate,
    form,
    workAttendance,
    staffList,
    dispatch,
    isHoursEdit,
    handleAttendanceTypeChange,
  } = props
  const { getFieldDecorator } = form
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  }
  const formItemRow = {
    labelCol: { span: 3 },
    wrapperCol: { span: 21 },
  }
  const staffOptions = staffList.map(value => (
    <Option key={value.staffId} value={value.staffId}>{value.staffName}</Option>
  ))
  const staffName = workAttendance.map(x => `${x.staffName},`)

  return (
    <Modal
      visible={visible}
      title="添加考勤记录"
      okText="确定"
      onCancel={onCancel}
      onOk={onCreate}
    >
      <Form>
        <Row gutter={8}>
          <Col span={24}>
            <FormItem {...formItemLayout} label="职员姓名">
              {getFieldDecorator('staffId', {
                initialValue: staffName,
              })(
                <Select
                  mode="multiple"
                  placeholder="请选择"
                  style={{ width: '100%' }}
                  disabled
                >
                  {staffOptions}
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={24}>
            <FormItem {...formItemLayout} label="考勤类型">
              {getFieldDecorator('Type', {
                // initialValue: moment(new Date(), 'YYYY-MM-DD'),
                rules: [{ required: true, message: '请选择考勤类型' }],
              })(
                <Select
                  mode="combobox "
                  placeholder="请选择"
                  style={{ width: '100%' }}
                  onChange={handleAttendanceTypeChange}
                >
                  <Option value={0}>出勤</Option>
                  <Option value={1}>早退</Option>
                  <Option value={2}>迟到</Option>
                  <Option value={3}>出差</Option>
                  <Option value={4}>加班</Option>
                  <Option value={5}>请假</Option>
                  <Option value={6}>休假</Option>
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={24}>
            <FormItem {...formItemLayout} label="考勤时间">
              {getFieldDecorator('attendanceDate', {
                initialValue: [
                  moment(new Date(), 'YYYY-MM-DD HH:mm:ss'),
                  moment(new Date(), 'YYYY-MM-DD HH:mm:ss'),
                ],
                rules: [{ required: true, message: '请选择考勤时间' }],
              })(
                <RangePicker
                  style={{ width: '100%' }}
                  format="YYYY-MM-DD HH:mm:ss"
                  showTime
                />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={24}>
            <FormItem {...formItemLayout} label="小时">
              {getFieldDecorator('hours', {
                rules: [
                  { required: isHoursEdit, message: '请输入小时' },
                  {
                    validator: handleHoursValidate,
                  },
                ],
              })(<Input disabled={!isHoursEdit} placeholder="请输入数字(最多2位小数)" />)}
            </FormItem>

          </Col>
        </Row>
      </Form>
    </Modal>
  )
})

const AddStaffForm = Form.create()(props => {
  const {
    visible,
    onCancel,
    onCreate,
    form,
    workAttendance,
    handleNameValidate,
    handleIdCardNoValidate,
    handlePhoneValidate,
  } = props
  const { getFieldDecorator } = form
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  }
  const formItemRow = {
    labelCol: { span: 3 },
    wrapperCol: { span: 21 },
  }
  return (
    <Modal
      visible={visible}
      title="添加职员"
      width="800"
      okText="确定"
      onCancel={onCancel}
      onOk={onCreate}
    >
      <Form>
        <Row gutter={8}>
          <Col span={12}>
            <FormItem {...formItemLayout} label="姓名">
              {getFieldDecorator('name', {
                rules: [
                  {
                    required: true,
                    message: '请输入姓名，长度不超过255',
                    type: 'string',
                    max: 255,
                  },
                  {
                    validator: handleNameValidate,
                  },
                ],
              })(<Input />)}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem {...formItemLayout} label="身份证号码">
              {getFieldDecorator('idCardNo', {
                rules: [
                  {
                    validator: handleIdCardNoValidate,
                  },
                ],
              })(<Input />)}
            </FormItem>
          </Col>
        </Row>

        <Row gutter={8}>
          <Col span={12}>
            <FormItem {...formItemLayout} label="性别">
              {getFieldDecorator('sex', {
                // initialValue: moment(new Date(), 'YYYY-MM-DD'),
                rules: [{ required: true, message: '请选择性别' }],
              })(
                <RadioGroup value={0}>
                  <Radio value={'男'}>男</Radio>
                  <Radio value={'女'}>女</Radio>
                </RadioGroup>
              )}

            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem {...formItemLayout} label="出生日期">
              {getFieldDecorator('birthday', {
                getValueProps: value => {
                  return { value: value ? moment(value) : value }
                },
              })(<DatePicker style={{ width: '100%' }} />)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={12}>
            <FormItem {...formItemLayout} label="住址">
              {getFieldDecorator('address', {})(<Input />)}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem {...formItemLayout} label="籍贯">
              {getFieldDecorator('origin', {})(<Input />)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={12}>

            <FormItem {...formItemLayout} label="电话">
              {getFieldDecorator('tel', {
                rules: [
                  {
                    validator: handlePhoneValidate,
                  },
                ],
              })(<Input />)}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem {...formItemLayout} label="文化程度">
              {getFieldDecorator('degree', {})(
                <Select
                  mode="combobox "
                  placeholder="请选择"
                  style={{ width: '100%' }}
                >
                  <Option value={0}>初中</Option>
                  <Option value={1}>中专</Option>
                  <Option value={2}>高中</Option>
                  <Option value={3}>专科</Option>
                  <Option value={4}>本科</Option>
                  <Option value={5}>硕士</Option>
                  <Option value={6}>博士</Option>
                  <Option value={7}>教授</Option>
                  <Option value={8}>专家</Option>
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={12}>
            <FormItem {...formItemLayout} label="入职日期">
              {getFieldDecorator('joinDate', {
                getValueProps: value => {
                  return { value: value ? moment(value) : value }
                },
              })(<DatePicker style={{ width: '100%' }} />)}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem {...formItemLayout} label="离职日期">
              {getFieldDecorator('leaveDate', {
                getValueProps: value => {
                  return { value: value ? moment(value) : value }
                },
              })(<DatePicker style={{ width: '100%' }} />)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={24}>
            <FormItem {...formItemRow} label="备注">
              {getFieldDecorator('remark', {})(
                <Input type="textarea" rows={2} />
              )}
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
})

function WorkAttendanceList ({
  dispatch,
  list: dataSource,
  loading,
  total,
  page: current,
  filterStr,
  pageSize,
  seniorSearchData,
  seniorSearch,
  staffList,
}) {
  function editDocument (id) {
    dispatch(
      routerRedux.push({
        pathname: '/editWorkAttendance',
        query: { id },
      })
    )
  }
  function showDocument (id) {
    dispatch(
      routerRedux.push({
        pathname: '/showWorkAttendance',
        query: { id },
      })
    )
  }

  class AddWorkAttendance extends React.Component {
    constructor (props) {
      super(props)
      this.state = {
        visible: false,
        addWorkAttendance: null,
        isHoursEdit: false,
      }
      this.dispatch = props.dispatch
    }
    showModal = () => {
      this.setState({ visible: true })
    };
    handleCancel = () => {
      this.setState({ visible: false })
    };
    handleCreate = () => {
      const form = this.form

      form.validateFields((err, values) => {
        if (err) {
          return
        }
        const ids = this.props.workAttendance.map(value => value.staffId)

        // staffList.map(value =>
        //    <Option key={value.staffId} value={value.staffId}>{value.staffName}</Option>
        // );
        const addWorkAttendance = {
          ids,
          workAttendance: values,
        }

        // values.staffId = this.props.workAttendance.staffId;
        dispatch({
          type: 'workAttendanceList/addWorkAttendance',
          payload: { addWorkAttendance },
        })
        form.resetFields()
        this.setState({ visible: false })
      })
    };
    saveFormRef = form => {
      this.form = form
    };
    handleAttendanceTypeChange = value => {
      const form = this.form
      if (value == 1 || value == 2) {
        // form.getValueProps
        form.setFieldsValue({
          hours: '',
        })
        this.setState({ isHoursEdit: false })
      } else {
        this.setState({ isHoursEdit: true })
      }
    };
    handleHoursValidate = (rule, value, callback) => {
      if (value != null && value != '' && !/^[0-9]+.?[0-9]*$/.test(value)) {
        callback('小时格式错误')
      }
      callback()
    };

    render () {
      // let ids = [];
      // ids.push(this.props.rowData.id);
      return (
        <span>
          <a onClick={this.showModal}>添加</a>
          {
            <AddWorkAttendanceForm
              workAttendance={this.props.workAttendance}
              staffList={this.props.staffList}
              dispatch={this.props.dispatch}
              ref={this.saveFormRef}
              visible={this.state.visible}
              isHoursEdit={this.state.isHoursEdit}
              onCancel={this.handleCancel}
              onCreate={this.handleCreate}
              handleAttendanceTypeChange={this.handleAttendanceTypeChange}
              handleHoursValidate={this.handleHoursValidate}
            />
          }
        </span>
      )
    }
  }

  class BatchAddWorkAttendance extends React.Component {
    constructor (props) {
      super(props)
      this.state = {
        visible: false,
        addWorkAttendance: null,
        isHoursEdit: false,
      }
      this.dispatch = props.dispatch
    }
    showModal = () => {
      this.setState({ visible: true })
    };
    handleCancel = () => {
      this.setState({ visible: false })
    };
    handleCreate = () => {
      const form = this.form

      form.validateFields((err, values) => {
        if (err) {
          return
        }
        const ids = this.props.workAttendance.map(value => value.staffId)

        // staffList.map(value =>
        //    <Option key={value.staffId} value={value.staffId}>{value.staffName}</Option>
        // );
        const addWorkAttendance = {
          ids,
          workAttendance: values,
        }

        // values.staffId = this.props.workAttendance.staffId;
        dispatch({
          type: 'workAttendanceList/addWorkAttendance',
          payload: { addWorkAttendance },
        })
        form.resetFields()
        this.setState({ visible: false })
      })
    };
    saveFormRef = form => {
      this.form = form
    };
    handleAttendanceTypeChange = value => {
      const form = this.form
      if (value == 1 || value == 2) {
        this.setState({ isHoursEdit: false })
      } else {
        this.setState({ isHoursEdit: true })
      }
    };
    handleHoursValidate = (rule, value, callback) => {
      if (value != null && value != '' && !/^[0-9]+.?[0-9]*$/.test(value)) {
        callback('小时格式错误')
      }
      callback()
    };
    render () {
      // let ids = [];
      // ids.push(this.props.rowData.id);
      return (
        <span>
          <a onClick={this.showModal} disabled={!this.props.hasSelected}>
            批量添加考勤记录
          </a>
          {
            <AddWorkAttendanceForm
              workAttendance={this.props.workAttendance}
              staffList={this.props.staffList}
              dispatch={this.props.dispatch}
              ref={this.saveFormRef}
              isHoursEdit={this.state.isHoursEdit}
              visible={this.state.visible}
              onCancel={this.handleCancel}
              onCreate={this.handleCreate}
              handleAttendanceTypeChange={this.handleAttendanceTypeChange}
              handleHoursValidate={this.handleHoursValidate}
            />
          }
        </span>
      )
    }
  }

  class AddStaff extends React.Component {
    constructor (props) {
      super(props)
      this.state = {
        visible: false,
      }
    }
    showModal = () => {
      this.setState({ visible: true })
    };
    handleCancel = () => {
      this.setState({ visible: false })
    };
    handleCreate = e => {
      e.preventDefault()
      const form = this.form

      form.validateFields((err, values) => {
        if (err) {
          return
        }

        dispatch({
          type: 'workAttendanceList/addStaff',
          payload: { addStaff: values },
        })
        form.resetFields()
        this.setState({ visible: false })
      })
    };
    saveFormRef = form => {
      this.form = form
    };
    handleIdCardNoValidate = (rule, value, callback) => {
      if (
        value != null &&
        value != '' &&
        !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(
          value
        )
      ) {
        callback('身份证格式错误')
      }
      callback()
    };
    handleNameValidate = (rule, value, callback) => {
      if (value != null && value != '' && value.indexOf(' ') > -1) {
        callback('姓名中不能有空格')
      }
      callback()
    };

    handlePhoneValidate = (rule, value, callback) => {
      if (
        value != null &&
        value != '' &&
        !/(^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$)|(^0{0,1}1[3|4|5|6|7|8|9][0-9]{9}$)/.test(
          value
        )
      ) {
        callback('电话号码格式错误')
      }
      callback()
    };

    render () {
      return (
        <span>
          <Button type="primary" onClick={this.showModal}>新建</Button>
          {
            <AddStaffForm
              ref={this.saveFormRef}
              visible={this.state.visible}
              onCancel={this.handleCancel}
              onCreate={this.handleCreate}
              handleIdCardNoValidate={this.handleIdCardNoValidate}
              handleNameValidate={this.handleNameValidate}
              handlePhoneValidate={this.handlePhoneValidate}
            />
          }
        </span>
      )
    }
  }

  class WorkAttendance extends React.Component {
    state = {
      selectedRowKeys: [], // Check here to configure the default column
      selectedRows: [],
    };
    openSeniorSearch = () => {
      dispatch({
        type: 'workAttendanceList/seniorSearchToggle',
        payload: true,
      })
    };
    closeSeniorSearch = () => {
      dispatch({
        type: 'workAttendanceList/seniorSearchToggle',
        payload: false,
      })
    };
    seniorSearchHandler = e => {
      e.preventDefault()
      this.props.form.validateFields((err, values) => {
        if (!err) {
          dispatch({
            type: 'workAttendanceList/seniorSearch',
            payload: values,
          })
        }
      })
    };
    resetSeniorSearch = () => {
      dispatch({
        type: 'workAttendanceList/resetSeniorSearch',
      })
    };

    showWorkAttendance = id => {
      dispatch(
        routerRedux.push({
          pathname: '/showOrEditWorkAttendance',
          query: { id },
        })
      )
    };
    editWorkAttendance = id => {
      dispatch(
        routerRedux.push({
          pathname: '/showOrEditWorkAttendance',
          query: { id },
        })
      )
    };

    pageChangeHandler = page => {
      dispatch(
        routerRedux.push({
          pathname: '/workAttendanceList',
          query: { page, filterStr, pageSize },
        })
      )
    };
    searchHandler = filterStr => {
      dispatch(
        routerRedux.push({
          pathname: '/workAttendanceList',
          query: { page: 1, filterStr, pageSize },
        })
      )
    };
    // onSelectChange = selectedRowKeys => {
    //    this.setState({ selectedRowKeys });

    // };
    onSelectChange = (selectedRowKeys, selectedRows) => {
      this.setState({ selectedRowKeys })
      this.setState({ selectedRows })
    };

    onShowSizeChange = (current, pageSize) => {
      dispatch(
        routerRedux.push({
          pathname: '/workAttendanceList',
          query: { page: current, filterStr, pageSize },
        })
      )
    };
    render () {
      const Search = Input.Search
      const { getFieldDecorator } = this.props.form
      const formItemLayout = {
        labelCol: {
          xs: {
            span: 24,
          },
          sm: {
            span: 6,
          },
        },
        wrapperCol: {
          xs: {
            span: 24,
          },
          sm: {
            span: 18,
          },
        },
      }

      const columns = [
        // {
        //   title: '工号',
        //   dataIndex: '',
        //   key: '',
        //   width: 80,
        // },
        {
          title: '职员姓名',
          dataIndex: 'staffName',
          key: 'staffName',
          width: 200,
        },
        {
          title: '岗位',
          dataIndex: 'role',
          key: 'role',
          width: 150,
        },
        {
          title: '部门',
          dataIndex: 'departmentName',
          key: 'departmentName',
          width: 100,
        },
        {
          title: '管理区',
          dataIndex: 'regionName',
          key: 'regionName',
          width: 120,
        },
        {
          title: '职员状态',
          dataIndex: 'staffStatus',
          key: 'staffStatus',
          width: 80,
        },
        {
          title: '出勤(小时)',
          dataIndex: 'attendance',
          key: 'attendance',
          width: 80,
        },
        {
          title: '迟到(次)',
          dataIndex: 'lateNumber',
          key: 'lateNumber',
          width: 80,
          render: (text, record, index) =>
            (record.lateNumber != 0 ? record.lateNumber : null),
        },
        {
          title: '早退(次)',
          dataIndex: 'earlyLeaveNumber',
          key: 'earlyLeaveNumber',
          width: 80,
          render: (text, record, index) =>
            (record.earlyLeaveNumber != 0 ? record.earlyLeaveNumber : null),
        },
        {
          title: '请假(小时)',
          dataIndex: 'leave',
          key: 'leave',
          width: 80,
        },
        {
          title: '加班(小时)',
          dataIndex: 'overTime',
          key: 'overTime',
          width: 80,
        },
        {
          title: '出差(小时)',
          dataIndex: 'businessTravel',
          key: 'businessTravel',
          width: 80,
        },
        {
          title: '休假(小时)',
          dataIndex: 'vacation',
          key: 'vacation',
          width: 80,
        },
        {
          title: '最后操作日期',
          dataIndex: 'lastOperationDate',
          key: 'lastOperationDate',
          width: 180,
          render: (text, record, index) =>
            (record.lastOperationDate != null
              ? new Date(record.lastOperationDate).toLocaleString()
              : null),
        },
        {
          title: '最后操作者',
          dataIndex: 'lastOperationPersonName',
          key: 'lastOperationPersonName',
          width: 120,
        },
        {
          title: '操作',
          fixed: 'right',
          width: 110,
          render: (text, record) => {
            return total
              ? <span>
                <a
                  onClick={this.showWorkAttendance.bind(null, record.staffId)}
                >
                    查看
                </a>
                  &nbsp;
                <a
                  onClick={this.editWorkAttendance.bind(null, record.staffId)}
                >
                    编辑
                </a>
                  &nbsp;
                <AddWorkAttendance
                  workAttendance={[record]}
                  staffList={staffList}
                  dispatch={dispatch}
                />
              </span>
              : '操作不可用'
          },
        },
      ]

      const idShowSeniorSearchData = true

      const { selectedRowKeys, selectedRows } = this.state
      const rowSelection = {
        selectedRowKeys,
        onChange: this.onSelectChange,

        // onSelect: (record, selected, selectedRows) => {

        //    console.log(record, selected, selectedRows);

        // },

        // onSelectAll: (selected, selectedRows, changeRows) => {

        //    console.log(selected, selectedRows, changeRows);

        // },
      }
      const selectLength = selectedRowKeys.length
      const selectInfo = `已选择${selectLength}项数据`

      const isShowAdvancedSearch = this.state.isShowAdvancedSearch

      const hasSelected = selectLength > 0
      const searchInfo = {}

      let { sortedInfo, filteredInfo } = this.state
      sortedInfo = sortedInfo || {}
      filteredInfo = filteredInfo || {}
      const record = selectedRows

      return (
        <div className={styles.normal}>
          <div className={styles.ListButton}>
            <Row gutter={10}>
              <Col span={16}>
                <AddStaff />
                <MoreOptionsDropdownMenu
                  workAttendance={record}
                  staffList={staffList}
                  dispatch={dispatch}
                  hasSelected={hasSelected}
                />
              </Col>
              <Col span={8} style={{ textAlign: 'right' }}>
                <Search
                  placeholder="搜索..."
                  style={{ width: 200 }}
                  size="large"
                  onSearch={filterStr => this.searchHandler(filterStr)}
                />
                <a className="hide" style={{ marginLeft: 8 }} onClick={this.openSeniorSearch}>
                  高级搜索 <Icon type="down" />
                </a>
              </Col>
            </Row>
          </div>
          {seniorSearch &&
            <Card style={{ marginBottom: 10 }}>
              <Form onSubmit={this.seniorSearchHandler}>
                <Row gutter={8}>
                  <Col span={8}>
                    <FormItem {...formItemLayout} label="职员姓名">
                      {getFieldDecorator('staffName', {
                        initialValue: seniorSearchData.staffName,
                      })(<Input />)}
                    </FormItem>
                  </Col>
                  <Col span={8}>
                    <FormItem {...formItemLayout} label="工号">
                      {getFieldDecorator(
                        'documentCategoryId',
                        {
                          // initialValue: seniorSearchData.documentCategoryId
                        }
                      )(<Input />)}
                    </FormItem>
                  </Col>
                  <Col span={8}>
                    <FormItem {...formItemLayout} label="考勤区间">
                      {getFieldDecorator('attendanceInterval', {
                        initialValue: seniorSearchData.attendanceInterval,
                      })(<RangePicker />)}

                    </FormItem>
                  </Col>
                </Row>
                <Row gutter={8}>
                  <Col span={24} style={{ textAlign: 'right' }}>
                    <Button type="primary" htmlType="submit">搜索</Button>
                    <Button
                      style={{ marginLeft: 8 }}
                      onClick={this.resetSeniorSearch}
                    >
                      重置
                    </Button>
                    <a
                      style={{ marginLeft: 8 }}
                      onClick={this.closeSeniorSearch}
                    >
                      收起搜索 <Icon type="up" />
                    </a>
                  </Col>
                </Row>
              </Form>
            </Card>}
          <div className={styles.info}>
            <span>共搜索到{total}条数据。</span>
          </div>
          {hasSelected &&
            <Alert
              style={{ marginTop: 15 }}
              type="info"
              message={selectInfo}
              showIcon
            />}
          <Table
            bordered
            columns={columns}
            dataSource={dataSource}
            loading={loading}
            rowSelection={rowSelection}
            rowKey={record => record.staffId}
            scroll={{ x: '145%' }}
            pagination={false}
          />
          <Pagination
            className="ant-table-pagination"
            total={total}
            current={current}
            pageSize={pageSize}
            onChange={this.pageChangeHandler}
            showTotal={_total => `总计${_total || 0}条`}
            onShowSizeChange={this.onShowSizeChange}
            showSizeChanger
            showQuickJumper
          />
        </div>
      )
    }
  }

  class MoreOptionsDropdownMenu extends React.Component {
    state = {
      visible: false,

      // attachments: [],
    };

    handleVisibleChange = flag => {
      this.setState({ visible: flag })
    };

    render () {
      // let ids = [];
      // ids.push(this.props.rowData.id);
      const menu = (
        <Menu>
          <Menu.Item key="batchAddWorkAttendance">
            <BatchAddWorkAttendance
              workAttendance={this.props.workAttendance}
              staffList={this.props.staffList}
              dispatch={this.props.dispatch}
              hasSelected={this.props.hasSelected}
            />
          </Menu.Item>

        </Menu>
      )
      return (
        <span>
          <Dropdown
            overlay={menu}
            onVisibleChange={this.handleVisibleChange}
            visible={this.state.visible}
          >
            <Button className="ant-dropdown-link">
              更多操作<Icon type="down" />
            </Button>
          </Dropdown>
        </span>
      )
    }
  }

  const WorkAttendanceForm = Form.create()(WorkAttendance)
  return <WorkAttendanceForm />
}

function mapStateToProps (state) {
  const {
    list,
    total,
    page,
    filterStr,
    staffList,
    pageSize,
    seniorSearchData,
    seniorSearch,
  } = state.workAttendanceList

  return {
    loading: state.loading.models.workAttendanceList,
    list,
    total,
    page,
    filterStr,
    pageSize,
    staffList,
    seniorSearchData,
    seniorSearch,
  }
}

export default connect(mapStateToProps)(WorkAttendanceList)
