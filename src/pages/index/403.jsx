import { Button, Result } from 'antd';

function Page403() {
    let backToHome = () => {
        console.debug('返回主页');
    };

    return (
        <Result
            status="403"
            title="403"
            subTitle="没有权限访问当前页面"
            extra={
                <Button type="primary" onClick={backToHome}>
                    返回主页
                </Button>
            }
        />
    );
}

export default Page403;
