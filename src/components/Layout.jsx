import React from 'react';
import { Layout, Dropdown, Menu, Button } from 'antd';
import ArrowUpOutlined from '@ant-design/icons/ArrowUpOutlined';
import ArrowDownOutlined from '@ant-design/icons/ArrowDownOutlined';
import UnorderedListOutlined from '@ant-design/icons/UnorderedListOutlined';
import DownOutLined from '@ant-design/icons/DownOutlined';

function Header({ collapse }) {
    if (collapse) {
        // 适应窄屏。所有菜单放在Button触发的下拉菜单中。二级菜单使用Submenu。
        return (
            <Dropdown
                trigger={['click']}
                placement="bottomRight"
                overlay={
                    <Menu mode="inline">
                        {/* 导航菜单 */}
                        <Menu.Item key="1">nav 1</Menu.Item>
                        <Menu.Item key="2">nav 2</Menu.Item>
                        <Menu.Item key="3">nav 3</Menu.Item>
                        <Menu.Divider />
                        {/* 工具菜单 */}
                        <Menu.Item>nav 4</Menu.Item>
                        <Menu.SubMenu title={'nav 5'}>
                            <Menu.Item key="0">1st menu</Menu.Item>
                            <Menu.Item key="1">2nd menu item</Menu.Item>
                            <Menu.Divider />
                            <Menu.Item key="3">3rd menu item</Menu.Item>
                        </Menu.SubMenu>
                        <Menu.Item>nav 6</Menu.Item>
                    </Menu>
                }
            >
                <Button style={{ position: 'fixed', top: '16px', right: '16px' }} icon={<UnorderedListOutlined />} />
            </Dropdown>
        );
    } else {
        // 适应宽屏。二级菜单使用Dropdown。
        return (
            <React.Fragment>
                {/* 导航菜单，左对齐。 */}
                <Menu
                    id="top-nav-menu"
                    className="float-left bg-transparent border-bottom-0"
                    mode="horizontal"
                    selectable={false}
                    style={{ height: '64px', lineHeight: '62px' }}
                >
                    <Menu.Item key="1">nav 1</Menu.Item>
                    <Menu.Item key="2">nav 2</Menu.Item>
                    <Menu.Item key="3">nav 3</Menu.Item>
                </Menu>
                {/* 工具菜单，右对齐。 */}
                <Menu
                    id="top-nav-toolbar"
                    className="float-right bg-transparent border-bottom-0"
                    mode="horizontal"
                    selectable={false}
                    style={{ height: '64px', lineHeight: '62px' }}
                >
                    <Menu.Item>nav 4</Menu.Item>
                    <Menu.Item>
                        <Dropdown
                            trigger={['click']}
                            placement="bottomRight"
                            overlay={
                                <Menu>
                                    <Menu.Item key="0">1st menu</Menu.Item>
                                    <Menu.Item key="1">2nd menu item</Menu.Item>
                                    <Menu.Divider />
                                    <Menu.Item key="3">3rd menu item</Menu.Item>
                                </Menu>
                            }
                        >
                            <a>
                                nav5 <DownOutLined />
                            </a>
                        </Dropdown>
                    </Menu.Item>
                    <Menu.Item>nav 6</Menu.Item>
                </Menu>
            </React.Fragment>
        );
    }
}

function Footer() {
    return <React.Fragment></React.Fragment>;
}

function SideToolbar() {
    return (
        <div className="side-toolbar btn-group-vertical" style={{ position: 'fixed', bottom: '89px', right: '21px' }}>
            <button
                type="button"
                className="bg-transparent btn btn-light"
                onClick={() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
            >
                <ArrowUpOutlined />
            </button>
            <button
                type="button"
                className="bg-transparent btn btn-light"
                onClick={() => {
                    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                }}
            >
                <ArrowDownOutlined />
            </button>
        </div>
    );
}

function BasicLayout({ children }) {
    return (
        <Layout>
            <Layout.Header>
                <span className="logo"></span>
            </Layout.Header>
            <Layout>
                <Layout.Content>{children}</Layout.Content>
                <Layout.Footer></Layout.Footer>
            </Layout>
        </Layout>
    );
}

function BannerLayout({ menu, children }) {
    return (
        <Layout>
            <Layout.Header>
                <span className="logo"></span>
            </Layout.Header>
            <Layout>
                <Layout.Sider>{menu}</Layout.Sider>
                <Layout>
                    <Layout.Content>{children}</Layout.Content>
                    <Layout.Footer></Layout.Footer>
                </Layout>
            </Layout>
        </Layout>
    );
}

function SiderLayout({ menu, children }) {
    return (
        <Layout>
            <Layout.Sider>
                <div className="logo"></div>
                {menu}
            </Layout.Sider>
            <Layout>
                <Layout.Header></Layout.Header>
                <Layout.Content>{children}</Layout.Content>
                <Layout.Footer></Layout.Footer>
            </Layout>
        </Layout>
    );
}

export { BasicLayout, BannerLayout, SiderLayout };
