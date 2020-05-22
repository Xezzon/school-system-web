import React from 'react';
import { Layout, Dropdown, Menu, Button, Row, Col, Card, Affix, Drawer } from 'antd';
import ArrowUpOutlined from '@ant-design/icons/ArrowUpOutlined';
import ArrowDownOutlined from '@ant-design/icons/ArrowDownOutlined';
import UnorderedListOutlined from '@ant-design/icons/UnorderedListOutlined';
import DownOutLined from '@ant-design/icons/DownOutlined';
import MenuUnfoldOutlined from '@ant-design/icons/MenuUnfoldOutlined';

// TODO: 目前的布局冗余很大

/**
 * 顶部导航布局
 * 适合无前端路由的多页应用
 * @param {React.Component} 主内容
 */
function BasicLayout({ children }) {
    return (
        <Layout>
            <Layout.Header className="sticky-top p-0 bg-light shadow-sm">
                <Row className="d-flex navbar-expand" style={{ height: '64px' }}>
                    <Col xs={23} lg={6} xl={5} xxl={4}>
                        <div id="brand" className="text-center">
                            <a href="/" className="text-dark h1">
                                logo
                            </a>
                        </div>
                    </Col>
                    <Col xs={0} lg={18} xl={19} xxl={20}>
                        <Header collapse={false} />
                    </Col>
                    <Col xs={1} lg={0}>
                        <Header collapse={true} />
                    </Col>
                </Row>
            </Layout.Header>
            <Layout>
                <Layout.Content className="p-3">
                    <Card>{children}</Card>
                </Layout.Content>
                <Layout.Footer>
                    <Footer />
                </Layout.Footer>
            </Layout>
            <SideToolbar />
        </Layout>
    );
}

/**
 * 通栏布局
 * 适用于同时需要前端路由和后端路由的情况
 * @param {React.Component} 侧边栏菜单
 * @param {React.Component} 主内容
 */
function BannerLayout({ menu, children }) {
    let [drawerVisible, setDrawerVisible] = React.useState(false);
    let showDrawer = () => {
        setDrawerVisible(true);
    };
    let closeDrawer = () => {
        setDrawerVisible(false);
    };

    return (
        <Layout>
            <Layout.Header className="sticky-top p-0 bg-light shadow-sm">
                <Row className="d-flex navbar-expand" style={{ height: '64px' }}>
                    <Col xs={23} md={23} lg={6} xl={5} xxl={4}>
                        <div id="brand" className="text-center">
                            <a href="/" className="text-dark h1">
                                logo
                            </a>
                        </div>
                    </Col>
                    <Col xs={0} lg={18} xl={19} xxl={20}>
                        <Header collapse={false} />
                    </Col>
                    <Col xs={1} lg={0}>
                        <Header collapse={true} />
                    </Col>
                </Row>
            </Layout.Header>
            <Layout className="pt-4" style={{ minHeight: 'calc(100vh - 64px)' }}>
                <Row className="d-flex w-100" justify="end">
                    <Col xs={0} lg={6} xl={5} xxl={4}>
                        <Layout.Sider
                            theme="light"
                            className="position-fixed overflow-auto border-right w-100"
                            width="inherit"
                            style={{ height: 'calc(100vh - 1.5rem - 64px)' }}
                            breakpoint="lg"
                            collapsedWidth={0}
                        >
                            {menu}
                        </Layout.Sider>
                    </Col>
                    <Col xs={2} lg={0}>
                        <Button
                            type="dashed"
                            style={{
                                position: 'fixed',
                                left: 0,
                                top: document.body.clientHeight / 3,
                                backgroundColor: 'transparent',
                            }}
                            onClick={showDrawer}
                        >
                            <MenuUnfoldOutlined />
                        </Button>
                        <Drawer
                            placement="left"
                            visible={drawerVisible}
                            style={{ top: 64 }}
                            closable={false}
                            onClose={closeDrawer}
                            bodyStyle={{ padding: 0, width: 'auto' }}
                        >
                            <div
                                className="overflow-auto"
                                style={{ width: 'inherit', height: 'calc(100vh - 1.5rem - 64px)' }}
                            >
                                {menu}
                            </div>
                        </Drawer>
                    </Col>
                    <Col xs={22} lg={18} xl={19} xxl={20}>
                        <Layout.Content className="px-3">
                            <Card className="p-2">{children}</Card>
                        </Layout.Content>
                        <Layout.Footer>
                            <Footer />
                        </Layout.Footer>
                    </Col>
                </Row>
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
