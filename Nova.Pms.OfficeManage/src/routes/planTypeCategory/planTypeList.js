import React from 'react'
import { connect } from 'dva'
import { Table, Pagination, Popconfirm, Button, Input, Alert } from 'antd'
import { routerRedux, Link } from 'dva/router'
import styles from './planType.css'
// import { PAGE_SIZE } from '../../constants'

function PlanTypeList ({
  dispatch,
  list: dataSource,
  loading,
  total,
  page: current,
  filterStr,
  pageSize,
}) {
  const columns = [
    {
      title: '计划类别名称',
      dataIndex: 'name',
      key: 'name',
      width: 300,
    },
    {
      title: '备注',
      dataIndex: 'remark',
      key: 'remark',
    },
  ]

  class DocumentCategoryList extends React.Component {
    state = {
      selectedRowKeys: [], // Check here to configure the default column
    };

    deleteHandler = ids => {
      dispatch({
        type: 'planTypeList/remove',
        payload: { ids },
      })
    };

    editCategory = id => {
      dispatch(
        routerRedux.push({
          pathname: '/editPlanType',
          query: { id },
        })
      )
    };

    pageChangeHandler = page => {
      dispatch(
        routerRedux.push({
          pathname: '/planTypeList',
          query: { page, filterStr, pageSize },
        })
      )
    };

    searchHandler = filterStr => {
      dispatch(
        routerRedux.push({
          pathname: '/planTypeList',
          query: { page: 1, filterStr, pageSize },
        })
      )
    };

    onSelectChange = selectedRowKeys => {
      this.setState({ selectedRowKeys })
      dispatch({
        type: 'planTypeList/select',
        payload: selectedRowKeys,
      })
    };
    onShowSizeChange = (current, pageSize) => {
      dispatch(
        routerRedux.push({
          pathname: '/planTypeList',
          query: { page: current, filterStr, pageSize },
        })
      )
    };
    render () {
      const { selectedRowKeys } = this.state
      const rowSelection = {
        selectedRowKeys,
        onChange: this.onSelectChange,
      }
      const selectLength = selectedRowKeys.length
      const hasSelected = selectLength > 0
      const isEditCategory = selectLength === 1
      const selectInfo = `已选择${selectLength}项数据`

      const Search = Input.Search

      return (
        <div className={styles.normal}>
          <div>
            <div className={styles.ListButton}>
              <Link to="/createPlanType">
                <Button type="primary">新建</Button>
              </Link>
              <Button
                type="primary"
                onClick={this.editCategory.bind(this, selectedRowKeys[0])}
                disabled={!isEditCategory}
              >
                编辑
              </Button>
              <Popconfirm
                title="确定要删除该计划类别吗?"
                onConfirm={this.deleteHandler.bind(this, selectedRowKeys)}
              >
                <Button type="primary" disabled={!hasSelected}>删除</Button>
              </Popconfirm>
              <Search
                defaultValue={filterStr}
                placeholder="Search"
                style={{ width: 200, float: 'right' }}
                size="large"
                onSearch={filterStr => this.searchHandler(filterStr)}
              />
            </div>
            <div style={{ marginBottom: '16px' }}><span>共搜索到{total}条数据</span></div>
            {hasSelected && <Alert message={selectInfo} type="info" showIcon />}
            <Table
              bordered
              rowSelection={rowSelection}
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
              pageSize={pageSize}
              onChange={this.pageChangeHandler}
              showTotal={_total => `总计${_total ? _total :  0}条`}
              onShowSizeChange={this.onShowSizeChange}
              showSizeChanger
              showQuickJumper
            />

          </div>
        </div>
      )
    }
  }

  return <DocumentCategoryList />
}

function mapStateToProps (state) {
  const { list, total, page, filterStr, pageSize } = state.planTypeList
  return {
    loading: state.loading.models.planTypeList,
    list,
    total,
    page,
    filterStr,
    pageSize,
  }
}

export default connect(mapStateToProps)(PlanTypeList)
