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
import styles from './CleaningAreaManage.css'
import moment from 'moment'
import 'moment/locale/zh-cn'

moment.locale('zh-cn')
import { PAGE_SIZE } from '../../constants'

const FormItem = Form.Item
const RangePicker = DatePicker.RangePicker
const RadioGroup = Radio.Group
const Option = Select.Option

const AddCleaningAreaForm = Form.create()(props => {
  const {
    visible,
    onCancel,
    onCreate,
    form,
    selectRegion,
    dispatch,
    regionList,
    staffList,
    cleaningArea,
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

  return (
    <Modal
      visible={visible}
      title="保洁区域"
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
            <FormItem {...formItemLayout} label="区域代码">
              {getFieldDecorator('areaCode', {
                rules: [
                  { type: 'string', max: 10, message: '请正确输入区域代码，最大长度为10' },
                ],
              })(<Input disabled={!isAddOrEdit} />)}
            </FormItem>
          </Col>
        </Row>

        <Row gutter={8}>
          <Col span={24}>
            <FormItem {...formItemLayout} label="区域名称">
              {getFieldDecorator('areaName', {
                rules: [
                  {
                    type: 'string',
                    required: isAddOrEdit,
                    max: 20,
                    message: '请正确输入区域名称，最大长度为20',
                  },
                ],
              })(<Input disabled={!isAddOrEdit} />)}
            </FormItem>

          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={24}>
            <FormItem {...formItemLayout} label="地址">
              {getFieldDecorator('place', {
                rules: [{ type: 'string', max: 30, message: '请正确输入地址，最大长度为30' }],
              })(<Input disabled={!isAddOrEdit} />)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={24}>
            <FormItem {...formItemLayout} label="工作要求">
              {getFieldDecorator('requirement', {
                rules: [{ type: 'string', max: 60, message: '请输入工作要求,60字以内' }],
              })(<Input disabled={!isAddOrEdit} />)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={24}>
            <FormItem {...formItemLayout} label="责任人">
              {getFieldDecorator('staffId', {
                // initialValue: staffName
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
        </Row>
        <Row gutter={8}>
          <Col span={24}>
            <FormItem {...formItemLayout} label="是否外包">
              {getFieldDecorator('isOutsourced', {})(
                <Select
                  mode="combobox "
                  placeholder="请选择"
                  style={{ width: '100%' }}
                  placeholder="请选择"
                  disabled={!isAddOrEdit}
                >
                  <Option value={0}>是</Option>
                  <Option value={1}>否</Option>
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={24}>
            <FormItem {...formItemLayout} label="备注">
              {getFieldDecorator('remark', {
                rules: [
                  { type: 'string', max: 100, message: '请正确输入备注，最大长度为100' },
                ],
              })(<Input disabled={!isAddOrEdit} />)}

            </FormItem>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
})

const NormalAddCleaningAreaForm = Form.create({
  mapPropsToFields (props) {
    const fields = {}
    Object.keys(props.cleaningArea).forEach(key => {
      fields[key] = {
        value: props.cleaningArea[key],
      }
    })
    return {
      ...fields,
    }
  },

  onFieldsChange (props, changedFields) {
    switch (Object.keys(changedFields)[0]) {
      case 'regionId':
        props.cleaningArea.regionId = changedFields.regionId.value
        break

      case 'areaCode':
        props.cleaningArea.areaCode = changedFields.areaCode.value
        break

      case 'areaName':
        props.cleaningArea.areaName = changedFields.areaName.value
        break

      case 'place':
        props.cleaningArea.place = changedFields.place.value
        break

      case 'requirement':
        props.cleaningArea.requirement = changedFields.requirement.value
        break

      case 'staffId':
        props.cleaningArea.staffId = changedFields.staffId.value
        break

      case 'isOutsourced':
        props.cleaningArea.isOutsourced = changedFields.isOutsourced.value
        break

      case 'remark':
        props.cleaningArea.remark = changedFields.remark.value
        break
    }
  },
})(AddCleaningAreaForm)

function CleaningAreaList ({
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
  cleaningArea,
}) {
  class AddCleaningArea extends React.Component {
    constructor (props) {
      super(props)
      this.state = {
        visible: false,
        isAddOrEdit: true,
        staffList: this.props.staffList,
        cleaningArea: this.props.cleaningArea,
      }
      this.dispatch = props.dispatch
    }
    showModal = () => {
      cleaningArea.regionId = this.props.initialRegion.id
      var staffList = this.props.staffList.map(x => {
        if (x.staffRegionId == cleaningArea.regionId) {
          return x
        }
      })
      staffList = staffList.filter(n => {
        return n != undefined
      })

      this.setState({
        staffList,
        cleaningArea,
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

      this.setState({
        staffList,
        cleaningArea: {
          id: cleaningArea.id,
          regionId: value,
          regionName: cleaningArea.regionName,
          areaCode: cleaningArea.areaCode,
          areaName: cleaningArea.areaName,
          place: cleaningArea.place,
          requirement: cleaningArea.requirement,
          staffId: null,
          staffName: cleaningArea.staffName,
          isOutsourced: cleaningArea.isOutsourced,
          createUserId: cleaningArea.createUserId,
          createUserName: cleaningArea.createUserName,
          createDate: cleaningArea.createDate,
          remark: cleaningArea.remark,
        },
      })
    };

    handleCancel = () => {
      const form = this.form

      form.validateFields((err, values) => {
        dispatch({
          type: 'cleaningAreaList/changeCleaningArea',
          payload: { cleaningArea: values },
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
          type: 'cleaningAreaList/addCleaningArea',
          payload: { cleaningArea: values },
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
            <NormalAddCleaningAreaForm
              regionList={this.props.regionList}
              staffList={this.state.staffList}
              dispatch={this.props.dispatch}
              ref={this.saveFormRef}
              visible={this.state.visible}
              isAddOrEdit={this.state.isAddOrEdit}
              onCancel={this.handleCancel}
              onCreate={this.handleCreate}
              selectRegion={this.selectRegion}
              cleaningArea={this.state.cleaningArea}
            />
          }
        </span>
      )
    }
  }

  class EditCleaningArea extends React.Component {
    constructor (props) {
      super(props)
      this.state = {
        visible: false,
        isAddOrEdit: true,
        staffList: this.props.staffList,
        cleaningArea: this.props.cleaningArea,
      }
      this.dispatch = props.dispatch
    }
    showModal = e => {
      e.preventDefault()

      var cleaningAreaprops = this.props.cleaningArea
      var staffList = this.props.staffList.map(x => {
        if (x.staffRegionId == cleaningAreaprops.regionId) {
          return x
        }
      })
      staffList = staffList.filter(n => {
        return n != undefined
      })

      this.setState({
        staffList,
        cleaningArea: {
          id: this.props.cleaningArea.id,
          regionId: this.props.cleaningArea.regionId,
          regionName: this.props.cleaningArea.regionName,
          areaCode: this.props.cleaningArea.areaCode,
          areaName: this.props.cleaningArea.areaName,
          place: this.props.cleaningArea.place,
          requirement: this.props.cleaningArea.requirement,
          staffId: this.props.cleaningArea.staffId,
          staffName: this.props.cleaningArea.staffName,
          isOutsourced: this.props.cleaningArea.isOutsourced,
          createUserId: this.props.cleaningArea.createUserId,
          createUserName: this.props.cleaningArea.createUserName,
          createDate: this.props.cleaningArea.createDate,
          remark: this.props.cleaningArea.remark,
        },
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

      this.setState({
        staffList,
        cleaningArea: {
          id: this.props.cleaningArea.id,
          regionId: value,
          regionName: this.props.cleaningArea.regionName,
          areaCode: this.props.cleaningArea.areaCode,
          areaName: this.props.cleaningArea.areaName,
          place: this.props.cleaningArea.place,
          requirement: this.props.cleaningArea.requirement,
          staffId: null,
          staffName: this.props.cleaningArea.staffName,
          isOutsourced: this.props.cleaningArea.isOutsourced,
          createUserId: this.props.cleaningArea.createUserId,
          createUserName: this.props.cleaningArea.createUserName,
          createDate: this.props.cleaningArea.createDate,
          remark: this.props.cleaningArea.remark,
        },
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

        values.id = this.props.cleaningArea.id
        dispatch({
          type: 'cleaningAreaList/editCleaningArea',
          payload: { cleaningArea: values },
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
            <NormalAddCleaningAreaForm
              regionList={this.props.regionList}
              staffList={this.state.staffList}
              dispatch={this.props.dispatch}
              ref={this.saveFormRef}
              visible={this.state.visible}
              selectRegion={this.selectRegion}
              isAddOrEdit={this.state.isAddOrEdit}
              onCancel={this.handleCancel}
              onCreate={this.handleCreate}
              cleaningArea={this.state.cleaningArea}
            />
          }
        </span>
      )
    }
  }

  class ShowCleaningArea extends React.Component {
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
            <NormalAddCleaningAreaForm
              regionList={this.props.regionList}
              staffList={this.props.staffList}
              dispatch={this.props.dispatch}
              ref={this.saveFormRef}
              visible={this.state.visible}
              isAddOrEdit={this.state.isAddOrEdit}
              onCancel={this.handleCancel}
              onCreate={this.handleCreate}
              handleIdCardNoValidate={this.handleIdCardNoValidate}
              handlePhoneValidate={this.handlePhoneValidate}
              cleaningArea={this.props.cleaningArea}
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
        type: 'cleaningAreaList/seniorSearchToggle',
        payload: true,
      })
    };
    closeSeniorSearch = () => {
      dispatch({
        type: 'cleaningAreaList/seniorSearchToggle',
        payload: false,
      })
    };
    seniorSearchHandler = e => {
      e.preventDefault()
      this.props.form.validateFields((err, values) => {
        if (!err) {
          dispatch({
            type: 'cleaningAreaList/seniorSearch',
            payload: values,
          })
        }
      })
    };
    resetSeniorSearch = () => {
      dispatch({
        type: 'cleaningAreaList/resetSeniorSearch',
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
    deleteCleaningArea = ids => {
      dispatch({
        type: 'cleaningAreaList/remove',
        payload: { ids },
      })
    };
    pageChangeHandler = page => {
      dispatch(
        routerRedux.push({
          pathname: '/cleaningAreaList',
          query: { page, filterStr, pageSize },
        })
      )
    };
    searchHandler = filterStr => {
      dispatch(
        routerRedux.push({
          pathname: '/cleaningAreaList',
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
          pathname: '/cleaningAreaList',
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
          title: '区域代码',
          dataIndex: 'areaCode',
          key: 'areaCode',
          width: 100,
        },
        {
          title: '区域名称',
          dataIndex: 'areaName',
          key: 'areaName',
          width: 120,
        },
        {
          title: '地址',
          dataIndex: 'place',
          key: 'place',
          width: 200,
        },
        {
          title: '工作要求',
          dataIndex: 'requirement',
          key: 'requirement',
          width: 200,
        },
        {
          title: '是否外包',
          dataIndex: 'isOutsourced',
          key: 'isOutsourced',
          width: 70,
          render: (text, record) =>
            (record.isOutsourced != null
              ? record.isOutsourced == 0 ? '是' : '否'
              : null),
        },
        {
          title: '责任人',
          dataIndex: 'staffName',
          key: 'staffName',
          width: 160,
        },
        {
          title: '备注',
          dataIndex: 'remark',
          key: 'remark',
          width: 300,
        },
        {
          title: '操作',
          fixed: 'right',
          width: 110,
          render: (text, record) => {
            return total
              ? <span>
                <ShowCleaningArea
                  regionList={regionList}
                  staffList={staffList}
                  dispatch={dispatch}
                  cleaningArea={record}
                  id={record.id}
                />
                  &nbsp;
                <EditCleaningArea
                  regionList={regionList}
                  staffList={staffList}
                  dispatch={dispatch}
                  cleaningArea={record}
                  id={record.id}
                />
                  &nbsp;
                <Popconfirm
                  title="确定要删除该保洁区域吗?"
                  onConfirm={this.deleteCleaningArea.bind(null, [record.id])}
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
              <Col span={16} style={{ textAlign: 'left' }}>
                <h1>
                  保洁区域
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

                    <FormItem {...formItemLayout} label="区域名称">
                      {getFieldDecorator('areaName', {})(<Input />)}
                    </FormItem>
                  </Col>
                  <Col span={8}>
                    <FormItem {...formItemLayout} label="责任人">
                      {getFieldDecorator('staffId', {})(<Select />)}
                    </FormItem>
                  </Col>
                  <Col span={8}>
                    <FormItem {...formItemLayout} label="管理区">
                      {getFieldDecorator(
                        'regionId',
                        {
                          // initialValue: seniorSearchData.handlePersonId
                        }
                      )(<Input />)}

                    </FormItem>
                  </Col>
                </Row>
                <Row gutter={8}>
                  <Col span={16}>
                    <FormItem {...formItemLongLayout} label="地址">
                      {getFieldDecorator(
                        'place',
                        {
                          // initialValue: seniorSearchData.respondents
                        }
                      )(<Input />)}
                    </FormItem>
                  </Col>

                  <Col span={8}>
                    <FormItem {...formItemLayout} label="区域代码">
                      {getFieldDecorator(
                        'areaCode',
                        {
                          // initialValue: seniorSearchData.visitReason
                        }
                      )(<Input />)}

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

                <AddCleaningArea
                  regionList={regionList}
                  staffList={staffList}
                  initialRegion={initialRegion}
                  dispatch={dispatch}
                  cleaningArea={cleaningArea}
                />
                <Popconfirm
                  title="确定要删除该保洁区域吗?"
                  onConfirm={this.deleteCleaningArea.bind(
                    this,
                    selectedRowKeys
                  )}
                >
                  <Button disabled={!hasSelected}>批量删除</Button>
                </Popconfirm>
                <Button disabled>导出</Button>
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
            rowKey={record => record.id}
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
    cleaningArea,
    seniorSearchData,
    seniorSearch,
  } = state.cleaningAreaList
  return {
    loading: state.loading.models.cleaningAreaList,
    list,
    total,
    page,
    filterStr,
    pageSize,
    regionList,
    staffList,
    initialRegion,
    cleaningArea,
    seniorSearchData,
    seniorSearch,
  }
}

export default connect(mapStateToProps)(CleaningAreaList)
