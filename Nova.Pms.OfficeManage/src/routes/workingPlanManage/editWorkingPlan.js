import React from 'react'
import { connect } from 'dva'
import {
  Button,
  Form,
  Input,
  DatePicker,
  Alert,
  Row,
  Col,
  Select,
} from 'antd'
import { routerRedux } from 'dva/router'
import moment from 'moment'
import styles from './workingPlanManage.css'

const Option = Select.Option
const FormItem = Form.Item

class WorkingPlanForm extends React.Component {
  state = {
    unfilled: 0,
  };
  closeUnfilledInfo = () => {
    const unfilled = 0
    this.setState({ unfilled })
  };
  cancel = () => {
    this.props.dispatch(
      routerRedux.push({
        pathname: '/workingPlanList',
      })
    )
  };
  selectRegion = value => {
    this.props.dispatch({
      type: 'editWorkingPlan/selectRegion',
      payload: value,
    })
  };

  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const unfilled = 0
        this.setState({ unfilled })

        this.props.dispatch({
          type: 'editWorkingPlan/editWorkingPlan',
          payload: values,
        })
      } else {
        const unfilled = Object.values(err).length
        this.setState({ unfilled })
      }
    })
  };

  handleNumberValidate = (rule, value, callback) => {
    if (value != null && value !== '' && !/^[A-Za-z0-9]+$/.test(value)) {
      callback('序号格式错误')
    }
    callback()
  };
  render () {
    const { workingPlan, form } = this.props
    const { getFieldDecorator } = form
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
          span: 18,
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
          span: 18,
          push: 4,
        },
      },
    }

    const { unfilled } = this.state

    const regionOptions = this.props.regionList.map(value => (
      <Option key={value.id} value={value.id}>{value.name}</Option>
    ))
    const departmentOptions = this.props.departmentList.map(value => (
      <Option key={value.id} value={value.id}>{value.name}</Option>
    ))
    const staffOptions = this.props.staffList.map(value => (
      <Option key={value.id} value={value.id}>{value.name}</Option>
    ))
    const officeManagementCategoryOptions = this.props.officeManagementCategoryList.map(
      value => <Option key={value.id} value={value.id}>{value.name}</Option>
    )

    const isSelectRegion =
      this.props.workingPlan.regionId != null &&
      this.props.workingPlan.regionId > 0

    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          {unfilled > 0 &&
            <Row gutter={8}>
              <Col span={12}>
                <FormItem {...tailFormItemLayout}>
                  <Alert
                    message={`有${unfilled}处未填写，请修正后保存`}
                    type="error"
                    showIcon
                    closeText="x"
                    onClose={this.closeUnfilledInfo}
                  />
                </FormItem>
              </Col>
            </Row>}

          <Row gutter={8}>
            <Col span={12}>
              <FormItem {...formItemLayout} label="管理区">
                {getFieldDecorator('regionId', {
                  initialValue: workingPlan.regionId,
                  rules: [{ required: true, message: '请选择管理区' }],
                })(
                  <Select onChange={this.selectRegion} placeholder="请选择">
                    {regionOptions}
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem {...formItemLayout} label="开始时间">
                {getFieldDecorator('startDate', {
                  initialValue: workingPlan.startDate,
                  rules: [{ required: true, message: '请选择开始时间' }],
                  getValueProps: value => {
                    return { value: value ? moment(value) : value }
                  },
                })(<DatePicker style={{ width: '100%' }} placeholder="请输入" />)}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={8}>
            <Col span={12}>
              <FormItem {...formItemLayout} label="部门">
                {getFieldDecorator('departmentId', {
                  initialValue: workingPlan.departmentId,
                })(
                  <Select disabled={!isSelectRegion} placeholder="请选择">
                    {departmentOptions}
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem {...formItemLayout} label="结束时间">
                {getFieldDecorator('endDate', {
                  initialValue: workingPlan.endDate,
                  rules: [{ required: true, message: '请选择结束时间' }],
                  getValueProps: value => {
                    return { value: value ? moment(value) : value }
                  },
                })(<DatePicker style={{ width: '100%' }} placeholder="请输入" />)}
              </FormItem>

            </Col>
          </Row>

          <Row gutter={8}>
            <Col span={12}>
              <FormItem {...formItemLayout} label="序号">
                {getFieldDecorator('number', {
                  initialValue: workingPlan.number,
                  rules: [
                    {
                      type: 'string',
                      max: 8,
                      required: true,
                      message: '请填写序号',
                    },
                    {
                      validator: this.handleNumberValidate,
                    },
                  ],
                })(<Input placeholder="请输入8位由数字和字母组成的序号" />)}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem {...formItemLayout} label="状态">
                {getFieldDecorator('state', {
                  initialValue: workingPlan.state,
                })(
                  <Select
                    mode="combobox "
                    placeholder="请选择"
                    style={{ width: '100%' }}
                  >
                    <Option value={0} key={0}>未开始</Option>
                    <Option value={1} key={1}>进行中</Option>
                    <Option value={2} key={2}>已完成</Option>
                    <Option value={3} key={3}>暂停</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
          </Row>

          <Row gutter={8}>
            <Col span={12}>
              <FormItem {...formItemLayout} label="计划名称">
                {getFieldDecorator('name', {
                  initialValue: workingPlan.name,
                  rules: [{ required: true, message: '请输入计划名称!' }],
                })(<Input placeholder="请输入" />)}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem {...formItemLayout} label="实际开始时间">

                {getFieldDecorator('actualStartDate', {
                  initialValue: workingPlan.actualStartDate,
                  getValueProps: value => {
                    return { value: value ? moment(value) : value }
                  },
                })(<DatePicker style={{ width: '100%' }} placeholder="请输入" />)}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={8}>
            <Col span={12}>
              <FormItem {...formItemLayout} label="计划类别">
                {getFieldDecorator('officeManagementCategoryId', {
                  initialValue: workingPlan.officeManagementCategoryId,
                })(
                  <Select placeholder="请选择">
                    {officeManagementCategoryOptions}
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem {...formItemLayout} label="实际结束时间">
                {getFieldDecorator('actualEndDate', {
                  initialValue: workingPlan.actualEndDate,
                  getValueProps: value => {
                    return { value: value ? moment(value) : value }
                  },
                })(<DatePicker style={{ width: '100%' }} placeholder="请输入" />)}
              </FormItem>
            </Col>
          </Row>

          <Row gutter={8}>
            <Col span={12}>
              <Row gutter={8}>
                <FormItem {...formItemLayout} label="召集人">
                  {getFieldDecorator('headId', {
                    initialValue: workingPlan.headId,
                  })(
                    <Select disabled={!isSelectRegion} placeholder="请选择">
                      {staffOptions}
                    </Select>
                  )}
                </FormItem>
              </Row>
              <Row gutter={8}>
                <FormItem {...formItemLayout} label="负责人">
                  {getFieldDecorator('convenorId', {
                    initialValue: workingPlan.convenorId,
                  })(
                    <Select disabled={!isSelectRegion} placeholder="请选择">
                      {staffOptions}
                    </Select>
                  )}
                </FormItem>
              </Row>
              <Row gutter={8}>
                <FormItem {...formItemLayout} label="参加人员">
                  {getFieldDecorator('workingPlanMembers', {
                    initialValue: workingPlan.workingPlanMembers,
                  })(
                    <Select
                      mode="multiple"
                      disabled={!isSelectRegion}
                      placeholder="请选择"
                    >
                      {staffOptions}
                    </Select>
                  )}
                </FormItem>
              </Row>
              <Row gutter={8}>
                <FormItem {...formItemLayout} label="地点">
                  {getFieldDecorator('place', {
                    initialValue: workingPlan.place,
                  })(<Input placeholder="请输入" />)}
                </FormItem>
              </Row>

            </Col>
            <Col span={12}>
              <FormItem {...formItemLayout} label="完成情况">
                {getFieldDecorator('completion', {
                  initialValue: workingPlan.completion,
                  rules: [{ type: 'string', max: 300, message: '已超过300个字!' }],
                })(<Input type="textarea" rows={10} placeholder="请输入" />)}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={8}>
            <Col span={12}>
              <FormItem {...formItemLayout} label="计划内容">
                {getFieldDecorator('planContent', {
                  initialValue: workingPlan.planContent,
                  rules: [
                    {
                      type: 'string',
                      max: 300,
                      required: true,
                      message: '请填写计划内容!',
                    },
                  ],
                })(<Input type="textarea" rows={4} placeholder="请输入" />)}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem {...formItemLayout} label="备注">
                {getFieldDecorator('remark', {
                  initialValue: workingPlan.remark,
                  rules: [{ type: 'string', max: 300, message: '已超过300个字!' }],
                })(<Input type="textarea" rows={4} placeholder="请输入" />)}
              </FormItem>
            </Col>
          </Row>

          <Row gutter={8}>
            <Col span={12}>
              <FormItem {...tailFormItemLayout}>
                <Button
                  type="primary"
                  className={styles.btnPadding}
                  htmlType="submit"
                  size="large"
                >
                  保存
                </Button>
                <Button type="cancel" onClick={this.cancel}>取消</Button>
              </FormItem>
            </Col>
          </Row>
        </Form>
      </div>
    )
  }
}

const WrappedEditWorkingPlan = Form.create({
  // mapPropsToFields (props) {
  //   const fields = {}
  //   Object.keys(props.workingPlan).forEach(key => {
  //     fields[key] = {
  //       value: props.workingPlan[key],
  //     }
  //   })
  //   return {
  //     ...fields,
  //   }
  // },
  onFieldsChange (props, changedFields) {
    const key = Object.keys(changedFields)[0]
    key && props.dispatch({
      type: 'editWorkingPlan/changeField',
      payload: {
        key,
        value: changedFields[key].value,
      },
    })
  },
})(WorkingPlanForm)

function mapStateToProps (state) {
  const {
    workingPlan,
    regionList,
    departmentList,
    staffList,
    officeManagementCategoryList,
  } = state.editWorkingPlan
  return {
    workingPlan,
    regionList,
    departmentList,
    staffList,
    officeManagementCategoryList,
  }
}

export default connect(mapStateToProps)(WrappedEditWorkingPlan)
