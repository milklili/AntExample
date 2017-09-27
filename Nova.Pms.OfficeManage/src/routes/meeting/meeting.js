import React, { Component } from 'react'
import { connect } from 'dva'
import {
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
} from 'antd'
import { routerRedux, Link } from 'dva/router'
import styles from './meeting.css'
// import { PAGE_SIZE } from '../../constants'

const Meeting = ({
  dispatch,
  total,
  loading,
  list: dataSource,
  page: current,
  filterStr,
  pageSize,
}) => {
  class Meeting extends Component {
    constructor (props) {
      super(props)
      this.state = {
        expand: false,
        isShow: false,
        selectedRowKeys: [],
      }
    }
    isShow = () => {
      this.setState({ isShow: !this.state.isShow })
    };
    handleReset = () => {
      this.props.form.resetFields()
    };
    handleSearch = () => {};
    toggle = () => {
      this.setState({ expand: !this.state.expand })
    };
    onSelectChange = selectedRowKeys => {
      this.setState({ selectedRowKeys })
    };
    searchHandler = filterStr => {
      dispatch(
        routerRedux.push({
          pathname: '/meeting',
          query: { page: 1, filterStr, pageSize },
        })
      )
    };
    deleteRow = id => {
      let ids = []
      ids.push(id)
      dispatch({
        type: 'meeting/remove',
        payload: { ids },
      })
    };
    viewMeeting = id => {
      dispatch(
        routerRedux.push({
          pathname: '/viewMeeting',
          query: { id },
        })
      )
    };
    editMeeting = id => {
      dispatch(
        routerRedux.push({
          pathname: '/editMeeting',
          query: { id },
        })
      )
    };
    onShowSizeChange = (current, pageSize) => {
      dispatch(
        routerRedux.push({
          pathname: '/meeting',
          query: { page: current, filterStr, pageSize },
        })
      )
    };
    render () {
      const Search = Input.Search
      const FormItem = Form.Item
      const Option = Select.Option
      const { getFieldDecorator, getFieldsValue } = this.props.form
      const visibility = {
        display: 'block',
      }
      const invisibility = {
        display: 'none',
      }

      const columns = [
        {
          title: '序号',
          dataIndex: 'number',
          key: 'number',
          width: '5%',
        },
        {
          title: '管理区',
          dataIndex: 'regionName',
          key: 'regionName',
          width: '5%',
        },
        {
          title: '部门',
          dataIndex: 'departmentName',
          key: 'departmentName',
          width: '5%',
        },
        {
          title: '会议名称',
          dataIndex: 'name',
          key: 'name',
          width: '5%',
        },
        {
          title: '会议类别',
          dataIndex: 'officeManagementCategoryName',
          key: 'officeManagementCategoryName',
          width: '5%',
        },
        {
          title: '会议主题',
          dataIndex: 'meetingTheme',
          key: 'meetingTheme',
          width: '5%',
        },
        {
          title: '开始时间',
          dataIndex: 'startDate',
          key: 'startDate',

          width: '5%',
          render: (text, record, index) =>
            (record.startDate != null
              ? new Date(record.startDate).toLocaleDateString()
              : null),
        },
        {
          title: '结束时间',
          dataIndex: 'endDate',
          key: 'endDate',

          width: '5%',
          render: (text, record, index) =>
            (record.endDate != null
              ? new Date(record.endDate).toLocaleDateString()
              : null),
        },
        {
          title: '地点',
          dataIndex: 'place',
          key: 'place',
          width: '5%',
        },
        {
          title: '召集人',
          dataIndex: 'convenorName',
          key: 'convenorName',
          width: '5%',
        },
        {
          title: '主持人',
          dataIndex: 'compereName',
          key: 'compereName',
          width: '5%',
        },
        {
          title: '参加人员',
          dataIndex: 'strMembers',
          key: 'strMembers',
          width: '10%',
        },
        {
          title: '会议内容',
          dataIndex: 'meetingContent',
          key: 'meetingContent',
          width: '8%',
        },
        {
          title: '记录人',
          dataIndex: 'operatorName',
          key: 'operatorName',
          width: '5%',
        },
        {
          title: '记录时间',
          dataIndex: 'createDate',
          key: 'createDate',
          width: '5%',
          render: (text, record, index) =>
            (record.createDate != null
              ? new Date(record.createDate).toLocaleDateString()
              : null),
        },
        {
          title: '备注',
          dataIndex: 'remark',
          key: 'remark',
          width: '9%',
        },
        {
          title: '操作',
          dataIndex: 'Action',
          key: 'Action',
          fixed: 'right',
          width: 110,
          render: (text, record) => {
            return total
              ? <span>
                <a onClick={this.editMeeting.bind(this, record.id)}>编辑</a>
                &nbsp;
                <a onClick={this.viewMeeting.bind(this, record.id)}>查看</a>
                &nbsp;
                <Popconfirm
                  title="确定要删除该会议记录吗?"
                  onConfirm={this.deleteRow.bind(this, record.id)}
                >
                  <a>删除</a>
                </Popconfirm>
              </span>
              : '操作不可用'
          },
        },
      ]

      const fieldValues = JSON.stringify(getFieldsValue())

      const { selectedRowKeys } = this.state
      const rowSelection = {
        selectedRowKeys,
        onChange: this.onSelectChange,
      }
      const selectedRowLength = selectedRowKeys.length
      const hasSelected = selectedRowLength > 0
      const selectedInfo = `已经选择${selectedRowLength}项数据`
      function onValueChange () {
        this.isShow()
      }

      return (
        <div>
          <div className={styles.ListButton}>
            <Row>
              <Col span={4}>
                <Link to="/createMeeting">
                  <Button type="primary">新建</Button>
                </Link>
              </Col>
              <Col span={20} style={{ textAlign: 'right' }}>
                <Search
                  defaultValue={filterStr}
                  placeholder="搜索..."
                  style={{ width: 200 }}
                  size="large"
                  onSearch={filterStr => this.searchHandler(filterStr)}
                />
                <a style={{ marginLeft: 8 }} onClick={this.toggle}>
                  高级搜索 <Icon type="down" />
                </a>
              </Col>
            </Row>
          </div>
          {false &&
            <Alert closeText="清空" type="info" message={fieldValues} showIcon />}
          <Card style={this.state.expand ? visibility : invisibility}>
            <Form>
              <Row gutter={18}>
                <Col span={8}>
                  <FormItem
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 18 }}
                    label="管理区"
                  >
                    {getFieldDecorator('管理区')(
                      <Select placeholder="请选择">
                        <Option value="11">1111</Option>
                        <Option value="12">1111</Option>
                        <Option value="21">1111</Option>
                      </Select>
                    )}
                  </FormItem>
                </Col>
                <Col span={8}>
                  <FormItem
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 18 }}
                    label="部门"
                  >
                    {getFieldDecorator('部门')(
                      <Select placeholder="请选择">
                        <Option value="11">1111</Option>
                        <Option value="12">1111</Option>
                        <Option value="21">1111</Option>
                      </Select>
                    )}
                  </FormItem>
                </Col>
                <Col span={8}>
                  <FormItem
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 18 }}
                    label="会议类别"
                  >
                    {getFieldDecorator('会议类别')(
                      <Select placeholder="请选择">
                        <Option value="11">1111</Option>
                        <Option value="12">1111</Option>
                        <Option value="21">1111</Option>
                      </Select>
                    )}
                  </FormItem>
                </Col>
              </Row>
              <Row gutter={18}>
                <Col span={8}>
                  <FormItem
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 18 }}
                    label="召集人"
                  >
                    {getFieldDecorator('召集人')(
                      <Select placeholder="请选择">
                        <Option value="11">1111</Option>
                        <Option value="12">1111</Option>
                        <Option value="21">1111</Option>
                      </Select>
                    )}
                  </FormItem>
                </Col>
                <Col span={8}>
                  <FormItem
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 18 }}
                    label="负责人"
                  >
                    {getFieldDecorator('负责人')(
                      <Select placeholder="请选择">
                        <Option value="11">1111</Option>
                        <Option value="12">1111</Option>
                        <Option value="21">1111</Option>
                      </Select>
                    )}
                  </FormItem>
                </Col>
                <Col span={8}>
                  <FormItem
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 18 }}
                    label="开始时间"
                  >
                    {getFieldDecorator('开始时间')(
                      <DatePicker
                        style={{ width: '100%' }}
                        showTime
                        format="YYYY-MM-DD HH:mm"
                        placeholder="开始时间"
                        onChange={null}
                        onOk={null}
                      />
                    )}
                  </FormItem>
                </Col>
              </Row>
              <Row gutter={18}>
                <Col span={8}>
                  <FormItem
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 18 }}
                    label="会议名称"
                  >
                    {getFieldDecorator('会议名称')(<Input placeholder="请输入" />)}
                  </FormItem>
                </Col>
                <Col span={8}>
                  <FormItem
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 18 }}
                    label="会议地点"
                  >
                    {getFieldDecorator('会议地点')(
                      <Select placeholder="请选择">
                        <Option value="11">1111</Option>
                        <Option value="12">1111</Option>
                        <Option value="21">1111</Option>
                      </Select>
                    )}
                  </FormItem>
                </Col>
                <Col span={8}>
                  <FormItem
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 18 }}
                    label="结束时间"
                  >
                    {getFieldDecorator('结束时间')(
                      <DatePicker
                        style={{ width: '100%' }}
                        showTime
                        format="YYYY-MM-DD HH:mm"
                        placeholder="结束时间"
                        onChange={null}
                        onOk={null}
                      />
                    )}
                  </FormItem>
                </Col>
              </Row>
              <Row gutter={18}>
                <Col span={8}>
                  <FormItem
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 18 }}
                    label="序号"
                  >
                    {getFieldDecorator('序号')(<Input placeholder="请输入" />)}
                  </FormItem>
                </Col>
                <Col span={8}>
                  <FormItem
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 18 }}
                    label="会议主题"
                  >
                    {getFieldDecorator('会议主题')(<Input placeholder="请输入" />)}
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span={24} style={{ textAlign: 'right' }}>
                  <Button type="primary" htmlType="submit">搜索</Button>
                  <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
                    重置
                  </Button>
                  <a style={{ marginLeft: 8 }} onClick={this.toggle}>
                    简易搜索 <Icon type="up" />
                  </a>
                </Col>
              </Row>
            </Form>
          </Card>
          <div style={{ marginBottom: '16px' }}><span>共搜索到{total}条数据</span></div>
          {hasSelected && <Alert type="info" message={selectedInfo} showIcon />}
          <Table
            bordered
            columns={columns}
            dataSource={dataSource}
            rowSelection={rowSelection}
            loading={loading}
            pagination={false}
            scroll={{ x: '180%' }}
            rowKey={record => record.id}
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
  const WrappedMeeting = Form.create({})(Meeting)
  return <WrappedMeeting />
}
function mapStateToProps (state) {
  const { list, page, total, filterStr, pageSize } = state.meeting
  return {
    loading: state.loading.models.meeting,
    list,
    page,
    total,
    filterStr,
    pageSize,
  }
}
export default connect(mapStateToProps)(Meeting)
