import React from 'react';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';

/**
 * 高阶组件 为对话框添加show静态方法
 * @param {React.Component} WrappedComponent 对话框组件
 */
const staticModal = (WrappedComponent) => {
    const StaticModal = ({ rc, ...props }) => {
        React.useEffect(() => {
            return () => {
                if (rc) {
                    document.body.removeChild(rc);
                }
            };
        }, []);

        return (
            <ConfigProvider locale={zhCN}>
                <WrappedComponent {...props} container={rc} />
            </ConfigProvider>
        );
    };
    StaticModal.show = (props) => {
        const modalRender = document.createElement('div');
        document.body.appendChild(modalRender);
        ReactDOM.render(<StaticModal {...props} rc={modalRender} />, modalRender);
    };
    return StaticModal;
};

export default staticModal;
