import CheckedCard from '@/components/CheckedCard';
import axios from '@/services/axios';
import { Button, Divider, Form, List } from 'antd';
import { useEffect, useState } from 'react';

function TeachingPlanBuilder() {
    let [klasos, setKlasos] = useState([]);
    let [form] = Form.useForm();

    useEffect(() => {
        axios.get('/major/klaso').then(({ data }) => {
            setKlasos(data);
        });
        return () => {};
    }, []);

    let onFinish = (value) => {
        value = Object.entries(value)
            .filter(([key, value]) => value)
            .map(([key, value]) => key);
    };

    let onReset = () => {
        form.resetFields();
    };

    return (
        <Form form={form} onFinish={onFinish}>
            <For each="majors" of={klasos}>
                <Divider orientation="left" key={majors.major}>
                    {majors.major}
                </Divider>
                <List
                    grid={{ gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3 }}
                    dataSource={majors.klasos}
                    renderItem={({ id, name }) => (
                        <List.Item>
                            <Form.Item name={id} valuePropName="checked">
                                <CheckedCard className="w-100">
                                    <a _href={id}>{name}</a>
                                </CheckedCard>
                            </Form.Item>
                        </List.Item>
                    )}
                />
            </For>
            <Form.Item>
                <div
                    className="side-toolbar btn-group-vertical position-fixed"
                    style={{ bottom: '89px', right: '21px' }}
                >
                    <Button type="primary" htmlType="submit" className="btn m-2" size="large">
                        新增
                    </Button>
                    <Button htmlType="button" onClick={onReset} className="btn m-2" size="large">
                        清除
                    </Button>
                </div>
            </Form.Item>
        </Form>
    );
}

export default TeachingPlanBuilder;
