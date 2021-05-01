import { Suspense, lazy } from 'react';

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

// eslint-disable-next-line react/display-name
const suspend = (WrappedComponent) => () => (
    <Suspense fallback={<Loading />}>
        <WrappedComponent />
    </Suspense>
);

function lazyload(componentPromise) {
    return suspend(lazy(() => componentPromise));
}

export { lazyload, suspend, Loading };
