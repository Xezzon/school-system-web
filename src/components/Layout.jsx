import React from 'react';
import Layout from 'antd/es/layout';

function Header() {
    return <React.Fragment></React.Fragment>;
}

function Footer() {
    return <React.Fragment></React.Fragment>;
}

function SideToolbar() {
    return <React.Fragment></React.Fragment>;
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
