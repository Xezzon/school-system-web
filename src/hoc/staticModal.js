import React from 'react';

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

        return <WrappedComponent {...props} container={rc} />;
    };
    StaticModal.show = (props) => {
        const modalRender = document.createElement('div');
        document.body.appendChild(modalRender);
        ReactDOM.render(<StaticModal {...props} rc={modalRender} />, modalRender);
    };
    return StaticModal;
};

export default staticModal;
