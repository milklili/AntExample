import React from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;
import { Link, Router, Route } from 'dva/router';
import styles from './MainLayout.css';

function MainLayout({ children, location, CustomerBreadcrumb }) {
    class LayoutComponent extends React.Component {
        state = {
            collapsed: false,
            mode: 'inline',
            openKeys:[]
        };

        onOpenChange = (openKeys) => {
            const state = this.state;
            const latestOpenKey = openKeys.find(key => !(state.openKeys.indexOf(key) > -1));
            const latestCloseKey = state.openKeys.find(key => !(openKeys.indexOf(key) > -1));

            let nextOpenKeys = [];
            if (latestOpenKey) {
                nextOpenKeys = this.getAncestorKeys(latestOpenKey).concat(latestOpenKey);
            }
            if (latestCloseKey) {
                nextOpenKeys = this.getAncestorKeys(latestCloseKey);
            }

            this.setState({ openKeys: nextOpenKeys });
        }

        getAncestorKeys = (key) => {
            const map = {
                sub3: ['sub2'],
            };
            return map[key] || [];
        }

        onCollapse = (collapsed) => {
            this.setState({
                collapsed,
                mode: collapsed ? 'vertical' : 'inline',
            });
        }

        render() {
            const {openKeys} = this.state;
            const testa = location;

            return (
                <Layout className={styles.fullHeight}>

                    <Header className="header">
                        <div className={styles.logo} />
                        <Menu
                            theme="dark"
                            mode="horizontal"
                            defaultSelectedKeys={['top_oaManage']}
                            style={{ lineHeight: '64px' }}
                        >
                            <Menu.Item key="top_oaManage">行政人事</Menu.Item>
                            <Menu.Item key="top_pms">一级导航</Menu.Item>
                        </Menu>
                    </Header>

                    <Content className={styles.fullHeight} style={{ padding: '0 50px' }}>
                        <CustomerBreadcrumb/>

                        <Layout style={{ padding: '24px 0', background: '#fff', minHeight:'80%' }}>
                            <Sider
                                width={200}
                                style={{ background: '#fff' }}
                                collapsible
                                collapsed={this.state.collapsed}
                                onCollapse={this.onCollapse}
                            >
                                <Menu
                                    mode={this.state.mode}
                                    defaultSelectedKeys={['/']}
                                    defaultOpenKeys={['/']}
                                    style={{ height: '100%' }}
                                    selectedKeys={[location.pathname]}
                                    onOpenChange={this.onOpenChange}
                                    openKeys={this.state.openKeys}
                                >
                                    <Menu.Item key="/">
                                        <Link to="/"><Icon type="home" />首页</Link>
                                    </Menu.Item>                                                                  
                                    <SubMenu key="officeManage" title={<span><Icon type="notification" />办公管理</span>}>
                                        <Menu.Item key="/officeManageList">
                                            <Link to="/officeManageList"><Icon type="bars" />文档类别管理</Link>
                                        </Menu.Item>
                                        <Menu.Item key="/meetingCategoryList">
                                            <Link to="/meetingCategoryList"><Icon type="bars" />会议类别管理</Link>
                                        </Menu.Item>
                                            <Menu.Item key="/planTypeList">
                                            <Link to="/planTypeList"><Icon type="bars" />计划类别管理</Link>
                                            </Menu.Item>
                                        <Menu.Item key="/documentList">
                                            <Link to="/documentList"><Icon type="bars" />文档资料管理</Link>
                                        </Menu.Item>
                                        <Menu.Item key="/meeting">
                                            <Link to="/meeting"><Icon type="bars" />会议记录</Link>
                                        </Menu.Item>
                                        <Menu.Item key="/workingPlanList">
                                            <Link to="/workingPlanList"><Icon type="bars" />工作计划</Link>
                                        </Menu.Item>
                                       
                                    </SubMenu>
                                    <SubMenu key="personnelManage" title={<span><Icon type="laptop" />人事管理</span>}>
                                        <Menu.Item key="/workAttendanceList">
                                            <Link to="/workAttendanceList"><Icon type="bars" />考勤管理</Link>
                                        </Menu.Item>
                                       
                                    </SubMenu>
                                    <SubMenu key="contractManage" title={<span><Icon type="laptop" />合同管理</span>}>
                                        <Menu.Item key="/contractList">
                                            <Link to="/contractList"><Icon type="bars" />合同管理</Link>
                                        </Menu.Item>                                      
                                    </SubMenu>

                                    <SubMenu key="SecurityProtectionManage" title={<span><Icon type="laptop" />保安消防</span>}>
                                        <Menu.Item key="/securityEquipMentList">
                                            <Link to="/securityEquipMentList"><Icon type="bars" />安防区域及器材管理</Link>
                                        </Menu.Item>
                                        <Menu.Item key="/securityEventsList">
                                            <Link to="/securityEventsList"><Icon type="bars" />安防事件记录</Link>
                                        </Menu.Item>
                                        <Menu.Item key="/visitorRegistrationList">
                                            <Link to="/visitorRegistrationList"><Icon type="bars" />来人来访</Link>
                                        </Menu.Item>
                                        <Menu.Item key="/articleRegistrationList">
                                            <Link to="/articleRegistrationList"><Icon type="bars" />物品出入登记</Link>
                                        </Menu.Item>
                                        <Menu.Item key="/securityPositionList">
                                            <Link to="/securityPositionList"><Icon type="bars" />保安岗管理</Link>
                                        </Menu.Item>
                                        <Menu.Item key="/securityDutyPlanList">
                                            <Link to="/securityDutyPlanList"><Icon type="bars" />值班方案</Link>
                                        </Menu.Item>
                                        <Menu.Item key="/securityScheduleList">
                                            <Link to="/securityScheduleList"><Icon type="bars" />保安排班表</Link>
                                        </Menu.Item>
                                        
                                    </SubMenu>
                                    <SubMenu key="cleanManage" title={<span><Icon type="notification" />保洁管理</span>}>
                                        <Menu.Item key="/cleaningAreaList">
                                            <Link to="/cleaningAreaList"><Icon type="bars" />保洁区域</Link>
                                        </Menu.Item>
                                        <Menu.Item key="/cleaningRecordList">
                                            <Link to="/cleaningRecordList"><Icon type="bars" />保洁记录</Link>
                                        </Menu.Item>
                                        <Menu.Item key="/cleaningInspectList">
                                            <Link to="/cleaningInspectList"><Icon type="bars" />保洁检查</Link>
                                        </Menu.Item>
                                        <Menu.Item key="/cleaningToolList">
                                            <Link to="/cleaningToolList"><Icon type="bars" />保洁工具管理</Link>
                                        </Menu.Item>

                                    </SubMenu>

                                    <SubMenu key="approvalManage" title={<span><Icon type="notification" />审批管理</span>}>
                                        <Menu.Item key="/createApproval">
                                            <Link to="/createApproval"><Icon type="bars" />新建审批</Link>
                                        </Menu.Item>
                                        <Menu.Item key="/initiatedList">
                                            <Link to="/initiatedList"><Icon type="bars" />我发起的</Link>
                                        </Menu.Item>
                                        <Menu.Item key="/pendingApprovalList">
                                            <Link to="/pendingApprovalList"><Icon type="bars" />待我审批的</Link>
                                        </Menu.Item>
                                        <Menu.Item key="/approvedList">
                                            <Link to="/approvedList"><Icon type="bars" />我已审批的</Link>
                                        </Menu.Item>
                                        <Menu.Item key="/sendApprovalList">
                                            <Link to="/sendApprovalList"><Icon type="bars" />抄送我的</Link>
                                        </Menu.Item>
                                    </SubMenu>
                                </Menu>
                            </Sider>

                            <Content style={{ padding: '0 24px'}}>
                                {children}
                            </Content>

                        </Layout>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        Ant Design ©2017-05-23 Created by Bob
                    </Footer>
                </Layout>
            );
        }
    }
    return (<LayoutComponent />);
}
export default MainLayout;
