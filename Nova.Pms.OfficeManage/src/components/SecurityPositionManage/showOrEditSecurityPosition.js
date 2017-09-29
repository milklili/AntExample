import React from 'react'
import { connect } from 'dva'
import {
  Table,
  Popconfirm,
  Modal,
  Button,
  Form,
  Input,
  message,
  Row,
  Col,
  Select,
  DatePicker,
} from 'antd'
import { routerRedux } from 'dva/router'
import { moment, isNumber, dateFormat } from 'utils'
import styles from './SecurityPositionManage.css'

const Option = Select.Option
const FormItem = Form.Item
const RangePicker = DatePicker.RangePicker

const SecurityPositionMembersModal = Form.create({
  mapPropsToFields ({ memberData }) {
    const fields = {}
    Object.keys(memberData).forEach(key => {
      fields[key] = {
        value: memberData[key],
      }
    })
    return {
      ...fields,
    }
  },
})(props => {
  const {
    modalVisible,
    modalType,
    onCancel,
    onCreate,
    form,
    staffList,
    securityDutyPlanList,
  } = props
  const { getFieldDecorator, setFieldsValue, validateFields } = form
  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  }
  let timeRange = []
  const handleSecurityPlanChange = id => {
    const plan = securityDutyPlanList.filter(item => item.id === id)[0]
    const startTime = plan.startDate
    const endTime = plan.endDate
    timeRange = [moment(startTime, 'HH:mm'), moment(endTime, 'HH:mm')]
    setFieldsValue({
      onDutyDate: timeRange,
    })
  }

  const handleOk = e => {
    e.preventDefault()
    validateFields((err, values) => {
      if (!err) {
        onCreate(values)
      }
    })
  }
  const staffOptions = staffList.map(value => (
    <Option key={value.id} value={value.id}>{value.name}</Option>
  ))
  const securityDutyPlanOptions = securityDutyPlanList.map(value => (
    <Option key={value.id} value={value.id}>{value.name}</Option>
  ))
  const titleText = `${modalType === 'creaate' ? '添加' : '编辑'}保安人员`
  // const securityDutyPlanOndutyDateOptions = securityDutyPlanList.map(value => (
  //   <Option key={value.id} value={value.id}>{value.ondutyDate}</Option>
  // ))

  // const spInformation = securityPositionInformation
  return (
    <Modal
      visible={modalVisible}
      title={titleText}
      okText="确定"
      onCancel={onCancel}
      onOk={handleOk}
    >
      <Form>
        <Row gutter={8}>
          <Col span={24}>
            <FormItem {...formItemLayout} label="保安姓名">
              {getFieldDecorator('staffId', {
                rules: [{ required: true, message: '请选择保安姓名' }],

                // initialValue: (information != null && information.name != null) ? information.name : null,
              })(
                <Select
                  mode="combobox "
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
            <FormItem {...formItemLayout} label="值班方案">
              {getFieldDecorator('securityDutyPlanId', {
                // initialValue: securityPositionInformation.type,
                rules: [{ required: true, message: '请选择值班方案' }],
              })(
                <Select
                  mode="combobox "
                  placeholder="请选择"
                  style={{ width: '100%' }}
                  onChange={handleSecurityPlanChange}
                >
                  {securityDutyPlanOptions}
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={24}>
            <FormItem {...formItemLayout} label="值班时间">
              {getFieldDecorator(
                'onDutyDate',
                {
                  // rules: [{ required: true, message: "请选择考勤时间" }],
                }
              )(
                <RangePicker
                  style={{ width: '100%' }}
                  format="HH:mm"
                  disabled
                />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={24}>
            <FormItem {...formItemLayout} label="备注">
              {getFieldDecorator('remark', {
                rules: [{ type: 'string', max: 50, message: '已超过50个字' }],
              })(<Input />)}
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
})

const Title = ({ text }) => {
  return (
    <div className={styles.title}>
      <h1>{text}</h1>
      <hr />
    </div>
  )
}

const BaseForm = Form.create({
  onFieldsChange (props, changedFields) {
    const key = Object.keys(changedFields)[0]
    key &&
      props.dispatch({
        type: 'showOrEditSecurityPosition/changeField',
        payload: {
          key,
          value: changedFields[key].value,
        },
      })
  },
})(props => {
  const { form, information, regionList, editAble, selectRegion } = props
  const handleDaysValidate = (rule, value, callback) => {
    if (value && !isNumber(value)) {
      callback('天数必须为数值')
    }
    parseFloat(value) < 0 && callback('天数不能小于0')
    parseFloat(value) > 31 && callback('天数不能大于31')
    callback()
  }
  const handlePeopleValidate = (rule, value, callback) => {
    if (value && !isNumber(value, true)) {
      callback('人数必须为整数')
    }
    parseFloat(value) < 0 && callback('人数不能小于0')
    parseFloat(value) > 10000 && callback('人数不能大于10000')
    callback()
  }
  const { getFieldDecorator } = form
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  }
  const regionOptions = regionList.map(value => (
    <Option key={value.id} value={value.id}>{value.name}</Option>
  ))

  return (
    <div>
      <Form>
        <Row gutter={20}>
          <Col span={12}>
            <FormItem {...formItemLayout} label="管理区">
              {getFieldDecorator('regionId', {
                initialValue: information.regionId,
                rules: [{ required: true, message: '请选择管理区' }],
              })(
                <Select
                  style={{ width: '100%' }}
                  disabled={!editAble}
                  onChange={selectRegion}
                >
                  {regionOptions}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem {...formItemLayout} label="岗位人数" hasFeedback>
              {getFieldDecorator('quantity', {
                initialValue: information.quantity,
                rules: [
                  { required: true, message: '请输入岗位人数' },
                  {
                    validator: handlePeopleValidate,
                  },
                ],
              })(<Input disabled={!editAble} />)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={20}>
          <Col span={12}>
            <FormItem {...formItemLayout} label="岗位代码" hasFeedback>
              {getFieldDecorator('positionCode', {
                initialValue: information.positionCode,
                rules: [
                  {
                    required: true,
                    type: 'string',
                    message: '请输入岗位代码',
                  },
                  {
                    type: 'string',
                    max: 30,
                    message: '岗位代码字符不能超过30字',
                  },
                ],
              })(<Input disabled={!editAble} />)}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem {...formItemLayout} label="每月工作总天数">
              {getFieldDecorator('workingDays', {
                initialValue: information.workingDays,
                rules: [
                  {
                    validator: handleDaysValidate,
                  },
                ],
              })(<Input disabled={!editAble} />)}
            </FormItem>
          </Col>
        </Row>

        <Row gutter={20}>
          <Col span={12}>
            <FormItem {...formItemLayout} label="岗位名称">
              {getFieldDecorator('positionName', {
                initialValue: information.positionName,
                rules: [
                  {
                    required: true,
                    type: 'string',
                    message: '请输入岗位名称',
                  },
                  {
                    type: 'string',
                    max: 30,
                    message: '岗位名称不能超过30个字符',
                  },
                ],
              })(<Input disabled={!editAble} />)}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem {...formItemLayout} label="每月休息天数">
              {getFieldDecorator('restDays', {
                initialValue: information.restDays,
                rules: [
                  {
                    validator: handleDaysValidate,
                  },
                ],
              })(<Input disabled={!editAble} />)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={20}>
          <Col span={12}>
            <FormItem {...formItemLayout} label="岗位地址">
              {getFieldDecorator('positionPlace', {
                initialValue: information.positionPlace,
                rules: [
                  {
                    required: true,
                    type: 'string',
                    message: '请输入岗位地址',
                  },
                  {
                    type: 'string',
                    max: 50,
                    message: '岗位地址不能超过50个字符',
                  },
                ],
              })(<Input disabled={!editAble} />)}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem {...formItemLayout} label="开始值班时间">
              {getFieldDecorator('startDate', {
                initialValue: information.startDate,
                rules: [{ required: true, message: '请选择开始值班日期' }],
                getValueProps: value => {
                  return { value: value ? moment(value) : value }
                },
              })(
                <DatePicker
                  style={{ width: '100%' }}
                  format="YYYY-MM-DD HH:mm:ss"
                  disabled={!editAble}
                />
              )}
            </FormItem>
          </Col>
        </Row>
      </Form>
    </div>
  )
})

class SecurityPositionPage extends React.Component {
  baseFormRef = form => {
    this.baseForm = form
  }

  pageChangeHandler = page => {
    const id = this.props.information.id
    this.props.dispatch({
      type: 'showOrEditSecurityPosition/getSecurityPositionData',
      payload: { page, id },
    })
  }

  showModal (type, id) {
    const { dispatch, information } = this.props
    if (!information.regionId) {
      message.warn('请选择管理区！')
    } else {
      dispatch({
        type: 'showOrEditSecurityPosition/showModal',
        payload: { type, id },
      })
    }
  }

  deleteSecurityPersonnelItem = id => {
    const { dispatch, securityPersonnel } = this.props
    const list = securityPersonnel.list.filter(item => item.id !== id)
    const newsecurityPersonnel = {
      list,
      total: list.length,
      page: securityPersonnel.page,
    }
    dispatch({
      type: 'showOrEditSecurityPosition/updateSecurityPersonnel',
      payload: newsecurityPersonnel,
    })
  };

  selectRegion = value => {
    this.props.dispatch({
      type: 'showOrEditSecurityPosition/selectRegion',
      payload: value,
    })
  };
  handleSubmit = e => {
    e.preventDefault()
    const { action } = this.props
    this.baseForm.validateFields(err => {
      if (!err) {
        this.props.dispatch({
          type: 'showOrEditSecurityPosition/saveData',
          payload: { action },
        })
      }
    })
  };

  cancle = () => {
    const { dispatch } = this.props
    dispatch({
      type: 'showOrEditSecurityPosition/init',
    })
    dispatch(
      routerRedux.push({
        pathname: '/securityPositionList',
      })
    )
  };

  render () {
    const {
      regionList,
      information,
      action,
      dispatch,
      modalVisible,
      modalType,
      staffList,
      securityDutyPlanList,
      loading,
      securityPersonnel,
      securityPersonnelSelect,
    } = this.props
    const preview = action === 'preview'
    const columns = [
      {
        title: '序号',
        dataIndex: 'id',
        key: 'id',
        width: 80,
      },
      {
        title: '保安姓名',
        dataIndex: 'staffName',
        key: 'staffName',
        width: 180,
      },
      {
        title: '值班方案',
        dataIndex: 'securityDutyPlanName',
        key: 'securityDutyPlanName',
        width: 180,
      },
      {
        title: '值班开始时间',
        dataIndex: 'startDate',
        key: 'startDate',
        width: 80,
        render: (text, record) =>
          (record.startDate && dateFormat(record.startDate, 'HH:mm')),
      },
      {
        title: '值班结束时间',
        dataIndex: 'endDate',
        key: 'endDate',
        width: 80,
        render: (text, record) =>
          (record.endDate && dateFormat(record.endDate, 'HH:mm')),
      },
      {
        title: '备注',
        dataIndex: 'remark',
        key: 'remark',
        width: 300,
      },
      {
        title: '操作',
        // fixed: "right",
        width: 70,
        render: (text, record) => (
          <span>
            <a disabled={preview} onClick={this.showModal.bind(this, 'update', record.id)}>编辑</a>
            &nbsp;
            <Popconfirm
              title="确定要删除该保安人员吗?"
              onConfirm={this.deleteSecurityPersonnelItem.bind(
                null,
                record.id
              )}
            >
              <a disabled={preview}>删除</a>
            </Popconfirm>
            &nbsp;
          </span>
        ),
      },
    ]
    const pagination = {
      total: securityPersonnel.total,
      showSizeChanger: true,
    }

    const baseFormProps = {
      ref: this.baseFormRef,
      editAble: !preview,
      regionList,
      selectRegion: this.selectRegion,
      dispatch,
      information,
    }

    const memberData = securityPersonnel.list.find(item => item.id === securityPersonnelSelect) || {}
    const timeRange = memberData.onDutyDate
    timeRange && (memberData.onDutyDate = [moment(timeRange[0]), moment(timeRange[1])])
    const modalProps = {
      modalVisible,
      modalType,
      staffList,
      memberData,
      securityDutyPlanList,
      onCancel () {
        dispatch({
          type: 'showOrEditSecurityPosition/hideModal',
        })
      },
      onCreate (data) {
        const update = modalType === 'update'
        dispatch({
          type: 'showOrEditSecurityPosition/saveSecurityPersonnel',
          payload: { personnelInfo: data, update },
        })
      },
    }

    return (
      <div className={styles.ListButton}>
        <Form onSubmit={this.handleSubmit}>
          <Title text="基本信息" />
          <BaseForm {...baseFormProps} />
          <Title text="保安人员" />
          <div style={{ marginBottom: 16, display: preview ? 'none' : 'block' }}>
            <Button
              onClick={this.showModal.bind(this, 'create')}
              type="default"
              size="large"
            >
              添加
            </Button>
          </div>
          <Table
            bordered
            columns={columns}
            dataSource={securityPersonnel.list}
            loading={loading}
            // rowSelection={rowSelection}
            rowKey={record => record.id}
            // scroll={{ x: "110%" }}
            pagination={pagination}
          />
          <FormItem>
            <Button type="primary" htmlType="submit" style={{ marginTop: 16 }}>
              {preview ? '返回' : '保存'}
            </Button>
            {!preview &&
              <Button type="default" onClick={this.cancle}>取消</Button>}
          </FormItem>
        </Form>
        <SecurityPositionMembersModal {...modalProps} />
      </div>
    )
  }
}
const SecurityPositionPageWrap = Form.create({})(SecurityPositionPage)

function mapStateToProps (state) {
  const {
    securityPersonnel,
    securityPersonnelSelect,
    regionList,
    departmentList,
    information,
    securityDutyPlanList,
    staffList,
    action,
    modalVisible,
    modalType,
  } = state.showOrEditSecurityPosition
  return {
    securityPersonnel,
    securityPersonnelSelect,
    regionList,
    departmentList,
    information,
    staffList,
    securityDutyPlanList,
    action,
    modalVisible,
    modalType,
  }
}

export default connect(mapStateToProps)(SecurityPositionPageWrap)
