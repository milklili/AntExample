import React from 'react'
import { connect } from 'dva'
import {
  Table,
  Pagination,
  Alert,
  Popconfirm,
  Modal,
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
} from 'antd'
import { routerRedux, Link } from 'dva/router'
import styles from './workingPlanManage.css'
import moment from 'moment'
import { PAGE_SIZE } from '../../constants'

const FormItem = Form.Item

const ChangeStateForm = Form.create()(props => {
  const { visible, onCancel, onCreate, form, workingPlan } = props
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
      title="完成计划"
      okText="确定"
      onCancel={onCancel}
      onOk={onCreate}
    >
      <Form>
        <Row gutter={8}>
          <Col span={24}>
            <FormItem {...formItemLayout} label="状态">
              {getFieldDecorator('state', {
                initialValue: workingPlan != null && workingPlan.state != null
                  ? workingPlan.state
                  : null,
              })(
                <Select
                  mode="combobox "
                  placeholder="请选择"
                  style={{ width: '100%' }}
                >
                  <Option value={1}>进行中</Option>
                  <Option value={2}>已完成</Option>
                  <Option value={3}>暂停</Option>
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={24}>
            <FormItem {...formItemLayout} label="实际开始时间">
              {getFieldDecorator('actualStartDate', {
                initialValue: moment(new Date(), 'YYYY-MM-DD'),
              })(<DatePicker style={{ width: '100%' }} />)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={24}>
            <FormItem {...formItemLayout} label="实际结束时间">
              {getFieldDecorator('actualEndDate', {
                initialValue: moment(new Date(), 'YYYY-MM-DD'),
              })(<DatePicker style={{ width: '100%' }} />)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={24}>
            <FormItem {...formItemLayout} label="完成情况">
              {getFieldDecorator('completion', {
                rules: [{ type: 'string', max: 300, message: '已超过300个字!' }],
                initialValue: workingPlan != null
                  ? workingPlan.completion
                  : null,
              })(<Input type="textarea" rows={10} />)}
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
})

function WorkingPlanList ({
  dispatch,
  list: dataSource,
  loading,
  total,
  page: current,
  filterStr,
  pageSize,
}) {
  const FormItem = Form.Item
  const RangePicker = DatePicker.RangePicker

  function editDocument (id) {
    dispatch(
      routerRedux.push({
        pathname: '/editDocument',
        query: { id },
      })
    )
  }
  function showDocument (id) {
    dispatch(
      routerRedux.push({
        pathname: '/showDocument',
        query: { id },
      })
    )
  }

  class MoreActions extends React.Component {
    state = {
      visible: false,
    };
    handleMenuClick = e => {
      this.setState({ visible: false })
    };
    handleVisibleChange = flag => {
      this.setState({ visible: flag })
    };

    deleteHandler = ids => {
      dispatch({
        type: 'workingPlanList/remove',
        payload: { ids },
      })
    };

    changeStateHandler = ids => {
      dispatch({
        type: 'workingPlanList/changeWorkingPlanState',
        payload: { ids },
      })
    };

    reviewHandler = ids => {
      dispatch({
        type: 'workingPlanList/reviewWorkingPlan',
        payload: { ids },
      })
    };

    cancellationAuditHandler = ids => {
      dispatch({
        type: 'workingPlanList/cancellationAuditWorkingPlan',
        payload: { ids },
      })
    };

    editWorkingPlan = id => {
      dispatch(
        routerRedux.push({
          pathname: '/editWorkingPlan',
          query: { id },
        })
      )
    };

    //
    watchWorkingPlan = id => {
      dispatch(
        routerRedux.push({
          pathname: '/watchWorkingPlan',
          query: { id },
        })
      )
    };

    render () {
      // 更多操作
      var recordId = this.props.recordId
      var record = this.props.record
      const menu = (
        <Menu onClick={this.handleMenuClick}>
          <Menu.Item key="0">

            <Popconfirm
              title="确定要删除该工作计划吗?"
              onConfirm={this.deleteHandler.bind(this, [recordId])}
            >
              <a>删除</a>
            </Popconfirm>
          </Menu.Item>
          <Menu.Item key="1">
            <ChangeWorkingPlanState workingPlan={record} />
          </Menu.Item>
          <Menu.Item key="2">
            <Popconfirm
              title="确定要审核该工作计划吗?"
              onConfirm={this.reviewHandler.bind(this, [recordId])}
            >
              <a>审核</a>
            </Popconfirm>
          </Menu.Item>
          <Menu.Item key="3">
            <Popconfirm
              title="确定要撤销审核该工作计划吗?"
              onConfirm={this.cancellationAuditHandler.bind(this, [recordId])}
            >
              <a>撤销审核</a>
            </Popconfirm>
          </Menu.Item>
        </Menu>
      )
      return (
        <Dropdown
          overlay={menu}
          onVisibleChange={this.handleVisibleChange}
          visible={this.state.visible}
          trigger={['click']}
        >
          <a className="ant-dropdown-link" href="#">
            更多 <Icon type="down" />
          </a>
        </Dropdown>
      )
    }
  }

  class ChangeWorkingPlanState extends React.Component {
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
    handleCreate = () => {
      const form = this.form
      form.validateFields((err, values) => {
        if (err) {
          return
        }
        values.id = this.props.workingPlan.id
        dispatch({
          type: 'workingPlanList/changeWorkingPlanState',
          payload: { changeStateModel: values },
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
          <a onClick={this.showModal} style={{ color: 'rgba(0, 0, 0, 0.65)' }}>
            更改状态
          </a>
          {
            <ChangeStateForm
              workingPlan={this.props.workingPlan}
              ref={this.saveFormRef}
              visible={this.state.visible}
              onCancel={this.handleCancel}
              onCreate={this.handleCreate}
            />
          }
        </span>
      )
    }
  }

  const expandedRowRender = record => {
    const columns = [
      { title: '版本', dataIndex: 'version', key: 'version', width: 200 },
      { title: '备注', dataIndex: 'remark', key: 'remark' },
    ]
    const data = []
    data.push({
      key: record.id,
      version: record.version,
      remark: record.remark,
    })
    return <Table columns={columns} dataSource={data} pagination={false} />
  }

  class WorkingPlanListForm extends React.Component {
    state = {
      selectedRowKeys: [], // Check here to configure the default column
      selectedRows: [],
      filteredInfo: null,
      sortedInfo: null,
      isShowAdvancedSearch: false,
    };

    handleSubmit = e => {
      e.preventDefault()
      this.props.form.validateFields((err, values) => {
        if (!err) {
          dispatch(
            routerRedux.push({
              pathname: '/workingPlanList',
              query: { page: current, filterStr, pageSize },
            })
          )
        }
      })
    };

    // 过滤及排序
    tableHandleChange = (pagination, filters, sorter) => {
      console.log('Various parameters', pagination, filters, sorter)
      this.setState({
        filteredInfo: filters,
        sortedInfo: sorter,
      })
    };
    clearFilters = () => {
      this.setState({ filteredInfo: null })
    };
    clearAll = () => {
      this.setState({
        filteredInfo: null,
        sortedInfo: null,
      })
    };
    setAgeSort = () => {
      this.setState({
        sortedInfo: {
          order: 'descend',
          columnKey: 'age',
        },
      })
    };
    deleteHandler = ids => {
      dispatch({
        type: 'workingPlanList/remove',
        payload: { ids },
      })
    };
    editWorkingPlan = id => {
      dispatch(
        routerRedux.push({
          pathname: '/editWorkingPlan',
          query: { id },
        })
      )
    };
    changeStateHandler = ids => {
      dispatch({
        type: 'workingPlanList/changeWorkingPlanState',
        payload: { ids },
      })
    };
    reviewHandler = ids => {
      dispatch({
        type: 'workingPlanList/reviewWorkingPlan',
        payload: { ids },
      })
    };
    cancellationAuditHandler = ids => {
      dispatch({
        type: 'workingPlanList/cancellationAuditWorkingPlan',
        payload: { ids },
      })
    };
    watchWorkingPlan = id => {
      dispatch(
        routerRedux.push({
          pathname: '/watchWorkingPlan',
          query: { id },
        })
      )
    };
    pageChangeHandler = page => {
      dispatch(
        routerRedux.push({
          pathname: '/workingPlanList',
          query: { page, filterStr, pageSize },
        })
      )
    };
    searchHandler = filterStr => {
      dispatch(
        routerRedux.push({
          pathname: '/workingPlanList',
          query: { page: 1, filterStr, pageSize },
        })
      )
    };
    onSelectChange = (selectedRowKeys, selectedRows) => {
      this.setState({ selectedRowKeys, selectedRows })
      dispatch({
        type: 'workingPlanList/select',
        payload: selectedRowKeys,
      })
    };
    showAdvancedSearch = () => {
      // const { isShowAdvancedSearch } = this.state;
      this.setState({ isShowAdvancedSearch: true })
    };
    closeAdvancedSearch = () => {
      // const { isShowAdvancedSearch } = this.state;
      this.setState({ isShowAdvancedSearch: false })
      var searchInfos = []
      for (const item in this.form) {
        searchInfos.push()
      }

      searchInfo = []
    };
    handleReset = () => {
      this.props.form.resetFields()
    };

    openSeniorSearch = () => {
      dispatch({
        type: 'workingPlanList/seniorSearchToggle',
        payload: true,
      })
    };
    closeSeniorSearch = () => {
      dispatch({
        type: 'workingPlanList/seniorSearchToggle',
        payload: false,
      })
    };
    seniorSearchHandler = e => {
      e.preventDefault()
      this.props.form.validateFields((err, values) => {
        if (!err) {
          dispatch({
            type: 'workingPlanList/seniorSearch',
            payload: values,
          })
        }
      })
    };
    resetSeniorSearch = () => {
      dispatch({
        type: 'workingPlanList/resetSeniorSearch',
      })
    };
    onSelectChange = (selectedRowKeys, selectedRows) => {
      this.setState({ selectedRowKeys, selectedRows })
    };

    pageChangeHandler = page => {
      dispatch(
        routerRedux.push({
          pathname: '/workingPlanList',
          query: { page, filterStr, pageSize },
        })
      )
    };

    onShowSizeChange = (current, pageSize) => {
      dispatch(
        routerRedux.push({
          pathname: '/workingPlanList',
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

      const isShowAdvancedSearch = this.state.isShowAdvancedSearch

      const { selectedRowKeys, selectedRows } = this.state
      const rowSelection = {
        selectedRowKeys,
        onChange: this.onSelectChange,
      }
      const selectLength = selectedRowKeys.length
      const hasSelected = selectLength > 0
      let review = selectedRows.map(element => {
        if (element.auditState === true) {
          return element
        }
      })
      review = review.filter(n => {
        return n != null
      })
      const reviewLength = review.length > 0

      let cancelReview = selectedRows.map(element => {
        if (element.auditState === false) {
          return element
        }
      })
      cancelReview = cancelReview.filter(n => {
        return n != null
      })
      const cancelReviewLength = cancelReview.length > 0
      let isReview = true
      if (hasSelected && !reviewLength) {
        isReview = false
      }
      let isCancelReview = true
      if (hasSelected && !cancelReviewLength) {
        isCancelReview = false
      }
      const isEditWorkingPlan = selectLength == 1
      const selectInfo = `已选择${selectLength}项数据`
      const searchInfo = {}

      let { sortedInfo, filteredInfo } = this.state
      sortedInfo = sortedInfo || {}
      filteredInfo = filteredInfo || {}
      const columns = [
        {
          title: '序号',
          dataIndex: 'number',
          key: 'number',
          width: 120,
        },
        {
          title: '管理区',
          dataIndex: 'regionName',
          key: 'regionName',
          width: 120,
        },
        {
          title: '部门',
          dataIndex: 'departmentName',
          key: 'departmentName',
          width: 120,
        },
        {
          title: '计划名称',
          dataIndex: 'name',
          key: 'name',
          width: 120,
        },
        {
          title: '计划类别',
          dataIndex: 'officeManagementCategoryType',
          key: 'officeManagementCategoryType',
          width: 120,
        },
        {
          title: '计划内容',
          dataIndex: 'planContent',
          key: 'planContent',
          width: 200,
        },
        {
          title: '计划开始时间',
          dataIndex: 'startDate',
          key: 'startDate',
          width: 120,
          render: (text, record) =>
            (record.startDate != null
              ? new Date(record.startDate).toLocaleDateString()
              : null),
        },
        {
          title: '计划结束时间',
          dataIndex: 'endDate',
          key: 'endDate',
          width: 120,
          render: (text, record) =>
            (record.endDate != null
              ? new Date(record.endDate).toLocaleDateString()
              : null),
        },
        {
          title: '召集人',
          dataIndex: 'convenorName',
          key: 'convenorName',
          width: 200,
        },
        {
          title: '负责人',
          dataIndex: 'headName',
          key: 'headName',
          width: 200,
        },
        {
          title: '参加人员',
          dataIndex: 'workingPlanMembers',
          key: 'workingPlanMembers',
          width: 250,
        },
        {
          title: '状态',
          dataIndex: 'state',
          key: 'state',
          width: 120,
        },
        {
          title: '实际开始时间',
          dataIndex: 'actualStartDate',
          key: 'actualStartDate',
          width: 120,
          render: (text, record) =>
            (record.actualStartDate != null
              ? new Date(record.actualStartDate).toLocaleDateString()
              : null),
        },
        {
          title: '实际结束时间',
          dataIndex: 'actualEndDate',
          key: 'actualEndDate',
          width: 120,
          render: (text, record) =>
            (record.actualEndDate != null
              ? new Date(record.actualEndDate).toLocaleDateString()
              : null),
        },
        {
          title: '完成情况',
          dataIndex: 'completion',
          key: 'completion',
          width: 200,
        },
        {
          title: '地点',
          dataIndex: 'place',
          key: 'place',
          width: 200,
        },
        {
          title: '创建人',
          dataIndex: 'operatorName',
          key: 'operatorName',
          width: 200,
        },
        {
          title: '创建时间',
          dataIndex: 'createDate',
          key: 'createDate',
          width: 200,
          render: (text, record) =>
            (record.createDate != null
              ? new Date(record.createDate).toLocaleString()
              : null),
        },
        {
          title: '审核状态',
          dataIndex: 'auditState',
          key: 'auditState',
          width: 120,
          render: (text, record) => (record.auditState === true ? '已审核' : '未审核'),
        },
        {
          title: '审核人',
          dataIndex: 'auditorName',
          key: 'auditorName',
          width: 200,
        },
        {
          title: '审核时间',
          dataIndex: 'auditDate',
          key: 'auditDate',
          width: 200,
          render: (text, record) =>
            (record.auditDate != null
              ? new Date(record.auditDate).toLocaleString()
              : null),
        },

        {
          title: '操作',
          key: 'operation',
          fixed: 'right',
          width: 110,
          render: (text, record) => {
            return total ? (<span className={styles.operation}>
              <a onClick={this.editWorkingPlan.bind(null, record.id)}>编辑</a>
              &nbsp;
              <a onClick={this.watchWorkingPlan.bind(null, record.id)}>查看</a>
              &nbsp;
              {<MoreActions recordId={record.id} record={record} />}
            </span>)
              : '操作不可用'
          },
        },
      ]

      return (
        <div className={styles.normal}>
          <div>
            <div className={styles.ListButton}>

              <Row gutter={8}>
                <Col span={16}>
                  <Link to="/createWorkingPlan">
                    <Button type="primary">新建</Button>
                  </Link>
                </Col>
                <Col span={8} style={{ textAlign: 'right' }}>
                  <Search
                    placeholder="Search"
                    style={{ width: 200 }}
                    size="large"
                    onSearch={filterStr => this.searchHandler(filterStr)}
                  />
                  <a
                    style={{ marginLeft: 8, fontSize: 12 }}
                    onClick={this.showAdvancedSearch}
                  >
                    高级搜索
                    <Icon type="down" />
                  </a>
                </Col>
              </Row>
            </div>
            {isShowAdvancedSearch &&
              <div className={styles.normal}>
                <div className={styles.searchForm}>
                  <div>
                    <Form onSubmit={this.handleSubmit}>
                      <Row gutter={50}>
                        <Col span={8}>
                          <FormItem {...formItemLayout} label="管理区">
                            {getFieldDecorator(
                              'regionId',
                              {
                                // initialValue: workingPlan.regionId,
                              }
                            )(<Input />)}
                          </FormItem>
                        </Col>
                        <Col span={8}>
                          <FormItem {...formItemLayout} label="部门">
                            {getFieldDecorator(
                              'departmentName',
                              {
                                // initialValue: workingPlan.departmentName,
                              }
                            )(<Input />)}

                          </FormItem>
                        </Col>
                        <Col span={8}>
                          <FormItem {...formItemLayout} label="计划类别">
                            {getFieldDecorator(
                              'workingPlanType',
                              {
                                // initialValue: workingPlan.workingPlanType,
                              }
                            )(<Input />)}

                          </FormItem>
                        </Col>
                      </Row>
                      <Row gutter={50}>
                        <Col span={8}>
                          <FormItem {...formItemLayout} label="召集人">
                            {getFieldDecorator(
                              'convenorName',
                              {
                                // initialValue: workingPlan.convenorName,
                              }
                            )(<Input />)}
                          </FormItem>
                        </Col>
                        <Col span={8}>
                          <FormItem {...formItemLayout} label="负责人">
                            {getFieldDecorator(
                              'headName',
                              {
                                // initialValue: workingPlan.headName,
                              }
                            )(<Input />)}
                          </FormItem>
                        </Col>
                        <Col span={8}>
                          <FormItem {...formItemLayout} label="计划开始时间">

                            {getFieldDecorator('startDate', {
                              initialValue: moment(new Date(), 'YYYY-MM-DD'),
                            })(<DatePicker style={{ width: '100%' }} />)}

                          </FormItem>
                        </Col>
                      </Row>
                      <Row gutter={50}>
                        <Col span={8}>
                          <FormItem {...formItemLayout} label="计划名称">
                            {getFieldDecorator(
                              'name',
                              {
                                // initialValue: workingPlan.name,
                              }
                            )(<Input />)}
                          </FormItem>
                        </Col>
                        <Col span={8}>
                          <FormItem {...formItemLayout} label="序号">

                            {getFieldDecorator(
                              'Number',
                              {
                                // initialValue: workingPlan.Number,
                              }
                            )(<Input />)}
                          </FormItem>
                        </Col>
                        <Col span={8}>
                          <FormItem {...formItemLayout} label="计划结束时间">
                            {getFieldDecorator('endDate', {
                              initialValue: moment(new Date(), 'YYYY-MM-DD'),
                            })(<DatePicker style={{ width: '100%' }} />)}
                          </FormItem>
                        </Col>
                      </Row>
                      <Row gutter={50}>
                        <Col span={8}>
                          <FormItem {...formItemLayout} label="审核人">
                            {getFieldDecorator(
                              'auditorName',
                              {
                                // initialValue: workingPlan.auditorName,
                              }
                            )(<Input />)}
                          </FormItem>
                        </Col>
                        <Col span={8}>
                          <FormItem {...formItemLayout} label="审核状态">
                            {getFieldDecorator(
                              'auditState',
                              {
                                // initialValue: workingPlan.auditState,
                              }
                            )(<Input />)}
                          </FormItem>
                        </Col>
                        <Col span={8}>
                          <FormItem {...formItemLayout} label="状态">
                            {getFieldDecorator(
                              'state',
                              {
                                // initialValue: workingPlan.state,
                              }
                            )(<Input />)}
                          </FormItem>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={24} style={{ textAlign: 'right' }}>
                          <Button type="primary" htmlType="submit">搜索</Button>
                          <Button
                            style={{ marginLeft: 8 }}
                            onClick={this.handleReset}
                          >
                            重置
                          </Button>
                          <a
                            style={{ marginLeft: 8, fontSize: 12 }}
                            onClick={this.closeAdvancedSearch}
                          >
                            简易搜索
                            <Icon type={isShowAdvancedSearch ? 'up' : 'down'} />
                          </a>
                        </Col>
                      </Row>
                    </Form>
                  </div>
                </div>
              </div>}
            <div style={{ marginBottom: '16px' }}><span>共搜索到{total}条数据</span></div>
            <div className={styles.workingPlanList}>
              {hasSelected &&
                <Alert
                  type="info"
                  message={selectInfo}
                  showIcon
                />}
              <Table
                bordered
                rowSelection={rowSelection}
                columns={columns}
                dataSource={dataSource}
                loading={loading}
                rowKey={record => record.id}
                pagination={false}
                scroll={{ x: '290%' }}
                expandedRowRender={record => <p>备注：{record.remark}</p>}
                onChange={this.tableHandleChange}
              />
              <Pagination
                className="ant-table-pagination"
                total={total}
                current={current}
                pageSize={pageSize}
                onChange={this.pageChangeHandler}
                showTotal={_total => `总计${_total ? _total : 0}条`}
                onShowSizeChange={this.onShowSizeChange}
                showSizeChanger
                showQuickJumper
              />
            </div>
          </div>
        </div>
      )
    }
  }

  const NormalWorkingPlanListForm = Form.create()(WorkingPlanListForm)
  return <NormalWorkingPlanListForm />
}

function mapStateToProps (state) {
  const { list, total, page, pageSize, filterStr } = state.workingPlanList
  return {
    loading: state.loading.models.workingPlanList,
    list,
    total,
    page,
    pageSize,
    filterStr,
  }
}

export default connect(mapStateToProps)(WorkingPlanList)
