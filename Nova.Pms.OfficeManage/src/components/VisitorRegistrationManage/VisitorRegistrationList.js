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
  Validation,

  // RangePicker,
} from 'antd'
import { routerRedux, Link } from 'dva/router'
import styles from './visitorRegistrationManage.css'
import moment from 'moment'
import 'moment/locale/zh-cn'

moment.locale('zh-cn')
import { PAGE_SIZE } from '../../constants'

const FormItem = Form.Item
const RangePicker = DatePicker.RangePicker
const RadioGroup = Radio.Group
const Option = Select.Option

const AddVisitorRegistrationForm = Form.create()(props => {
  const {
    visible,
    onCancel,
    onCreate,
    form,
    dispatch,
    regionList,
    visitorRegistration,
    isAddOrEdit,
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
  const regionOptions = regionList.map(value => (
    <Option key={value.id} value={value.id}>{value.name}</Option>
  ))

  return (
    <Modal
      visible={visible}
      title="来人来访登记"
      okText="确定"
      onCancel={onCancel}
      onOk={onCreate}
    >
      <Form>
        <Row gutter={8}>
          <Col span={24}>
            <FormItem {...formItemLayout} label="管理区">
              {getFieldDecorator('regionId', {
                // initialValue: staffName
                rules: [{ required: isAddOrEdit, message: '请选择管理区' }],
              })(
                <Select
                  mode="combox"
                  placeholder="请选择"
                  style={{ width: '100%' }}
                  disabled={!isAddOrEdit}
                >
                  {regionOptions}
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={24}>
            <FormItem {...formItemLayout} label="来访人姓名">
              {getFieldDecorator('name', {
                rules: [
                  {
                    type: 'string',
                    required: isAddOrEdit,
                    max: 10,
                    message: '请正确输入来访人姓名，最大长度为10',
                  },
                ],
              })(<Input disabled={!isAddOrEdit} />)}
            </FormItem>
          </Col>
        </Row>

        <Row gutter={8}>
          <Col span={24}>
            <FormItem {...formItemLayout} label="证件号码">
              {getFieldDecorator('idCardNo', {
                rules: [
                  { required: isAddOrEdit, message: '请输入证件号码' },
                  {
                    validator: handleIdCardNoValidate,
                  },
                ],
              })(<Input disabled={!isAddOrEdit} />)}
            </FormItem>

          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={24}>
            <FormItem {...formItemLayout} label="联系电话">
              {getFieldDecorator('phone', {
                rules: [
                  { required: isAddOrEdit, message: '请输入联系电话' },
                  {
                    validator: handlePhoneValidate,
                  },
                ],
              })(<Input disabled={!isAddOrEdit} />)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={24}>
            <FormItem {...formItemLayout} label="被访人">
              {getFieldDecorator('respondents', {
                rules: [
                  {
                    type: 'string',
                    max: 30,
                    required: isAddOrEdit,
                    message: '请输入被访人,30字以内',
                  },
                ],
              })(<Input disabled={!isAddOrEdit} />)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={24}>
            <FormItem {...formItemLayout} label="来访时间">
              {getFieldDecorator('visitDate', {
                rules: [{ required: isAddOrEdit, message: '请选择来访时间' }],
                getValueProps: value => {
                  if (!value) {
                    visitorRegistration.visitDate = moment(
                      new Date(),
                      'YYYY-MM-DD HH:mm:ss'
                    )
                  }
                  return {
                    value: value
                      ? moment(value)
                      : moment(new Date(), 'YYYY-MM-DD HH:mm:ss'),
                  }
                },
              })(
                <DatePicker
                  style={{ width: '100%' }}
                  format="YYYY-MM-DD HH:mm"
                  showTime
                  disabled={!isAddOrEdit}
                />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={24}>
            <FormItem {...formItemLayout} label="离开时间">
              {getFieldDecorator('leaveDate', {
                getValueProps: value => {
                  return { value: value ? moment(value) : value }
                },
              })(
                <DatePicker
                  style={{ width: '100%' }}
                  format="YYYY-MM-DD HH:mm"
                  showTime
                  disabled={!isAddOrEdit}
                />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={24}>
            <FormItem {...formItemLayout} label="事由">
              {getFieldDecorator('visitReason', {
                rules: [{ type: 'string', max: 80, message: '请正确输入事由，最大长度为80' }],
              })(<Input disabled={!isAddOrEdit} />)}
              <div
                style={{
                  color: '#ff8e48',
                  display: isAddOrEdit == false ? 'none' : 'block',
                }}
              >
                可输入汉字、大小写字母、数字、字符(最多80个汉字)
              </div>
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
})

const NormalAddVisitorRegistrationForm = Form.create({
  mapPropsToFields (props) {
    const fields = {}
    Object.keys(props.visitorRegistration).forEach(key => {
      fields[key] = {
        value: props.visitorRegistration[key],
      }
    })
    return {
      ...fields,
    }
  },
})(AddVisitorRegistrationForm)

function VisitorRegistrationList ({
  dispatch,
  list: dataSource,
  loading,
  total,
  page: current,
  filterStr,
  pageSize,
  seniorSearchData,
  seniorSearch,
  regionList,
  visitorRegistration,
}) {
  class AddVisitorRegistration extends React.Component {
    constructor (props) {
      super(props)
      this.state = {
        visible: false,
        isAddOrEdit: true,
      }
      this.dispatch = props.dispatch
    }
    showModal = () => {
      this.setState({ visible: true })
    };
    handleCancel = () => {
      const form = this.form

      form.validateFields((err, values) => {
        dispatch({
          type: 'visitorRegistrationList/changeVisitorRegistration',
          payload: { visitorRegistration: values },
        })
        form.resetFields()
        this.setState({ visible: false })
      })
      this.setState({ visible: false })
    };
    handleCreate = () => {
      const form = this.form

      form.validateFields((err, values) => {
        if (err) {
          return
        }
        dispatch({
          type: 'visitorRegistrationList/addVisitorRegistration',
          payload: { visitorRegistration: values },
        })
        form.resetFields()
        this.setState({ visible: false })
      })
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

    saveFormRef = form => {
      this.form = form
    };
    render () {
      return (
        <span>
          <Button type="primary" onClick={this.showModal}>新建</Button>
          {
            <NormalAddVisitorRegistrationForm
              regionList={this.props.regionList}
              dispatch={this.props.dispatch}
              ref={this.saveFormRef}
              visible={this.state.visible}
              isAddOrEdit={this.state.isAddOrEdit}
              onCancel={this.handleCancel}
              onCreate={this.handleCreate}
              handleIdCardNoValidate={this.handleIdCardNoValidate}
              handlePhoneValidate={this.handlePhoneValidate}
              visitorRegistration={this.props.visitorRegistration}
            />
          }
        </span>
      )
    }
  }

  class EditVisitorRegistration extends React.Component {
    constructor (props) {
      super(props)
      this.state = {
        visible: false,
        isAddOrEdit: true,
      }
      this.dispatch = props.dispatch
    }
    showModal = e => {
      e.preventDefault()
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

        values.id = this.props.visitorRegistration.id
        dispatch({
          type: 'visitorRegistrationList/editVisitorRegistration',
          payload: { visitorRegistration: values },
        })
        form.resetFields()
        this.setState({ visible: false })
      })
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

    saveFormRef = form => {
      this.form = form
    };

    render () {
      return (
        <span>
          <a onClick={this.showModal}>编辑</a>
          {
            <NormalAddVisitorRegistrationForm
              regionList={this.props.regionList}
              dispatch={this.props.dispatch}
              ref={this.saveFormRef}
              visible={this.state.visible}
              isAddOrEdit={this.state.isAddOrEdit}
              onCancel={this.handleCancel}
              onCreate={this.handleCreate}
              handleIdCardNoValidate={this.handleIdCardNoValidate}
              handlePhoneValidate={this.handlePhoneValidate}
              visitorRegistration={this.props.visitorRegistration}
            />
          }
        </span>
      )
    }
  }

  class ShowVisitorRegistration extends React.Component {
    constructor (props) {
      super(props)
      this.state = {
        visible: false,
        isAddOrEdit: false,
      }
      this.dispatch = props.dispatch
    }
    showModal = e => {
      e.preventDefault()
      this.setState({ visible: true })
    };
    handleCancel = () => {
      this.setState({ visible: false })
    };
    handleCreate = () => {
      this.setState({ visible: false })
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
          <a onClick={this.showModal}>查看</a>
          {
            <NormalAddVisitorRegistrationForm
              regionList={this.props.regionList}
              dispatch={this.props.dispatch}
              ref={this.saveFormRef}
              visible={this.state.visible}
              isAddOrEdit={this.state.isAddOrEdit}
              onCancel={this.handleCancel}
              onCreate={this.handleCreate}
              handleIdCardNoValidate={this.handleIdCardNoValidate}
              handlePhoneValidate={this.handlePhoneValidate}
              visitorRegistration={this.props.visitorRegistration}
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
        type: 'visitorRegistrationList/seniorSearchToggle',
        payload: true,
      })
    };
    closeSeniorSearch = () => {
      dispatch({
        type: 'visitorRegistrationList/seniorSearchToggle',
        payload: false,
      })
    };
    seniorSearchHandler = e => {
      e.preventDefault()
      this.props.form.validateFields((err, values) => {
        if (!err) {
          dispatch({
            type: 'visitorRegistrationList/seniorSearch',
            payload: values,
          })
        }
      })
    };
    resetSeniorSearch = () => {
      dispatch({
        type: 'visitorRegistrationList/resetSeniorSearch',
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
    deleteVisitorRegistration = ids => {
      dispatch({
        type: 'visitorRegistrationList/remove',
        payload: { ids },
      })
    };
    pageChangeHandler = page => {
      dispatch(
        routerRedux.push({
          pathname: '/visitorRegistrationList',
          query: { page, filterStr, pageSize },
        })
      )
    };
    searchHandler = filterStr => {
      dispatch(
        routerRedux.push({
          pathname: '/visitorRegistrationList',
          query: { page: 1, filterStr, pageSize },
        })
      )
    };
    onSelectChange = (selectedRowKeys, selectedRows) => {
      this.setState({ selectedRowKeys })
      this.setState({ selectedRows })
    };
    onShowSizeChange = (current, pageSize) => {
      dispatch(
        routerRedux.push({
          pathname: '/visitorRegistrationList',
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
        {
          title: '管理区',
          dataIndex: 'regionName',
          key: 'regionName',
          width: 120,
        },
        {
          title: '来访人姓名',
          dataIndex: 'name',
          key: 'name',
          width: 120,
        },
        {
          title: '被访人',
          dataIndex: 'respondents',
          key: 'respondents',
          width: 120,
        },
        {
          title: '来访时间',
          dataIndex: 'visitDate',
          key: 'visitDate',
          width: 180,
          render: (text, record) =>
            (record.visitDate != null
              ? new Date(record.visitDate).toLocaleString()
              : null),
        },
        {
          title: '离开时间',
          dataIndex: 'leaveDate',
          key: 'leaveDate',
          width: 180,
          render: (text, record) =>
            (record.leaveDate != null
              ? new Date(record.leaveDate).toLocaleString()
              : null),
        },
        {
          title: '证件号码',
          dataIndex: 'idCardNo',
          key: 'idCardNo',
          width: 180,
        },
        {
          title: '联系电话',
          dataIndex: 'phone',
          key: 'phone',
          width: 120,
        },
        {
          title: '事由',
          dataIndex: 'visitReason',
          key: 'visitReason',
          width: 200,
        },
        {
          title: '操作',
          fixed: 'right',
          width: 110,
          render: (text, record) => {
            return total
              ? <span>
                <ShowVisitorRegistration
                  regionList={regionList}
                  dispatch={dispatch}
                  visitorRegistration={record}
                  id={record.id}
                />
                  &nbsp;
                <EditVisitorRegistration
                  regionList={regionList}
                  dispatch={dispatch}
                  visitorRegistration={record}
                  id={record.id}
                />
                  &nbsp;
                <Popconfirm
                  title="确定要删除该来人来访记录吗?"
                  onConfirm={this.deleteVisitorRegistration.bind(null, [
                    record.id,
                  ])}
                >
                  <a>删除</a>
                </Popconfirm>
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
      }
      const selectLength = selectedRowKeys.length
      const selectInfo = `已选择${selectLength}项数据。`

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
            <Row>
              <Col span={16}>
                <AddVisitorRegistration
                  regionList={regionList}
                  dispatch={dispatch}
                  visitorRegistration={visitorRegistration}
                />
                <Popconfirm
                  title="确定要删除该来人来访登记吗?"
                  onConfirm={this.deleteVisitorRegistration.bind(
                    this,
                    selectedRowKeys
                  )}
                >
                  <Button disabled={!hasSelected}>批量删除</Button>
                </Popconfirm>
                <Button disabled>导出</Button>
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

                    <FormItem {...formItemLayout} label="来访人姓名">
                      {getFieldDecorator('name', {})(<Input />)}
                    </FormItem>
                  </Col>
                  <Col span={8}>
                    <FormItem {...formItemLayout} label="证件号码">
                      {getFieldDecorator('idCardNo', {})(<Input />)}
                    </FormItem>
                  </Col>
                  <Col span={8}>
                    <FormItem {...formItemLayout} label="联系电话">
                      {getFieldDecorator(
                        'phone',
                        {
                          // initialValue: seniorSearchData.handlePersonId
                        }
                      )(<Input />)}

                    </FormItem>
                  </Col>
                </Row>
                <Row gutter={8}>
                  <Col span={8}>
                    <FormItem {...formItemLayout} label="被访人">
                      {getFieldDecorator(
                        'respondents',
                        {
                          // initialValue: seniorSearchData.respondents
                        }
                      )(<Input />)}
                    </FormItem>
                  </Col>

                  <Col span={8}>
                    <FormItem {...formItemLayout} label="事由">
                      {getFieldDecorator(
                        'visitReason',
                        {
                          // initialValue: seniorSearchData.visitReason
                        }
                      )(<Input />)}

                    </FormItem>
                  </Col>
                  <Col span={8}>
                    <FormItem {...formItemLayout} label="来访时间">
                      {getFieldDecorator(
                        'leaveDate',
                        {
                          // initialValue: seniorSearchData.documentCategoryId
                        }
                      )(<RangePicker />)}
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
          <div className={styles.info}><span>共搜索到{total}条数据</span></div>

          <div className={styles.ListButton}>
            {hasSelected &&
              <Alert
                style={{ marginTop: 15 }}
                type="info"
                message={selectInfo}
                showIcon
              />}
          </div>
          <Table
            bordered
            columns={columns}
            dataSource={dataSource}
            loading={loading}
            rowSelection={rowSelection}
            rowKey={record => record.id}
            scroll={{ x: '120%' }}
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

  const WorkAttendanceForm = Form.create()(WorkAttendance)
  return <WorkAttendanceForm />
}

function mapStateToProps (state) {
  const {
    list,
    total,
    page,
    filterStr,
    pageSize,
    regionList,
    visitorRegistration,
    seniorSearchData,
    seniorSearch,
  } = state.visitorRegistrationList
  return {
    loading: state.loading.models.visitorRegistrationList,
    list,
    total,
    page,
    filterStr,
    pageSize,
    regionList,
    visitorRegistration,
    seniorSearchData,
    seniorSearch,
  }
}

export default connect(mapStateToProps)(VisitorRegistrationList)
