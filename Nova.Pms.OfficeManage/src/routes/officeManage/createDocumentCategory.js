import React from 'react'
import { connect } from 'dva'
import { Button, Form, Input, Row, Col } from 'antd'
import { routerRedux } from 'dva/router'

class NormalDocumentCategoryForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'createDocumentCategory/addDocumentCategory',
          payload: values,
        })
      }
    })
  };
  cancle = () => {
    this.props.dispatch(
      routerRedux.push({
        pathname: '/officeManageList',
      })
    )
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
              <FormItem {...formItemLayout} label="文档类别名称">
                {getFieldDecorator('name', {
                  rules: [
                    {
                      required: true,
                      type: 'string',
                      max: 30,
                      message: '请输入文档类别名称,不超过30个字!',
                    },
                  ],
                })(<Input />)}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={8}>
            <Col span={20}>
              <FormItem {...formItemLayout} label="备注">
                {getFieldDecorator('remark', {
                  rules: [
                    { type: 'string', max: 300, message: '请输入备注,不超过300个字!' },
                  ],
                })(<Input type="textarea" />)}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={8}>
            <Col span={20}>
              <FormItem {...tailFormItemLayout} label="">
                <Button type="primary" htmlType="submit">保存</Button>
                <Button type="default" onClick={this.cancle}>取消</Button>
              </FormItem>

            </Col>
          </Row>
        </Form>
      </div>
    )
  }
}

const DocumentCategoryForm = Form.create({
})(NormalDocumentCategoryForm)

function mapStateToProps (state) {
  const { documentCategory } = state.createDocumentCategory
  return {
    documentCategory,
  }
}

export default connect(mapStateToProps)(DocumentCategoryForm)
