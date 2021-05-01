import { Button, Result } from 'antd';

function Page500() {
    let refresh = () => {
        console.debug('刷新');
    };

    return (
        <Result
            status="500"
            title="500"
            subTitle="服务器出现了错误，请联系管理员或稍后重试"
            extra={
                <Button type="primary" onClick={refresh}>
                    刷新
                </Button>
            }
        />
    );
}

export default Page500;
