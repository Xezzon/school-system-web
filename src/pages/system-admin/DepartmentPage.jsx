import React from 'react';
import { Table, Button, Popconfirm, Dropdown, Menu, Input, Modal, Form, Upload } from 'antd';
import Papa from 'papaparse';
import staticModal from '@/hoc/staticModal';

function DepartmentPage() {
    /* 测试数据START */
    let dataSource = [
        { id: '1', name: 'teaching', cname: '教务处', tel: '123456', email: '123@123.com' },
        { id: '2', name: 'jiaotong', cname: '交通学院', tel: '123456', email: '123@123.com' },
        { id: '1', name: 'teaching', cname: '教务处', tel: '123456', email: '123@123.com' },
        { id: '2', name: 'jiaotong', cname: '交通学院', tel: '123456', email: '123@123.com' },
        { id: '1', name: 'teaching', cname: '教务处', tel: '123456', email: '123@123.com' },
        { id: '2', name: 'jiaotong', cname: '交通学院', tel: '123456', email: '123@123.com' },
        { id: '1', name: 'teaching', cname: '教务处', tel: '123456', email: '123@123.com' },
        { id: '2', name: 'jiaotong', cname: '交通学院', tel: '123456', email: '123@123.com' },
        { id: '1', name: 'teaching', cname: '教务处', tel: '123456', email: '123@123.com' },
        { id: '2', name: 'jiaotong', cname: '交通学院', tel: '123456', email: '123@123.com' },
        { id: '1', name: 'teaching', cname: '教务处', tel: '123456', email: '123@123.com' },
        { id: '2', name: 'jiaotong', cname: '交通学院', tel: '123456', email: '123@123.com' },
        { id: '1', name: 'teaching', cname: '教务处', tel: '123456', email: '123@123.com' },
        { id: '2', name: 'jiaotong', cname: '交通学院', tel: '123456', email: '123@123.com' },
        { id: '1', name: 'teaching', cname: '教务处', tel: '123456', email: '123@123.com' },
        { id: '2', name: 'jiaotong', cname: '交通学院', tel: '123456', email: '123@123.com' },
        { id: '1', name: 'teaching', cname: '教务处', tel: '123456', email: '123@123.com' },
        { id: '2', name: 'jiaotong', cname: '交通学院', tel: '123456', email: '123@123.com' },
        { id: '1', name: 'teaching', cname: '教务处', tel: '123456', email: '123@123.com' },
        { id: '2', name: 'jiaotong', cname: '交通学院', tel: '123456', email: '123@123.com' },
        { id: '1', name: 'teaching', cname: '教务处', tel: '123456', email: '123@123.com' },
        { id: '2', name: 'jiaotong', cname: '交通学院', tel: '123456', email: '123@123.com' },
    ];
    /* 测试数据END */

    return (
        <React.Fragment>
            <div className="table-toolkit clearfix">
                <div className="table-toolkit-left">
                    <Input.Search></Input.Search>
                </div>
                <div className="table-toolkit-right">
                    <Button type="primary" onClick={DepartmentEditModal.show}>
                        添加
                    </Button>
                </div>
            </div>
            <DepartmentTable dataSource={dataSource} operable />
        </React.Fragment>
    );
}

function DepartmentTable({ dataSource, operable }) {
    let [page, setPage] = React.useState({ current: 1, pageSize: 15 });

    let handleTableChange = (pagination, filter, sorter) => {
        setPage({ ...page, current: pagination.current });
    };

    return (
        <Table rowKey={(record) => record.id} dataSource={dataSource} pagination={page} onChange={handleTableChange}>
            <Table.Column
                title="编号"
                key="index"
                render={(text, record, index) => (page.current - 1) * page.pageSize + (index + 1)}
            />
            <Table.Column title="部门名称" dataIndex="cname" editable={true} />
            <Table.Column title="英文名" dataIndex="name" />
            <Table.Column title="电话" dataIndex="tel" editable={true} />
            <Table.Column title="email" dataIndex="email" editable={true} />
            <If condition={operable}>
                <Table.Column
                    title="操作"
                    key="handlers"
                    render={(text, record) => (
                        <React.Fragment>
                            <Button type="link">设置管理员</Button>
                            <Button
                                type="link"
                                onClick={() => {
                                    DepartmentEditModal.show({ data: record });
                                }}
                            >
                                编辑
                            </Button>
                            <Popconfirm
                                title="确认删除？"
                                onConfirm={() => {
                                    console.debug(record.id);
                                }}
                                okText="确认"
                                cancelText="点错了"
                            >
                                <Button type="link" danger>
                                    删除
                                </Button>
                            </Popconfirm>
                        </React.Fragment>
                    )}
                />
            </If>
        </Table>
    );
}

function DepartmentEditModal({
    data = { id: '', name: '', cname: '', tel: '', email: '' },
    container = document.body,
}) {
    let editing = !!data.id;

    let [form] = Form.useForm();

    let handleModalHide = () => {
        ReactDOM.unmountComponentAtNode(container);
    };

    return (
        <Modal
            title={editing ? '编辑部门' : '添加部门'}
            visible={true}
            getContainer={container}
            onCancel={handleModalHide}
            okText="确认"
            cancelText="取消"
        >
            <Form form={form} initialValues={data}>
                <Form.Item name="name" label="英文名">
                    <Input disabled={editing} />
                </Form.Item>
                <Form.Item name="cname" label="中文名">
                    <Input />
                </Form.Item>
                <Form.Item name="tel" label="联系电话">
                    <Input />
                </Form.Item>
                <Form.Item name="email" label="email">
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
}
DepartmentEditModal = staticModal(DepartmentEditModal);

export default DepartmentPage;
