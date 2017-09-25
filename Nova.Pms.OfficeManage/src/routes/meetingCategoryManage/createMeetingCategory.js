import React from 'react'
import { connect } from 'dva'
import { Button, Form, Input, Row, Col, Alert } from 'antd'
import { routerRedux } from 'dva/router'
// import styles from './MeetingCategoryList.css'

class NormalMeetingCategoryForm extends React.Component {
  state = {
    unfilled: 0,
  };
  closeUnfilledInfo = () => {
    const unfilled = 0
    this.setState({ unfilled })
  };

  cancle = () => {
    this.props.dispatch(
      routerRedux.push({
        pathname: '/meetingCategoryList',
      })
    )
  };
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const unfilled = 0
        this.setState({ unfilled })
        this.props.dispatch({
          type: 'createMeetingCategory/addMeetingCategory',
          payload: values,
        })
      } else {
        const unfilled = Object.values(err).length
        this.setState({ unfilled })
      }
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
          span: 10,
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
          span: 10,
          push: 4,
        },
      },
    }
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Row gutter={8}>
            <Col span={20}>
              <FormItem {...formItemLayout} label="会议类别名称">
                {getFieldDecorator('name', {
                  rules: [
                    {
                      type: 'string',
                      max: 50,
                      required: true,
                      message: '请输入会议类别名称,不超过50个字',
                    },
                  ],
                })(<Input placeholder="请输入" />)}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={8}>
            <Col span={20}>
              <FormItem {...formItemLayout} label="备注">
                {getFieldDecorator('remark', {
                  rules: [{ type: 'string', max: 255, message: '已超过255个字' }],
                })(<Input type="textarea" placeholder="请输入" />)}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={8}>
            <Col span={20}>
              <FormItem {...tailFormItemLayout} label="">
                <Button type="primary" htmlType="submit" style={{ marginRight: '20px' }}>保存</Button>
                <Button type="default" onClick={this.cancle}>取消</Button>
              </FormItem>
            </Col>
          </Row>
        </Form>
      </div>
    )
  }
}

const MeetingCategoryForm = Form.create({
  // mapPropsToFields ({ meetingCategory }) {
  //   const fields = {}
  //   Object.keys(meetingCategory).forEach(key => {
  //     fields[key] = {
  //       value: meetingCategory[key],
  //     }
  //   })
  //   return {
  //     ...fields,
  //   }
  // },
  onFieldsChange (props, changedFields) {
    const key = Object.keys(changedFields)[0]
    props.dispatch({
      type: 'createMeetingCategory/changeField',
      payload: {
        key,
        value: changedFields[key].value,
      },
    })
  },
})(NormalMeetingCategoryForm)

function mapStateToProps (state) {
  const { meetingCategory } = state.createMeetingCategory
  return {
    meetingCategory,
  }
}

export default connect(mapStateToProps)(MeetingCategoryForm)
