import { Button, Table } from 'antd';
import { Fragment, useEffect, useState } from 'react';
import axios from '@/services/axios';

function CourseTable() {
    let [dataSource, setDataSource] = useState([]);
    const [pagination, setPagination] = useState({ current: 1, pageSize: 15, showSizeChanger: false, simple: true });

    useEffect(() => {
        axios
            .get('/courses', {
                params: {
                    pageNum: pagination.current,
                    pageSize: pagination.pageSize,
                },
            })
            .then(({ data }) => {
                setPagination({ ...pagination, total: data.total });
                setDataSource(data.items);
            });
    }, [pagination.current]);

    let handleTableChange = ({ current }) => {
        setPagination({ ...pagination, current });
    };

    let handleElectCourse = (courseId) => {
        axios.post(`/course/${courseId}/student`);
    };

    let columns = [
        {
            title: '课程编号',
            key: 'index',
            render: (text, record, index) => (pagination.current - 1) * pagination.pageSize + (index + 1),
        },
        {
            title: '课程名称',
            dataIndex: 'name',
        },
        {
            title: '学分',
            dataIndex: 'credit',
        },
        {
            title: '任课教师',
            dataIndex: 'teacher',
            render: ({ id, name }) => <a _href={id}>{name}</a>,
        },
        {
            title: '操作',
            key: 'handler',
            render: (value, record) => (
                <Fragment>
                    <Button type="link" onClick={() => handleElectCourse(record.id)}>
                        选课
                    </Button>
                </Fragment>
            ),
        },
    ];

    return (
        <Fragment>
            <Table
                columns={columns}
                dataSource={dataSource}
                rowKey={(record) => record.id}
                pagination={pagination}
                onChange={handleTableChange}
            />
        </Fragment>
    );
}

export default CourseTable;
