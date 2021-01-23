import { Form, Input, Modal, Select } from 'antd';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import axios from '@/services/axios';

function RegisterModal(props, ref) {
    let [visible, setVisible] = useState(false);
    let [roleList, setRoleList] = useState([]);

    let [form] = Form.useForm();

    useEffect(() => {
        axios.get('/roles').then(({ data }) => {
            setRoleList(data);
        });
    }, []);

    useImperativeHandle(ref, () => ({
        show: () => {
            setVisible(true);
        },
    }));

    let register = ({ username, cipher, role: roleId }) =>
        axios.post('/auth/register', { username, cipher, role: { id: roleId } });
    let submit = () => {
        form.validateFields()
            .then(register)
            .then(() => {
                setVisible(false);
                form.resetFields();
            });
    };

    return (
        <Modal visible={visible} title="注册" okText="注册" cancelText="取消" onOk={submit}>
            <Form form={form} labelCol={{ span: 4 }}>
                <Form.Item label="用户名" name="username">
                    <Input />
                </Form.Item>
                <Form.Item label="密码" name="cipher">
                    <Input.Password />
                </Form.Item>
                <Form.Item label="确认密码" name="cipher_repeat">
                    <Input.Password />
                </Form.Item>
                <Form.Item label="角色" name="role">
                    <Select>
                        <For each="role" of={roleList}>
                            <Select.Option key={role.id} value={role.id}>
                                {role.name}
                            </Select.Option>
                        </For>
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default forwardRef(RegisterModal);
