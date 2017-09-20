import React from 'react'
import { connect } from 'dva'
import { Table, Pagination, Popconfirm, Button, Input } from 'antd'
import { routerRedux, Link } from 'dva/router'
import styles from './contractList.css'
import { PAGE_SIZE } from '../../constants'

function ContractList ({
  dispatch,
  list: dataSource,
  loading,
  total,
  page: current,
  filterStr,
}) {
  function deleteHandler (id) {
    dispatch({
      type: 'contractList/remove',
      payload: { id },
    })
  }

  function pageChangeHandler (page) {
    dispatch(
      routerRedux.push({
        pathname: '/contractList',
        query: { page, filterStr },
      })
    )
  }

  function searchHandler (filterStr) {
    dispatch(
      routerRedux.push({
        pathname: '/contractList',
        query: { page: current, filterStr },
      })
    )
  }

  function editContract (id) {
    dispatch(
      routerRedux.push({
        pathname: '/editContract',
        query: { id },
      })
    )
  }

  const Search = Input.Search

  const columns = [
    {
      title: '操作',
      key: 'operation',
      render: (text, record) => (
        <span className={styles.operation}>
          <a onClick={editContract.bind(null, record.id)}>编辑</a>
          <Popconfirm
            title="确定要删除该合同吗?"
            onConfirm={deleteHandler.bind(null, record.id)}
          >
            <a href="">删除</a>
          </Popconfirm>
        </span>
      ),
    },
    {
      title: '客户名称',
      dataIndex: 'customerName',
      key: 'customerName',
    },
    {
      title: '合同开始日期',
      dataIndex: 'contractBeginTime',
      key: 'contractBeginTime',
    },
    {
      title: '合同结束日期',
      dataIndex: 'contractEndTime',
      key: 'contractEndTime',
    },
    {
      title: '域名',
      dataIndex: 'website',
      key: 'website',
    },
    {
      title: '数据库名',
      dataIndex: 'database',
      key: 'database',
    },
    {
      title: '产品状态',
      dataIndex: 'strProductState',
      key: 'strProductState',
    },
  ]

  return (
    <div className={styles.normal}>
      <div>
        <div className={styles.create}>
          <Link to="/createContract"><Button type="primary">新建</Button></Link>
          <Search
            placeholder="Search"
            style={{ width: 200, float: 'right' }}
            size="large"
            //   value={filterStr}
            onSearch={filterStr => searchHandler(filterStr)}
          />
        </div>
        <Table
          bordered
          columns={columns}
          dataSource={dataSource}
          loading={loading}
          rowKey={record => record.id}
          pagination={false}
        />
        <Pagination
          className="ant-table-pagination"
          total={total}
          current={current}
          pageSize={PAGE_SIZE}
          onChange={pageChangeHandler}
          showTotal={_total => `总计${_total ? _total :  0}条`}
        />
      </div>
    </div>
  )
}

function mapStateToProps (state) {
  const { list, total, page, filterStr } = state.contractList
  return {
    loading: state.loading.models.contractList,
    list,
    total,
    page,
    filterStr,
  }
}

export default connect(mapStateToProps)(ContractList)
