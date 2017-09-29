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
import styles from './securityEventsManage.css'
import moment from 'moment'
import 'moment/locale/zh-cn'

moment.locale('zh-cn')
import { PAGE_SIZE } from '../../constants'

const FormItem = Form.Item
const RangePicker = DatePicker.RangePicker
const RadioGroup = Radio.Group
const Option = Select.Option

const AddSecurityEventsForm = Form.create()(props => {
  const {
    visible,
    onCancel,
    onCreate,
    form,
    dispatch,
    regionList,
    securityEvents,
    isAddOrEdit,
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
      width="800"
      title="安防事件记录"
      okText="确定"
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
            <FormItem {...formItemLayout} label="事件名称">
              {getFieldDecorator('name', {
                rules: [
                  {
                    type: 'string',
                    required: isAddOrEdit,
                    max: 30,
                    message: '请输入事件名称，30个字以内',
                  },
                ],
              })(<Input disabled={!isAddOrEdit} />)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <FormItem {...formItemLayout} label="类型">
              {getFieldDecorator('type', {
                rules: [{ required: isAddOrEdit, message: '请选择类型' }],
              })(
                <Select
                  mode="combobox "
                  placeholder="请选择"
                  style={{ width: '100%' }}
                  disabled={!isAddOrEdit}
                >
                  <Option value={0}>突发事件</Option>
                  <Option value={1}>火警记录</Option>
                  <Option value={2}>消防检查</Option>
                  <Option value={3}>消防演习</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem {...formItemLayout} label="责任人">
              {getFieldDecorator('responsibilityPersonId', {
                rules: [
                  {
                    type: 'string',
                    required: isAddOrEdit,
                    max: 30,
                    message: '请输入责任人，30个字以内',
                  },
                ],
              })(<Input disabled={!isAddOrEdit} />)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <FormItem {...formItemLayout} label="处理人">
              {getFieldDecorator('handlePersonId', {
                rules: [
                  {
                    type: 'string',
                    required: isAddOrEdit,
                    max: 30,
                    message: '请输入处理人,30个字以内',
                  },
                ],
              })(<Input disabled={!isAddOrEdit} />)}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem {...formItemLayout} label="发生时间">
              {getFieldDecorator('occurrenceDateTime', {
                // initialValue: moment(new Date(), 'YYYY-MM-DD HH:mm:ss'),
                rules: [{ required: isAddOrEdit, message: '请选择发生时间' }],
                getValueProps: value => {
                  if (!value) {
                    securityEvents.occurrenceDateTime = moment(
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
                  format="YYYY-MM-DD HH:mm:ss"
                  disabled={!isAddOrEdit}
                  showTime
                />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <FormItem {...formItemLayout} label="发生地点">
              {getFieldDecorator('occurrencePlace', {
                rules: [
                  {
                    type: 'string',
                    max: 60,
                    required: isAddOrEdit,
                    message: '请输入发生地点,60个字以内',
                  },
                ],
              })(<Input disabled={!isAddOrEdit} />)}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem {...formItemLayout} label="具体内容">
              {getFieldDecorator('content', {
                rules: [
                  {
                    type: 'string',
                    max: 80,
                    required: isAddOrEdit,
                    message: '请输入具体内容,80个字以内',
                  },
                ],
              })(<Input disabled={!isAddOrEdit} />)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={24}>
            <FormItem {...formItemRow} label="处理结果">
              {getFieldDecorator('result', {
                rules: [
                  { type: 'string', max: 80, message: '请正确输入处理结果,80个字以内' },
                ],
              })(<Input disabled={!isAddOrEdit} />)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={24}>
            <FormItem {...formItemRow} label="备注">
              {getFieldDecorator('remark', {
                rules: [{ type: 'string', max: 80, message: '请正确输入备注,80个字以内' }],
              })(<Input type="textarea" disabled={!isAddOrEdit} />)}

            </FormItem>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
})

const NormalAddSecurityEventsForm = Form.create({
  mapPropsToFields (props) {
    const fields = {}

    Object.keys(props.securityEvents).forEach(key => {
      fields[key] = {
        value: props.securityEvents[key],
      }
    })
    return {
      ...fields,
    }
  },
})(AddSecurityEventsForm)

function SecurityEventsList ({
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
  securityEvents,
}) {
  class AddSecurityEvents extends React.Component {
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
          type: 'securityEventsList/changeSecurityEvents',
          payload: { securityEvents: values },
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
          type: 'securityEventsList/addSecurityEvents',
          payload: { securityEvents: values },
        })
        form.resetFields()
        this.setState({ visible: false })
      })
    };
    saveFormRef = form => {
      this.form = form
    };
    render () {
      return (
        <span>
          <Button type="primary" onClick={this.showModal}>新建</Button>
          {
            <NormalAddSecurityEventsForm
              regionList={this.props.regionList}
              dispatch={this.props.dispatch}
              ref={this.saveFormRef}
              visible={this.state.visible}
              isAddOrEdit={this.state.isAddOrEdit}
              onCancel={this.handleCancel}
              onCreate={this.handleCreate}
              securityEvents={this.props.securityEvents}
            />
          }
        </span>
      )
    }
  }

  class EditSecurityEvents extends React.Component {
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

        values.id = this.props.securityEvents.id
        dispatch({
          type: 'securityEventsList/editSecurityEvents',
          payload: { securityEvents: values },
        })
        form.resetFields()
        this.setState({ visible: false })
      })
    };
    saveFormRef = form => {
      this.form = form
    };

    render () {
      return (
        <span>
          <a onClick={this.showModal}>编辑</a>
          {
            <NormalAddSecurityEventsForm
              regionList={this.props.regionList}
              dispatch={this.props.dispatch}
              ref={this.saveFormRef}
              visible={this.state.visible}
              isAddOrEdit={this.state.isAddOrEdit}
              onCancel={this.handleCancel}
              onCreate={this.handleCreate}
              securityEvents={this.props.securityEvents}
            />
          }
        </span>
      )
    }
  }

  class ShowSecurityEvents extends React.Component {
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
            <NormalAddSecurityEventsForm
              regionList={this.props.regionList}
              dispatch={this.props.dispatch}
              ref={this.saveFormRef}
              visible={this.state.visible}
              isAddOrEdit={this.state.isAddOrEdit}
              onCancel={this.handleCancel}
              onCreate={this.handleCreate}
              securityEvents={this.props.securityEvents}
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
        type: 'securityEventsList/seniorSearchToggle',
        payload: true,
      })
    };
    closeSeniorSearch = () => {
      dispatch({
        type: 'securityEventsList/seniorSearchToggle',
        payload: false,
      })
    };
    seniorSearchHandler = e => {
      e.preventDefault()
      this.props.form.validateFields((err, values) => {
        if (!err) {
          dispatch({
            type: 'securityEventsList/seniorSearch',
            payload: values,
          })
        }
      })
    };
    resetSeniorSearch = () => {
      dispatch({
        type: 'securityEventsList/resetSeniorSearch',
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
    deleteSecurityEvents = ids => {
      dispatch({
        type: 'securityEventsList/remove',
        payload: { ids },
      })
    };
    pageChangeHandler = page => {
      dispatch(
        routerRedux.push({
          pathname: '/securityEventsList',
          query: { page, filterStr, pageSize },
        })
      )
    };
    searchHandler = filterStr => {
      dispatch(
        routerRedux.push({
          pathname: '/securityEventsList',
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
          pathname: '/securityEventsList',
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
          width: 100,
        },
        {
          title: '事件名称',
          dataIndex: 'name',
          key: 'name',
          width: 200,
        },
        {
          title: '责任人',
          dataIndex: 'responsibilityPersonId',
          key: 'responsibilityPersonId',
          width: 120,
        },
        {
          title: '处理人',
          dataIndex: 'handlePersonId',
          key: 'handlePersonId',
          width: 120,
        },
        {
          title: '发生时间',
          dataIndex: 'occurrenceDateTime',
          key: 'occurrenceDateTime',
          width: 200,
          render: (text, record) =>
            (record.occurrenceDateTime != null
              ? new Date(record.occurrenceDateTime).toLocaleString()
              : null),
        },
        {
          title: '发生地点',
          dataIndex: 'occurrencePlace',
          key: 'occurrencePlace',
          width: 200,
        },
        {
          title: '类型',
          dataIndex: 'typeStr',
          key: 'typeStr',
          width: 100,
        },
        {
          title: '具体内容',
          dataIndex: 'content',
          key: 'content',
          width: 200,
        },
        {
          title: '处理结果',
          dataIndex: 'result',
          key: 'result',
          width: 200,
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
                <ShowSecurityEvents
                  regionList={regionList}
                  dispatch={dispatch}
                  securityEvents={record}
                  id={record.id}
                />
                  &nbsp;
                <EditSecurityEvents
                  regionList={regionList}
                  dispatch={dispatch}
                  securityEvents={record}
                  id={record.id}
                />
                  &nbsp;
                <Popconfirm
                  title="确定要删除该安防事件记录吗?"
                  onConfirm={this.deleteSecurityEvents.bind(null, [
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

                <AddSecurityEvents
                  regionList={regionList}
                  dispatch={dispatch}
                  securityEvents={securityEvents}
                />
                <Popconfirm
                  title="确定要删除该安防事件记录吗?"
                  onConfirm={this.deleteSecurityEvents.bind(
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
                <a  className="hide" style={{ marginLeft: 8 }} onClick={this.openSeniorSearch}>
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

                    <FormItem {...formItemLayout} label="事件名称">
                      {getFieldDecorator('name', {})(<Input />)}
                    </FormItem>
                  </Col>
                  <Col span={8}>
                    <FormItem {...formItemLayout} label="责任人">
                      {getFieldDecorator(
                        'responsibilityPersonId',
                        {
                          // initialValue: seniorSearchData.documentCategoryId
                        }
                      )(<Input />)}
                    </FormItem>
                  </Col>
                  <Col span={8}>
                    <FormItem {...formItemLayout} label="处理人">
                      {getFieldDecorator(
                        'handlePersonId',
                        {
                          // initialValue: seniorSearchData.handlePersonId
                        }
                      )(<Input />)}

                    </FormItem>
                  </Col>
                </Row>
                <Row gutter={8}>
                  <Col span={8}>
                    <FormItem {...formItemLayout} label="发生地点">
                      {getFieldDecorator('occurrencePlace', {
                        initialValue: seniorSearchData.occurrencePlace,
                      })(<Input />)}
                    </FormItem>
                  </Col>
                  <Col span={8}>
                    <FormItem {...formItemLayout} label="类型">
                      {getFieldDecorator(
                        'type',
                        {
                          // initialValue: seniorSearchData.documentCategoryId
                        }
                      )(<Input />)}
                    </FormItem>
                  </Col>
                  <Col span={8}>
                    <FormItem {...formItemLayout} label="发生时间">
                      {getFieldDecorator('createDate', {
                        initialValue: seniorSearchData.createDate,
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
            scroll={{ x: '150%' }}
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
    securityEvents,
    seniorSearchData,
    seniorSearch,
  } = state.securityEventsList

  return {
    loading: state.loading.models.securityEventsList,
    list,
    total,
    page,
    filterStr,
    pageSize,
    regionList,
    securityEvents,
    seniorSearchData,
    seniorSearch,
  }
}

export default connect(mapStateToProps)(SecurityEventsList)
