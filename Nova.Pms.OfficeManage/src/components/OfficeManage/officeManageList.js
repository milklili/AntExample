import React from 'react';
import { connect } from 'dva';
import { Table, Pagination, Popconfirm, Button, Input, Alert  } from 'antd';
import { routerRedux, Link } from 'dva/router';
import styles from './OfficeManage.css';
import { PAGE_SIZE } from '../../constants';

function OfficeManageList({ dispatch, list: dataSource, loading, total, page: current, filterStr, pageSize}) {

    const columns = [
        {
            title: "文档类别名称",
            dataIndex: 'name',
            key: "name",
            width: 300
        },
        {
            title: "备注",
            dataIndex: "remark",
            key: "remark"
        }
    ];

    class DocumentCategoryList extends React.Component {
        state = {
            selectedRowKeys: [],  // Check here to configure the default column
        };

        deleteHandler = (ids) => {
            dispatch({
                type: 'officeManageList/remove',
                payload: { ids}
            });
        }

        editCategory = (id) => {
            dispatch(routerRedux.push({
                pathname: '/editDocumentCategory',
                query: { id },
            }));
        }

        pageChangeHandler = (page) => {
            dispatch(routerRedux.push({
                pathname: '/officeManageList',
                query: { page, filterStr, pageSize },
            }));
        }

        searchHandler = (filterStr) => {
            dispatch(routerRedux.push({
                pathname: '/officeManageList',
                query: { page: 1, filterStr, pageSize },
            }));
        }

        onSelectChange = (selectedRowKeys) => {
            this.setState({ selectedRowKeys });
        }
        onShowSizeChange = (current, pageSize) => {
            debugger;
            dispatch(
                routerRedux.push({
                    pathname: "/officeManageList",
                    query: { page: current, filterStr, pageSize }
                })
            );
        };
        render() {
            const { selectedRowKeys } = this.state;
            const rowSelection = {
                selectedRowKeys,
                onChange: this.onSelectChange,
            };
            const selectLength = selectedRowKeys.length;
            const hasSelected = selectLength > 0;
            const isEditCategory = selectLength == 1;
            const selectInfo = "已选择" + selectLength + "项数据";

            const Search = Input.Search;

            return (
                <div className={styles.normal}>
                    <div>
                        <div className={styles.ListButton}>
                            <Link to="/createDocumentCategory"><Button type="primary">新建</Button></Link>
                            <Button type="primary" onClick={this.editCategory.bind(this, selectedRowKeys[0])} disabled={!isEditCategory}>编辑</Button>
                            <Popconfirm title="确定要删除该文档类别吗?" onConfirm={this.deleteHandler.bind(this, selectedRowKeys)}>
                                <Button type="primary" disabled={!hasSelected}>删除</Button>
                            </Popconfirm>
                            <Search
                                defaultValue={filterStr}
                                placeholder="Search"
                                style={{ width: 200, float: 'right' }}
                                size='large'
                                onSearch={filterStr => this.searchHandler(filterStr)}
                            />
                        </div>
                        {
                            hasSelected
                            &&
                            (
                                <Alert
                                    message={selectInfo}
                                    type="info"
                                    showIcon
                                />
                            )
                        }
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
                            showTotal={total => `总计${total}条`}
                            onShowSizeChange={this.onShowSizeChange}
                            showSizeChanger
                            showQuickJumper
                        />
                    </div>
                </div>
            );
        }
    }

    return (<DocumentCategoryList />);    
}

function mapStateToProps(state) {
    const { list, total, page, filterStr, pageSize } = state.officeManageList;
    return {
        loading: state.loading.models.officeManageList,
        list,
        total,
        page,
        filterStr,
        pageSize
    };
}

export default connect(mapStateToProps)(OfficeManageList);
