import React from 'react'
import { connect } from 'dva'
import {
  Table,
  Breadcrumb,
  Pagination,
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
import moment from 'moment'
import { PAGE_SIZE } from '../../constants'
import styles from './CleaningToolManage.css'

const Option = Select.Option
const FormItem = Form.Item
const RangePicker = DatePicker.RangePicker

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
      title="领用登记"
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
              {getFieldDecorator('recipientsCount', {
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
              {getFieldDecorator('recipientsDate', {
                // getValueProps: value => {
                //    return { value: value ? moment(value) : value };
                // }

                getValueProps: value => {
                  if (!value) {
                    cleaningToolItems.recipientsDate = moment(
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
      title="归还登记"
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
              {getFieldDecorator('returnCount', {
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
              {getFieldDecorator('returnDate', {
                // initialValue: [moment(new Date(), 'YYYY-MM-DD HH:mm:ss'), moment(new Date(), 'YYYY-MM-DD HH:mm:ss')],
                getValueProps: value => {
                  if (!value) {
                    cleaningToolItems.returnDate = moment(
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

const EssentialInformationForm = Form.create()(props => {
  const {
    visible,
    onCancel,
    onCreate,
    form,
    information,
    regionList,
    departmentList,
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
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        push: 0,
      },
      sm: {
        span: 22,
        push: 2,
      },
    },
  }

  const regionOptions = regionList.map(value => (
    <Option key={value.id} value={value.id}>{value.name}</Option>
  ))
  const departmentOptions = departmentList.map(value => (
    <Option key={value.id} value={value.id}>{value.name}</Option>
  ))

  return (
    <div>
      <Row gutter={20}>
        <Col span={12}>
          <FormItem {...formItemLayout} label="管理区">
            {getFieldDecorator('regionId', {})(
              <Select style={{ width: '100%' }} disabled>
                {regionOptions}
              </Select>
            )}
          </FormItem>
        </Col>
        <Col span={12}>
          <FormItem {...formItemLayout} label="总数量">
            {getFieldDecorator('count', {})(<Input disabled />)}
          </FormItem>
        </Col>
      </Row>
      <Row gutter={20}>
        <Col span={12}>
          <FormItem {...formItemLayout} label="工具名称">
            {getFieldDecorator('name', {})(<Input disabled />)}
          </FormItem>
        </Col>
        <Col span={12}>
          <FormItem {...formItemLayout} label="库存数量">
            {getFieldDecorator('inventoryCount', {})(<Input disabled />)}
          </FormItem>
        </Col>
      </Row>

      <Row gutter={20}>
        <Col span={12}>
          <FormItem {...formItemLayout} label="工具类型">
            {getFieldDecorator('type', {})(
              <Select
                mode="combobox "
                placeholder="请选择"
                style={{ width: '100%' }}
                disabled
              >
                <Option value={0}>耗材</Option>
                <Option value={1}>保洁工具</Option>
                <Option value={2}>保洁设备</Option>
              </Select>
            )}
          </FormItem>
        </Col>
        <Col span={12}>
          <FormItem {...formItemLayout} label="领用数量">
            {getFieldDecorator('recipientsCount', {})(<Input disabled />)}
          </FormItem>
        </Col>
      </Row>

      <div className={styles.title}>
        <h1>领用归还记录</h1>
        <hr />
      </div>
      <Row gutter={20}>
        <Col span={12}>
          <FormItem>
            <Button>导出</Button>
          </FormItem>
        </Col>
      </Row>
    </div>
  )
})
const NormalEssentialInformationForm = Form.create({
  constructor (props) {
    // super(props);
  },

  mapPropsToFields (props) {
    const fields = {}

    Object.keys(props.information).forEach(key => {
      fields[key] = {
        value: props.information[key],
      }
    })
    return {
      ...fields,
    }
  },
  onFieldsChange (props, changedFields) {
    const key = Object.keys(changedFields)[0]
    props.dispatch({
      type: 'showRoEditCleaningTool/changeField',
      payload: {
        key,
        value: changedFields[key].value,
      },
    })
  },
})(EssentialInformationForm)

class ReceiveCleaningTool extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      visible: false,
      staffList: this.props.staffList,
      departmentList: this.props.departmentList,
      cleaningToolItems: this.props.cleaningToolItems,
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

      (values.id = this.props.cleaningToolItems.id), (values.cleaningToolId = this.props.cleaningTool.id)
      values.count = parseInt(values.recipientsCount)
      values.recipientsCount = parseInt(values.recipientsCount)
      values.type = 0

      this.props.dispatch({
        type: 'showOrEditCleaningTool/editReceiveOrReturnToolItems',
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

        <a onClick={this.showModal}>编辑</a>
        {
          <NormalReceiveCleaningToolForm
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

class ReturnCleaningTool extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      visible: false,
      staffList: this.props.staffList,
      departmentList: this.props.departmentList,
      cleaningToolItems: this.props.cleaningToolItems,
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

      (values.id = this.props.cleaningToolItems.id), (values.cleaningToolId = this.props.cleaningTool.id)
      values.count = parseInt(values.returnCount)
      values.returnCount = parseInt(values.returnCount)
      values.type = 1

      this.props.dispatch({
        type: 'showOrEditCleaningTool/editReceiveOrReturnToolItems',
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

        <a onClick={this.showModal}>编辑</a>
        {
          <NormalReturnCleaningToolForm
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

class NormalCleaningToolForm extends React.Component {
  cancle = () => {
    this.props.dispatch(
      routerRedux.push({
        pathname: '/cleaningToolList',
      })
    )
  };

  pageChangeHandler = page => {
    const id = this.props.information.id
    this.props.dispatch({
      type: 'showOrEditCleaningTool/getCleaningToolData',
      payload: { page, id },
    })
  };

  deleteCleaningToolItems = id => {
    this.props.dispatch({
      type: 'showOrEditCleaningTool/removeCleaningToolItems',
      payload: { id },
    })
  };

  render () {
    const FormItem = Form.Item
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: {
        xs: {
          span: 24,
        },
        sm: {
          span: 4,
        },
      },
      wrapperCol: {
        xs: {
          span: 24,
        },
        sm: {
          span: 20,
        },
      },
    }

    const formLongItemLayout = {
      labelCol: {
        xs: {
          span: 24,
        },
        sm: {
          span: 2,
        },
      },
      wrapperCol: {
        xs: {
          span: 24,
        },
        sm: {
          span: 22,
        },
      },
    }

    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          push: 0,
        },
        sm: {
          span: 22,
          push: 2,
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
        title: '领用人',
        dataIndex: 'staffName',
        key: 'staffName',
        width: 200,
      },
      {
        title: '领用日期',
        dataIndex: 'recipientsDate',
        key: 'recipientsDate',
        width: 170,
        render: (text, record, index) =>
          (record.recipientsDate != null
            ? new Date(record.recipientsDate).toLocaleDateString()
            : null),
      },

      {
        title: '领用数量',
        dataIndex: 'recipientsCount',
        key: 'recipientsCount',
        width: 120,
      },
      {
        title: '归还数量',
        dataIndex: 'returnCount',
        key: 'returnCount',
        width: 120,
      },
      {
        title: '归还日期',
        dataIndex: 'returnDate',
        key: 'returnDate',
        width: 170,
        render: (text, record, index) =>
          (record.returnDate != null
            ? new Date(record.returnDate).toLocaleDateString()
            : null),
      },

      {
        title: '操作',
        // fixed: "right",
        width: 150,
        render: (text, record) => (
          <span>

            {record.type == 0 &&
              <ReceiveCleaningTool
                cleaningTool={this.props.information}
                cleaningToolItems={record}
                staffList={this.props.staffList}
                dispatch={this.props.dispatch}
                id={record.id}
              />}
            {record.type == 1 &&
              <ReturnCleaningTool
                cleaningTool={this.props.information}
                cleaningToolItems={record}
                staffList={this.props.staffList}
                dispatch={this.props.dispatch}
                id={record.id}
              />}
            &nbsp;
            <Popconfirm
              title="确定要删除该领用归还记录吗?"
              onConfirm={this.deleteCleaningToolItems.bind(null, record.id)}
            >
              <a>删除</a>
            </Popconfirm>
            &nbsp;
          </span>
        ),
      },
    ]
    var pagination = {
      total: this.props.cleaningTool.total,

      showSizeChanger: true,
    }
    return (
      <div className={styles.normal}>

        <Form onSubmit={this.handleSubmit}>
          <div className={styles.title}>
            <h1>基本信息</h1>
            <hr />
          </div>
          <NormalEssentialInformationForm
            regionList={this.props.regionList}
            departmentList={this.props.departmentList}
            information={this.props.information}
          />
          <Table
            bordered
            columns={columns}
            dataSource={this.props.cleaningTool.cleaningToolData}
            loading={this.props.loading}
            // rowSelection={rowSelection}
            rowKey={record => record.id}
            // scroll={{ x: 1200 }}
            pagination={pagination}
          />

          <div>
            <FormItem>

              <Button type="default" onClick={this.cancle}>返回</Button>
            </FormItem>
          </div>
        </Form>
      </div>
    )
  }
}
const CleaningToolForm = Form.create({
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
})(NormalCleaningToolForm)

function mapStateToProps (state) {
  const {
    cleaningTool,
    regionList,
    departmentList,
    information,
    staffList,
  } = state.showOrEditCleaningTool
  return {
    cleaningTool,
    regionList,
    departmentList,
    information,
    staffList,
  }
}

export default connect(mapStateToProps)(CleaningToolForm)
