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
import styles from './CleaningRecordManage.css'
import { moment } from 'utils'
const FormItem = Form.Item
const RangePicker = DatePicker.RangePicker
const RadioGroup = Radio.Group
const Option = Select.Option

const AddCleaningRecordForm = Form.create()(props => {
  const {
    visible,
    onCancel,
    onCreate,
    form,
    selectRegion,
    dispatch,
    regionList,
    staffList,
    cleaningAreaList,
    cleaningRecord,
    isAddOrEdit,
  } = props
  const { getFieldDecorator } = form
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
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
      title="保洁记录"
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
                initialValue: cleaningRecord.regionId,
              })(
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
          <Col span={12}>
            <FormItem {...formItemLayout} label="保洁区域">
              {getFieldDecorator('cleaningAreaId', {
                initialValue: cleaningRecord.cleaningAreaId,
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
        <Row gutter={16}>
          <Col span={12}>
            <FormItem {...formItemLayout} label="项目名称">
              {getFieldDecorator('name', {
                initialValue: cleaningRecord.name,
                rules: [
                  {
                    type: 'string',
                    required: isAddOrEdit,
                    max: 30,
                    message: '请正确输入项目名称，最大长度为30',
                  },
                ],
              })(<Input placeholder="请输入" disabled={!isAddOrEdit} />)}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem {...formItemLayout} label="项目类型">
              {getFieldDecorator('type', {
                initialValue: cleaningRecord.type,
                rules: [{ required: isAddOrEdit, message: '请选择项目类型' }],
              })(
                <Select
                  placeholder="请选择"
                  disabled={!isAddOrEdit}
                  style={{ width: '100%' }}
                >
                  <Option value={0}>日常保洁</Option>
                  <Option value={1}>消毒消杀</Option>
                  <Option value={2}>清洁保养</Option>
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <FormItem {...formItemLayout} label="计划完成时间">
              {getFieldDecorator('completeDate', {
                initialValue: cleaningRecord.completeDate ? moment(cleaningRecord.completeDate, 'YYYY-MM-DD') : '',
                rules: [{ required: isAddOrEdit, message: '请选择' }],
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
          <Col span={12}>
            <FormItem {...formItemLayout} label="实际完成时间">
              {getFieldDecorator('actualCompleteDate', {
                initialValue: cleaningRecord.actualCompleteDate ? moment(cleaningRecord.actualCompleteDate, 'YYYY-MM-DD') : '',
                rules: [{ required: isAddOrEdit, message: '请选择' }],
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
        <Row gutter={16}>
          <Col span={12}>
            <FormItem {...formItemLayout} label="责任人">
              {getFieldDecorator('staffId', {
                initialValue: cleaningRecord.staffId,
                rules: [{ required: isAddOrEdit, message: '请选择责任人' }],
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
          <Col span={12}>
            <FormItem {...formItemLayout} label="具体内容">
              {getFieldDecorator('content', {
                initialValue: cleaningRecord.content,
                rules: [
                  {
                    required: isAddOrEdit,
                    type: 'string',
                    max: 120,
                    message: '请正确输入具体内容，最大长度为120',
                  },
                ],
              })(<Input placeholder="请输入" disabled={!isAddOrEdit} />)}
            </FormItem>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <FormItem {...formItemLayout} label="状态">
              {getFieldDecorator('state', {
                initialValue: cleaningRecord.state,
                rules: [{ required: isAddOrEdit, message: '请选择状态' }],
              })(
                <Select
                  placeholder="请选择"
                  disabled={!isAddOrEdit}
                  style={{ width: '100%' }}
                >
                  <Option value={0}>计划中</Option>
                  <Option value={1}>进行中</Option>
                  <Option value={2}>已完成</Option>
                  <Option value={3}>暂停</Option>
                  <Option value={4}>取消</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem {...formItemLayout} label="备注">
              {getFieldDecorator('remark', {
                initialValue: cleaningRecord.remark,
                rules: [{ type: 'string', max: 80, message: '请正确输入备注，最大长度为80' }],
              })(<Input disabled={!isAddOrEdit} />)}

            </FormItem>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
})

const NormalAddCleaningRecordForm = Form.create({
  // mapPropsToFields (props) {
  //   const fields = {}
  //   Object.keys(props.cleaningRecord).forEach(key => {
  //     fields[key] = {
  //       value: props.cleaningRecord[key],
  //     }
  //   })
  //   return {
  //     ...fields,
  //   }
  // },

  onFieldsChange (props, changedFields) {
    props.onChange(changedFields)
  },
})(AddCleaningRecordForm)

function CleaningRecordList ({
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
  staffList,
  initialRegion,
  cleaningAreaList,
  cleaningRecord,
}) {
  class AddCleaningRecord extends React.Component {
    constructor (props) {
      super(props)
      this.state = {
        visible: false,
        isAddOrEdit: true,
        staffList: this.props.staffList,
        cleaningAreaList: this.props.cleaningAreaList,
        cleaningRecord: this.props.cleaningRecord,
      }
      this.dispatch = props.dispatch
    }
    showModal = () => {
      cleaningRecord.regionId = this.props.initialRegion.id
      cleaningRecord.cleaningAreaId = null
      cleaningRecord.staffId = null
      var staffList = this.props.staffList.map(x => {
        if (x.staffRegionId == cleaningRecord.regionId) {
          return x
        }
      })
      staffList = staffList.filter(n => {
        return n != undefined
      })

      var cleaningAreaList = this.props.cleaningAreaList.map(x => {
        if (x.regionId == cleaningRecord.regionId) {
          return x
        }
      })
      cleaningAreaList = cleaningAreaList.filter(n => {
        return n != undefined
      })

      this.setState({
        staffList,
        cleaningAreaList,
        cleaningRecord: this.props.cleaningRecord,
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
          type: 'cleaningRecordList/addCleaningRecord',
          payload: { cleaningRecord: values },
        })
        form.resetFields()

        this.setState({
          visible: false,
          cleaningRecord: this.props.cleaningRecord,
        })
      })
    };

    saveFormRef = form => {
      this.form = form
    };

    handleFormChange = changedFields => {
      function findCleaningArea (cleaningArea) {
        return cleaningArea.id === value
      }
      const key = Object.keys(changedFields)[0]
      if (!key) return
      const value = changedFields[key].value

      let data = { [key]: value }

      if (key === 'cleaningAreaId') {
        const staff = this.props.cleaningAreaList.find(findCleaningArea)

        if (staff != null) {
          data = { staffId: staff.staffId, [key]: value }
        }
      }
      if (key === 'regionId') {
        data = { cleaningAreaId: null, staffId: null, [key]: value }
      }

      const newCleaningRecord = { ...this.state.cleaningRecord, ...data }
      this.setState({
        cleaningRecord: { ...this.state.cleaningRecord, ...newCleaningRecord },
      })
    };
    render () {
      return (
        <span>
          <Button type="primary" onClick={this.showModal}>新建</Button>
          {
            <NormalAddCleaningRecordForm
              regionList={this.props.regionList}
              staffList={this.state.staffList}
              cleaningAreaList={this.state.cleaningAreaList}
              dispatch={this.props.dispatch}
              ref={this.saveFormRef}
              visible={this.state.visible}
              isAddOrEdit={this.state.isAddOrEdit}
              onCancel={this.handleCancel}
              onCreate={this.handleCreate}
              onChange={this.handleFormChange}
              selectRegion={this.selectRegion}
              cleaningRecord={this.state.cleaningRecord}
            />
          }
        </span>
      )
    }
  }

  class EditCleaningRecord extends React.Component {
    constructor (props) {
      super(props)
      this.state = {
        visible: false,
        isAddOrEdit: true,
        staffList: this.props.staffList,
        cleaningAreaList: this.props.cleaningAreaList,
        cleaningRecord: this.props.cleaningRecord,
      }
      this.dispatch = props.dispatch
    }
    showModal = e => {
      e.preventDefault()
      var cleaningRecordOption = this.props.cleaningRecord
      var staffList = this.props.staffList.map(x => {
        if (x.staffRegionId == cleaningRecordOption.regionId) {
          return x
        }
      })
      staffList = staffList.filter(n => {
        return n != undefined
      })

      var cleaningAreaList = this.props.cleaningAreaList.map(x => {
        if (x.regionId == cleaningRecordOption.regionId) {
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

        values.id = this.props.cleaningRecord.id
        dispatch({
          type: 'cleaningRecordList/editCleaningRecord',
          payload: { cleaningRecord: values },
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
        var staff = this.props.cleaningAreaList.find(findCleaningArea)

        if (staff != null) {
          data = { staffId: staff.staffId, [key]: value }
        }
      }
      if (key == 'regionId') {
        data = { cleaningAreaId: null, staffId: null, [key]: value }
      }

      var cleaningRecord = { ...this.state.cleaningRecord, ...data }
      this.setState({
        cleaningRecord: { ...this.state.cleaningRecord, ...cleaningRecord },
      })
    };

    render () {
      return (
        <span>
          <a onClick={this.showModal}>编辑</a>
          {
            <NormalAddCleaningRecordForm
              regionList={this.props.regionList}
              staffList={this.state.staffList}
              cleaningAreaList={this.state.cleaningAreaList}
              dispatch={this.props.dispatch}
              ref={this.saveFormRef}
              visible={this.state.visible}
              isAddOrEdit={this.state.isAddOrEdit}
              onCancel={this.handleCancel}
              onCreate={this.handleCreate}
              selectRegion={this.selectRegion}
              onChange={this.handleFormChange}
              cleaningRecord={this.state.cleaningRecord}
            />
          }
        </span>
      )
    }
  }

  class ShowCleaningRecord extends React.Component {
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
            <NormalAddCleaningRecordForm
              regionList={this.props.regionList}
              staffList={this.props.staffList}
              cleaningAreaList={this.props.cleaningAreaList}
              dispatch={this.props.dispatch}
              ref={this.saveFormRef}
              visible={this.state.visible}
              isAddOrEdit={this.state.isAddOrEdit}
              onCancel={this.handleCancel}
              onCreate={this.handleCreate}
              handleIdCardNoValidate={this.handleIdCardNoValidate}
              handlePhoneValidate={this.handlePhoneValidate}
              cleaningRecord={this.props.cleaningRecord}
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
        type: 'cleaningRecordList/seniorSearchToggle',
        payload: true,
      })
    };
    closeSeniorSearch = () => {
      dispatch({
        type: 'cleaningRecordList/seniorSearchToggle',
        payload: false,
      })
    };
    seniorSearchHandler = e => {
      e.preventDefault()
      this.props.form.validateFields((err, values) => {
        if (!err) {
          dispatch({
            type: 'cleaningRecordList/seniorSearch',
            payload: values,
          })
        }
      })
    };
    resetSeniorSearch = () => {
      dispatch({
        type: 'cleaningRecordList/resetSeniorSearch',
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
    deleteCleaningRecord = ids => {
      dispatch({
        type: 'cleaningRecordList/remove',
        payload: { ids },
      })
    };
    pageChangeHandler = page => {
      dispatch(
        routerRedux.push({
          pathname: '/cleaningRecordList',
          query: { page, filterStr, pageSize },
        })
      )
    };
    searchHandler = filterStr => {
      dispatch(
        routerRedux.push({
          pathname: '/cleaningRecordList',
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
          pathname: '/cleaningRecordList',
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
          title: '项目名称',
          dataIndex: 'name',
          key: 'name',
          width: 120,
        },
        {
          title: '保洁区域',
          dataIndex: 'cleaningAreaName',
          key: 'cleaningAreaName',
          width: 120,
        },
        {
          title: '负责人',
          dataIndex: 'staffName',
          key: 'staffName',
          width: 120,
        },
        {
          title: '计划完成时间',
          dataIndex: 'completeDate',
          key: 'completeDate',
          width: 120,
          render: (text, record) =>
            (record.completeDate != null
              ? new Date(record.completeDate).toLocaleDateString()
              : null),
        },
        {
          title: '实际完成时间',
          dataIndex: 'actualCompleteDate',
          key: 'actualCompleteDate',
          width: 120,
          render: (text, record) =>
            (record.actualCompleteDate != null
              ? new Date(record.actualCompleteDate).toLocaleDateString()
              : null),
        },
        {
          title: '项目类型',
          dataIndex: 'typeStr',
          key: 'typeStr',
          width: 120,
        },
        {
          title: '具体内容',
          dataIndex: 'content',
          key: 'content',
          width: 200,
        },
        {
          title: '状态',
          dataIndex: 'stateStr',
          key: 'stateStr',
          width: 80,
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
                <ShowCleaningRecord
                  regionList={regionList}
                  staffList={staffList}
                  cleaningAreaList={cleaningAreaList}
                  dispatch={dispatch}
                  cleaningRecord={record}
                  id={record.id}
                />
                  &nbsp;
                <EditCleaningRecord
                  regionList={regionList}
                  staffList={staffList}
                  cleaningAreaList={cleaningAreaList}
                  dispatch={dispatch}
                  cleaningRecord={record}
                  id={record.id}
                />
                  &nbsp;
                <Popconfirm
                  title="确定要删除该保洁记录吗?"
                  onConfirm={this.deleteCleaningRecord.bind(null, [
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

                <AddCleaningRecord
                  regionList={regionList}
                  staffList={staffList}
                  initialRegion={initialRegion}
                  cleaningAreaList={cleaningAreaList}
                  dispatch={dispatch}
                  cleaningRecord={cleaningRecord}
                />
                <Popconfirm
                  title="确定要删除该保洁记录吗?"
                  onConfirm={this.deleteCleaningRecord.bind(
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

                    <FormItem {...formItemLayout} label="项目名称">
                      {getFieldDecorator('name', {})(<Input />)}
                    </FormItem>
                  </Col>
                  <Col span={8}>
                    <FormItem {...formItemLayout} label="责任人">
                      {getFieldDecorator('staffId', {})(<Select />)}
                    </FormItem>
                  </Col>
                  <Col span={8}>
                    <FormItem {...formItemLayout} label="绿化区域">
                      {getFieldDecorator(
                        'cleaningAreaId',
                        {
                          // initialValue: seniorSearchData.handlePersonId
                        }
                      )(<Input />)}

                    </FormItem>
                  </Col>
                </Row>
                <Row gutter={8}>
                  <Col span={8}>

                    <FormItem {...formItemLayout} label="项目类型">
                      {getFieldDecorator('type', {})(<Select />)}
                    </FormItem>
                  </Col>
                  <Col span={8}>
                    <FormItem {...formItemLayout} label="状态">
                      {getFieldDecorator('state', {})(<Select />)}
                    </FormItem>
                  </Col>
                  <Col span={8}>
                    <FormItem {...formItemLayout} label="时间">
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
    staffList,
    initialRegion,
    cleaningAreaList,
    cleaningRecord,
    seniorSearchData,
    seniorSearch,
  } = state.cleaningRecordList
  return {
    loading: state.loading.models.cleaningRecordList,
    list,
    total,
    page,
    filterStr,
    pageSize,
    regionList,
    staffList,
    initialRegion,
    cleaningAreaList,
    cleaningRecord,
    seniorSearchData,
    seniorSearch,
  }
}

export default connect(mapStateToProps)(CleaningRecordList)
