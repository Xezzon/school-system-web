import React from 'react';

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
