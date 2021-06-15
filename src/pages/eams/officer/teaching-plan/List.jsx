import { DownloadOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import axios from '@/services/axios.js';
import { Button, Input, Space, Table, Tooltip } from 'antd';
import { useEffect, useState } from 'react';

function TeachingPlanList() {
    let [dataSource, setDataSource] = useState([]);
    let [pagination, setPagination] = useState({ current: 1, pageSize: 15, total: 0 });
    let [loading, setLoading] = useState(false);

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

    let renderToolbar = () => <Toolbar />;

    return (
        <>
            <Table
                dataSource={dataSource}
                rowKey={(record) => record.id}
                pagination={pagination}
                loading={loading}
                scroll={{ y: 370 }}
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
                <Table.Column title="课程属性" dataIndex="profile" ellipsis={true} />
                <Table.Column title="学分" dataIndex="credit" />
                <Table.Column title="任课教师" dataIndex="teacher" />
                <Table.Column title="总课时" dataIndex="" />
                <Table.Column title="操作" key="handler" />
            </Table>
        </>
    );
}

function Toolbar({ searchValue }) {
    return (
        <div className="toolbar d-flex justify-content-between">
            <Space>
                <Input.Search value={searchValue} placeholder="搜索功能暂不可用" disabled />
            </Space>
            <Space>
                <Tooltip title="添加">
                    <Button type="primary" icon={<PlusOutlined />}></Button>
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
