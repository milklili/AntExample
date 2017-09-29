import React from 'react'
import { connect } from 'dva'
import {
  Table,
  Popconfirm,
  Modal,
  Button,
  Form,
  Input,
  DatePicker,
  Row,
  Col,
  Select,
} from 'antd'
import { routerRedux } from 'dva/router'
import moment from 'moment'
import { PAGE_SIZE } from '../../constants'
import styles from './AttendanceManage.css'

const Option = Select.Option
const FormItem = Form.Item
const RangePicker = DatePicker.RangePicker

const EditWorkAttendanceForm = Form.create()(props => {
  const {
    visible,
    onCancel,
    handleHoursValidate,
    onCreate,
    form,
    information,
    workAttendanceInformation,
    staffList,
    dispatch,
    isHoursEdit,
    handleAttendanceTypeChange,
  } = props

  const { getFieldDecorator } = form
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  }

  const staffOptions = staffList.map(value => (
    <Option key={value.staffId} value={value.staffId}>{value.staffName}</Option>
  ))

  return (
    <Modal
      visible={visible}
      title="编辑考勤记录"
      okText="确定"
      onCancel={onCancel}
      onOk={onCreate}
    >
      <Form>
        <Row gutter={8}>
          <Col span={24}>
            <FormItem {...formItemLayout} label="职员姓名">
              {getFieldDecorator('name', {
                initialValue: information && information.name,
              })(
                <Select
                  mode="combobox "
                  placeholder="请选择"
                  style={{ width: '100%' }}
                  disabled
                >
                  {staffOptions}
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={24}>
            <FormItem {...formItemLayout} label="考勤类型">
              {getFieldDecorator('Type', {
                initialValue: workAttendanceInformation.type,
                rules: [{ required: true, message: '请选择考勤类型' }],
              })(
                <Select
                  mode="combobox "
                  placeholder="请选择"
                  style={{ width: '100%' }}
                  onChange={handleAttendanceTypeChange}
                >
                  <Option value={0}>出勤</Option>
                  <Option value={1}>早退</Option>
                  <Option value={2}>迟到</Option>
                  <Option value={3}>出差</Option>
                  <Option value={4}>加班</Option>
                  <Option value={5}>请假</Option>
                  <Option value={6}>休假</Option>
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={24}>
            <FormItem {...formItemLayout} label="考勤时间">
              {getFieldDecorator('attendanceDate', {
                initialValue: [
                  moment(
                    workAttendanceInformation.startDate,
                    'YYYY-MM-DD HH:mm:ss'
                  ),
                  moment(
                    workAttendanceInformation.endDate,
                    'YYYY-MM-DD HH:mm:ss'
                  ),
                ],
                rules: [{ required: true, message: '请选择考勤时间' }],
              })(
                <RangePicker
                  style={{ width: '100%' }}
                  format="YYYY-MM-DD HH:mm:ss"
                  showTime
                />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={24}>
            <FormItem {...formItemLayout} label="小时">
              {getFieldDecorator('hours', {
                initialValue: workAttendanceInformation != null
                  ? workAttendanceInformation.hours
                  : null,
                rules: [
                  { required: isHoursEdit, message: '请输入小时' },
                  {
                    validator: handleHoursValidate,
                  },
                ],
              })(<Input disabled={!isHoursEdit} placeholder="请输入数字(最多2位小数)" />)}
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
})
class NormalEditWorkAttendance extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      visible: false,
      isHoursEdit: false,
    }

    this.dispatch = props.dispatch
  }
  showModal = () => {
    this.setState({ visible: true })

    const form = this.form
    if (
      this.props.workAttendanceInformation.type !== 1 &&
      this.props.workAttendanceInformation.type !== 2
    ) {
      this.setState({ isHoursEdit: true })
    }
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

      values.id = this.props.workAttendanceInformation.id

      this.props.dispatch({
        type: 'showOrEditWorkAttendance/editWorkAttendance',
        payload: { editWorkAttendance: values },
      })
      form.resetFields()
      this.setState({ visible: false })
    })
  };
  baseFormRef (form) {
    this.baseForm = form
  }
  handleAttendanceTypeChange = value => {
    const form = this.form
    if (value === 1 || value === 2) {
      form.setFieldsValue({
        hours: '',
      })
      this.setState({ isHoursEdit: false })
    } else {
      this.setState({ isHoursEdit: true })
    }
  };
  handleHoursValidate = (rule, value, callback) => {
    if (value != null && value !== '' && !/^[0-9]+.?[0-9]*$/.test(value)) {
      callback('小时格式错误')
    }
    callback()
  };
  render () {
    // let ids = [];
    // ids.push(this.props.rowData.id);

    const staffList = this.props.staffList
    return (
      <span>
        <a onClick={this.showModal}>编辑</a>

        {
          <EditWorkAttendanceForm
            information={this.props.information}
            workAttendanceInformation={this.props.workAttendanceInformation}
            staffList={this.props.staffList}
            dispatch={this.props.dispatch}
            ref={this.baseFormRef}
            isHoursEdit={this.state.isHoursEdit}
            visible={this.state.visible}
            onCancel={this.handleCancel}
            onCreate={this.handleCreate}
            handleAttendanceTypeChange={this.handleAttendanceTypeChange}
            handleHoursValidate={this.handleHoursValidate}
          />
        }
      </span>
    )
  }
}

const EssentialInformationForm = Form.create()(props => {
  const { form, regionList, departmentList, editAble } = props
  const { getFieldDecorator } = form
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  }

  const regionOptions = regionList.map(value => (
    <Option key={value.id} value={value.id}>{value.name}</Option>
  ))
  const departmentOptions = departmentList.map(value => (
    <Option key={value.id} value={value.id}>{value.name}</Option>
  ))

  return (
    <div>
      <Form>
        <Row gutter={20}>
          <Col span={12}>
            <FormItem {...formItemLayout} label="管理区">
              {getFieldDecorator('regionId', {
                rules: [{ required: true, message: '请选择管理区' }],
              })(
                <Select style={{ width: '100%' }} disabled={editAble}>
                  {regionOptions}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem {...formItemLayout} label="职员姓名">
              {getFieldDecorator('name', {
                rules: [
                  { required: true, message: '请输入姓名' },
                  { max: 12, message: '姓名长度不能超过12个字符' }],
              })(<Input disabled={editAble} />)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={20}>
          <Col span={12}>
            <FormItem {...formItemLayout} label="部门">
              {getFieldDecorator('departmentId', {
                rules: [
                  { required: true, message: '请选择部门' },
                ],
              })(
                <Select style={{ width: '100%' }} disabled={editAble}>
                  {departmentOptions}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem {...formItemLayout} label="工号">
              {getFieldDecorator('number', {
                rules: [
                  { required: true, message: '请输入工号' },
                  { max: 12, message: '工号长度不能超过12个字符' }],
              })(<Input disabled={editAble} />)}
            </FormItem>
          </Col>
        </Row>

        <Row gutter={20}>
          <Col span={12}>
            <FormItem {...formItemLayout} label="岗位">
              {getFieldDecorator('roleName', {})(<Input disabled={editAble} />)}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem {...formItemLayout} label="职员状态">
              {getFieldDecorator('staffStatusStr', {})(
                <Input disabled={editAble} />
              )}
            </FormItem>
          </Col>
        </Row>
      </Form>
    </div>
  )
})
const NormalEssentialInformationForm = Form.create({
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
    key &&
      props.dispatch({
        type: 'showRoEditWorkAttendance/changeField',
        payload: {
          key,
          value: changedFields[key].value,
        },
      })
  },
})(EssentialInformationForm)

class NormalWorkAttendanceForm extends React.Component {
  cancle = () => {
    this.props.dispatch(
      routerRedux.push({
        pathname: '/workAttendanceList',
      })
    )
  };

  refFn = form => {
    this.baseForm = form
  };
  save = () => {
    const { dispatch } = this.props
    this.baseForm.validateFields((err, values) => {
      if (!err) {
        dispatch({
          type: 'showOrEditWorkAttendance/editWorkAttendance',
          payload: { values },
        })
      }
    })
  }

  pageChangeHandler = page => {
    const id = this.props.information.id
    this.props.dispatch({
      type: 'showOrEditWorkAttendance/getWorkAttendanceData',
      payload: { page, id },
    })
  };

  deleteWorkAttendance = id => {
    this.props.dispatch({
      type: 'showOrEditWorkAttendance/remove',
      payload: { id },
    })
  };

  render () {
    const { locationQuery, dispatch } = this.props
    const preview = locationQuery.action && locationQuery.action === 'preview'
    const columns = [
      {
        title: '出勤(小时)',
        dataIndex: 'attendance',
        key: 'attendance',
        width: 80,
      },
      {
        title: '迟到(次)',
        dataIndex: 'lateNumber',
        key: 'lateNumber',
        width: 80,
        render: (text, record) =>
          (~~record.lateNumber !== 0 ? record.lateNumber : ''),
      },
      {
        title: '早退(次)',
        dataIndex: 'earlyLeaveNumber',
        key: 'earlyLeaveNumber',
        width: 80,
        render: (text, record) =>
          (~~record.earlyLeaveNumber !== 0 ? record.earlyLeaveNumber : ''),
      },
      {
        title: '请假(小时)',
        dataIndex: 'leave',
        key: 'leave',
        width: 80,
      },
      {
        title: '加班(小时)',
        dataIndex: 'overTime',
        key: 'overTime',
        width: 80,
      },
      {
        title: '出差(小时)',
        dataIndex: 'businessTravel',
        key: 'businessTravel',
        width: 80,
      },
      {
        title: '休假(小时)',
        dataIndex: 'vacation',
        key: 'vacation',
        width: 80,
      },
      {
        title: '最后操作日期',
        dataIndex: 'lastOperationDate',
        key: 'lastOperationDate',
        width: 150,
        render: (text, record) =>
          (record.lastOperationDate != null
            ? new Date(record.lastOperationDate).toLocaleString()
            : null),
      },
      {
        title: '最后操作者',
        dataIndex: 'lastOperationPersonName',
        key: 'lastOperationPersonName',
        width: 120,
      },
      {
        title: '操作',
        // fixed: "right",
        width: 70,
        render: (text, record) => (
          <span>
            <NormalEditWorkAttendance
              information={this.props.information}
              workAttendanceInformation={record}
              staffList={this.props.staffList}
              dispatch={this.props.dispatch}
              id={record.id}
            />
            &nbsp;
            <Popconfirm
              title="确定要删除该考勤记录吗?"
              onConfirm={this.deleteWorkAttendance.bind(null, record.id)}
            >
              <a>删除</a>
            </Popconfirm>
            &nbsp;
          </span>
        ),
      },
    ]

    const pagination = {
      total: this.props.workAttendance.total,
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
            editAble={preview}
            dispatch={dispatch}
            ref={this.refFn}
          />
          <div className={styles.title}>
            <h1>考勤记录</h1>
            <hr />
          </div>
          <Row gutter={20}>
            <Col span={12}>
              <FormItem>
                <Button>导出</Button>
              </FormItem>
            </Col>
          </Row>
          <Table
            bordered
            columns={columns}
            dataSource={this.props.workAttendance.workAttendanceData}
            loading={this.props.loading}
            // rowSelection={rowSelection}
            rowKey={record => record.id}
            // scroll={{ x: "110%" }}
            pagination={pagination}
          />
          <div />
          <div style={{ marginTop: 15 }}>
            <FormItem>
              {!preview &&
                <Button type="primary" onClick={this.save}>保存</Button>}
              <Button type="default" onClick={this.cancle}>返回</Button>
            </FormItem>
          </div>
        </Form>
      </div>
    )
  }
}
const WorkAttendanceForm = Form.create({
  mapPropsToFields (props) {
    const fields = {}

    Object.keys(props.workAttendance).forEach(key => {
      fields[key] = {
        value: props.workAttendance[key],
      }
    })
    return {
      ...fields,
    }
  },
})(NormalWorkAttendanceForm)

function mapStateToProps (state) {
  const {
    workAttendance,
    regionList,
    departmentList,
    information,
    staffList,
  } = state.showOrEditWorkAttendance
  return {
    locationQuery: state.routing.locationBeforeTransitions.query,
    workAttendance,
    regionList,
    departmentList,
    information,
    staffList,
  }
}

export default connect(mapStateToProps)(WorkAttendanceForm)
