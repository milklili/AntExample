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
import styles from './CleaningToolManage.css'
import moment from 'moment'
import { PAGE_SIZE } from '../../constants'

const FormItem = Form.Item
const RangePicker = DatePicker.RangePicker
const RadioGroup = Radio.Group
const Option = Select.Option

const AddCleaningToolForm = Form.create()(props => {
  const {
    visible,
    onCancel,
    onCreate,
    countValidate,
    handleHoursValidate,
    form,
    selectRegion,
    staffList,
    cleaningTool,
    regionList,
    departmentList,
    dispatch,
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

  const departmentOptions = departmentList.map(value => (
    <Option key={value.id} value={value.id}>{value.name}</Option>
  ))

  return (
    <Modal
      visible={visible}
      title="保洁工具登记"
      okText="确定"
      onCancel={onCancel}
      onOk={onCreate}
    >
      <Form>
        <Row gutter={8}>
          <Col span={24}>
            <FormItem {...formItemLayout} label="管理区">
              {getFieldDecorator('regionId', {
                rules: [{ required: true, message: '请选择管理区' }],
              })(
                <Select
                  mode="combox"
                  placeholder="请选择"
                  style={{ width: '100%' }}
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
            <FormItem {...formItemLayout} label="部门">
              {getFieldDecorator(
                'departmentId',
                {
                  // initialValue: staffName
                }
              )(
                <Select
                  mode="combox"
                  placeholder="请选择"
                  style={{ width: '100%' }}
                >
                  {departmentOptions}
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={24}>
            <FormItem {...formItemLayout} label="工具名称">
              {getFieldDecorator('name', {
                rules: [{ required: true, message: '请输入工具名称' }],
              })(<Input />)}
            </FormItem>

          </Col>
        </Row>

        <Row gutter={8}>
          <Col span={24}>
            <FormItem {...formItemLayout} label="工具类型">
              {getFieldDecorator('type', {
                rules: [{ required: true, message: '请选择工具类型' }],
              })(
                <Select
                  mode="combobox "
                  placeholder="请选择"
                  style={{ width: '100%' }}
                >
                  <Option value={0}>耗材</Option>
                  <Option value={1}>保洁工具</Option>
                  <Option value={2}>保洁设备</Option>
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={24}>
            <FormItem {...formItemLayout} label="入库日期">
              {getFieldDecorator('registerDate', {
                // initialValue: [moment(new Date(), 'YYYY-MM-DD HH:mm:ss'), moment(new Date(), 'YYYY-MM-DD HH:mm:ss')],
                getValueProps: value => {
                  if (!value) {
                    cleaningTool.registerDate = moment(
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
                rules: [{ required: true, message: '请选择入库日期' }],
              })(<DatePicker style={{ width: '100%' }} format="YYYY-MM-DD" />)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={24}>
            <FormItem {...formItemLayout} label="工具说明">
              {getFieldDecorator('remark', {
                rules: [{ type: 'string', max: 50, message: '不超过50个字' }],
              })(<Input />)}
            </FormItem>

          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={24}>
            <FormItem {...formItemLayout} label="总数量">
              {getFieldDecorator('count', {
                rules: [
                  { required: true, message: '请输入总数量' },
                  {
                    validator: countValidate,
                  },
                ],
              })(<Input />)}
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
})
const NormalAddCleaningToolForm = Form.create({
  mapPropsToFields (props) {
    const fields = {}
    Object.keys(props.cleaningTool).forEach(key => {
      fields[key] = {
        value: props.cleaningTool[key],
      }
    })
    return {
      ...fields,
    }
  },

  onFieldsChange (props, changedFields) {
    props.onChange(changedFields)
  },
})(AddCleaningToolForm)

const ReceiveCleaningToolForm = Form.create()(props => {
  const {
    visible,
    onCancel,
    onCreate,
    handleHoursValidate,
    countValidate,
    form,
    selectRegion,
    staffList,
    cleaningToolItems,
    dispatch,
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

  return (
    <Modal
      visible={visible}
      title="保洁工具登记"
      okText="确定"
      onCancel={onCancel}
      onOk={onCreate}
    >
      <Form>
        <Row gutter={8}>
          <Col span={24}>
            <FormItem {...formItemLayout} label="工具名称">
              {getFieldDecorator('cleaningToolName', {})(<Input disabled />)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={24}>
            <FormItem {...formItemLayout} label="领用人">
              {getFieldDecorator(
                'staffId',
                {
                  // initialValue: staffName
                }
              )(
                <Select
                  mode="combox"
                  placeholder="请选择"
                  style={{ width: '100%' }}
                >
                  {staffOptions}
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={24}>
            <FormItem {...formItemLayout} label="领用数量">
              {getFieldDecorator('count', {
                rules: [
                  { required: true, message: '请输入领用数量' },
                  {
                    validator: countValidate,
                  },
                ],
              })(<Input />)}
            </FormItem>

          </Col>
        </Row>

        <Row gutter={8}>
          <Col span={24}>
            <FormItem {...formItemLayout} label="领用日期">
              {getFieldDecorator('date', {
                // initialValue: [moment(new Date(), 'YYYY-MM-DD HH:mm:ss'), moment(new Date(), 'YYYY-MM-DD HH:mm:ss')],
                getValueProps: value => {
                  if (!value) {
                    cleaningToolItems.date = moment(new Date(), 'YYYY-MM-DD')
                  }
                  return {
                    value: value
                      ? moment(value)
                      : moment(new Date(), 'YYYY-MM-DD'),
                  }
                },
              })(<DatePicker style={{ width: '100%' }} format="YYYY-MM-DD" />)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={24}>
            <FormItem {...formItemLayout} label="领用说明">
              {getFieldDecorator('remark', {
                rules: [{ type: 'string', max: 50, message: '不超过50个字' }],
              })(<Input />)}
            </FormItem>

          </Col>
        </Row>
      </Form>
    </Modal>
  )
})
const NormalReceiveCleaningToolForm = Form.create({
  mapPropsToFields (props) {
    const fields = {}
    Object.keys(props.cleaningToolItems).forEach(key => {
      fields[key] = {
        value: props.cleaningToolItems[key],
      }
    })
    return {
      ...fields,
    }
  },

  onFieldsChange (props, changedFields) {
    props.onChange(changedFields)
  },
})(ReceiveCleaningToolForm)

const ReturnCleaningToolForm = Form.create()(props => {
  const {
    visible,
    onCancel,
    onCreate,
    countValidate,
    handleHoursValidate,
    form,
    selectRegion,
    staffList,
    cleaningToolItems,
    dispatch,
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

  return (
    <Modal
      visible={visible}
      title="保洁工具登记"
      okText="确定"
      onCancel={onCancel}
      onOk={onCreate}
    >
      <Form>
        <Row gutter={8}>
          <Col span={24}>
            <FormItem {...formItemLayout} label="工具名称">
              {getFieldDecorator('cleaningToolName', {})(<Input disabled />)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={24}>
            <FormItem {...formItemLayout} label="领用人">
              {getFieldDecorator(
                'staffId',
                {
                  // initialValue: staffName
                }
              )(
                <Select
                  mode="combox"
                  placeholder="请选择"
                  style={{ width: '100%' }}
                >
                  {staffOptions}
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={24}>
            <FormItem {...formItemLayout} label="归还数量">
              {getFieldDecorator('count', {
                rules: [
                  { required: true, message: '请输入归还数量' },
                  {
                    validator: countValidate,
                  },
                ],
              })(<Input />)}
            </FormItem>

          </Col>
        </Row>

        <Row gutter={8}>
          <Col span={24}>
            <FormItem {...formItemLayout} label="归还日期">
              {getFieldDecorator('date', {
                // initialValue: [moment(new Date(), 'YYYY-MM-DD HH:mm:ss'), moment(new Date(), 'YYYY-MM-DD HH:mm:ss')],
                getValueProps: value => {
                  if (!value) {
                    cleaningToolItems.date = moment(new Date(), 'YYYY-MM-DD')
                  }
                  return {
                    value: value
                      ? moment(value)
                      : moment(new Date(), 'YYYY-MM-DD'),
                  }
                },
              })(<DatePicker style={{ width: '100%' }} format="YYYY-MM-DD" />)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={24}>
            <FormItem {...formItemLayout} label="归还说明">
              {getFieldDecorator('remark', {
                rules: [{ type: 'string', max: 50, message: '不超过50个字' }],
              })(<Input />)}
            </FormItem>

          </Col>
        </Row>
      </Form>
    </Modal>
  )
})
const NormalReturnCleaningToolForm = Form.create({
  mapPropsToFields (props) {
    const fields = {}
    Object.keys(props.cleaningToolItems).forEach(key => {
      fields[key] = {
        value: props.cleaningToolItems[key],
      }
    })
    return {
      ...fields,
    }
  },

  onFieldsChange (props, changedFields) {
    props.onChange(changedFields)
  },
})(ReturnCleaningToolForm)

function CleaningToolList ({
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
  initialRegion,
  cleaningTool,
  regionList,
  departmentList,
}) {
  class AddCleaningTool extends React.Component {
    constructor (props) {
      super(props)
      this.state = {
        visible: false,

        staffList: this.props.staffList,
        departmentList: this.props.departmentList,
        cleaningTool: this.props.cleaningTool,
      }
      this.dispatch = props.dispatch
    }
    showModal = () => {
      cleaningTool.regionId = this.props.initialRegion.id
      cleaningTool.departmentId = null

      var departmentList = this.props.departmentList.map(x => {
        if (x.regionId == cleaningTool.regionId) {
          return x
        }
      })
      departmentList = departmentList.filter(n => {
        return n != undefined
      })

      this.setState({
        staffList,
        departmentList,
        cleaningTool,
      })
      this.setState({ visible: true })
    };

    selectRegion = value => {
      var departmentList = this.props.departmentList.map(x => {
        if (x.regionId == value) {
          return x
        }
      })
      departmentList = departmentList.filter(n => {
        return n != undefined
      })
      this.setState({
        departmentList,
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
        // const ids = this.props.cleaningTool.map(value => value.staffId);

        // staffList.map(value =>
        //    <Option key={value.staffId} value={value.staffId}>{value.staffName}</Option>
        // );

        // values.staffId = this.props.cleaningTool.staffId;
        dispatch({
          type: 'cleaningToolList/addCleaningTool',
          payload: { cleaningTool: values },
        })
        form.resetFields()
        this.setState({ visible: false })
      })
    };
    saveFormRef = form => {
      this.form = form
    };

    countValidate = (rule, value, callback) => {
      if (
        value != null && value != '' && !/^\d+(?=\.{0,1}\d+$|$)/.test(value)
      ) {
        callback('请正确输入总数量')
      }
      callback()
    };
    handleFormChange = changedFields => {
      const key = Object.keys(changedFields)[0]
      const value = changedFields[key].value

      let data = { [key]: value }

      if (key == 'regionId') {
        data = { departmentId: null, [key]: value }
      }

      var cleaningTool = { ...this.state.cleaningTool, ...data }
      this.setState({
        cleaningTool: { ...this.state.cleaningTool, ...cleaningTool },
      })
    };

    render () {
      // let ids = [];
      // ids.push(this.props.rowData.id);
      return (
        <span>

          <Button type="primary" onClick={this.showModal}>新建</Button>
          {
            <NormalAddCleaningToolForm
              cleaningTool={this.props.cleaningTool}
              regionList={this.props.regionList}
              departmentList={this.state.departmentList}
              staffList={this.props.staffList}
              selectRegion={this.selectRegion}
              cleaningTool={this.state.cleaningTool}
              dispatch={this.props.dispatch}
              ref={this.saveFormRef}
              countValidate={this.countValidate}
              visible={this.state.visible}
              isHoursEdit={this.state.isHoursEdit}
              onCancel={this.handleCancel}
              onCreate={this.handleCreate}
              onChange={this.handleFormChange}
            />
          }
        </span>
      )
    }
  }

  class ReceiveCleaningTool extends React.Component {
    constructor (props) {
      super(props)
      this.state = {
        visible: false,
        staffList: this.props.staffList,
        departmentList: this.props.departmentList,
        cleaningToolItems: {
          cleaningToolId: null,
          staffId: null,
          count: null,
          date: null,
          remark: null,
        },
      }
      this.dispatch = props.dispatch
    }
    showModal = () => {
      // this.state.cleaningToolItems.cleaningToolId = this.props.cleaningTool.id;
      var cleaningTool = this.props.cleaningTool

      var staffList = this.props.staffList.map(x => {
        if (x.staffRegionId == cleaningTool.regionId) {
          return x
        }
      })
      staffList = staffList.filter(n => {
        return n != undefined
      })

      var cleaningToolItems = {
        ...this.state.cleaningToolItems,
        ...{ cleaningToolId: this.props.cleaningTool.id },
        ...{ cleaningToolName: this.props.cleaningTool.name },
      }
      this.setState({
        staffList,
        cleaningToolItems: {
          ...this.state.cleaningToolItems,
          ...cleaningToolItems,
        },
      })
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
        // const ids = this.props.cleaningTool.map(value => value.staffId);

        // staffList.map(value =>
        //    <Option key={value.staffId} value={value.staffId}>{value.staffName}</Option>
        // );

        values.cleaningToolId = this.props.cleaningTool.id
        values.count = parseInt(values.count)
        values.type = 0

        dispatch({
          type: 'cleaningToolList/receiveOrReturnToolItems',
          payload: { cleaningToolItems: values },
        })
        form.resetFields()
        this.setState({ visible: false })
      })
    };
    saveFormRef = form => {
      this.form = form
    };

    countValidate = (rule, value, callback) => {
      if (
        value != null &&
        value != '' &&
        (!/^\d+(?=\.{0,1}\d+$|$)/.test(value) ||
          value > this.props.cleaningTool.inventoryCount)
      ) {
        callback(`请正确输入领用数量,最多${this.props.cleaningTool.inventoryCount}个`)
      }
      callback()
    };

    handleFormChange = changedFields => {
      const key = Object.keys(changedFields)[0]
      const value = changedFields[key].value

      let data = { [key]: value }

      var cleaningToolItems = { ...this.state.cleaningToolItems, ...data }
      this.setState({
        cleaningToolItems: {
          ...this.state.cleaningToolItems,
          ...cleaningToolItems,
        },
      })
    };

    render () {
      // let ids = [];
      // ids.push(this.props.rowData.id);
      return (
        <span>

          <a onClick={this.showModal}>领用</a>
          {
            <NormalReceiveCleaningToolForm
              cleaningTool={this.props.cleaningTool}
              staffList={this.state.staffList}
              selectRegion={this.selectRegion}
              cleaningToolItems={this.state.cleaningToolItems}
              dispatch={this.props.dispatch}
              countValidate={this.countValidate}
              ref={this.saveFormRef}
              visible={this.state.visible}
              onCancel={this.handleCancel}
              onCreate={this.handleCreate}
              onChange={this.handleFormChange}
            />
          }
        </span>
      )
    }
  }

  class ReturnCleaningTool extends React.Component {
    constructor (props) {
      super(props)
      this.state = {
        visible: false,
        staffList: this.props.staffList,
        departmentList: this.props.departmentList,
        cleaningToolItems: {
          cleaningToolId: null,
          staffId: null,
          count: null,
          date: null,
          remark: null,
        },
      }
      this.dispatch = props.dispatch
    }
    showModal = () => {
      // this.state.cleaningToolItems.cleaningToolId = this.props.cleaningTool.id;
      var cleaningTool = this.props.cleaningTool

      var staffList = this.props.staffList.map(x => {
        if (x.staffRegionId == cleaningTool.regionId) {
          return x
        }
      })
      staffList = staffList.filter(n => {
        return n != undefined
      })

      var cleaningToolItems = {
        ...this.state.cleaningToolItems,
        ...{ cleaningToolId: this.props.cleaningTool.id },
        ...{ cleaningToolName: this.props.cleaningTool.name },
      }
      this.setState({
        staffList,
        cleaningToolItems: {
          ...this.state.cleaningToolItems,
          ...cleaningToolItems,
        },
      })
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

        values.cleaningToolId = this.props.cleaningTool.id
        values.count = parseInt(values.count)
        values.type = 1

        dispatch({
          type: 'cleaningToolList/receiveOrReturnToolItems',
          payload: { cleaningToolItems: values },
        })
        form.resetFields()
        this.setState({ visible: false })
      })
    };
    saveFormRef = form => {
      this.form = form
    };
    countValidate = (rule, value, callback) => {
      if (
        value != null &&
        value != '' &&
        (!/^\d+(?=\.{0,1}\d+$|$)/.test(value) ||
          value > this.props.cleaningTool.recipientsCount)
      ) {
        callback(`请正确输入归还数量,最多${this.props.cleaningTool.recipientsCount}个`)
      }
      callback()
    };

    handleFormChange = changedFields => {
      const key = Object.keys(changedFields)[0]
      const value = changedFields[key].value

      let data = { [key]: value }

      var cleaningToolItems = { ...this.state.cleaningToolItems, ...data }
      this.setState({
        cleaningToolItems: {
          ...this.state.cleaningToolItems,
          ...cleaningToolItems,
        },
      })
    };

    render () {
      // let ids = [];
      // ids.push(this.props.rowData.id);
      return (
        <span>

          <a onClick={this.showModal}>归还</a>
          {
            <NormalReturnCleaningToolForm
              cleaningTool={this.props.cleaningTool}
              staffList={this.state.staffList}
              selectRegion={this.selectRegion}
              cleaningToolItems={this.state.cleaningToolItems}
              dispatch={this.props.dispatch}
              ref={this.saveFormRef}
              countValidate={this.countValidate}
              visible={this.state.visible}
              onCancel={this.handleCancel}
              onCreate={this.handleCreate}
              onChange={this.handleFormChange}
            />
          }
        </span>
      )
    }
  }

  class CleaningTool extends React.Component {
    state = {
      selectedRowKeys: [], // Check here to configure the default column
      selectedRows: [],
    };
    openSeniorSearch = () => {
      dispatch({
        type: 'cleaningToolList/seniorSearchToggle',
        payload: true,
      })
    };
    closeSeniorSearch = () => {
      dispatch({
        type: 'cleaningToolList/seniorSearchToggle',
        payload: false,
      })
    };
    seniorSearchHandler = e => {
      e.preventDefault()
      this.props.form.validateFields((err, values) => {
        if (!err) {
          dispatch({
            type: 'cleaningToolList/seniorSearch',
            payload: values,
          })
        }
      })
    };
    resetSeniorSearch = () => {
      dispatch({
        type: 'cleaningToolList/resetSeniorSearch',
      })
    };

    showCleaningTool = id => {
      dispatch(
        routerRedux.push({
          pathname: '/showOrEditCleaningTool',
          query: { id },
        })
      )
    };
    editCleaningTool = id => {
      dispatch(
        routerRedux.push({
          pathname: '/showOrEditCleaningTool',
          query: { id },
        })
      )
    };

    pageChangeHandler = page => {
      dispatch(
        routerRedux.push({
          pathname: '/cleaningToolList',
          query: { page, filterStr, pageSize },
        })
      )
    };
    searchHandler = filterStr => {
      dispatch(
        routerRedux.push({
          pathname: '/cleaningToolList',
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
          pathname: '/cleaningToolList',
          query: { page: current, filterStr, pageSize },
        })
      )
    };
    deleteCleaningTool = ids => {
      dispatch({
        type: 'cleaningToolList/remove',
        payload: { ids },
      })
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
          title: '序号',
          dataIndex: 'id',
          key: 'id',
          width: 50,
        },
        {
          title: '工具名称',
          dataIndex: 'name',
          key: 'name',
          width: 120,
        },
        {
          title: '类型',
          dataIndex: 'typeStr',
          key: 'typeStr',
          width: 100,
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
          width: 100,
        },
        {
          title: '总数量',
          dataIndex: 'count',
          key: 'count',
          width: 50,
        },
        {
          title: '领用数量',
          dataIndex: 'recipientsCount',
          key: 'recipientsCount',
          width: 60,
        },
        {
          title: '库存数量',
          dataIndex: 'inventoryCount',
          key: 'inventoryCount',
          width: 60,
        },
        {
          title: '报修数量',
          dataIndex: 'repairsCount',
          key: 'repairsCount',
          width: 60,
        },

        {
          title: '操作',
          // fixed: "right",
          width: 140,
          render: (text, record) => (
            <span>
              <a onClick={this.showCleaningTool.bind(null, record.id)}>查看</a>
              &nbsp;
              <a onClick={this.editCleaningTool.bind(null, [record.id])}>编辑</a>
              &nbsp;
              {
                <ReceiveCleaningTool
                  cleaningTool={record}
                  staffList={staffList}
                  dispatch={dispatch}
                />
              }
              &nbsp;
              {
                <ReturnCleaningTool
                  cleaningTool={record}
                  staffList={staffList}
                  dispatch={dispatch}
                />
              }
              &nbsp;
              <Popconfirm
                title="确定要删除该保洁检查吗?"
                onConfirm={this.deleteCleaningTool.bind(this, [record.id])}
              >
                <a>删除</a>
              </Popconfirm>
            </span>
          ),
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
            <Row>
              <Col span={16}>
                {
                  <AddCleaningTool
                    cleaningTool={cleaningTool}
                    staffList={staffList}
                    regionList={regionList}
                    initialRegion={initialRegion}
                    departmentList={departmentList}
                    dispatch={dispatch}
                  />
                }

                <Popconfirm
                  title="确定要删除该保洁检查吗?"
                  onConfirm={this.deleteCleaningTool.bind(
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
                    <FormItem {...formItemLayout} label="工具名称">
                      {getFieldDecorator('name', {
                        initialValue: seniorSearchData.staffName,
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
                      )(<Select />)}
                    </FormItem>
                  </Col>
                  <Col span={8}>
                    <FormItem {...formItemLayout} label="领用日期">
                      {getFieldDecorator('attendanceInterval', {
                        initialValue: seniorSearchData.attendanceInterval,
                      })(<RangePicker />)}

                    </FormItem>
                  </Col>
                </Row>
                <Row gutter={8}>
                  <Col span={8}>
                    <FormItem {...formItemLayout} label="领用人">
                      {getFieldDecorator('staffId', {
                        initialValue: seniorSearchData.staffName,
                      })(<Select />)}
                    </FormItem>
                  </Col>
                  <Col span={8}>
                    <FormItem {...formItemLayout} label="部门">
                      {getFieldDecorator(
                        'departmentId',
                        {
                          // initialValue: seniorSearchData.documentCategoryId
                        }
                      )(<Select />)}
                    </FormItem>
                  </Col>
                  <Col span={8}>
                    <FormItem {...formItemLayout} label="管理区">
                      {getFieldDecorator('regionId', {
                        initialValue: seniorSearchData.attendanceInterval,
                      })(<Select />)}

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
            // scroll={{ x: "110%" }}
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

  const CleaningToolForm = Form.create()(CleaningTool)
  return <CleaningToolForm />
}

function mapStateToProps (state) {
  const {
    list,
    total,
    page,
    filterStr,
    pageSize,
    staffList,
    regionList,
    cleaningTool,
    departmentList,
    seniorSearchData,
    seniorSearch,
    initialRegion,
  } = state.cleaningToolList

  return {
    loading: state.loading.models.cleaningToolList,
    list,
    total,
    page,
    filterStr,
    pageSize,
    staffList,
    regionList,
    cleaningTool,
    departmentList,
    seniorSearchData,
    seniorSearch,
    initialRegion,
  }
}

export default connect(mapStateToProps)(CleaningToolList)
