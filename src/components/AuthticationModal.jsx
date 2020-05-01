import React from 'react';
import ReactDOM from 'react-dom';
import { Modal, Form, Input, Checkbox } from 'antd';

/**
 * 登录对话框
 * 收到401响应后自动弹出
 * 不允许以任何方式手动关掉对话框
 * 登录成功后销毁
 */
function AuthenticationModal({ rc = document.body }) {
    let [form] = Form.useForm();
    let [visible, setVisible] = React.useState(true);

    React.useEffect(() => {
        return () => {
            if (rc) {
                document.body.removeChild(rc);
            }
        };
    });

    let submitForm = () => {
        form.validateFields()
            .then((values) => {
                form.resetFields();
                console.debug(values);
                setVisible(false);
            })
            .catch((info) => {
                console.error(info);
            });
    };

    return (
        <Modal
            visible={visible}
            maskClosable={false}
            closable={false}
            cancelButtonProps={{ disabled: true }}
            okText="登录"
            cancelText="取消"
            onOk={submitForm}
            getContainer={rc}
        >
            <Form form={form} name="login" initialValues={{ rememberMe: false }}>
                <Form.Item label="用户名" name="username" rules={[{ required: true, message: '请输入用户名' }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="密码" name="cipher" rules={[{ required: true, message: '请输入密码' }]}>
                    <Input.Password />
                </Form.Item>
                <Form.Item name="rememberMe" valuePropName="checked">
                    <Checkbox>10天内免登录</Checkbox>
                </Form.Item>
            </Form>
        </Modal>
    );
}

AuthenticationModal.show = () => {
    const modalRender = document.createElement('div');
    document.body.appendChild(modalRender);
    ReactDOM.render(<AuthenticationModal rc={modalRender} />, modalRender);
};

export default AuthenticationModal;
