import React from 'react';
import ReactDOM from 'react-dom';
import { BannerLayout as Layout } from '@/components/Layout';
import { Menu, ConfigProvider } from 'antd';
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { lazyload } from '@/util/lazyload';
import zhCN from 'antd/es/locale/zh_CN';
import './index.less';

const DepartmentPage = lazyload(() => import('./DepartmentPage'));
const CalendarPage = lazyload(() => import('./CalendarPage'));

function SystemAdminSideNav() {
    return (
        <Menu
            defaultSelectedKeys={[location.hash.slice(1) || '/dashboard']}
            onSelect={({ key }) => {
                location.hash = key;
            }}
        >
            <Menu.Item key="/dashboard">系统运行情况</Menu.Item>
            <Menu.Item key="/register">注册</Menu.Item>
            <Menu.Item key="/department">部门管理</Menu.Item>
            <Menu.Item key="/calendar">校历</Menu.Item>
        </Menu>
    );
}

function SystemAdminPage() {
    return (
        <Router>
            <Switch>
                <Route path="/dashboard" component={React.Fragment} />
                <Route path="/register" component={React.Fragment} />
                <Route path="/department" component={DepartmentPage} />
                <Route path="/calendar" component={CalendarPage} />
                <Redirect exact from="/" to="dashboard" />
            </Switch>
        </Router>
    );
}

ReactDOM.render(
    <Layout menu={<SystemAdminSideNav />}>
        <ConfigProvider locale={zhCN}>
            <SystemAdminPage />
        </ConfigProvider>
    </Layout>,
    document.getElementById('rc')
);
