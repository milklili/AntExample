import React, { Component } from 'react'
import { connect } from 'dva'
import {
  Button,
  Input,
  Form,
  Row,
  Col,
  Select,
  message,
  Upload,

  // RangePicker,
} from 'antd'
import styles from './ApprovalManage.css'
import { checkFileType, moment } from 'utils'

const FormItem = Form.Item
const Option = Select.Option

class Approval extends React.Component {
  state = {
    selectedRowKeys: [], // Check here to configure the default column
    selectedRows: [],
  };

  handleCancel = () => {
    this.props.dispatch({
      type: 'createApproval/resetData',

      // payload: { approval: values },
    })
  };

  handleCreate = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (err) {
        return
      }

      values.personStatus = this.props.personStatus
      values.attachments = this.props.attachments

      this.props.dispatch({
        type: 'createApproval/addApproval',
        payload: { approval: values },
      })
    })
  };

  onSendIdChange = value => {
    this.props.dispatch({
      type: 'createApproval/onSendIdChange',
      payload: value,
    })
  };

  onSendIdDeselect = value => {
    this.props.dispatch({
      type: 'createApproval/onSendIdDeselect',
      payload: value,
    })
  };

  onApprovalIdChange = value => {
    this.props.dispatch({
      type: 'createApproval/onApprovalIdChange',
      payload: value,
    })
  };
  onApprovalIdDeselect = value => {
    this.props.dispatch({
      type: 'createApproval/onApprovalIdDeselect',
      payload: value,
    })
  };

  uploadAttachmentsOnChange = info => {
    if (info.file.status === 'done') {
      message.success(`${info.file.name} 文件上传成功`)
      let file = info.file.response
      file[0].uid = info.file.uid
      this.props.dispatch({
        type: 'createApproval/uploadAttachments',
        payload: { file },
      })
    } else if (info.file.status === 'removed') {
      this.props.dispatch({
        type: 'createApproval/removeAttachments',
        payload: info.file.uid,
      })
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} 文件上传失败.`)
    }
  };

  uploadPicturesOnChange = info => {
    if (info.file.status === 'done') {
      message.success(`${info.file.name} 文件上传成功`)
      let file = info.file.response
      file[0].uid = info.file.uid
      this.props.dispatch({
        type: 'createApproval/uploadPictures',
        payload: { file },
      })
    } else if (info.file.status === 'removed') {
      this.props.dispatch({
        type: 'createApproval/removePictures',
        payload: info.file.uid,
      })
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} 文件上传失败.`)
    }
  };

  beforePicturesOnChange = file => {
    let attachmentsAll = this.props.attachments
    let pictures = attachmentsAll.filter(attachments => attachments.fileType === 0)
    const isJPG = checkFileType('image')(file.type)
    if (!isJPG) {
      message.error('请选择图片上传!')
    }
    const isMax = pictures.length < 9
    // var exitPictures = pictures.length;
    if (!isMax) {
      message.error('图片最多上传9张!')
    }
    return isJPG && isMax
  };

  beforeAttachmentsOnChange = file => {
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      message.error('单个附件应小于2M')
    }
    return isLt2M
  };

  uploadAttachments = {
    name: 'file',
    action: '/api/officeManage/uploadAttachments',
    headers: {
      authorization: 'authorization-text',
    },
    onChange: this.uploadAttachmentsOnChange,
    beforeUpload: this.beforeAttachmentsOnChange,

    // defaultFileList: this.props.attachments.map(attachment => {

    //    return {

    //        uid: attachment.id,

    //        name: attachment.fileName,

    //        status: "done",

    //        url: attachment.filePath

    //    };

    // })
  };

  uploadPictures = {
    name: 'file',
    action: '/api/officeManage/uploadAttachments',
    headers: {
      authorization: 'authorization-text',
    },
    onChange: this.uploadPicturesOnChange,
    beforeUpload: this.beforePicturesOnChange,
  };

  selectRegion = value => {
    this.props.dispatch({
      type: 'createApproval/selectRegion',
      payload: value,
    })
  };

  render () {
    const { form, approval } = this.props
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
          span: 20,
        },
      },
    }

    const regionOptions = this.props.regionList.map(value => (
      <Option key={value.id} value={value.id}>{value.name}</Option>
    ))
    const approvalOptions = this.props.staffList.map(value => (
      <Option key={`${value.id}approval`} value={value.id}>{value.name}</Option>
    ))
    const sendOptions = this.props.staffList.map(value => (
      <Option key={`${value.id}send`} value={value.id}>{value.name}</Option>
    ))

    return (
      <div className={styles.normal}>
        <Form onSubmit={this.handleCreate}>
          <Row gutter={8}>
            <Col span={12}>
              <FormItem {...formItemLayout} label="管理区">
                {getFieldDecorator('regionId', {
                  rules: [{ required: true, message: '请选择管理区' }],
                })(
                  <Select
                    mode="combox"
                    placeholder="请选择"
                    onChange={this.selectRegion}
                    style={{ width: '100%' }}
                  >
                    {regionOptions}
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem {...formItemLayout} label="申请内容">
                {getFieldDecorator('content', {
                  rules: [
                    {
                      type: 'string',
                      required: true,
                      max: 30,
                      message: '请正确输入申请内容,最大长度为30',
                    },
                  ],
                })(<Input />)}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={8}>
            <Col span={12}>
              <Row gutter={8}>
                <FormItem {...formItemLayout} label="审批编号">
                  {getFieldDecorator('code', {
                    initialValue: approval.code,
                    rules: [{ required: true, message: '请输入审批编号' }],
                  })(<Input disabled />)}
                </FormItem>
              </Row>
              <Row gutter={8}>
                <FormItem {...formItemLayout} label="审批类型">
                  {getFieldDecorator('type', {
                    initialValue: approval.type,
                  })(
                    <Select disabled>
                      <Option value={0} key={0}>通用审批</Option>
                    </Select>
                  )}
                </FormItem>
              </Row>

            </Col>
            <Col span={12}>
              <FormItem {...formItemLayout} label="审批详情">
                {getFieldDecorator('details', {
                  rules: [
                    {
                      type: 'string',
                      required: true,
                      max: 300,
                      message: '请正确输入审批详情,最大长度为300',
                    },
                  ],
                })(<Input type="textarea" rows={4} />)}
              </FormItem>

            </Col>
          </Row>
          <Row gutter={8}>
            <Col span={12}>
              <FormItem {...formItemLayout} label="审批人">
                {getFieldDecorator('approvalId', {
                  // initialValue: staffName
                  rules: [{ required: true, message: '请选择审批人' }],
                })(
                  <Select
                    mode="multiple"
                    placeholder="请选择"
                    style={{ width: '100%' }}
                    onSelect={this.onApprovalIdChange}
                    onDeselect={this.onApprovalIdDeselect}
                  >
                    {approvalOptions}
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem {...formItemLayout} label="抄送人">
                {getFieldDecorator(
                  'sendId',
                  {
                    // initialValue: staffName
                    // rules: [{ required: true, message: "请选择抄送人" }]
                  }
                )(
                  <Select
                    mode="multiple"
                    placeholder="请选择"
                    style={{ width: '100%' }}
                    onSelect={this.onSendIdChange}
                    onDeselect={this.onSendIdDeselect}
                  >
                    {sendOptions}
                  </Select>
                )}
              </FormItem>
            </Col>
          </Row>

          <Row gutter={8}>
            <Col span={12}>
              <FormItem {...formItemLayout} label="添加图片">
                <Upload {...this.uploadPictures}>
                  <a>点击添加（最多9张）</a>
                </Upload>
              </FormItem>
            </Col>
          </Row>
          <Row gutter={8}>
            <Col span={12}>
              <FormItem {...formItemLayout} label="添加附件">
                <Upload {...this.uploadAttachments}>
                  <a>点击添加 （单个附件应小于2M）</a>
                </Upload>
              </FormItem>
            </Col>
          </Row>
          <Row gutter={8}>
            <Col span={24} offset={2}>
              <FormItem>
                <Button type="primary" htmlType="submit">保存</Button>
                <Button type="default" onClick={this.handleCancel}>重置</Button>
              </FormItem>

            </Col>
          </Row>

        </Form>
      </div>
    )
  }
}

const NormalApprovalForm = Form.create({
  // mapPropsToFields (props) {
  //   const fields = {}
  //   Object.keys(props.approval).forEach(key => {
  //     fields[key] = {
  //       value: props.approval[key],
  //     }
  //   })
  //   return {
  //     ...fields,
  //   }
  // },
  onFieldsChange (props, changedFields) {
    const key = Object.keys(changedFields)[0]

    key && props.dispatch({
      type: 'createApproval/changeField',
      payload: {
        key,
        value: changedFields[key].value,
      },
    })
  },
})(Approval)

function mapStateToProps (state) {
  const {
    regionList,
    initialRegion,
    staffList,
    approval,
    personStatus,
    isShowModal,
    attachments,
  } = state.createApproval

  return {
    loading: state.loading.models.createApproval,
    regionList,
    initialRegion,
    personStatus,
    isShowModal,
    staffList,
    approval,
    attachments,
  }
}

export default connect(mapStateToProps)(NormalApprovalForm)
