import {
    DeleteOutlined,
    DownloadOutlined,
    EditOutlined,
    EyeOutlined,
    PlusOutlined,
    UploadOutlined,
} from '@ant-design/icons';
import axios from '@/services/axios.js';
import { Button, Input, Popconfirm, Space, Table, Tooltip } from 'antd';
import { useEffect, useState } from 'react';
import TeachingPlanEditor from './EditorModal';

function TeachingPlanList() {
    let [dataSource, setDataSource] = useState([]);
    let [pagination, setPagination] = useState({ current: 1, pageSize: 15, total: 0 });
    let [loading, setLoading] = useState(false);
    let [editorVisible, toggleEditorVisible] = useState(false);
    let [selectedCourse, setSelectedCourse] = useState({});

    useEffect(() => {
        fetchDataSource(pagination);
    }, []);

    let fetchDataSource = (pagination = {}, filters = {}, { field, order } = {}) => {
        setLoading(true);
        setPagination(pagination);
        axios
            .get('/eams/teaching-plan/list', {
                params: { filters, pagination, sorter: { field, order } },
            })
            .then(({ data }) => {
                setDataSource(data.items);
                setPagination({ ...pagination, total: data.total });
            })
            .catch((error) => {
                console.log(error);
                setDataSource([]);
                setPagination({ ...pagination, current: 1, total: 0 });
            })
            .finally(() => {
                setLoading(false);
            });
    };

    let handleItemDelete = (id) => {
        axios.delete(`/eams/teaching-plan/${id}`).then(() => {
            fetchDataSource(pagination);
        });
    };

    let renderToolbar = () => (
        <Toolbar
            handleCreate={() => {
                setSelectedCourse({});
                toggleEditorVisible(true);
            }}
        />
    );

    let renderHandlerButtonGroup = (value, record) => (
        <Space>
            <Tooltip title="查看详情">
                <Button type="primary" icon={<EyeOutlined />} _href={record.id} className="d-none"></Button>
            </Tooltip>
            <Tooltip title="编辑">
                <Button
                    icon={<EditOutlined />}
                    _href={record.id}
                    onClick={() => {
                        setSelectedCourse(record);
                        toggleEditorVisible(true);
                    }}
                ></Button>
            </Tooltip>
            <Popconfirm title="确认删除该项教学计划？" onConfirm={() => handleItemDelete(record.id)}>
                <Tooltip title="删除">
                    <Button danger icon={<DeleteOutlined />} _href={record.id}></Button>
                </Tooltip>
            </Popconfirm>
        </Space>
    );

    return (
        <>
            <Table
                dataSource={dataSource}
                rowKey={(record) => record.id}
                pagination={pagination}
                loading={loading}
                title={renderToolbar}
                onChange={fetchDataSource}
            >
                <Table.Column
                    title="序号"
                    key="index"
                    render={(text, record, index) => (pagination.current - 1) * pagination.pageSize + (index + 1)}
                />
                <Table.Column title="课程名" dataIndex="name" />
                <Table.Column title="课程类别" dataIndex="type" />
                <Table.Column title="课程属性" dataIndex="profile" />
                <Table.Column title="学分" dataIndex="credit" />
                <Table.Column title="任课教师" dataIndex="teacher" render={({ name }) => <span>{name}</span>} />
                <Table.Column title="总课时" dataIndex="weekhour" />
                <Table.Column title="操作" key="handler" render={renderHandlerButtonGroup} />
            </Table>
            <TeachingPlanEditor
                visible={editorVisible}
                courseId={selectedCourse.id}
                onOk={() => {
                    toggleEditorVisible(false);
                    fetchDataSource(pagination);
                }}
                onCancel={() => {
                    toggleEditorVisible(false);
                }}
            />
        </>
    );
}

function Toolbar({ searchValue, handleCreate }) {
    return (
        <div className="toolbar d-flex justify-content-between">
            <Space>
                <Input.Search value={searchValue} placeholder="搜索功能暂不可用" disabled />
            </Space>
            <Space>
                <Tooltip title="添加">
                    <Button type="primary" icon={<PlusOutlined />} onClick={handleCreate}></Button>
                </Tooltip>
                <Tooltip title="下载模板">
                    <Button icon={<DownloadOutlined />}></Button>
                </Tooltip>
                <Tooltip title="导入">
                    <Button icon={<UploadOutlined />}></Button>
                </Tooltip>
            </Space>
        </div>
    );
}

export default TeachingPlanList;
