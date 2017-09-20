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
  message,
  Validation,
  Upload,

  // RangePicker,
} from 'antd'
import { routerRedux, Link } from 'dva/router'
import styles from './PendingApproval.css'
import moment from 'moment'
import 'moment/locale/zh-cn'

moment.locale('zh-cn')
import { PAGE_SIZE } from '../../constants'

const FormItem = Form.Item
const RangePicker = DatePicker.RangePicker
const RadioGroup = Radio.Group
const Option = Select.Option

const EditInitiatedForm = Form.create()(props => {
  const {
    visible,
    onCancel,
    onCreate,
    form,
    dispatch,
    uploadAttachments,
    uploadPictures,
    onSendIdChange,
    onSendIdDeselect,
    onApprovalIdDeselect,
    onApprovalIdChange,
    regionList,
    selectRegion,
    staffList,
    approval,
    initialRegion,
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
  const staffOptions = staffList.map(value => (
    <Option key={value.staffId} value={value.staffId}>{value.staffName}</Option>
  ))

  return (
    <Modal
      visible={visible}
      title="查看审批详情"
      okText="确定"
      width="800"
      onCancel={onCancel}
      onOk={onCreate}
    >
      <Form>
        <Row gutter={16}>
          <Col span={12}>
            <FormItem {...formItemLayout} label="审批人">
              {getFieldDecorator('approvalPersonId', {
                // initialValue: staffName
                rules: [{ required: true, message: '请选择审批人' }],
              })(
                <Select
                  mode="multiple"
                  placeholder="请选择"
                  style={{ width: '100%' }}
                  disabled
                >
                  {staffOptions}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem {...formItemLayout} label="抄送人">
              {getFieldDecorator(
                'sendPersonId',
                {
                  // initialValue: staffName
                  // rules: [{ required: true, message: "请选择抄送人" }]
                }
              )(
                <Select
                  mode="multiple"
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
        <Row gutter={16}>
          <Col span={12}>
            <FormItem {...formItemLayout} label="管理区">
              {getFieldDecorator('regionId', {
                // initialValue: staffName
                rules: [{ required: true, message: '请选择管理区' }],
              })(
                <Select
                  mode="combox"
                  placeholder="请选择"
                  onChange={selectRegion}
                  style={{ width: '100%' }}
                  disabled
                >
                  {regionOptions}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem {...formItemLayout} label="审批编号">
              {getFieldDecorator('code', {
                rules: [{ required: true, message: '请输入审批编号' }],
              })(<Input disabled />)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <FormItem {...formItemLayout} label="审批类型">
              {getFieldDecorator('type', {})(
                <Select disabled>
                  <Option value={0}>通用审批</Option>
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
              })(<Input disabled />)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <FormItem {...formItemRow} label="审批详情">
              {getFieldDecorator('details', {
                rules: [
                  {
                    type: 'string',
                    required: true,
                    max: 300,
                    message: '请正确输入审批详情,最大长度为300',
                  },
                ],
              })(<Input type="textarea" disabled />)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <FormItem {...formItemRow} label="添加图片">
              <Upload {...uploadPictures} disabled>
                <a>点击添加（最多9张）</a>
              </Upload>
            </FormItem>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={24}>
            <FormItem {...formItemRow} label="添加附件">
              <Upload {...uploadAttachments} disabled>
                <a>点击添加 （单个附件应小于2M）</a>
              </Upload>
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
})

const NormalEditInitiatedForm = Form.create({
  mapPropsToFields (props) {
    const fields = {}
    Object.keys(props.approval).forEach(key => {
      fields[key] = {
        value: props.approval[key],
      }
    })
    return {
      ...fields,
    }
  },

  onFieldsChange (props, changedFields) {
    props.onChange(changedFields)
  },
})(EditInitiatedForm)

const CommentApprovalForm = Form.create()(props => {
  const { visible, onCancel, onCreate, form, operate, personStatus } = props

  const { getFieldDecorator } = form
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  }
  const formItemRow = {
    labelCol: { span: 3 },
    wrapperCol: { span: 21 },
  }
  var title = '', label = '', message = ''
  if (operate == 'agree') {
    title = '审批同意意见'
    label = '同意意见'
    message = '请输入审批意见'
  }
  if (operate == 'refuse') {
    title = '审批拒绝意见'
    label = '拒绝意见'
    message = '请输入拒绝的理由'
  }
  if (operate == 'referral') {
    title = '审批转交'
    label = '转交说明'
    message = '请输入转交的详细说明'
  }
  if (operate == 'comment') {
    title = '审批评论'
    label = '评论内容'
    message = 'please input the comment'
  }

  return (
    <Modal
      visible={visible}
      title={title}
      okText="确定"
      onCancel={onCancel}
      onOk={onCreate}
    >
      <Form>
        <Row gutter={8}>
          <Col span={24}>
            <FormItem {...formItemLayout} label={label}>
              {getFieldDecorator('remark', {
                // initialValue: staffName
                rules: [
                  { required: true, message: '请输入', type: 'string', max: 300 },
                ],
              })(<Input type="textarea" rows={10} />)}
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
})

const NormalCommentApprovalForm = Form.create({
  mapPropsToFields (props) {
    const fields = {}

    if (props.personStatus) {
      Object.keys(props.personStatus).forEach(key => {
        fields[key] = {
          value: props.personStatus[key],
        }
      })
    }

    return {
      ...fields,
    }
  },

  // onFieldsChange(props, changedFields) {

  //

  //    props.onChange(changedFields);

  // },
})(CommentApprovalForm)

const TransferApprovalForm = Form.create()(props => {
  const {
    visible,
    onCancel,
    onCreate,
    form,
    operate,
    personStatus,
    staffList,
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
      title="审批转交"
      okText="确定"
      onCancel={onCancel}
      onOk={onCreate}
    >
      <Form>
        <Row gutter={8}>
          <Col span={24}>
            <FormItem {...formItemLayout} label="选人">
              {getFieldDecorator('transferPersonId', {
                // initialValue: staffName
                rules: [{ required: true, message: '请选择转交人' }],
              })(
                <Select
                  mode="multiple"
                  placeholder="请选择"
                  style={{ width: '100%' }}

                  // onChange={onSendIdChange}

                  // onDeselect={onSendIdDeselect}
                >
                  {staffOptions}
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={24}>
            <FormItem {...formItemLayout} label="转交说明">
              {getFieldDecorator('remark', {
                // initialValue: staffName
                rules: [
                  { required: true, message: '请输入', type: 'string', max: 30 },
                ],
              })(<Input type="textarea" rows={10} />)}
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
})

const NormalTransferApprovalForm = Form.create({
  mapPropsToFields (props) {
    const fields = {}

    if (props.personStatus) {
      Object.keys(props.personStatus).forEach(key => {
        fields[key] = {
          value: props.personStatus[key],
        }
      })
    }

    return {
      ...fields,
    }
  },

  // onFieldsChange(props, changedFields) {

  //

  //    props.onChange(changedFields);

  // },
})(TransferApprovalForm)

function PendingApprovalList ({
  dispatch,
  setStore,
  list: dataSource,
  loading,
  total,
  page: current,
  filterStr,
  pageSize,
  seniorSearchData,
  seniorSearch,
  regionList,
  staffList,
  initialRegion,
  cleaningAreaList,
  approval,
}) {
  class EditInitiated extends React.Component {
    constructor (props) {
      super(props)
      this.state = {
        visible: false,
        staffList: this.props.staffList,
        approval: this.props.approval,
        attachments: [],
        pictures: [],
        attachmentsFileList: [],
        picturesFileList: [],
        personStatus: [],
      }
      this.dispatch = props.dispatch
    }
    showModal = e => {
      e.preventDefault()

      var approval = this.props.approval
      var staffList = this.props.staffList.map(x => {
        if (x.staffRegionId == approval.regionId) {
          return x
        }
      })
      staffList = staffList.filter(n => {
        return n != undefined
      })

      var approvalPersonId = this.props.approval.personStatus.map(x => {
        if (x.approvalPersonType == 1) {
          return x.personId
        }
      })
      approvalPersonId = approvalPersonId.filter(n => {
        return n != undefined
      })

      var sendPersonId = this.props.approval.personStatus.map(x => {
        if (x.approvalPersonType == 2) {
          return x.personId
        }
      })
      sendPersonId = sendPersonId.filter(n => {
        return n != undefined
      })

      var approval = { ...this.state.approval, approvalPersonId, sendPersonId }

      this.setState({
        approval: { ...this.state.approval, ...approval },
      })

      var attachments = this.props.approval.attachments.map(x => {
        if (x.fileType == 1) {
          return x
        }
      })
      attachments = attachments.filter(n => {
        return n != undefined
      })

      var pictures = this.props.approval.attachments.map(x => {
        if (x.fileType == 0) {
          return x
        }
      })
      pictures = pictures.filter(n => {
        return n != undefined
      })

      this.setState({
        personStatus: this.props.approval.personStatus,
        staffList,
        visible: true,
        attachments,
        pictures,
      })

      // this.setState({ visible: true });
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

      var cleaningAreaList = this.props.cleaningAreaList.map(x => {
        if (x.regionId == value) {
          return x
        }
      })
      cleaningAreaList = cleaningAreaList.filter(n => {
        return n != undefined
      })

      this.setState({
        staffList,
        cleaningAreaList,
      })
    };

    onSendIdChange = value => {
      let { personStatus } = this.state

      var length = value.length
      // let personStatusList = [];
      let data = {
        approvalOperationType: 0,
        approvalPersonType: 2,
        personId: value[length - 1],
        remark: '',
      }

      personStatus.push(data)
      this.setState({ personStatus })

      // var approval = { ...this.state.approval, ...data };

      // this.setState({

      //    approval: { ...this.state.approval, ...approval },

      // });
    };
    onApprovalIdChange = value => {
      let { personStatus } = this.state
      // let personStatusList = [];
      var length = value.length
      let data = {
        approvalOperationType: 0,
        approvalPersonType: 1,
        personId: value[length - 1],
        remark: '',
      }

      personStatus.push(data)
      this.setState({ personStatus })

      // var approval = { ...this.state.approval, ...data };

      // this.setState({

      //    approval: { ...this.state.approval, ...approval },

      // });
    };
    onApprovalIdDeselect = value => {
      let { personStatus } = this.state
      // let personStatusList = [];

      let person = personStatus.find(
        person => person.personId == value && person.approvalPersonType == 1
      )
      var index = personStatus.indexOf(person)
      if (index >= 0) {
        personStatus.splice(index, 1)
      }
      this.setState({ personStatus })

      // var approval = { ...this.state.approval, ...data };

      // this.setState({

      //    approval: { ...this.state.approval, ...approval },

      // });
    };

    onSendIdDeselect = value => {
      let { personStatus } = this.state
      // let personStatusList = [];

      let person = personStatus.find(
        person => person.personId == value && person.approvalPersonType == 2
      )
      var index = personStatus.indexOf(person)
      if (index >= 0) {
        personStatus.splice(index, 1)
      }
      this.setState({ personStatus })

      // var approval = { ...this.state.approval, ...data };

      // this.setState({

      //    approval: { ...this.state.approval, ...approval },

      // });
    };

    uploadAttachments = {
      name: 'file',
      action: 'api/saas/uploadAttachments',
      headers: {
        authorization: 'authorization-text',
      },
      // onChange: this.uploadAttachmentsOnChange,
      // this.uploadAttachmentsOnChange,
      fileList: approval.attachments
        .map(attachment => {
          if (attachment.fileType == 1) {
            return {
              uid: attachment.id,
              name: attachment.fileName,
              status: 'done',
              url: attachment.filePath,
            }
          }
        })
        .filter(n => {
          return n != undefined
        }),

      // defaultFileList: fileList.filter(function (n) { return n != undefined }),
    };

    uploadPictures = {
      name: 'file',
      action: 'api/saas/uploadAttachments',
      headers: {
        authorization: 'authorization-text',
      },
      // onChange: this.uploadPicturesOnChange,
      fileList: approval.attachments
        .map(attachment => {
          if (attachment.fileType == 0) {
            return {
              uid: attachment.id,
              name: attachment.fileName,
              status: 'done',
              url: attachment.filePath,
            }
          }
        })
        .filter(n => {
          return n != undefined
        }),

      // defaultFileList: fileList.filter(function (n) { return n != undefined }),
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

    handleFormChange = changedFields => {
      const key = Object.keys(changedFields)[0]
      const value = changedFields[key].value

      let data = { [key]: value }

      if (key == 'regionId') {
        data = { approvalId: null, sendId: null, [key]: value }
      }

      var approval = { ...this.state.approval, ...data }
      this.setState({
        approval: { ...this.state.approval, ...approval },
      })
    };
    render () {
      return (
        <span>
          <a onClick={this.showModal}>查看</a>
          {
            <NormalEditInitiatedForm
              regionList={this.props.regionList}
              staffList={this.state.staffList}
              dispatch={this.props.dispatch}
              uploadAttachments={this.uploadAttachments}
              uploadPictures={this.uploadPictures}
              fileList={this.state.fileList}
              attachmentsFileList={this.state.attachmentsFileList}
              picturesFileList={this.state.picturesFileList}
              onApprovalIdDeselect={this.onApprovalIdDeselect}
              onSendIdDeselect={this.onSendIdDeselect}
              ref={this.saveFormRef}
              visible={this.state.visible}
              onCancel={this.handleCancel}
              onCreate={this.handleCreate}
              approval={this.state.approval}
              onChange={this.handleFormChange}
              selectRegion={this.selectRegion}
              onSendIdChange={this.onSendIdChange}
              onApprovalIdChange={this.onApprovalIdChange}
            />
          }
        </span>
      )
    }
  }

  class CommentApproval extends React.Component {
    constructor (props) {
      super(props)

      this.state = {
        visible: false,
        personStatus: [],
      }
      this.dispatch = props.dispatch
    }
    showModal = e => {
      e.preventDefault()
      this.setState({
        visible: true,
        personStatus: this.props.approval.approvalPersonStatus,
      })

      // this.setState({ visible: true });
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
        // values.id = this.props.approval.id;
        values.id = this.props.approval.approvalPersonStatus.id
        values.approvalId = this.props.approval.id
        values.personId = this.props.approval.approvalPersonStatus.personId
        if (this.props.operate == 'agree') {
          values.approvalOperationType = 1
        }
        if (this.props.operate == 'refuse') {
          values.approvalOperationType = 2
        }
        if (this.props.operate == 'referral') {
          values.approvalOperationType = 3
        }
        if (this.props.operate == 'comment') {
          this.props.dispatch({
            type: 'pendingApprovalList/addPendingComment',
            payload: { personStatus: values },
          })
        } else {
          this.props.dispatch({
            type: 'pendingApprovalList/addOpinions',
            payload: { personStatus: values },
          })
        }

        // values.attachments = this.state.attachments.concat(this.state.pictures);

        form.resetFields()
        this.setState({ visible: false })
      })
    };
    saveFormRef = form => {
      this.form = form
    };

    // handleFormChange = (changedFields) => {
    //
    //    const key = Object.keys(changedFields)[0];
    //    const value = changedFields[key].value;

    //    let data = { [key]: value };
    //    let { personStatus } = this.state;
    //    //data = { a: null, sendId: null, [key]: value };
    //    personStatus.push(data);
    //    //this.setState({ personStatus });
    //    //var personStatus = { ...this.state,data };
    //    this.setState({
    //        personStatus: { ...this.state.personStatus, ...personStatus },
    //    });
    // }
    render () {
      var operate = ''
      if (this.props.operate == 'agree') {
        operate = '同意'
      }
      if (this.props.operate == 'refuse') {
        operate = '拒绝'
      }
      if (this.props.operate == 'referral') {
        operate = '转交'
      }
      if (this.props.operate == 'comment') {
        operate = '评论'
      }
      return (
        <span>
          <a onClick={this.showModal}>{operate}</a>
          {
            <NormalCommentApprovalForm
              dispatch={this.props.dispatch}
              ref={this.saveFormRef}
              visible={this.state.visible}
              onCancel={this.handleCancel}
              onCreate={this.handleCreate}
              personStatus={this.state.personStatus}
              operate={this.props.operate}

              // onChange={this.handleFormChange}
            />
          }
        </span>
      )
    }
  }
  class TransferApproval extends React.Component {
    constructor (props) {
      super(props)

      this.state = {
        visible: false,
        personStatus: [],
        staffList: this.props.staffList,
      }
      this.dispatch = props.dispatch
    }
    showModal = e => {
      e.preventDefault()
      var approval = this.props.approval
      var staffList = this.props.staffList.map(x => {
        if (x.staffRegionId == approval.regionId) {
          return x
        }
      })
      staffList = staffList.filter(n => {
        return n != undefined
      })
      this.setState({
        visible: true,
        personStatus: this.props.approval.approvalPersonStatus,
        staffList,
      })

      // this.setState({ visible: true });
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
        values.approvalIds = [this.props.approval.id]

        this.props.dispatch({
          type: 'pendingApprovalList/transferApproval',
          payload: { personStatus: values },
        })
        form.resetFields()
        this.setState({ visible: false })
      })
    };
    saveFormRef = form => {
      this.form = form
    };

    // handleFormChange = (changedFields) => {
    //
    //    const key = Object.keys(changedFields)[0];
    //    const value = changedFields[key].value;

    //    let data = { [key]: value };
    //    let { personStatus } = this.state;
    //    //data = { a: null, sendId: null, [key]: value };
    //    personStatus.push(data);
    //    //this.setState({ personStatus });
    //    //var personStatus = { ...this.state,data };
    //    this.setState({
    //        personStatus: { ...this.state.personStatus, ...personStatus },
    //    });
    // }
    render () {
      return (
        <span>
          <a onClick={this.showModal}>转交</a>
          {
            <NormalTransferApprovalForm
              dispatch={this.props.dispatch}
              ref={this.saveFormRef}
              visible={this.state.visible}
              onCancel={this.handleCancel}
              onCreate={this.handleCreate}
              staffList={this.state.staffList}
              personStatus={this.state.personStatus}

              // onChange={this.handleFormChange}
            />
          }
        </span>
      )
    }
  }

  class BatchTransferApproval extends React.Component {
    constructor (props) {
      super(props)

      this.state = {
        visible: false,
        personStatus: [],
        staffList: this.props.staffList,
      }
      this.dispatch = props.dispatch
    }
    showModal = e => {
      e.preventDefault()
      var approval = this.props.approval
      var staffList = this.props.staffList.map(x => {
        if (x.staffRegionId == approval.regionId) {
          return x
        }
      })
      staffList = staffList.filter(n => {
        return n != undefined
      })
      this.setState({
        visible: true,
        personStatus: this.props.approval.approvalPersonStatus,
        staffList,
      })

      // this.setState({ visible: true });
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
        values.approvalIds = this.props.approval.map(x => x.id)

        this.props.dispatch({
          type: 'pendingApprovalList/transferApproval',
          payload: { personStatus: values },
        })
        form.resetFields()
        this.setState({ visible: false })
      })
    };
    saveFormRef = form => {
      this.form = form
    };

    render () {
      return (
        <span>
          <Button onClick={this.showModal} disabled={!this.props.hasSelected}>
            批量转交
          </Button>
          {
            <NormalTransferApprovalForm
              dispatch={this.props.dispatch}
              ref={this.saveFormRef}
              visible={this.state.visible}
              onCancel={this.handleCancel}
              onCreate={this.handleCreate}
              staffList={this.state.staffList}
              personStatus={this.state.personStatus}

              // onChange={this.handleFormChange}
            />
          }
        </span>
      )
    }
  }

  class BatchCommentApproval extends React.Component {
    constructor (props) {
      super(props)

      this.state = {
        visible: false,
        personStatus: [],
      }
      this.dispatch = props.dispatch
    }
    showModal = e => {
      e.preventDefault()
      this.setState({
        visible: true,
        personStatus: this.props.approval.approvalPersonStatus,
      })

      // this.setState({ visible: true });
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

        // values.id = this.props.approval.id;
        values.ids = this.props.approval.map(x => x.approvalPersonStatus.id)
        // values.ids = this.props.approval;

        if (this.props.operate == 'agree') {
          values.approvalOperationType = 1
        }
        if (this.props.operate == 'refuse') {
          values.approvalOperationType = 2
        }

        this.props.dispatch({
          type: 'pendingApprovalList/batchAddComment',
          payload: { personStatus: values },
        })
        form.resetFields()
        this.setState({ visible: false })
      })
    };
    saveFormRef = form => {
      this.form = form
    };

    // handleFormChange = (changedFields) => {
    //
    //    const key = Object.keys(changedFields)[0];
    //    const value = changedFields[key].value;

    //    let data = { [key]: value };
    //    let { personStatus } = this.state;
    //    //data = { a: null, sendId: null, [key]: value };
    //    personStatus.push(data);
    //    //this.setState({ personStatus });
    //    //var personStatus = { ...this.state,data };
    //    this.setState({
    //        personStatus: { ...this.state.personStatus, ...personStatus },
    //    });
    // }
    render () {
      var operate = ''
      if (this.props.operate == 'agree') {
        operate = '批量同意'
      }
      if (this.props.operate == 'refuse') {
        operate = '批量拒绝'
      }

      return (
        <span>
          <Button onClick={this.showModal} disabled={!this.props.hasSelected}>
            {operate}
          </Button>
          {
            <NormalCommentApprovalForm
              dispatch={this.props.dispatch}
              ref={this.saveFormRef}
              visible={this.state.visible}
              onCancel={this.handleCancel}
              onCreate={this.handleCreate}
              personStatus={this.state.personStatus}
              operate={this.props.operate}

              // onChange={this.handleFormChange}
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
        type: 'pendingApprovalList/seniorSearchToggle',
        payload: true,
      })
    };
    closeSeniorSearch = () => {
      dispatch({
        type: 'pendingApprovalList/seniorSearchToggle',
        payload: false,
      })
    };
    seniorSearchHandler = e => {
      e.preventDefault()
      this.props.form.validateFields((err, values) => {
        if (!err) {
          dispatch({
            type: 'pendingApprovalList/seniorSearch',
            payload: values,
          })
        }
      })
    };
    resetSeniorSearch = () => {
      dispatch({
        type: 'pendingApprovalList/resetSeniorSearch',
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
    deleteApproval = ids => {
      dispatch({
        type: 'pendingApprovalList/deleteApproval',
        payload: { ids },
      })
    };
    revokedApproval = ids => {
      dispatch({
        type: 'pendingApprovalList/revokedApproval',
        payload: { ids },
      })
    };

    pageChangeHandler = page => {
      dispatch(
        routerRedux.push({
          pathname: '/pendingApprovalList',
          query: { page, filterStr, pageSize },
        })
      )
    };
    searchHandler = filterStr => {
      dispatch(
        routerRedux.push({
          pathname: '/pendingApprovalList',
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
          pathname: '/pendingApprovalList',
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
      const formItemLongLayout = {
        labelCol: {
          xs: {
            span: 24,
          },
          sm: {
            span: 3,
          },
        },
        wrapperCol: {
          xs: {
            span: 24,
          },
          sm: {
            span: 21,
          },
        },
      }

      const columns = [
        {
          title: '审批类型',
          dataIndex: 'typeStr',
          key: 'type',
          width: 120,
        },
        {
          title: '审批摘要',
          dataIndex: 'content',
          key: 'content',
          width: 140,
        },
        {
          title: '管理区',
          dataIndex: 'regionName',
          key: 'regionName',
          width: 120,
        },
        {
          title: '发起时间',
          dataIndex: 'creatDate',
          key: 'creatDate',
          width: 120,
          render: (text, approval) =>
            (approval.creatDate != null
              ? new Date(approval.creatDate).toLocaleDateString()
              : null),
        },
        {
          title: '完成时间',
          dataIndex: 'completeDate',
          key: 'completeDate',
          width: 120,
          render: (text, approval) =>
            (approval.completeDate != null
              ? new Date(approval.completeDate).toLocaleDateString()
              : null),
        },
        {
          title: '状态',
          dataIndex: 'statusStr',
          key: 'statusStr',
          width: 100,
        },
        {
          title: '申请人',
          dataIndex: 'suitorPersonName',
          key: 'suitorPersonName',
          width: 150,
        },

        {
          title: '审批人',
          dataIndex: 'approvalPersonName',
          key: 'approvalPersonName',
          width: 250,
        },
        {
          title: '操作',
          fixed: 'right',
          width: 160,
          render: (text, record) => {
            return total
              ? <span>
                <EditInitiated
                  regionList={regionList}
                  staffList={staffList}
                  initialRegion={initialRegion}
                  dispatch={dispatch}
                  approval={record}
                />
                  &nbsp;
                <CommentApproval
                  dispatch={dispatch}
                  approval={record}
                  operate={'agree'}
                />
                  &nbsp;
                <CommentApproval
                  dispatch={dispatch}
                  approval={record}
                  operate={'refuse'}
                />
                  &nbsp;

                <TransferApproval
                  dispatch={dispatch}
                  approval={record}
                  staffList={staffList}
                />
                  &nbsp;
                <CommentApproval
                  dispatch={dispatch}
                  approval={record}
                  operate={'comment'}
                />

              </span>
              : '操作不可用'
          },
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
      const Inspect = selectedRows

      return (
        <div className={styles.normal}>
          <div className={styles.ListButton}>
            <Row>
              <Col span={16} style={{ textAlign: 'left' }}>
                <h1>
                  待我审批的
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
                <Row gutter={8}>
                  <Col span={8}>
                    <FormItem {...formItemLayout} label="审批类型">
                      {getFieldDecorator('type', {})(<Select />)}
                    </FormItem>
                  </Col>
                  <Col span={8}>
                    <FormItem {...formItemLayout} label="申请人">
                      {getFieldDecorator('suitorPersonId', {})(<Select />)}
                    </FormItem>
                  </Col>
                  <Col span={8}>
                    <FormItem {...formItemLayout} label="审批人">
                      {getFieldDecorator('approvalPersonId', {})(<Select />)}
                    </FormItem>
                  </Col>
                </Row>
                <Row gutter={8}>
                  <Col span={8}>

                    <FormItem {...formItemLayout} label="审批摘要">
                      {getFieldDecorator('content', {})(<Input />)}
                    </FormItem>
                  </Col>
                  <Col span={8}>
                    <FormItem {...formItemLayout} label="状态">
                      {getFieldDecorator('status', {})(<Select />)}
                    </FormItem>
                  </Col>
                  <Col span={8}>
                    <FormItem {...formItemLayout} label="发起时间">
                      {getFieldDecorator(
                        'createDate',
                        {
                          // initialValue: seniorSearchData.handlePersonId
                        }
                      )(<RangePicker />)}

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

                <BatchCommentApproval
                  dispatch={dispatch}
                  approval={selectedRows}
                  operate={'agree'}
                  hasSelected={hasSelected}
                />
                <BatchCommentApproval
                  dispatch={dispatch}
                  approval={selectedRows}
                  operate={'refuse'}
                  hasSelected={hasSelected}
                />
                <BatchTransferApproval
                  dispatch={dispatch}
                  approval={selectedRowKeys}
                  staffList={staffList}
                  hasSelected={hasSelected}
                />
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
            rowKey={approval => approval.id}
            scroll={{ x: '105%' }}
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
    staffList,
    initialRegion,
    cleaningAreaList,
    approval,
    seniorSearchData,
    seniorSearch,
  } = state.pendingApprovalList

  return {
    loading: state.loading.models.pendingApprovalList,
    list,
    total,
    page,
    filterStr,
    pageSize,
    regionList,
    staffList,
    initialRegion,
    cleaningAreaList,
    approval,
    seniorSearchData,
    seniorSearch,
  }
}

export default connect(mapStateToProps)(PendingApprovalList)
