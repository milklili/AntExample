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
  TimePicker,
  Icon,
  Modal,
  Radio,
  Validation,

  // RangePicker,
} from 'antd'
import { routerRedux, Link } from 'dva/router'
import styles from './SecurityScheduleManage.css'
import moment from 'moment'
import 'moment/locale/zh-cn'

moment.locale('zh-cn')
import { PAGE_SIZE } from '../../constants'

const FormItem = Form.Item
const RangePicker = DatePicker.RangePicker
const RadioGroup = Radio.Group
const Option = Select.Option

function SecurityScheduleList ({
  dispatch,
  list: dataSource,
  loading,
  total,
  page: current,
  filterStr,
  pageSize,
  seniorSearchData,
  seniorSearch,
  regionList,
  securitySchedule,
}) {
  class SecuritySchedule extends React.Component {
    state = {
      selectedRowKeys: [], // Check here to configure the default column
      selectedRows: [],
    };
    openSeniorSearch = () => {
      dispatch({
        type: 'securityScheduleList/seniorSearchToggle',
        payload: true,
      })
    };
    closeSeniorSearch = () => {
      dispatch({
        type: 'securityScheduleList/seniorSearchToggle',
        payload: false,
      })
    };
    seniorSearchHandler = e => {
      e.preventDefault()
      this.props.form.validateFields((err, values) => {
        if (!err) {
          dispatch({
            type: 'securityScheduleList/seniorSearch',
            payload: values,
          })
        }
      })
    };
    resetSeniorSearch = () => {
      dispatch({
        type: 'securityScheduleList/resetSeniorSearch',
      })
    };
    pageChangeHandler = page => {
      dispatch(
        routerRedux.push({
          pathname: '/securityScheduleList',
          query: { page, filterStr, pageSize },
        })
      )
    };
    searchHandler = filterStr => {
      dispatch(
        routerRedux.push({
          pathname: '/securityScheduleList',
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
          pathname: '/securityScheduleList',
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
          width: 120,
        },
        {
          title: '保安岗',
          dataIndex: 'positionName',
          key: 'positionName',
          width: 120,
        },
        {
          title: '保安姓名',
          dataIndex: 'staffName',
          key: 'staffName',
          width: 200,
        },
        {
          title: '工号',
          dataIndex: 'staffId',
          key: 'staffId',
          width: 80,
        },
        {
          title: '值班日期',
          dataIndex: 'positionStartDate',
          key: 'positionStartDate',
          width: 180,
        },
        {
          title: '值班开始时间',
          dataIndex: 'startDate',
          key: 'startDate',
          width: 100,
          render: (text, record) =>
            (record.startDate != null
              ? new Date(record.startDate).toLocaleTimeString()
              : null),
        },
        {
          title: '值班结束时间',
          dataIndex: 'endDate',
          key: 'endDate',
          width: 100,
          render: (text, record) =>
            (record.endDate != null
              ? new Date(record.endDate).toLocaleTimeString()
              : null),
        },
        {
          title: '当月已工作天数',
          dataIndex: 'workedDays',
          key: 'workedDays',
          width: 100,
        },
        {
          title: '当月已休息天数',
          dataIndex: 'restedDays',
          key: 'restedDays',
          width: 100,
        },
        {
          title: '值班方案',
          dataIndex: 'securityDutyPlanName',
          key: 'securityDutyPlanName',
          width: 100,
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
      const record = selectedRows

      return (
        <div className={styles.normal}>
          <div className={styles.ListButton}>
            <Row>
              <Col span={16}>
                <Button type="primary" disabled={!total}>导出</Button>
                <Button type="primary" disabled={!total}>打印排班表</Button>
              </Col>
              <Col span={8} style={{ textAlign: 'right' }}>
                <Search
                  placeholder="搜索..."
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

                    <FormItem {...formItemLayout} label="工号">
                      {getFieldDecorator('staffId', {})(<Input />)}
                    </FormItem>
                  </Col>
                  <Col span={8}>
                    <FormItem {...formItemLayout} label="保安姓名">
                      {getFieldDecorator('staffName', {})(<Input />)}
                    </FormItem>
                  </Col>
                  <Col span={8}>
                    <FormItem {...formItemLayout} label="保安岗名称">
                      {getFieldDecorator(
                        'positionName ',
                        {
                          // initialValue: seniorSearchData.handlePersonId
                        }
                      )(<Input />)}

                    </FormItem>
                  </Col>
                </Row>
                <Row gutter={8}>
                  <Col span={8}>
                    <FormItem {...formItemLayout} label="管理区">
                      {getFieldDecorator(
                        'positionPlace',
                        {
                          // initialValue: seniorSearchData.respondents
                        }
                      )(<Input />)}
                    </FormItem>
                  </Col>

                  <Col span={8}>
                    <FormItem {...formItemLayout} label="值班日期">
                      {getFieldDecorator(
                        'visitReason',
                        {
                          // initialValue: seniorSearchData.visitReason
                        }
                      )(<RangePicker />)}

                    </FormItem>
                  </Col>
                  <Col span={8}>
                    <FormItem {...formItemLayout} label="值班起止时间">
                      {getFieldDecorator(
                        'visitReason',
                        {
                          // initialValue: seniorSearchData.visitReason
                        }
                      )(<RangePicker format="LT" showTime />)}

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
            scroll={{ x: '120%' }}
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

  const SecurityScheduleForm = Form.create()(SecuritySchedule)
  return <SecurityScheduleForm />
}

function mapStateToProps (state) {
  const {
    list,
    total,
    page,
    filterStr,
    pageSize,
    regionList,
    securitySchedule,
    seniorSearchData,
    seniorSearch,
  } = state.securityScheduleList
  return {
    loading: state.loading.models.securityScheduleList,
    list,
    total,
    page,
    filterStr,
    pageSize,
    regionList,
    securitySchedule,
    seniorSearchData,
    seniorSearch,
  }
}

export default connect(mapStateToProps)(SecurityScheduleList)
