import React from 'react';

function Loading() {
    return (
        <div
            className="spinner-border text-primary position-fixed"
            style={{ width: '3rem', height: '3rem', top: '50%', left: '50%' }}
            role="status"
        >
            <span className="sr-only">加载中Loading...</span>
        </div>
    );
}

const suspend = (WrappedComponent) => () => (
    <React.Suspense fallback={<Loading />}>
        <WrappedComponent />
    </React.Suspense>
);

function lazyload(componentPromise) {
    return suspend(React.lazy(componentPromise));
}

export { lazyload, suspend, Loading };
