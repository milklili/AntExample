import React from 'react'
import { connect } from 'dva'
import {
  message,
  Upload,
  Modal,
  Menu,
  Dropdown,
  Table,
  Pagination,
  Popconfirm,
  Button,
  DatePicker,
  Form,
  Input,
  Alert,
  Badge,
  Icon,
  Row,
  Col,
  Card,
  Select,
} from 'antd'
import { routerRedux, Link } from 'dva/router'
import styles from './document.css'
// import { PAGE_SIZE } from '../../constants'

function DocumentList ({
  dispatch,
  list: dataSource,
  loading,
  total,
  page: current,
  filterStr,
  pageSize,
  seniorSearchData,
  regions,
  documentCategory,
  users,
  seniorSearch,
}) {
  const FormItem = Form.Item
  const RangePicker = DatePicker.RangePicker

  function editDocument (id) {
    dispatch(
      routerRedux.push({
        pathname: '/editDocument',
        query: { id },
      })
    )
  }
  function showDocument (id) {
    dispatch(
      routerRedux.push({
        pathname: '/showDocument',
        query: { id },
      })
    )
  }

  class UploadFileModal extends React.Component {
    constructor (props) {
      super(props)
      this.state = {
        visible: false,
        attachments: [],
        fileList: [],
      }
    }

    showModelHandler = e => {
      if (e) e.stopPropagation()
      this.setState({
        visible: true,
      })
    };
    hideModelHandler = () => {
      this.setState({
        visible: false,
      })
    };

    handleOk = e => {
      const values = {
        ids: this.props.ids,
        attachments: this.state.attachments,
      }
      dispatch({
        type: 'documentList/addFiles',
        payload: values,
      })
    };

    uploadFilesOnChange = info => {
      let { attachments } = this.state
      let fileList = info.fileList

      // filter successfully uploaded files according to response from server
      fileList.filter(file => {
        if (file.response) {
          message.success(`${info.file.name} 文件上传成功.`)
          let maxId = attachments.length + 1
          for (let file of file.response) {
            file.id = maxId
            attachments.push(file)
            maxId++
          }
          fileList = []
          attachments.forEach(currentfile => {
            var file = {}
            file.uid = currentfile.id
            file.name = currentfile.fileName
            file.status = 'done'
            file.url = currentfile.filePath
            fileList.push(file)
          })
        }
      })
      // remove
      if (info.file.status === 'removed') {
        let file = attachments.find(file => file.id === info.file.uid)
        var index = attachments.indexOf(file)
        if (index >= 0) {
          attachments.splice(index, 1)
        }
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} 文件上传失败.`)
      }
      this.setState({ fileList, attachments })
    };

    render () {
      const uploadFiles = {
        name: 'file',
        action: '/api/officeManage/uploadAttachments',
        headers: {
          authorization: 'authorization-text',
        },
        onChange: this.uploadFilesOnChange,
      }

      const { children } = this.props

      return (
        <span>
          <span onClick={this.showModelHandler}>
            {children}
          </span>
          <Modal
            title="添加附件"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.hideModelHandler}
            maskClosable={!this.state.visible}
            closable={!this.state.visible}
          >
            <Upload {...uploadFiles} fileList={this.state.fileList}>
              <Button type="primary">点击添加</Button><a>(单个附件应小于2M)</a>
            </Upload>
          </Modal>
        </span>
      )
    }
  }

  class MoreOptionsDropdownMenu extends React.Component {
    state = {
      visible: false,

      // attachments: [],
    };

    handleVisibleChange = flag => {
      this.setState({ visible: flag })
    };

    deleteDocument = ids => {
      dispatch({
        type: 'documentList/remove',
        payload: { ids },
      })
    };
    deleteAttachments = ids => {
      dispatch({
        type: 'documentList/deleteDocumentAttachments',
        payload: { ids },
      })
    };
    audit = (ids, record) => {
      if (record.auditState == true) {
        message.error('该文档资料已审核')
      } else {
        dispatch({
          type: 'documentList/auditDocuments',
          payload: { ids },
        })
      }
    };
    cancelAudit = (ids, record) => {
      if (record.auditState == false) {
        message.error('该文档资料未审核，不能撤销审核')
      } else {
        dispatch({
          type: 'documentList/cancelAuditDocuments',
          payload: { ids },
        })
      }
    };

    render () {
      let ids = []
      ids.push(this.props.rowData.id)
      const menu = (
        <Menu>
          <Menu.Item key="delete">
            <Popconfirm
              title="确定要删除该文档资料吗?"
              onConfirm={this.deleteDocument.bind(null, ids)}
            >
              <a>删除</a>
            </Popconfirm>
          </Menu.Item>
          <Menu.Item key="addAttachments">
            <UploadFileModal ids={ids}>
              添加附件
            </UploadFileModal>
          </Menu.Item>
          <Menu.Item key="deleteAttachments">
            <a onClick={this.deleteAttachments.bind(null, ids)}>删除附件</a>
          </Menu.Item>
          <Menu.Item key="audit">
            <a onClick={this.audit.bind(null, ids, this.props.rowData)}>审核</a>

          </Menu.Item>
          <Menu.Item key="cancelAudit">
            <a onClick={this.cancelAudit.bind(null, ids, this.props.rowData)}>
              撤销审核
            </a>
          </Menu.Item>
        </Menu>
      )
      return (
        <span>
          <Dropdown
            overlay={menu}
            onVisibleChange={this.handleVisibleChange}
            visible={this.state.visible}
          >
            <a className="ant-dropdown-link">
              更多<Icon type="down" />
            </a>
          </Dropdown>
        </span>
      )
    }
  }

  const columns = [
    {
      title: '文档编号',
      dataIndex: 'number',
      key: 'Number',
      width: 120,
    },
    {
      title: '管理区',
      dataIndex: 'regionName',
      key: 'regionName',
      width: 120,
    },
    {
      title: '文档名称',
      dataIndex: 'name',
      key: 'name',
      width: 200,
    },
    {
      title: '文档类型',
      dataIndex: 'officeManagementCategoryName',
      key: 'officeManagementCategoryName',
      width: 120,
    },
    {
      title: '归档时间',
      dataIndex: 'fileDate',
      key: 'fileDate',
      width: 180,
      render: (text, record, index) =>
        (record.fileDate != null
          ? new Date(record.fileDate).toLocaleString()
          : null),
    },
    {
      title: '归档人',
      dataIndex: 'operatorName',
      key: 'operatorName',
      width: 150,
    },
    {
      title: '状态',
      dataIndex: 'auditState',
      key: 'auditState',
      width: 120,
      render: (text, record, index) =>
        (record.auditState
          ? <span><Badge status="success" />已审核</span>
          : <span><Badge status="default" />未审核</span>),
    },
    {
      title: '审核人',
      dataIndex: 'auditorName',
      key: 'auditorName',
      width: 150,
    },
    {
      title: '审核时间',
      dataIndex: 'auditDate',
      key: 'auditDate',
      width: 180,
      render: (text, record, index) =>
        (record.auditDate != null
          ? new Date(record.auditDate).toLocaleString()
          : null),
    },
    {
      title: '起效时间',
      dataIndex: 'startDate',
      key: 'startDate',
      width: 120,
      render: (text, record, index) =>
        (record.startDate != null
          ? new Date(record.startDate).toLocaleDateString()
          : null),
    },
    {
      title: '失效时间',
      dataIndex: 'endDate',
      key: 'endDate',
      width: 120,
      render: (text, record, index) =>
        (record.endDate != null
          ? new Date(record.endDate).toLocaleDateString()
          : null),
    },
    {
      title: '操作',
      fixed: 'right',
      width: 110,
      render: (text, record) => {
        return total
          ? <span>
            <a onClick={editDocument.bind(null, record.id)}>编辑</a>
            &nbsp;
            <a onClick={showDocument.bind(null, record.id)}>查看</a>
            &nbsp;
            <MoreOptionsDropdownMenu rowData={record} />
          </span>
          : '操作不可用'
      },
    },
  ]
  const expandedRowRender = record => {
    const columns = [
      { title: '版本', dataIndex: 'version', key: 'version', width: 200 },
      { title: '备注', dataIndex: 'remark', key: 'remark' },
    ]
    const data = []
    data.push({
      key: record.id,
      version: record.version,
      remark: record.remark,
    })
    return <Table columns={columns} dataSource={data} pagination={false} />
  }

  class Document extends React.Component {
    state = {
      selectedRowKeys: [], // Check here to configure the default column
    };
    openSeniorSearch = () => {
      dispatch({
        type: 'documentList/seniorSearchToggle',
        payload: true,
      })
    };
    closeSeniorSearch = () => {
      dispatch({
        type: 'documentList/seniorSearchToggle',
        payload: false,
      })
    };
    seniorSearchHandler = e => {
      e.preventDefault()
      this.props.form.validateFields((err, values) => {
        if (!err) {
          dispatch({
            type: 'documentList/seniorSearch',
            payload: values,
          })
        }
      })
    };
    resetSeniorSearch = () => {
      dispatch({
        type: 'documentList/resetSeniorSearch',
      })
    };
    onSelectChange = selectedRowKeys => {
      this.setState({ selectedRowKeys })
    };

    pageChangeHandler = page => {
      dispatch(
        routerRedux.push({
          pathname: '/documentList',
          query: { page, filterStr, pageSize },
        })
      )
    };
    searchHandler = filterStr => {
      dispatch(
        routerRedux.push({
          pathname: '/documentList',
          query: { page: 1, filterStr, pageSize },
        })
      )
    };

    onShowSizeChange = (current, pageSize) => {
      dispatch(
        routerRedux.push({
          pathname: '/documentList',
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

      const regionsOptions = regions.map(value => (
        <Option value={value.id}>{value.code}</Option>
      ))
      const documentCategoryOptions = documentCategory.map(value => (
        <Option value={value.id}>{value.name}</Option>
      ))
      const usersOptions = users.map(value => (
        <Option value={value.id}>{value.name}</Option>
      ))
      let seniorSearchValues = ''
      if (seniorSearchData.regionName != null) {
        seniorSearchValues += `管理区: ${seniorSearchData.regionName}; `
      }
      if (seniorSearchData.documentCategoryName != null) {
        seniorSearchValues += `文档类别: ${seniorSearchData.documentCategoryName}; `
      }
      if (seniorSearchData.auditState != null) {
        seniorSearchValues += `审核状态: ${seniorSearchData.auditState}; `
      }
      if (seniorSearchData.auditorName != null) {
        seniorSearchValues += `审核人: ${seniorSearchData.auditorName}; `
      }
      if (seniorSearchData.operatorName != null) {
        seniorSearchValues += `归档人: ${seniorSearchData.operatorName}; `
      }
      if (seniorSearchData.fileDate.length == 2) {
        const strStartDate = seniorSearchData.fileDate[0].format('YYYY-MM-DD')
        const strEndDate = seniorSearchData.fileDate[1].format('YYYY-MM-DD')

        seniorSearchValues += `归档时间: ${strStartDate} - ${strEndDate}; `
      }
      if (seniorSearchData.name != null) {
        seniorSearchValues += `文档名称: ${seniorSearchData.name}; `
      }
      if (seniorSearchData.number != null) {
        seniorSearchValues += `文档编号: ${seniorSearchData.number}; `
      }
      const idShowSeniorSearchData = seniorSearchValues != ''

      const { selectedRowKeys } = this.state
      const rowSelection = {
        selectedRowKeys,
        onChange: this.onSelectChange,
      }
      const selectLength = selectedRowKeys.length
      const selectInfo = `已选择${selectLength}项数据`

      return (
        <div className={styles.normal}>

          <div className={styles.ListButton}>
            <Row>
              <Col span={4}>
                <Link to="/createDocument">
                  <Button type="primary">新建</Button>
                </Link>
              </Col>
              <Col span={20} style={{ textAlign: 'right' }}>
                <Search
                  placeholder="搜索..."
                  style={{ width: 200 }}
                  size="large"
                  onSearch={filterStr => this.searchHandler(filterStr)}
                />
                <a className="hide" style={{ marginLeft: 8 }} onClick={this.openSeniorSearch}>
                  高级搜索 <Icon type="down" />
                </a>
              </Col>
            </Row>
          </div>
          {idShowSeniorSearchData &&
            <Alert
              message={seniorSearchValues}
              type="info"
              showIcon
              closeText="清空"
              onClose={this.resetSeniorSearch}
            />}
          {seniorSearch &&
            <Card style={{ marginBottom: 10 }}>
              <Form onSubmit={this.seniorSearchHandler}>
                <Row gutter={8}>
                  <Col span={8}>
                    <FormItem {...formItemLayout} label="管理区">
                      {getFieldDecorator('regionId', {
                        initialValue: seniorSearchData.regionId,
                      })(<Select>{regionsOptions}</Select>)}
                    </FormItem>
                  </Col>
                  <Col span={8}>
                    <FormItem {...formItemLayout} label="文档类别">
                      {getFieldDecorator('documentCategoryId', {
                        initialValue: seniorSearchData.documentCategoryId,
                      })(<Select>{documentCategoryOptions}</Select>)}
                    </FormItem>
                  </Col>
                  <Col span={8}>
                    <FormItem {...formItemLayout} label="审核状态">
                      {getFieldDecorator('auditState', {
                        initialValue: seniorSearchData.auditState != 0 &&
                          seniorSearchData.auditState != '未审核' &&
                          seniorSearchData.auditState != 1 &&
                          seniorSearchData.auditState != '已审核'
                          ? null
                          : seniorSearchData.auditState == 0 ||
                              seniorSearchData.auditState == '未审核'
                            ? '未审核'
                            : '已审核',
                      })(
                        <Select>
                          <Option value="0">未审核</Option>
                          <Option value="1">已审核</Option>
                        </Select>
                      )}

                    </FormItem>
                  </Col>
                </Row>
                <Row gutter={8}>
                  <Col span={8}>
                    <FormItem {...formItemLayout} label="审核人">
                      {getFieldDecorator('auditorId', {
                        initialValue: seniorSearchData.auditorId,
                      })(<Select>{usersOptions}</Select>)}
                    </FormItem>
                  </Col>
                  <Col span={8}>
                    <FormItem {...formItemLayout} label="归档人">
                      {getFieldDecorator('operatorId', {
                        initialValue: seniorSearchData.operatorId,
                      })(<Select>{usersOptions}</Select>)}
                    </FormItem>
                  </Col>
                  <Col span={8}>
                    <FormItem {...formItemLayout} label="归档时间">
                      {getFieldDecorator('fileDate', {
                        initialValue: seniorSearchData.fileDate,
                      })(<RangePicker />)}
                    </FormItem>
                  </Col>
                </Row>
                <Row gutter={8}>
                  <Col span={8}>
                    <FormItem {...formItemLayout} label="文档名称">
                      {getFieldDecorator('name', {
                        initialValue: seniorSearchData.name,
                      })(<Input />)}
                    </FormItem>
                  </Col>
                  <Col span={8}>
                    <FormItem {...formItemLayout} label="文档编号">
                      {getFieldDecorator('number', {
                        initialValue: seniorSearchData.number,
                      })(<Input />)}
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
                      简易搜索 <Icon type="up" />
                    </a>
                  </Col>
                </Row>
              </Form>
            </Card>}
          <div style={{ marginBottom: '16px' }}><span>共搜索到{total}条数据</span></div>
          {selectLength > 0 &&
            <Alert message={selectInfo} type="info" showIcon />}
          <Table
            bordered
            columns={columns}
            dataSource={dataSource}
            loading={loading}
            rowSelection={rowSelection}
            rowKey={record => record.id}
            scroll={{ x: '150%' }}
            expandedRowRender={record => expandedRowRender(record)}
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

  const DocumentForm = Form.create()(Document)
  return <DocumentForm />
}

function mapStateToProps (state) {
  const {
    list,
    total,
    page,
    filterStr,
    pageSize,
    seniorSearchData,
    regions,
    documentCategory,
    users,
    seniorSearch,
  } = state.documentList

  return {
    loading: state.loading.models.documentList,
    list,
    total,
    page,
    filterStr,
    pageSize,
    seniorSearchData,
    regions,
    documentCategory,
    users,
    seniorSearch,
  }
}

export default connect(mapStateToProps)(DocumentList)
