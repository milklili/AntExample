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
import styles from './SecurityEquipMentManage.css'
import moment from 'moment'
import 'moment/locale/zh-cn'

moment.locale('zh-cn')
import { PAGE_SIZE } from '../../constants'

const FormItem = Form.Item
const RangePicker = DatePicker.RangePicker
const RadioGroup = Radio.Group
const Option = Select.Option

const AddSecurityEquipMentForm = Form.create()(props => {
  const {
    visible,
    onCancel,
    onCreate,
    handleNumberValidate,
    selectRegion,
    form,
    dispatch,
    regionList,
    departmentList,
    staffList,
    securityEquipMent,
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
  const departmentOptions = departmentList.map(value => (
    <Option key={value.id} value={value.id}>{value.name}</Option>
  ))
  const responsibilityPersonOptions = staffList.map(value => (
    <Option key={value.staffId} value={value.staffId}>{value.staffName}</Option>
  ))
  const isSelectRegion =
    securityEquipMent.regionId != null && securityEquipMent.regionId > 0
  return (
    <Modal
      visible={visible}
      title="安防设施设备器材"
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
                  onChange={selectRegion}
                  disabled={!isAddOrEdit}
                >
                  {regionOptions}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem {...formItemLayout} label="名称" placeholder="请输入">
              {getFieldDecorator('name', {
                rules: [
                  {
                    required: true,
                    type: 'string',
                    max: 30,
                    message: '请输入名称,不超过30个字',
                  },
                ],
              })(<Input disabled={!isAddOrEdit} />)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <FormItem
              {...formItemLayout}
              label="类型"

              // hasFeedback
            >
              {getFieldDecorator('type', {
                rules: [{ required: true, message: '请选择类型!' }],
              })(
                <Select
                  mode="combox"
                  placeholder="请选择"
                  // onChange={handleChange}
                  style={{ width: '100%' }}
                  disabled={!isAddOrEdit}
                >
                  <Option value="消防设施设备">消防设施设备</Option>
                  <Option value="消防器材">消防器材</Option>
                  <Option value="保安器材">保安器材</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem {...formItemLayout} label="地点/区域">
              {getFieldDecorator('place', {
                // initialValue: securityEquipMent.name,
                rules: [
                  {
                    required: true,
                    type: 'string',
                    max: 30,
                    message: '请输入地点/区域，不超过30个字',
                  },
                ],
              })(<Input disabled={!isAddOrEdit} />)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <FormItem {...formItemLayout} label="规格型号">
              {getFieldDecorator('specificationModel', {
                // initialValue: securityEquipMent.name,
                rules: [
                  {
                    required: true,
                    type: 'string',
                    max: 20,
                    message: '请输入规格型号，不超过20个字',
                  },
                ],
              })(<Input disabled={!isAddOrEdit} />)}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem {...formItemLayout} label="数量">
              {getFieldDecorator('quantity', {
                // initialValue: securityEquipMent.name,
                rules: [
                  { required: true, message: '请输入数量!' },
                  {
                    validator: handleNumberValidate,
                  },
                ],
              })(<Input disabled={!isAddOrEdit} />)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <FormItem
              {...formItemLayout}
              label="责任人"

              // hasFeedback
            >
              {getFieldDecorator('responsibilityPersonId', {
                rules: [{ required: true, message: '请选择责任人!' }],
              })(
                <Select
                  mode="combox"
                  placeholder="请选择"
                  // onChange={handleChange}
                  style={{ width: '100%' }}
                  disabled={!isSelectRegion}
                  disabled={!isAddOrEdit}
                >
                  {responsibilityPersonOptions}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              {...formItemLayout}
              label="责任部门"

              // hasFeedback
            >
              {getFieldDecorator('departmentId', {})(
                <Select
                  mode="combox"
                  placeholder="请选择"
                  style={{ width: '100%' }}
                  // disabled={!isSelectRegion}
                  disabled={!isAddOrEdit}
                >
                  {departmentOptions}
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <FormItem {...formItemRow} label="备注">
              {getFieldDecorator('remark', {
                rules: [
                  {
                    required: false,
                    type: 'string',
                    max: 80,
                    message: '请输入地点/区域，不超过80个字',
                  },
                ],
              })(<Input type="textarea" disabled={!isAddOrEdit} />)}
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
})

const NormalAddSecurityEquipMentForm = Form.create({
  mapPropsToFields (props) {
    const fields = {}
    Object.keys(props.securityEquipMent).forEach(key => {
      fields[key] = {
        value: props.securityEquipMent[key],
      }
    })
    return {
      ...fields,
    }
  },

  onFieldsChange (props, changedFields) {
    props.onChange(changedFields)
  },
})(AddSecurityEquipMentForm)

function SecurityEquipMentList ({
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
  departmentList,
  staffList,
  initialRegion,
  visible,
  securityEquipMent,
}) {
  class AddSecurityEquipMent extends React.Component {
    constructor (props) {
      super(props)
      this.state = {
        visible: false,
        // visible: this.props.visible,
        staffList: this.props.staffList,
        departmentList: this.props.departmentList,
        isAddOrEdit: true,
        securityEquipMent: this.props.securityEquipMent,
      }
      this.dispatch = props.dispatch
    }
    showModal = () => {
      securityEquipMent.regionId = this.props.initialRegion.id
      var staffList = this.props.staffList.map(x => {
        if (x.staffRegionId == securityEquipMent.regionId) {
          return x
        }
      })
      staffList = staffList.filter(n => {
        return n != undefined
      })

      var departmentList = this.props.departmentList.map(x => {
        if (x.regionId == securityEquipMent.regionId) {
          return x
        }
      })
      departmentList = departmentList.filter(n => {
        return n != undefined
      })

      this.setState({
        staffList,
        departmentList,
        securityEquipMent,
      })

      this.setState({ visible: true })
    };
    handleCancel = () => {
      const form = this.form

      form.validateFields((err, values) => {
        dispatch({
          type: 'securityEquipMentList/changeSecurityEquipMent',
          payload: { securityEquipMent: values },
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
          type: 'securityEquipMentList/addSecurityEquipMent',
          payload: { securityEquipMent: values },
        })
        form.resetFields()
        this.setState({ visible: false })
      })
    };

    handleNumberValidate = (rule, value, callback) => {
      if (value != null && value != '' && !/^[0-9]*[1-9][0-9]*$/.test(value)) {
        callback('数量格式错误，请输入数字')
      }
      callback()
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

      var departmentList = this.props.departmentList.map(x => {
        if (x.regionId == value) {
          return x
        }
      })
      departmentList = departmentList.filter(n => {
        return n != undefined
      })
      // this.props.securityEquipMent.regionName,

      this.setState({
        staffList,
        departmentList,
        securityEquipMent: {
          regionId: value,
          regionName: securityEquipMent.regionName,
          name: securityEquipMent.name,
          id: securityEquipMent.id,
          type: securityEquipMent.type,
          place: securityEquipMent.place,
          specificationModel: securityEquipMent.specificationModel,
          responsibilityPersonId: null,
          responsibilityPersonName: securityEquipMent.responsibilityPersonName,
          quantity: securityEquipMent.quantity,
          departmentId: null,
          departmentName: securityEquipMent.departmentName,
          remark: securityEquipMent.remark,
        },
      })
    };
    saveFormRef = form => {
      this.form = form
    };
    handleFormChange = changedFields => {
      const key = Object.keys(changedFields)[0]
      const value = changedFields[key].value

      let data = { [key]: value }

      if (key == 'regionId') {
        data = {
          responsibilityPersonId: null,
          departmentId: null,
          [key]: value,
        }
      }

      var securityEquipMent = { ...this.state.securityEquipMent, ...data }
      this.setState({
        securityEquipMent: {
          ...this.state.securityEquipMent,
          ...securityEquipMent,
        },
      })
    };

    render () {
      return (
        <span>
          <Button type="primary" onClick={this.showModal}>新建</Button>
          {
            <NormalAddSecurityEquipMentForm
              regionList={this.props.regionList}
              departmentList={this.state.departmentList}
              staffList={this.state.staffList}
              dispatch={this.props.dispatch}
              ref={this.saveFormRef}
              visible={this.state.visible}
              isAddOrEdit={this.state.isAddOrEdit}
              onCancel={this.handleCancel}
              onCreate={this.handleCreate}
              selectRegion={this.selectRegion}
              handleNumberValidate={this.handleNumberValidate}
              securityEquipMent={this.state.securityEquipMent}
              onChange={this.handleFormChange}
            />
          }
        </span>
      )
    }
  }

  class EditSecurityEquipMent extends React.Component {
    constructor (props) {
      super(props)
      this.state = {
        visible: false,
        // visible: this.props.visible,
        staffList: this.props.staffList,
        departmentList: this.props.departmentList,
        isAddOrEdit: true,
        securityEquipMent: this.props.securityEquipMent,
      }
      this.dispatch = props.dispatch
    }
    showModal = e => {
      e.preventDefault()

      var securityEquipMentOption = this.props.securityEquipMent
      var staffList = this.props.staffList.map(x => {
        if (x.staffRegionId == securityEquipMentOption.regionId) {
          return x
        }
      })
      staffList = staffList.filter(n => {
        return n != undefined
      })

      var departmentList = this.props.departmentList.map(x => {
        if (x.regionId == securityEquipMentOption.regionId) {
          return x
        }
      })
      departmentList = departmentList.filter(n => {
        return n != undefined
      })
      this.setState({
        staffList,
        departmentList,
        securityEquipMent: {
          regionId: this.props.securityEquipMent.regionId,
          regionName: this.props.securityEquipMent.regionName,
          name: this.props.securityEquipMent.name,
          id: this.props.securityEquipMent.id,
          type: this.props.securityEquipMent.type,
          place: this.props.securityEquipMent.place,
          specificationModel: this.props.securityEquipMent.specificationModel,
          responsibilityPersonId: this.props.securityEquipMent
            .responsibilityPersonId,
          responsibilityPersonName: this.props.securityEquipMent
            .responsibilityPersonName,
          quantity: this.props.securityEquipMent.quantity,
          departmentId: this.props.securityEquipMent.departmentId,
          departmentName: this.props.securityEquipMent.departmentName,
          remark: this.props.securityEquipMent.remark,
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
        values.id = this.props.securityEquipMent.id
        dispatch({
          type: 'securityEquipMentList/editSecurityEquipMent',
          payload: { securityEquipMent: values },
        })
        form.resetFields()
        this.setState({ visible: false })
      })
    };

    handleNumberValidate = (rule, value, callback) => {
      if (value != null && value != '' && !/^[0-9]*[1-9][0-9]*$/.test(value)) {
        callback('数量格式错误，请输入数字')
      }
      callback()
    };

    saveFormRef = form => {
      this.form = form
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

      var departmentList = this.props.departmentList.map(x => {
        if (x.regionId == value) {
          return x
        }
      })
      departmentList = departmentList.filter(n => {
        return n != undefined
      })
      // this.props.securityEquipMent.regionName,

      this.setState({
        staffList,
        departmentList,
        securityEquipMent: {
          regionId: value,
          regionName: this.props.securityEquipMent.regionName,
          name: this.props.securityEquipMent.name,
          id: this.props.securityEquipMent.id,
          type: this.props.securityEquipMent.type,
          place: this.props.securityEquipMent.place,
          specificationModel: this.props.securityEquipMent.specificationModel,
          responsibilityPersonId: null,
          responsibilityPersonName: this.props.securityEquipMent
            .responsibilityPersonName,
          quantity: this.props.securityEquipMent.quantity,
          departmentId: null,
          departmentName: this.props.securityEquipMent.departmentName,
          remark: this.props.securityEquipMent.remark,
        },
      })
    };
    handleFormChange = changedFields => {
      const key = Object.keys(changedFields)[0]
      const value = changedFields[key].value

      let data = { [key]: value }

      if (key == 'regionId') {
        data = {
          responsibilityPersonId: null,
          departmentId: null,
          [key]: value,
        }
      }

      var securityEquipMent = { ...this.state.securityEquipMent, ...data }
      this.setState({
        securityEquipMent: {
          ...this.state.securityEquipMent,
          ...securityEquipMent,
        },
      })
    };
    render () {
      return (
        <span>
          <a onClick={this.showModal}>编辑</a>
          {
            <NormalAddSecurityEquipMentForm
              regionList={this.props.regionList}
              departmentList={this.state.departmentList}
              staffList={this.state.staffList}
              dispatch={this.props.dispatch}
              ref={this.saveFormRef}
              visible={this.state.visible}
              isAddOrEdit={this.state.isAddOrEdit}
              onCancel={this.handleCancel}
              onCreate={this.handleCreate}
              selectRegion={this.selectRegion}
              handleNumberValidate={this.handleNumberValidate}
              securityEquipMent={this.state.securityEquipMent}
              onChange={this.handleFormChange}
            />
          }
        </span>
      )
    }
  }

  class ShowSecurityEquipMent extends React.Component {
    constructor (props) {
      super(props)
      this.state = {
        visible: false,
        // visible: this.props.visible,
        staffList: this.props.staffList,
        departmentList: this.props.departmentList,
        isAddOrEdit: false,
        securityEquipMent: this.props.securityEquipMent,
      }
      this.dispatch = props.dispatch
    }
    showModal = e => {
      e.preventDefault()

      var staffList = this.props.staffList.map(x => {
        if (x.staffRegionId == securityEquipMent.regionId) {
          return x
        }
      })
      staffList = staffList.filter(n => {
        return n != undefined
      })

      var departmentList = this.props.departmentList.map(x => {
        if (x.regionId == securityEquipMent.regionId) {
          return x
        }
      })
      departmentList = departmentList.filter(n => {
        return n != undefined
      })
      this.setState({
        staffList,
        departmentList,
        securityEquipMent: {
          regionId: this.props.securityEquipMent.regionId,
          regionName: this.props.securityEquipMent.regionName,
          name: this.props.securityEquipMent.name,
          id: this.props.securityEquipMent.id,
          type: this.props.securityEquipMent.type,
          place: this.props.securityEquipMent.place,
          specificationModel: this.props.securityEquipMent.specificationModel,
          responsibilityPersonId: this.props.securityEquipMent
            .responsibilityPersonId,
          responsibilityPersonName: this.props.securityEquipMent
            .responsibilityPersonName,
          quantity: this.props.securityEquipMent.quantity,
          departmentId: this.props.securityEquipMent.departmentId,
          departmentName: this.props.securityEquipMent.departmentName,
          remark: this.props.securityEquipMent.remark,
        },
      })

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
            <NormalAddSecurityEquipMentForm
              regionList={this.props.regionList}
              departmentList={this.state.departmentList}
              staffList={this.state.staffList}
              dispatch={this.props.dispatch}
              ref={this.saveFormRef}
              visible={this.state.visible}
              isAddOrEdit={this.state.isAddOrEdit}
              onCancel={this.handleCancel}
              onCreate={this.handleCreate}
              selectRegion={this.selectRegion}
              handleIdCardNoValidate={this.handleIdCardNoValidate}
              handlePhoneValidate={this.handlePhoneValidate}
              securityEquipMent={this.state.securityEquipMent}
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
        type: 'securityEquipMentList/seniorSearchToggle',
        payload: true,
      })
    };
    closeSeniorSearch = () => {
      dispatch({
        type: 'securityEquipMentList/seniorSearchToggle',
        payload: false,
      })
    };
    seniorSearchHandler = e => {
      e.preventDefault()
      this.props.form.validateFields((err, values) => {
        if (!err) {
          dispatch({
            type: 'securityEquipMentList/seniorSearch',
            payload: values,
          })
        }
      })
    };
    resetSeniorSearch = () => {
      dispatch({
        type: 'securityEquipMentList/resetSeniorSearch',
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
    deleteSecurityEquipMent = ids => {
      dispatch({
        type: 'securityEquipMentList/remove',
        payload: { ids },
      })
    };
    pageChangeHandler = page => {
      dispatch(
        routerRedux.push({
          pathname: '/securityEquipMentList',
          query: { page, filterStr, pageSize },
        })
      )
    };
    searchHandler = filterStr => {
      dispatch(
        routerRedux.push({
          pathname: '/securityEquipMentList',
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
          pathname: '/securityEquipMentList',
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
          title: '序号',
          dataIndex: 'id',
          key: 'id',
          width: 80,
        },
        {
          title: '名称',
          dataIndex: 'name',
          key: 'name',
          width: 120,
        },
        {
          title: '类型',
          dataIndex: 'type',
          key: 'type',
          width: 100,
        },
        {
          title: '责任部门',
          dataIndex: 'departmentName',
          key: 'departmentName',
          width: 120,
        },
        {
          title: '管理区',
          dataIndex: 'regionName',
          key: 'regionName',
          width: 120,
        },
        {
          title: '地点/区域',
          dataIndex: 'place',
          key: 'place',
          width: 120,
        },
        {
          title: '数量',
          dataIndex: 'quantity',
          key: 'quantity',
          width: 80,
        },
        {
          title: '型号规格',
          dataIndex: 'specificationModel',
          key: 'specificationModel',
          width: 150,
        },
        {
          title: '责任人',
          dataIndex: 'responsibilityPersonName',
          key: 'responsibilityPersonName',
          width: 150,
        },
        {
          title: '操作',
          key: 'operation',
          fixed: 'right',
          width: 100,
          render: (text, record) => // <span className={styles.operation}>
          //    <a onClick={this.editSecurityEquipMent.bind(null, record.id)}>编辑</a>
          //    <a onClick={this.watchSecurityEquipMent.bind(null, record.id)}>查看</a>
          //    <Popconfirm title="确定要删除该安保器材吗?" onConfirm={this.deleteHandler.bind(null, [record.id])}>
          //        <a >删除</a>
          //    </Popconfirm>

          // </span>
            (
              <span>
                <ShowSecurityEquipMent
                  regionList={regionList}
                  departmentList={departmentList}
                  staffList={staffList}
                  initialRegion={initialRegion}
                  visible={visible}
                  dispatch={dispatch}
                  securityEquipMent={record}
                  id={record.id}
                />
              &nbsp;
                <EditSecurityEquipMent
                  regionList={regionList}
                  departmentList={departmentList}
                  staffList={staffList}
                  initialRegion={initialRegion}
                  visible={visible}
                  dispatch={dispatch}
                  securityEquipMent={record}
                  id={record.id}
                />
              &nbsp;
                <Popconfirm
                  title="确定要删除该安保器材吗?"
                  onConfirm={this.deleteSecurityEquipMent.bind(null, [record.id])}
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
                  安防区域及器材管理
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
                <Row gutter={60}>
                  <Col span={8}>
                    <FormItem {...formItemLayout} label="名称:">
                      {getFieldDecorator(
                        'name',
                        {
                          // initialValue: workingPlan.name,
                        }
                      )(<Input />)}
                    </FormItem>
                  </Col>
                  <Col span={8}>
                    <FormItem {...formItemLayout} label="地点/区域:">
                      {getFieldDecorator(
                        'place',
                        {
                          // initialValue: workingPlan.place,
                        }
                      )(<Input />)}

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
                      {getFieldDecorator(
                        'responsibilityPersonName',
                        {
                          // initialValue: workingPlan.responsibilityPersonName,
                        }
                      )(
                        <Select
                          mode="multiple"
                          placeholder="请选择"
                          // onChange={handleChange}
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
                      {getFieldDecorator(
                        'departmentName',
                        {
                          // initialValue: workingPlan.departmentName,
                        }
                      )(
                        <Select
                          mode="multiple"
                          placeholder="请选择"
                          // onChange={handleChange}
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

                      // hasFeedback
                    >
                      {getFieldDecorator('type', {})(
                        <Select
                          mode="multiple"
                          placeholder="请选择"
                          // onChange={handleChange}
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

                <AddSecurityEquipMent
                  regionList={regionList}
                  departmentList={departmentList}
                  staffList={staffList}
                  initialRegion={initialRegion}
                  visible={visible}
                  dispatch={dispatch}
                  securityEquipMent={securityEquipMent}
                />
                <Popconfirm
                  title="确定要删除该安保器材吗?"
                  onConfirm={this.deleteSecurityEquipMent.bind(
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
            // scroll={{ x: "110%" }}
            pagination={false}
          />
          <Pagination
            className="ant-table-pagination"
            total={total}
            current={current}
            pageSize={pageSize}
            onChange={this.pageChangeHandler}
            showTotal={_total => `总计${_total ? _total :  0}条`}
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
    departmentList,
    staffList,
    initialRegion,
    securityEquipMent,
    seniorSearchData,
    seniorSearch,
    visible,
  } = state.securityEquipMentList
  return {
    loading: state.loading.models.securityEquipMentList,
    list,
    total,
    page,
    filterStr,
    pageSize,
    regionList,
    departmentList,
    staffList,
    initialRegion,
    securityEquipMent,
    seniorSearchData,
    seniorSearch,
    visible,
  }
}

export default connect(mapStateToProps)(SecurityEquipMentList)
