import RouterSwitch from '@/services/router-switch';
import { UserOutlined } from '@ant-design/icons';
import ProLayout, { PageContainer } from '@ant-design/pro-layout';
import { Avatar } from 'antd';
import { useEffect, useState } from 'react';
import { HashRouter as Router, Link } from 'react-router-dom';

function MixLayout({ route }) {
    let [pathname, setPathname] = useState(location.hash.slice(1) || route.default);

    useEffect(() => {
        location.hash = pathname;
    }, [pathname]);

    let menuItemRender = (item, dom) => (
        <Link to={item.path} onClick={() => setPathname(item.path)}>
            {dom}
        </Link>
    );

    let headerRightContent = () => <Avatar shape="square" size="small" icon={<UserOutlined />} />;

    return (
        <Router>
            <ProLayout
                title={route.title}
                route={route}
                location={{ pathname }}
                layout="mix"
                fixSiderbar={true}
                navTheme="light"
                menuItemRender={menuItemRender}
                menu={{ defaultOpenAll: true, autoClose: false }}
                headerTheme="light"
                rightContentRender={headerRightContent}
                fixedHeader={true}
                collapsed={false}
            >
                <PageContainer
                    header={{
                        breadcrumb: {},
                        style: {
                            padding: '4px 16px',
                        },
                    }}
                    fixedHeader={true}
                >
                    <div className="bg-white p-3" style={{ minHeight: 'calc(100vh - 48px * 3)' }}>
                        <RouterSwitch routes={route.routes} />
                    </div>
                </PageContainer>
            </ProLayout>
        </Router>
    );
}

export default MixLayout;
