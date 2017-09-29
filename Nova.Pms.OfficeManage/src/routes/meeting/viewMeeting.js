import React from 'react'
import { connect } from 'dva'
import {
  Button,
  Form,
  Input,
  message,
  Row,
  Col,
  Alert,
  Select,
  DatePicker,
  Upload,
} from 'antd'
import { routerRedux } from 'dva/router'
import moment from 'moment'
import 'moment/locale/zh-cn'

moment.locale('zh-cn')

class MeetingForm extends React.Component {
  cancel = () => {
    this.props.dispatch(
      routerRedux.push({
        pathname: '/meeting',
      })
    )
  };

  render () {
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
    const formItemRowLayout = {
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
          span: 20,
          push: 4,
        },
      },
    }

    const FormItem = Form.Item
    const regionOptions = this.props.regions.map(value => (
      <Option key={value.id} value={value.id}>{value.name}</Option>
    ))
    const meetingCategoryOptions = this.props.meetingCategorys.map(value => (
      <Option key={value.id} value={value.id}>{value.name}</Option>
    ))
    const staffOptions = this.props.staffs.map(value => (
      <Option key={value.id} value={value.id}>{value.name}</Option>
    ))
    const departmentOptions = this.props.departments.map(value => (
      <Option key={value.id} value={value.id}>{value.name}</Option>
    ))
    return (
      <div>
        <Form>
          <Row gutter={8}>
            <Col span={12}>
              <FormItem {...formItemLayout} label="管理区">
                {getFieldDecorator('regionId', {})(
                  <Select disabled>{regionOptions}</Select>
                )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem {...formItemLayout} label="开始时间">
                {getFieldDecorator('startDate', {
                  getValueProps: value => {},
                })(<DatePicker disabled style={{ width: '100%' }} />)}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={8}>
            <Col span={12}>
              <FormItem {...formItemLayout} label="部门">
                {getFieldDecorator('departmentId', {})(
                  <Select disabled>{departmentOptions}</Select>
                )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem {...formItemLayout} label="结束时间">
                {getFieldDecorator('endDate', {
                  getValueProps: value => {},
                })(
                  <DatePicker
                    disabled
                    style={{ width: '100%' }}
                    placeholder="请输入"
                  />
                )}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={8}>
            <Col span={12}>
              <FormItem {...formItemLayout} label="序号">
                {getFieldDecorator('number', {})(<Input disabled />)}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem {...formItemLayout} label="地点">
                {getFieldDecorator('place', {})(<Input disabled />)}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={8}>
            <Col span={12}>
              <FormItem {...formItemLayout} label="会议名称">
                {getFieldDecorator('name', {})(<Input disabled />)}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem {...formItemLayout} label="召集人">
                {getFieldDecorator('convenorId', {})(
                  <Select disabled>{staffOptions}</Select>
                )}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={8}>
            <Col span={12}>
              <FormItem {...formItemLayout} label="会议类别">
                {getFieldDecorator('officeManagementCategoryId', {})(
                  <Select disabled>{meetingCategoryOptions}</Select>
                )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem {...formItemLayout} label="主持人">
                {getFieldDecorator('compereId', {})(
                  <Select disabled>{staffOptions}</Select>
                )}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={8}>
            <Col span={24}>
              <FormItem {...formItemRowLayout} label="参加人员">
                {getFieldDecorator('members', {})(
                  <Select mode="multiple" disabled>{staffOptions}</Select>
                )}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={8}>
            <Col span={24}>
              <FormItem {...formItemRowLayout} label="会议主题">
                {getFieldDecorator('meetingTheme', {})(<Input disabled />)}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={8}>
            <Col span={24}>
              <FormItem {...formItemRowLayout} label="会议内容">
                {getFieldDecorator('meetingContent', {})(
                  <Input type="textarea" disabled />
                )}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={8}>
            <Col span={24}>
              <FormItem {...formItemRowLayout} label="备注">
                {getFieldDecorator('remark', {})(
                  <Input type="textarea" disabled />
                )}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={8}>
            <Col span={12}>
              <FormItem {...tailFormItemLayout} label="">
                <Button type="default" onClick={this.cancel}>返回</Button>
              </FormItem>
            </Col>
          </Row>
        </Form>
      </div>
    )
  }
}

const WrappedMeetingViewForm = Form.create({
  mapPropsToFields (props) {
    const fields = {}
    Object.keys(props.formData).forEach(key => {
      fields[key] = {
        value: props.formData[key],
      }
    })
    return {
      ...fields,
    }
  },
})(MeetingForm)

function mapStateToProps (state) {
  const {
    regions,
    meetingCategorys,
    departments,
    staffs,
    formData,
  } = state.viewMeeting
  return {
    regions,
    meetingCategorys,
    departments,
    staffs,
    formData,
  }
}

export default connect(mapStateToProps)(WrappedMeetingViewForm)
