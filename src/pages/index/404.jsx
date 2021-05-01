import { Button, Result } from 'antd';

function Page404() {
    let backToHome = () => {
        console.debug('返回主页');
    };

    return (
        <Result
            status="404"
            title="404"
            subTitle="页面未找到"
            extra={
                <Button type="primary" onClick={backToHome}>
                    返回主页
                </Button>
            }
        />
    );
}

export default Page404;
