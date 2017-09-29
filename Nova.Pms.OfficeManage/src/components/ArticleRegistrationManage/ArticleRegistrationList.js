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
import styles from './articleRegistrationManage.css'
import moment from 'moment'
import 'moment/locale/zh-cn'

moment.locale('zh-cn')
import { PAGE_SIZE } from '../../constants'

const FormItem = Form.Item
const RangePicker = DatePicker.RangePicker
const RadioGroup = Radio.Group
const Option = Select.Option

const ArticleRegistrationForm = Form.create()(props => {
  const {
    visible,
    onCancel,
    onCreate,
    form,
    dispatch,
    regionList,
    userList,
    articleRegistration,
    handleQuantityValidate,
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
  const userOptions = userList.map(value => (
    <Option key={value.staffId} value={value.staffId}>{value.staffName}</Option>
  ))

  return (
    <Modal
      visible={visible}
      title="物品出入登记"
      okText="确定"
      width="800"
      onCancel={onCancel}
      onOk={onCreate}
    >
      <Form>
        <Row gutter={16}>
          <Col span={12}>
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
          <Col span={12}>
            <FormItem {...formItemLayout} label="物品名称">
              {getFieldDecorator('name', {
                rules: [
                  {
                    type: 'string',
                    required: isAddOrEdit,
                    max: 50,
                    message: '请正确输入物品名称，最大长度为50',
                  },
                ],
              })(<Input disabled={!isAddOrEdit} />)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <FormItem {...formItemLayout} label="数量">
              {getFieldDecorator('quantity', {
                rules: [
                  {
                    type: 'string',
                    required: isAddOrEdit,
                    message: '请输入数量',
                  },
                  {
                    validator: handleQuantityValidate,
                  },
                ],
              })(<Input disabled={!isAddOrEdit} />)}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem {...formItemLayout} label="携带人">
              {getFieldDecorator('carryPerson', {
                rules: [
                  {
                    type: 'string',
                    required: isAddOrEdit,
                    max: 30,
                    message: '请正确输入携带人,最大长度为30',
                  },
                ],
              })(<Input disabled={!isAddOrEdit} />)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
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
          <Col span={12}>
            <FormItem {...formItemLayout} label="联系电话">
              {getFieldDecorator('phone', {
                rules: [
                  {
                    validator: handlePhoneValidate,
                  },
                ],
              })(<Input disabled={!isAddOrEdit} />)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <FormItem {...formItemLayout} label="带出时间">
              {getFieldDecorator('takeOutDate', {
                getValueProps: value => {
                  return { value: value ? moment(value) : value }
                },
              })(
                <DatePicker
                  style={{ width: '100%' }}
                  format="YYYY-MM-DD HH:mm:ss"
                  showTime
                  disabled={!isAddOrEdit}
                />
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem {...formItemLayout} label="带入时间">
              {getFieldDecorator('takeInDate', {
                getValueProps: value => {
                  return { value: value ? moment(value) : value }
                },
              })(
                <DatePicker
                  style={{ width: '100%' }}
                  format="YYYY-MM-DD HH:mm:ss"
                  disabled={!isAddOrEdit}
                  showTime
                />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <FormItem {...formItemRow} label="值班人员">
              {getFieldDecorator('operatorId', {
                // initialValue: staffName
                rules: [{ required: isAddOrEdit, message: '请选择值班人员' }],
              })(
                <Select
                  mode="combox"
                  placeholder="请选择"
                  style={{ width: '100%' }}
                  disabled={!isAddOrEdit}
                >
                  {userOptions}
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <FormItem {...formItemRow} label="备注">
              {getFieldDecorator('remark', {
                rules: [{ type: 'string', max: 50, message: '备注最大长度为50' }],
              })(<Input type="textarea" disabled={!isAddOrEdit} />)}
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
})

const NormalAddArticleRegistrationForm = Form.create({
  mapPropsToFields (props) {
    const fields = {}
    Object.keys(props.articleRegistration).forEach(key => {
      fields[key] = {
        value: props.articleRegistration[key],
      }
    })
    return {
      ...fields,
    }
  },
})(ArticleRegistrationForm)

function ArticleRegistrationList ({
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
  userList,
  articleRegistration,
}) {
  class AddArticleRegistration extends React.Component {
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
      form.resetFields()
      this.setState({ visible: false })
    };
    handleCreate = () => {
      const form = this.form
      form.validateFields((err, values) => {
        if (err) {
          return
        }
        dispatch({
          type: 'articleRegistrationList/addArticleRegistration',
          payload: { articleRegistration: values },
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

    handleQuantityValidate = (rule, value, callback) => {
      if (
        value != null && value != '' && !/^\d+(?=\.{0,1}\d+$|$)/.test(value)
      ) {
        callback('请正确输入数量')
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
            <NormalAddArticleRegistrationForm
              regionList={this.props.regionList}
              userList={this.props.userList}
              dispatch={this.props.dispatch}
              ref={this.saveFormRef}
              visible={this.state.visible}
              isAddOrEdit={this.state.isAddOrEdit}
              onCancel={this.handleCancel}
              onCreate={this.handleCreate}
              handleIdCardNoValidate={this.handleIdCardNoValidate}
              handlePhoneValidate={this.handlePhoneValidate}
              handleQuantityValidate={this.handleQuantityValidate}
              articleRegistration={this.props.articleRegistration}
            />
          }
        </span>
      )
    }
  }

  class EditArticleRegistration extends React.Component {
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

        values.id = this.props.articleRegistration.id
        dispatch({
          type: 'articleRegistrationList/editArticleRegistration',
          payload: { articleRegistration: values },
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
    handleQuantityValidate = (rule, value, callback) => {
      if (value != null && value != '' && isNaN(value)) {
        callback('请正确输入数量')
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
            <NormalAddArticleRegistrationForm
              regionList={this.props.regionList}
              userList={this.props.userList}
              dispatch={this.props.dispatch}
              ref={this.saveFormRef}
              visible={this.state.visible}
              isAddOrEdit={this.state.isAddOrEdit}
              onCancel={this.handleCancel}
              onCreate={this.handleCreate}
              handleIdCardNoValidate={this.handleIdCardNoValidate}
              handlePhoneValidate={this.handlePhoneValidate}
              handleQuantityValidate={this.handleQuantityValidate}
              articleRegistration={this.props.articleRegistration}
            />
          }
        </span>
      )
    }
  }

  class ShowArticleRegistration extends React.Component {
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

    render () {
      return (
        <span>
          <a onClick={this.showModal}>查看</a>
          {
            <NormalAddArticleRegistrationForm
              regionList={this.props.regionList}
              userList={this.props.userList}
              dispatch={this.props.dispatch}
              ref={this.saveFormRef}
              visible={this.state.visible}
              isAddOrEdit={this.state.isAddOrEdit}
              onCancel={this.handleCancel}
              onCreate={this.handleCreate}
              articleRegistration={this.props.articleRegistration}
            />
          }
        </span>
      )
    }
  }

  class ArticleRegistration extends React.Component {
    state = {
      selectedRowKeys: [], // Check here to configure the default column
      selectedRows: [],
    };
    openSeniorSearch = () => {
      dispatch({
        type: 'articleRegistrationList/seniorSearchToggle',
        payload: true,
      })
    };
    closeSeniorSearch = () => {
      dispatch({
        type: 'articleRegistrationList/seniorSearchToggle',
        payload: false,
      })
    };
    seniorSearchHandler = e => {
      e.preventDefault()
      this.props.form.validateFields((err, values) => {
        if (!err) {
          dispatch({
            type: 'articleRegistrationList/seniorSearch',
            payload: values,
          })
        }
      })
    };
    resetSeniorSearch = () => {
      dispatch({
        type: 'articleRegistrationList/resetSeniorSearch',
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
    deleteArticleRegistration = ids => {
      dispatch({
        type: 'articleRegistrationList/remove',
        payload: { ids },
      })
    };
    pageChangeHandler = page => {
      dispatch(
        routerRedux.push({
          pathname: '/articleRegistrationList',
          query: { page, filterStr, pageSize },
        })
      )
    };
    searchHandler = filterStr => {
      dispatch(
        routerRedux.push({
          pathname: '/articleRegistrationList',
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
          pathname: '/articleRegistrationList',
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
          title: '物品名称',
          dataIndex: 'name',
          key: 'name',
          width: 120,
        },
        {
          title: '数量',
          dataIndex: 'quantity',
          key: 'quantity',
          width: 50,
        },
        {
          title: '携带人',
          dataIndex: 'carryPerson',
          key: 'carryPerson',
          width: 120,
        },
        {
          title: '带出时间',
          dataIndex: 'takeOutDate',
          key: 'takeOutDate',
          width: 180,
          render: (text, record) =>
            (record.takeOutDate != null
              ? new Date(record.takeOutDate).toLocaleString()
              : null),
        },
        {
          title: '带入时间',
          dataIndex: 'takeInDate',
          key: 'takeInDate',
          width: 180,
          render: (text, record) =>
            (record.takeInDate != null
              ? new Date(record.takeInDate).toLocaleString()
              : null),
        },

        {
          title: '证件号码',
          dataIndex: 'idCardNo',
          key: 'idCardNo',
          width: 200,
        },
        {
          title: '联系电话',
          dataIndex: 'phone',
          key: 'phone',
          width: 150,
        },

        {
          title: '值班人员',
          dataIndex: 'operatorName',
          key: 'operatorName',
          width: 120,
        },

        {
          title: '备注',
          dataIndex: 'remark',
          key: 'remark',
          width: 200,
        },
        {
          title: '操作',
          fixed: 'right',
          width: 110,
          render: (text, record) => {
            return total
              ? <span>
                <ShowArticleRegistration
                  userList={userList}
                  regionList={regionList}
                  dispatch={dispatch}
                  articleRegistration={record}
                  id={record.id}
                />
                  &nbsp;
                <EditArticleRegistration
                  regionList={regionList}
                  userList={userList}
                  dispatch={dispatch}
                  articleRegistration={record}
                  id={record.id}
                />
                  &nbsp;
                <Popconfirm
                  title="确定要删除该物品出入登记吗?"
                  onConfirm={this.deleteArticleRegistration.bind(null, [
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

      const regionOptions = regionList.map(value => (
        <Option key={value.id} value={value.id}>{value.name}</Option>
      ))

      return (
        <div className={styles.normal}>
          <div className={styles.ListButton}>
            <Row>
              <Col span={16}>
                <AddArticleRegistration
                  regionList={regionList}
                  userList={userList}
                  dispatch={dispatch}
                  articleRegistration={articleRegistration}
                />
                <Popconfirm
                  title="确定要删除该物品出入登记吗?"
                  onConfirm={this.deleteArticleRegistration.bind(
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
                  onSearch={v => this.searchHandler(v)}
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

                    <FormItem {...formItemLayout} label="物品名称">
                      {getFieldDecorator('name', {})(<Input />)}
                    </FormItem>
                  </Col>
                  <Col span={8}>
                    <FormItem {...formItemLayout} label="携带人">
                      {getFieldDecorator('carryPerson', {})(<Input />)}
                    </FormItem>
                  </Col>
                  <Col span={8}>
                    <FormItem {...formItemLayout} label="处理人">
                      {getFieldDecorator('opatorId', {})(
                        <Select
                          mode="combox"
                          placeholder="请选择"
                          style={{ width: '100%' }}
                        >
                          {regionOptions}
                        </Select>
                      )}
                    </FormItem>
                  </Col>
                </Row>

                <Row gutter={8}>
                  <Col span={8}>

                    <FormItem {...formItemLayout} label="证件号码">
                      {getFieldDecorator('idCardNo', {})(<Input />)}
                    </FormItem>
                  </Col>
                  <Col span={8}>
                    <FormItem {...formItemLayout} label="联系电话">
                      {getFieldDecorator('phone', {})(<Input />)}
                    </FormItem>
                  </Col>
                  <Col span={8}>
                    <FormItem {...formItemLayout} label="出入时间">
                      {getFieldDecorator('OutAndInDate', {})(
                        <RangePicker style={{ width: '100%' }} />
                      )}
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
            scroll={{ x: '135%' }}
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

  const NormalArticleRegistrationForm = Form.create()(ArticleRegistration)
  return <NormalArticleRegistrationForm />
}

function mapStateToProps (state) {
  const {
    list,
    total,
    page,
    filterStr,
    pageSize,
    regionList,
    userList,
    articleRegistration,
    seniorSearchData,
    seniorSearch,
  } = state.articleRegistrationList
  return {
    loading: state.loading.models.articleRegistrationList,
    list,
    total,
    page,
    filterStr,
    pageSize,
    regionList,
    userList,
    articleRegistration,
    seniorSearchData,
    seniorSearch,
  }
}

export default connect(mapStateToProps)(ArticleRegistrationList)
