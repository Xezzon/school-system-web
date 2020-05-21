import React from 'react';
import { Table, Button, Popconfirm, Dropdown, Menu, Input } from 'antd';

function DepartmentPage() {
    let [page, setPage] = React.useState({ current: 1, pageSize: 15 });

    let handleTableChange = (pagination, filter, sorter) => {
        setPage({ ...page, current: pagination.current });
    };

    return (
        <React.Fragment>
            <div className="table-toolkit clearfix">
                <div className="table-toolkit-left">
                    <Input.Search></Input.Search>
                </div>
                <div className="table-toolkit-right">
                    <Dropdown.Button
                        overlay={
                            <Menu>
                                <Menu.Item>批量添加...</Menu.Item>
                            </Menu>
                        }
                        trigger={['click']}
                    >
                        添加...
                    </Dropdown.Button>
                </div>
            </div>
            <Table
                rowKey={(record) => record.id}
                dataSource={dataSource}
                pagination={page}
                onChange={handleTableChange}
            >
                <Table.Column
                    title="编号"
                    key="index"
                    render={(text, record, index) => (page.current - 1) * page.pageSize + (index + 1)}
                />
                <Table.Column title="部门名称" dataIndex="name" />
                <Table.Column title="电话" dataIndex="tel" />
                <Table.Column title="email" dataIndex="email" />
                <Table.Column
                    title="操作"
                    key="handlers"
                    render={(text, record) => (
                        <React.Fragment>
                            <Button>设置管理员</Button>
                            <Popconfirm
                                title="确认删除？"
                                onConfirm={() => {
                                    console.debug(record.id);
                                }}
                                okText="确认"
                                cancelText="点错了"
                            >
                                <Button danger>删除</Button>
                            </Popconfirm>
                        </React.Fragment>
                    )}
                />
            </Table>
        </React.Fragment>
    );
}

export default DepartmentPage;
