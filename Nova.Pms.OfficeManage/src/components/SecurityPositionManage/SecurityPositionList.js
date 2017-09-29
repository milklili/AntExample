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

  // RangePicker,
} from 'antd'
import { routerRedux } from 'dva/router'
import styles from './SecurityPositionManage.css'
import { moment, dateFormat } from 'utils'
// import { PAGE_SIZE } from '../../constants'

const FormItem = Form.Item
const RangePicker = DatePicker.RangePicker
function SecurityPositionList ({
  dispatch,
  list: dataSource,
  loading,
  total,
  page: current,
  filterStr,
  pageSize,
  seniorSearchData,
  seniorSearch,
  staffList,
}) {
  class SecurityPosition extends React.Component {
    state = {
      selectedRowKeys: [], // Check here to configure the default column
      selectedRows: [],
    };
    openSeniorSearch = () => {
      dispatch({
        type: 'securityPositionList/seniorSearchToggle',
        payload: true,
      })
    };
    closeSeniorSearch = () => {
      dispatch({
        type: 'securityPositionList/seniorSearchToggle',
        payload: false,
      })
    };
    seniorSearchHandler = e => {
      e.preventDefault()
      this.props.form.validateFields((err, values) => {
        if (!err) {
          dispatch({
            type: 'securityPositionList/seniorSearch',
            payload: values,
          })
        }
      })
    };
    resetSeniorSearch = () => {
      dispatch({
        type: 'securityPositionList/resetSeniorSearch',
      })
    };

    addSecurityPosition = () => {
      const action = 'create'
      dispatch(
        routerRedux.push({
          pathname: '/showOrEditSecurityPosition',
          query: { action },
        })
      )
    };

    deleteSecurityPosition = id => {
      dispatch({
        type: 'securityPositionList/removeSecurityPosition',
        payload: { id },
      })
    };

    showSecurityPosition = id => {
      const action = 'preview'
      dispatch(
        routerRedux.push({
          pathname: '/showOrEditSecurityPosition',
          query: { id, action },
        })
      )
    };

    editSecurityPosition = id => {
      const action = 'update'
      dispatch(
        routerRedux.push({
          pathname: '/showOrEditSecurityPosition',
          query: { id, action },
        })
      )
    };

    pageChangeHandler = page => {
      dispatch(
        routerRedux.push({
          pathname: '/securityPositionList',
          query: { page, filterStr, pageSize },
        })
      )
    };
    searchHandler = filterStr => {
      dispatch(
        routerRedux.push({
          pathname: '/securityPositionList',
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
          pathname: '/securityPositionList',
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
          title: '管理区',
          dataIndex: 'regionName',
          key: 'regionName',
          width: 125,
        },
        {
          title: '岗位代码',
          dataIndex: 'positionCode',
          key: 'positionCode',
          width: 125,
        },
        {
          title: '岗位名称',
          dataIndex: 'positionName',
          key: 'positionName',
          width: 155,
        },
        {
          title: '地址',
          dataIndex: 'positionPlace',
          key: 'positionPlace',
          width: 210,
        },
        {
          title: '开始值班时间',
          dataIndex: 'startDate',
          key: 'startDate',
          width: 150,
          render: (text, record) =>
            (record.startDate && dateFormat(record.startDate, 'YYYY-MM-DD HH:mm')),
        },
        {
          title: '岗位人数',
          dataIndex: 'quantity',
          key: 'quantity',
          width: 80,
        },
        {
          title: '每月工作总天数',
          dataIndex: 'workingDays',
          key: 'workingDays',
          width: 110,
          render: (text, record) =>
            (~~record.workingDays !== 0 ? record.workingDays : ''),
        },
        {
          title: '每月休息天数',
          dataIndex: 'restDays',
          key: 'restDays',
          width: 100,
          render: (text, record) =>
            (~~record.restDays !== 0 ? record.restDays : ''),
        },

        {
          title: '操作',
          fixed: 'right',
          width: 110,
          render: (text, record) => {
            return total
              ? <span>
                <a onClick={this.showSecurityPosition.bind(null, record.id)}>
                    查看
                </a>
                  &nbsp;
                <a
                  onClick={this.editSecurityPosition.bind(
                    null,
                    record.id,
                    record.regionId
                  )}
                >
                    编辑
                </a>
                  &nbsp;
                <Popconfirm
                  title="确定要删除该保安岗记录吗?"
                  onConfirm={this.deleteSecurityPosition.bind(
                    null,
                    record.id
                  )}
                >
                  <a>删除</a>
                </Popconfirm>
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
      const selectInfo = `已选择${selectLength}项数据`

      const isShowAdvancedSearch = this.state.isShowAdvancedSearch

      const hasSelected = selectLength > 0
      const searchInfo = {}

      let { sortedInfo, filteredInfo } = this.state
      sortedInfo = sortedInfo || {}
      filteredInfo = filteredInfo || {}
      const record = selectedRows

      return (
        <div className={styles.normal}>
          <div className={styles.ListButton}>
            <Row>
              <Col span={16}>
                <Button
                  type="primary"
                  onClick={this.addSecurityPosition.bind(null, null)}
                >
                  新建
                </Button>
                <Button disabled>导出</Button>
              </Col>
              <Col span={8} style={{ textAlign: 'right' }}>
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

          {seniorSearch &&
            <Card style={{ marginBottom: 10 }}>
              <Form onSubmit={this.seniorSearchHandler}>
                <Row gutter={8}>
                  <Col span={8}>
                    <FormItem {...formItemLayout} label="管理区">
                      {getFieldDecorator('regionId', {})(<Input />)}
                    </FormItem>
                  </Col>
                  <Col span={8}>
                    <FormItem {...formItemLayout} label="岗位名称">
                      {getFieldDecorator(
                        'positionName',
                        {
                          // initialValue: seniorSearchData.documentCategoryId
                        }
                      )(<Input />)}
                    </FormItem>
                  </Col>
                  <Col span={8}>
                    <FormItem {...formItemLayout} label="岗位代码">
                      {getFieldDecorator(
                        'positionCode',
                        {
                          // initialValue: seniorSearchData.attendanceInterval
                        }
                      )(<Input />)}

                    </FormItem>
                  </Col>
                </Row>
                <Row gutter={8}>
                  <Col span={16}>
                    <FormItem {...formItemLongLayout} label="地址">
                      {getFieldDecorator('regionId', {})(<Input />)}
                    </FormItem>
                  </Col>
                  <Col span={8}>
                    <FormItem {...formItemLayout} label="开始值班时间">
                      {getFieldDecorator(
                        'positionName',
                        {
                          // initialValue: seniorSearchData.documentCategoryId
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
          <div className={styles.info}><span>共搜索到{total}条数据。</span></div>

          <div className={styles.ListButton}>
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
            rowKey={record => record.id}
            // scroll={{ x: "110%" }}
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

  const SecurityPositionForm = Form.create()(SecurityPosition)
  return <SecurityPositionForm />
}

function mapStateToProps (state) {
  const {
    list,
    total,
    page,
    filterStr,
    pageSize,
    staffList,
    seniorSearchData,
    seniorSearch,
  } = state.securityPositionList

  return {
    loading: state.loading.models.securityPositionList,
    list,
    total,
    page,
    filterStr,
    pageSize,
    staffList,
    seniorSearchData,
    seniorSearch,
  }
}

export default connect(mapStateToProps)(SecurityPositionList)
