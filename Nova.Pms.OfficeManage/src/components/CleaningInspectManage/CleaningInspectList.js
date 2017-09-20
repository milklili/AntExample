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
import styles from './CleaningInspectManage.css'
import moment from 'moment'
import 'moment/locale/zh-cn'

moment.locale('zh-cn')
import { PAGE_SIZE } from '../../constants'

const FormItem = Form.Item
const RangePicker = DatePicker.RangePicker
const RadioGroup = Radio.Group
const Option = Select.Option

const AddCleaningInspectForm = Form.create()(props => {
  const {
    visible,
    onCancel,
    onCreate,
    form,
    selectRegion,
    setState,
    dispatch,
    regionList,
    staffList,
    cleaningAreaList,
    cleaningInspect,
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
  const staffOptions = staffList.map(value => (
    <Option key={value.staffId} value={value.staffId}>{value.staffName}</Option>
  ))
  const cleaningAreaOptions = cleaningAreaList.map(value => (
    <Option key={value.id} value={value.id}>{value.name}</Option>
  ))

  return (
    <Modal
      visible={visible}
      title="保洁检查"
      okText="确定"
      onCancel={onCancel}
      onOk={onCreate}
    >
      <Form>
        <Row gutter={8}>
          <Col span={24}>
            <FormItem {...formItemLayout} label="管理区">
              {getFieldDecorator('regionId', {})(
                <Select
                  mode="combox"
                  placeholder="请选择"
                  style={{ width: '100%' }}
                  disabled={!isAddOrEdit}
                  onChange={selectRegion}
                >
                  {regionOptions}
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={24}>
            <FormItem {...formItemLayout} label="保洁区域">
              {getFieldDecorator('cleaningAreaId', {
                rules: [{ required: isAddOrEdit, message: '请选择保洁区域' }],
              })(
                <Select
                  placeholder="请选择"
                  disabled={!isAddOrEdit}
                  style={{ width: '100%' }}
                >
                  {cleaningAreaOptions}
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={24}>
            <FormItem {...formItemLayout} label="负责人">
              {getFieldDecorator('leadId', {
                // initialValue: staffName
                rules: [{ required: isAddOrEdit, message: '请选择负责人' }],
              })(
                <Select
                  mode="combox"
                  placeholder="请选择"
                  style={{ width: '100%' }}
                  disabled={!isAddOrEdit}
                >
                  {staffOptions}
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={24}>
            <FormItem {...formItemLayout} label="检查人">
              {getFieldDecorator('rummagerId', {
                // initialValue: staffName
                rules: [{ required: isAddOrEdit, message: '请选择检查人' }],
              })(
                <Select
                  mode="combox"
                  placeholder="请选择"
                  style={{ width: '100%' }}
                  disabled={!isAddOrEdit}
                >
                  {staffOptions}
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={24}>
            <FormItem {...formItemLayout} label="检查时间">
              {getFieldDecorator('inspectDate', {
                // initialValue: moment(new Date(), 'YYYY-MM-DD HH:mm:ss'),
                rules: [{ required: isAddOrEdit, message: '请选择' }],
                getValueProps: value => {
                  if (!value) {
                    cleaningInspect.inspectDate = moment(
                      new Date(),
                      'YYYY-MM-DD'
                    )
                  }
                  return {
                    value: value
                      ? moment(value)
                      : moment(new Date(), 'YYYY-MM-DD'),
                  }
                },
              })(
                <DatePicker
                  style={{ width: '100%' }}
                  format="YYYY-MM-DD"
                  disabled={!isAddOrEdit}
                  placeholder="请选择"

                  // showTime
                />
              )}
            </FormItem>
          </Col>
        </Row>

        <Row gutter={8}>
          <Col span={24}>
            <FormItem {...formItemLayout} label="检查情况">
              {getFieldDecorator('content', {
                rules: [
                  {
                    type: 'string',
                    required: isAddOrEdit,
                    max: 120,
                    message: '请正确输入检查情况，最大长度为120',
                  },
                ],
              })(
                <Input
                  type="textarea"
                  placeholder="请输入"
                  disabled={!isAddOrEdit}
                  rows={2}
                />
              )}
            </FormItem>
          </Col>
        </Row>

        <Row gutter={8}>
          <Col span={24}>
            <FormItem {...formItemLayout} label="检查结果">
              {getFieldDecorator('result', {
                rules: [{ required: isAddOrEdit, message: '请选择检查结果' }],
              })(
                <Select
                  placeholder="请选择"
                  disabled={!isAddOrEdit}
                  style={{ width: '100%' }}
                >
                  <Option value={0}>合格</Option>
                  <Option value={1}>不合格</Option>
                  <Option value={2}>整改</Option>
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={24}>
            <FormItem {...formItemLayout} label="备注">
              {getFieldDecorator('remark', {
                rules: [{ type: 'string', max: 80, message: '请正确输入备注，最大长度为80' }],
              })(<Input disabled={!isAddOrEdit} />)}

            </FormItem>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
})

const NormalAddCleaningInspectForm = Form.create({
  mapPropsToFields (props) {
    const fields = {}
    Object.keys(props.cleaningInspect).forEach(key => {
      fields[key] = {
        value: props.cleaningInspect[key],
      }
    })
    return {
      ...fields,
    }
  },

  onFieldsChange (props, changedFields) {
    props.onChange(changedFields)
  },
})(AddCleaningInspectForm)

function CleaningInspectList ({
  dispatch,
  setStore,
  list: dataSource,
  loading,
  total,
  page: current,
  filterStr,
  pageSize,
  seniorSearchData,
  seniorSearch,
  regionList,
  staffList,
  initialRegion,
  cleaningAreaList,
  cleaningInspect,
}) {
  class AddCleaningInspect extends React.Component {
    constructor (props) {
      super(props)
      this.state = {
        visible: false,
        isAddOrEdit: true,
        staffList: this.props.staffList,
        cleaningAreaList: this.props.cleaningAreaList,
        cleaningInspect: this.props.cleaningInspect,
      }
      this.dispatch = props.dispatch
    }
    showModal = () => {
      cleaningInspect.regionId = this.props.initialRegion.id
      cleaningInspect.cleaningAreaId = null
      cleaningInspect.leadId = null
      cleaningInspect.rummagerId = null
      var staffList = this.props.staffList.map(x => {
        if (x.staffRegionId == cleaningInspect.regionId) {
          return x
        }
      })
      staffList = staffList.filter(n => {
        return n != undefined
      })

      var cleaningAreaList = this.props.cleaningAreaList.map(x => {
        if (x.regionId == cleaningInspect.regionId) {
          return x
        }
      })
      cleaningAreaList = cleaningAreaList.filter(n => {
        return n != undefined
      })

      this.setState({
        staffList,
        cleaningAreaList,
        cleaningInspect,
      })
      this.setState({ visible: true })
    };

    selectRegion = value => {
      var staffList = this.props.staffList.map(x => {
        if (x.staffRegionId == value) {
          return x
        }
      })
      staffList = staffList.filter(n => {
        return n != undefined
      })

      var cleaningAreaList = this.props.cleaningAreaList.map(x => {
        if (x.regionId == value) {
          return x
        }
      })

      cleaningAreaList = cleaningAreaList.filter(n => {
        return n != undefined
      })

      this.setState({
        staffList,
        cleaningAreaList,
        cleaningInspect: {
          id: cleaningInspect.id,
          regionId: value,
          cleaningAreaId: null,
          leadId: null,
          rummagerId: null,
          inspectDate: cleaningInspect.inspectDate,
          content: cleaningInspect.content,
          result: cleaningInspect.result,
          remark: cleaningInspect.remark,
        },
      })
    };

    handleCancel = () => {
      const form = this.form

      form.validateFields((err, values) => {
        dispatch({
          type: 'cleaningInspectList/changeCleaningInspect',
          payload: { cleaningInspect: values },
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
          type: 'cleaningInspectList/addCleaningInspect',
          payload: { cleaningInspect: values },
        })
        form.resetFields()

        this.setState({
          visible: false,
          cleaningInspect: this.props.cleaningInspect,
        })
      })
    };

    saveFormRef = form => {
      this.form = form
    };
    handleFormChange = changedFields => {
      function findCleaningArea (cleaningArea) {
        return cleaningArea.id == value
      }
      const key = Object.keys(changedFields)[0]
      const value = changedFields[key].value

      let data = { [key]: value }

      if (key == 'cleaningAreaId') {
        var lead = this.props.cleaningAreaList.find(findCleaningArea)

        if (lead != null) {
          data = { leadId: lead.staffId, [key]: value }
        }
      }
      if (key == 'regionId') {
        data = {
          cleaningAreaId: null,
          leadId: null,
          rummagerId: null,
          [key]: value,
        }
      }

      var cleaningInspect = { ...this.state.cleaningInspect, ...data }
      this.setState({
        cleaningInspect: { ...this.state.cleaningInspect, ...cleaningInspect },
      })
    };

    render () {
      return (
        <span>
          <Button type="primary" onClick={this.showModal}>新建</Button>
          {
            <NormalAddCleaningInspectForm
              regionList={this.props.regionList}
              staffList={this.state.staffList}
              cleaningAreaList={this.state.cleaningAreaList}
              dispatch={this.props.dispatch}
              ref={this.saveFormRef}
              visible={this.state.visible}
              isAddOrEdit={this.state.isAddOrEdit}
              onCancel={this.handleCancel}
              onChange={this.handleFormChange}
              onCreate={this.handleCreate}
              selectRegion={this.selectRegion}
              cleaningInspect={this.state.cleaningInspect}
            />
          }
        </span>
      )
    }
  }

  class EditCleaningInspect extends React.Component {
    constructor (props) {
      super(props)
      this.state = {
        visible: false,
        isAddOrEdit: true,
        staffList: this.props.staffList,
        cleaningAreaList: this.props.cleaningAreaList,
        cleaningInspect: this.props.cleaningInspect,
      }
      this.dispatch = props.dispatch
    }
    showModal = e => {
      e.preventDefault()

      var cleaningInspectOption = this.props.cleaningInspect
      var staffList = this.props.staffList.map(x => {
        if (x.staffRegionId == cleaningInspectOption.regionId) {
          return x
        }
      })
      staffList = staffList.filter(n => {
        return n != undefined
      })

      var cleaningAreaList = this.props.cleaningAreaList.map(x => {
        if (x.regionId == cleaningInspectOption.regionId) {
          return x
        }
      })
      cleaningAreaList = cleaningAreaList.filter(n => {
        return n != undefined
      })

      this.setState({
        staffList,
        cleaningAreaList,
      })
      this.setState({ visible: true })
    };

    selectRegion = value => {
      var staffList = this.props.staffList.map(x => {
        if (x.staffRegionId == value) {
          return x
        }
      })
      staffList = staffList.filter(n => {
        return n != undefined
      })

      var cleaningAreaList = this.props.cleaningAreaList.map(x => {
        if (x.regionId == value) {
          return x
        }
      })
      cleaningAreaList = cleaningAreaList.filter(n => {
        return n != undefined
      })

      this.setState({
        staffList,
        cleaningAreaList,
      })
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

        values.id = this.props.cleaningInspect.id
        dispatch({
          type: 'cleaningInspectList/editCleaningInspect',
          payload: { cleaningInspect: values },
        })
        form.resetFields()
        this.setState({ visible: false })
      })
    };
    saveFormRef = form => {
      this.form = form
    };

    handleFormChange = changedFields => {
      function findCleaningArea (cleaningArea) {
        return cleaningArea.id == value
      }
      const key = Object.keys(changedFields)[0]
      const value = changedFields[key].value

      let data = { [key]: value }

      if (key == 'cleaningAreaId') {
        var lead = this.props.cleaningAreaList.find(findCleaningArea)

        if (lead != null) {
          data = { leadId: lead.staffId, [key]: value }
        }
      }
      if (key == 'regionId') {
        data = {
          cleaningAreaId: null,
          leadId: null,
          rummagerId: null,
          [key]: value,
        }
      }

      var cleaningInspect = { ...this.state.cleaningInspect, ...data }
      this.setState({
        cleaningInspect: { ...this.state.cleaningInspect, ...cleaningInspect },
      })
    };
    render () {
      return (
        <span>
          <a onClick={this.showModal}>编辑</a>
          {
            <NormalAddCleaningInspectForm
              regionList={this.props.regionList}
              staffList={this.state.staffList}
              cleaningAreaList={this.state.cleaningAreaList}
              dispatch={this.props.dispatch}
              setState={this.setState}
              ref={this.saveFormRef}
              visible={this.state.visible}
              isAddOrEdit={this.state.isAddOrEdit}
              onCancel={this.handleCancel}
              onChange={this.handleFormChange}
              onCreate={this.handleCreate}
              selectRegion={this.selectRegion}
              cleaningInspect={this.state.cleaningInspect}
            />
          }
        </span>
      )
    }
  }

  class ShowCleaningInspect extends React.Component {
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
            <NormalAddCleaningInspectForm
              regionList={this.props.regionList}
              staffList={this.props.staffList}
              cleaningAreaList={this.props.cleaningAreaList}
              dispatch={this.props.dispatch}
              ref={this.saveFormRef}
              visible={this.state.visible}
              isAddOrEdit={this.state.isAddOrEdit}
              onCancel={this.handleCancel}
              onCreate={this.handleCreate}
              cleaningInspect={this.props.cleaningInspect}
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
        type: 'cleaningInspectList/seniorSearchToggle',
        payload: true,
      })
    };
    closeSeniorSearch = () => {
      dispatch({
        type: 'cleaningInspectList/seniorSearchToggle',
        payload: false,
      })
    };
    seniorSearchHandler = e => {
      e.preventDefault()
      this.props.form.validateFields((err, values) => {
        if (!err) {
          dispatch({
            type: 'cleaningInspectList/seniorSearch',
            payload: values,
          })
        }
      })
    };
    resetSeniorSearch = () => {
      dispatch({
        type: 'cleaningInspectList/resetSeniorSearch',
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
    deleteCleaningInspect = ids => {
      dispatch({
        type: 'cleaningInspectList/remove',
        payload: { ids },
      })
    };
    pageChangeHandler = page => {
      dispatch(
        routerRedux.push({
          pathname: '/cleaningInspectList',
          query: { page, filterStr, pageSize },
        })
      )
    };
    searchHandler = filterStr => {
      dispatch(
        routerRedux.push({
          pathname: '/cleaningInspectList',
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
          pathname: '/cleaningInspectList',
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
      const formItemLongLayout = {
        labelCol: {
          xs: {
            span: 24,
          },
          sm: {
            span: 3,
          },
        },
        wrapperCol: {
          xs: {
            span: 24,
          },
          sm: {
            span: 21,
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
          title: '保洁区域',
          dataIndex: 'cleaningAreaName',
          key: 'cleaningAreaName',
          width: 100,
        },
        {
          title: '负责人',
          dataIndex: 'leadName',
          key: 'leadName',
          width: 150,
        },
        {
          title: '检查人',
          dataIndex: 'rummagerName',
          key: 'rummagerName',
          width: 150,
        },
        {
          title: '检查时间',
          dataIndex: 'inspectDate',
          key: 'inspectDate',
          width: 150,
          render: (text, Inspect) =>
            (Inspect.inspectDate != null
              ? new Date(Inspect.inspectDate).toLocaleDateString()
              : null),
        },
        {
          title: '检查情况',
          dataIndex: 'content',
          key: 'content',
          width: 200,
        },
        {
          title: '检查结果',
          dataIndex: 'resultStr',
          key: 'resultStr',
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
          render: (text, Inspect) => {
            return total
              ? <span>
                <ShowCleaningInspect
                  regionList={regionList}
                  staffList={staffList}
                  cleaningAreaList={cleaningAreaList}
                  dispatch={dispatch}
                  cleaningInspect={Inspect}
                  id={Inspect.id}
                />
                  &nbsp;
                <EditCleaningInspect
                  regionList={regionList}
                  staffList={staffList}
                  cleaningAreaList={cleaningAreaList}
                  dispatch={dispatch}
                  cleaningInspect={Inspect}
                  id={Inspect.id}
                />
                  &nbsp;
                <Popconfirm
                  title="确定要删除该保洁检查吗?"
                  onConfirm={this.deleteCleaningInspect.bind(null, [
                    Inspect.id,
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
      const Inspect = selectedRows

      return (
        <div className={styles.normal}>
          <div className={styles.ListButton}>
            <Row>
              <Col span={16} style={{ textAlign: 'left' }}>
                <h1>
                  保洁工作检查
                </h1>
              </Col>
              <Col span={8} style={{ textAlign: 'right' }}>
                <Search
                  placeholder="Search"
                  style={{ width: 200 }}
                  size="large"
                  onSearch={filterStr => this.searchHandler(filterStr)}
                />
                <a style={{ marginLeft: 8 }} onClick={this.openSeniorSearch}>
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
                    <FormItem {...formItemLayout} label="管理区">
                      {getFieldDecorator('regionId', {})(<Select />)}
                    </FormItem>
                  </Col>
                  <Col span={8}>
                    <FormItem {...formItemLayout} label="保洁区域">
                      {getFieldDecorator('cleaningAreaId', {})(<Select />)}
                    </FormItem>
                  </Col>
                  <Col span={8}>
                    <FormItem {...formItemLayout} label="检查人">
                      {getFieldDecorator('rummagerId', {})(<Select />)}
                    </FormItem>
                  </Col>
                </Row>
                <Row gutter={8}>
                  <Col span={8}>

                    <FormItem {...formItemLayout} label="负责人">
                      {getFieldDecorator('leadId', {})(<Select />)}
                    </FormItem>
                  </Col>
                  <Col span={8}>
                    <FormItem {...formItemLayout} label="检查结果">
                      {getFieldDecorator('result', {})(<Select />)}
                    </FormItem>
                  </Col>
                  <Col span={8}>
                    <FormItem {...formItemLayout} label="检查时间">
                      {getFieldDecorator(
                        'date',
                        {
                          // initialValue: seniorSearchData.handlePersonId
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
            <Row gutter={10}>
              <Col span={8}>

                <AddCleaningInspect
                  regionList={regionList}
                  staffList={staffList}
                  initialRegion={initialRegion}
                  cleaningAreaList={cleaningAreaList}
                  dispatch={dispatch}
                  cleaningInspect={cleaningInspect}
                />
                <Popconfirm
                  title="确定要删除该保洁检查吗?"
                  onConfirm={this.deleteCleaningInspect.bind(
                    this,
                    selectedRowKeys
                  )}
                >
                  <Button disabled={!hasSelected}>批量删除</Button>
                </Popconfirm>
                <Button disabled>导出列表</Button>
              </Col>

            </Row>
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
            rowKey={Inspect => Inspect.id}
            scroll={{ x: '115%' }}
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
    staffList,
    initialRegion,
    cleaningAreaList,
    cleaningInspect,
    seniorSearchData,
    seniorSearch,
  } = state.cleaningInspectList

  return {
    loading: state.loading.models.cleaningInspectList,
    list,
    total,
    page,
    filterStr,
    pageSize,
    regionList,
    staffList,
    initialRegion,
    cleaningAreaList,
    cleaningInspect,
    seniorSearchData,
    seniorSearch,
  }
}

export default connect(mapStateToProps)(CleaningInspectList)
