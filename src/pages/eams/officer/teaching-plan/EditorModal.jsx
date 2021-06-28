import axios from '@/services/axios';
import { Form, Input, InputNumber, Modal, Select } from 'antd';
import { useEffect, useState } from 'react';

function TeachingPlanEditorModal({ visible, courseId, onCancel: handleCancel }) {
    let [form] = Form.useForm();
    let [initValue, setInitValue] = useState({});
    let [teacherDict, setTeacherDict] = useState([]);
    let [courseTypeDict, setCourseTypeDict] = useState([]);

    // 获取教师、教学类型字典
    useEffect(() => {
        fetchTeacherDict();
        fetchCourseTypeDict();
    }, []);

    useEffect(() => {
        fetchInitValue(courseId);
        form.resetFields();
    }, [courseId]);

    useEffect(() => {
        form.resetFields();
    }, [initValue]);

    let fetchInitValue = (courseId) => {
        if (courseId) {
            axios.get(`/eams/teaching-plan/${courseId}`).then(({ data }) => {
                data.profile = data.profile.split(';');
                setInitValue(data);
            });
        }
    };

    let fetchTeacherDict = () => {
        axios.get(`/eams/dict/teacher/${0x0}`).then(({ data }) => {
            setTeacherDict(data.dict);
        });
    };

    let fetchCourseTypeDict = () => {
        axios.get('/dict/course/type').then(({ data }) => {
            setCourseTypeDict(data.dict);
        });
    };

    let handleFormSubmit = () => {
        form.validateFields()
            .then((values) => {
                values.profile = values.profile.join(';');
                return axios({
                    url: `/eams/teaching-plan/${courseId || ''}`,
                    method: courseId ? 'PUT' : 'POST',
                    data: values,
                }).then(({ data }) => {
                    console.log(data);
                    onCancel();
                });
            })
            .catch((error) => {
                console.log(error);
            });
    };

    let onCancel = () => {
        setInitValue({});
        handleCancel();
    };

    return (
        <Modal
            visible={visible}
            title="教学计划"
            okText="提交"
            cancelText="取消"
            maskClosable={false}
            onCancel={onCancel}
            onOk={handleFormSubmit}
        >
            <Form form={form} layout="vertical" initialValues={initValue}>
                <Form.Item name="name" label="课程名" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="type" label="课程类别" rules={[{ required: true }]}>
                    <Select>
                        <For of={courseTypeDict} each="courseType">
                            <Select.Option value={courseType.code} key={courseType.code}>
                                {courseType.text}
                            </Select.Option>
                        </For>
                    </Select>
                </Form.Item>
                <Form.Item name="profile" label="课程属性">
                    <Select mode="tags" tokenSeparators={[';']} placeholder="多个属性请用英文半角分号;分隔"></Select>
                </Form.Item>
                <Form.Item name="credit" label="学分" rules={[{ required: true }]}>
                    <InputNumber min={0} max={20} step={0.5} />
                </Form.Item>
                <Form.Item name={['teacher', 'id']} label="任课教师" rules={[{ required: true }]}>
                    <Select>
                        <For of={teacherDict} each="teacher">
                            <Select.Option value={teacher.code} key={teacher.code}>
                                {teacher.text}
                            </Select.Option>
                        </For>
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default TeachingPlanEditorModal;
