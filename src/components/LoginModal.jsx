import { Form, Input, Modal } from 'antd';
import { forwardRef, useImperativeHandle, useState } from 'react';
import axios from '@/services/axios';

function LoginModal(props, ref) {
    let [visible, setVisible] = useState(false);

    let [form] = Form.useForm();

    useImperativeHandle(ref, () => ({
        show: () => {
            setVisible(true);
        },
    }));

    let login = ({ username, cipher }) =>
        axios.post('/auth/login', { username, cipher }).then(({ data }) => {
            sessionStorage.setItem('accessToken', JSON.stringify(data));
        });
    let submit = () => {
        form.validateFields()
            .then(login)
            .then(() => {
                setVisible(false);
                form.resetFields();
            });
    };

    return (
        <Modal
            visible={visible}
            title="登录"
            okText="登录"
            cancelText="取消"
            cancelButtonProps={{ disabled: true }}
            onOk={submit}
        >
            <Form form={form} labelCol={{ span: 4 }}>
                <Form.Item label="用户名" name="username">
                    <Input />
                </Form.Item>
                <Form.Item label="密码" name="cipher">
                    <Input.Password />
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default forwardRef(LoginModal);
