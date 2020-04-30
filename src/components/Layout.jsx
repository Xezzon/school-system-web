import React from 'react';
import Layout from 'antd/es/layout';
import ArrowUpOutlined from '@ant-design/icons/ArrowUpOutlined';
import ArrowDownOutlined from '@ant-design/icons/ArrowDownOutlined';

function Header() {
    return <React.Fragment></React.Fragment>;
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
