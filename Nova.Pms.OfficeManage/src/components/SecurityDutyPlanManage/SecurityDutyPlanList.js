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
import styles from './SecurityDutyPlanManage.css'
import { moment, dateFormat } from 'utils'
import { PAGE_SIZE } from '../../constants'

const FormItem = Form.Item
const RangePicker = DatePicker.RangePicker
const Option = Select.Option

const DutyPlanForm = Form.create()(props => {
  const {
    visible,
    onCancel,
    onClose,
    form,
    regionList,
    // securityDutyPlan,
    modalType,
    // handleDaysValidate,
  } = props
  const { getFieldDecorator, getFieldValue, validateFields } = form
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  }
  // const formItemRow = {
  //   labelCol: { span: 3 },
  //   wrapperCol: { span: 21 },
  // }

  // const assocationValid = assocation => {
  //   validateFields([assocation], (err, value) => {
  //     console.log(err, value)
  //   })
  // }
  // 验证这块还有些问题
  const validator = (rule, value, callback) => {
    const assocation = ['workingDays', 'restDays'].filter(v => v !== rule.field)
    const d1 = parseFloat(value)
    const d2 = parseFloat(getFieldValue(assocation[0]))
    console.log(d2)
    if (value != null && value !== '') {
      !/^[0-9]+.?[0-9]*$/.test(value)
        ? callback('天数格式错误')
        : d1 > 31
          ? callback('天数不能大于31')
          : d1 < 0 ? callback('天数不能小于0') : undefined
    }
    if ((d1 + d2) > 31) {
      callback('工作天数和休息天数之和不能大于31')
    }
    callback()
  }
  const editAble = modalType !== 2
  const regionOptions = regionList.map(value => (
    <Option key={value.id} value={value.id}>{value.name}</Option>
  ))

  const onOK = () => {
    form.validateFields((err, values) => {
      if (err) {
        return
      }
      onClose(values)
      form.resetFields()
    })
  }

  return (
    <Modal
      visible={visible}
      title="值班方案"
      okText="确定"
      onCancel={onCancel}
      onOk={onOK}
    >
      <Form>
        <Row gutter={8}>
          <Col span={24}>
            <FormItem {...formItemLayout} label="管理区">
              {getFieldDecorator('regionId', {
                // initialValue: staffName
                rules: [{ required: editAble, message: '请选择管理区' }],
              })(
                <Select
                  mode="combox"
                  placeholder="请选择"
                  style={{ width: '100%' }}
                  disabled={!editAble}
                >
                  {regionOptions}
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={24}>
            <FormItem {...formItemLayout} label="方案编号">
              {getFieldDecorator('number', {
                rules: [
                  { type: 'string', max: 16, message: '请正确输入方案编号，最大长度为16' },
                ],
              })(<Input disabled={!editAble} />)}
            </FormItem>
          </Col>
        </Row>

        <Row gutter={8}>
          <Col span={24}>
            <FormItem {...formItemLayout} label="方案名称">
              {getFieldDecorator('name', {
                rules: [
                  {
                    type: 'string',
                    required: editAble,
                    max: 30,
                    message: '请正确输入方案名称，最大长度为30',
                  },
                ],
              })(<Input disabled={!editAble} />)}
            </FormItem>

          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={24}>
            <FormItem {...formItemLayout}
              label="每月工作总天数"
            >
              {getFieldDecorator('workingDays', {
                rules: [
                  {
                    validator,
                  },
                ],
              })(<Input disabled={!editAble} />)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={24}>
            <FormItem {...formItemLayout} label="每月休息天数">
              {getFieldDecorator('restDays', {
                rules: [
                  {
                    validator,
                  },
                ],
              })(<Input disabled={!editAble} />)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={24}>
            <FormItem {...formItemLayout} label="值班开始时间">
              {getFieldDecorator('startDate', {
                rules: [{ required: editAble, message: '请选择值班开始时间' }],
                getValueProps: value => {
                  // if (!(value)) {
                  //    securityDutyPlan.startDate = moment(new Date(), 'YYYY-MM-DD HH:mm:ss');
                  // }
                  return { value: value ? moment(value) : value }
                },
              })(
                <TimePicker
                  style={{ width: '100%' }}
                  format="HH:mm"
                  disabled={!editAble}
                />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={24}>
            <FormItem {...formItemLayout} label="值班结束时间">
              {getFieldDecorator('endDate', {
                rules: [{ required: editAble, message: '请选择值班结束时间' }],
                getValueProps: value => {
                  return { value: value ? moment(value) : value }
                },
              })(
                <TimePicker
                  style={{ width: '100%' }}
                  format="HH:mm"
                  // showTime
                  disabled={!editAble}
                />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={24}>
            <FormItem {...formItemLayout} label="备注">
              {getFieldDecorator('remark', {
                rules: [{ type: 'string', max: 30, message: '已超过30个字' }],
              })(<Input disabled={!editAble} />)}
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
})

const DutyPlanModal = Form.create({
  mapPropsToFields (props) {
    const fields = {}
    Object.keys(props.securityDutyPlan).forEach(key => {
      fields[key] = {
        value: props.securityDutyPlan[key],
      }
    })
    return {
      ...fields,
    }
  },
})(DutyPlanForm)

function SecurityDutyPlanList ({
  dispatch,
  list: dataSource,
  loading,
  total,
  page: current,
  filterStr,
  pageSize,
  // seniorSearchData,
  seniorSearch,
  regionList,
  securityDutyPlan,
  modalVisible,
  modalType,
}) {
  const modalProps = {
    visible: modalVisible,
    modalType,
    regionList,
    securityDutyPlan,
    onCancel () {
      dispatch({
        type: 'securityDutyPlanList/updateState',
        payload: { modalVisible: false, modalType: 0, securityDutyPlan: {} },
      })
    },
    onClose (values = {}) {
      dispatch({
        type: 'securityDutyPlanList/save',
        payload: { securityDutyPlan: {
          ...securityDutyPlan,
          ...values,
        } },
      })
      // dispatch({
      //   type: 'securityDutyPlanList/updateState',
      //   payload: { modalVisible: false, modalType: 0, securityDutyPlan: values },
      // })
    },
    // handleDaysValidate (value, assocation, callback) {
    // },
  }
  class SecurityDutyPlan extends React.Component {
    state = {
      selectedRowKeys: [], // Check here to configure the default column
      selectedRows: [],
    }
    openSeniorSearch = () => {
      dispatch({
        type: 'securityDutyPlanList/seniorSearchToggle',
        payload: true,
      })
    }
    closeSeniorSearch = () => {
      dispatch({
        type: 'securityDutyPlanList/seniorSearchToggle',
        payload: false,
      })
    }
    seniorSearchHandler = e => {
      e.preventDefault()
      this.props.form.validateFields((err, values) => {
        if (!err) {
          dispatch({
            type: 'securityDutyPlanList/seniorSearch',
            payload: values,
          })
        }
      })
    }
    resetSeniorSearch = () => {
      dispatch({
        type: 'securityDutyPlanList/resetSeniorSearch',
      })
    }

    deleteSecurityDutyPlan = ids => {
      dispatch({
        type: 'securityDutyPlanList/remove',
        payload: { ids },
      })
    }
    pageChangeHandler = page => {
      dispatch(
        routerRedux.push({
          pathname: '/securityDutyPlanList',
          query: { page, filterStr, pageSize },
        })
      )
    }
    searchHandler = filterStr => {
      dispatch(
        routerRedux.push({
          pathname: '/securityDutyPlanList',
          query: { page: 1, filterStr, pageSize },
        })
      )
    }
    onSelectChange = (selectedRowKeys, selectedRows) => {
      this.setState({ selectedRowKeys })
      this.setState({ selectedRows })
    }
    onShowSizeChange = (current, pageSize) => {
      dispatch(
        routerRedux.push({
          pathname: '/securityDutyPlanList',
          query: { page: current, filterStr, pageSize },
        })
      )
    }

    showModal = (type, record = {}) => {
      dispatch({
        type: 'securityDutyPlanList/updateState',
        payload: { modalVisible: true, modalType: type, securityDutyPlan: record },
      })
    }
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
          title: '方案编号',
          dataIndex: 'number',
          key: 'number',
          width: 120,
        },
        {
          title: '方案名称',
          dataIndex: 'name',
          key: 'name',
          width: 120,
        },
        {
          title: '值班开始时间',
          dataIndex: 'startDate',
          key: 'startDate',
          width: 120,
          render: (text, record) =>
            record.startDate && dateFormat(record.startDate, 'HH:mm'),
        },
        {
          title: '值班结束时间',
          dataIndex: 'endDate',
          key: 'endDate',
          width: 120,
          render: (text, record) =>
            record.endDate && dateFormat(record.endDate, 'HH:mm'),
        },
        {
          title: '每月工作总天数',
          dataIndex: 'workingDays',
          key: 'workingDays',
          width: 120,
        },
        {
          title: '每月休息天数',
          dataIndex: 'restDays',
          key: 'restDays',
          width: 120,
        },
        {
          title: '备注',
          dataIndex: 'remark',
          key: 'remark',
          width: 200,
        },
        {
          title: '操作',
          fixed: 'right',
          width: 110,
          render: (text, record) => {
            return total
              ? <span>
                <a onClick={this.showModal.bind(this, 2, record)}>查看</a>
                  &nbsp;
                <a onClick={this.showModal.bind(this, 1, record)}>编辑</a>
                  &nbsp;
                <Popconfirm
                  title="确定要删除该值班方案吗?"
                  onConfirm={this.deleteSecurityDutyPlan.bind(null, [
                    record.id,
                  ])}
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
                <Button type="primary" onClick={this.showModal.bind(this, 0)}>新建</Button>
                <Button disabled={!total}>导出</Button>
              </Col>
              <Col span={8} style={{ textAlign: 'right' }}>
                <Search
                  placeholder="搜索..."
                  style={{ width: 200 }}
                  size="large"
                  onSearch={fStr => this.searchHandler(fStr)}
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
                    <FormItem {...formItemLayout} label="方案名称">
                      {getFieldDecorator('name', {})(<Input />)}
                    </FormItem>
                  </Col>
                  <Col span={8}>
                    <FormItem {...formItemLayout} label="方案编号">
                      {getFieldDecorator(
                        'number',
                        {
                          // initialValue: seniorSearchData.handlePersonId
                        }
                      )(<Input />)}

                    </FormItem>
                  </Col>
                </Row>
                <Row gutter={8}>
                  <Col span={16}>
                    <FormItem {...formItemLongLayout} label="地址">
                      {getFieldDecorator(
                        'positionPlace',
                        {
                          // initialValue: seniorSearchData.respondents
                        }
                      )(<Input />)}
                    </FormItem>
                  </Col>

                  <Col span={8}>
                    <FormItem {...formItemLayout} label="开始值班时间">
                      {getFieldDecorator(
                        'visitReason',
                        {
                          // initialValue: seniorSearchData.visitReason
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
            // scroll={{ x: 1800 }}
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
          <DutyPlanModal {...modalProps} />
        </div>
      )
    }
  }

  const SecurityDutyPlanForm = Form.create()(SecurityDutyPlan)
  return <SecurityDutyPlanForm />
}

function mapStateToProps (state) {
  const {
    list,
    total,
    page,
    pageSize,
    filterStr,
    regionList,
    securityDutyPlan,
    seniorSearchData,
    seniorSearch,
    modalVisible,
    modalType,
  } = state.securityDutyPlanList
  return {
    loading: state.loading.models.securityDutyPlanList,
    list,
    total,
    page,
    pageSize,
    filterStr,
    regionList,
    securityDutyPlan,
    seniorSearchData,
    seniorSearch,
    modalVisible,
    modalType,
  }
}

export default connect(mapStateToProps)(SecurityDutyPlanList)
