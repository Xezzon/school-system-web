import React from 'react';
import { Table, Button, Popconfirm, Dropdown, Menu, Input, Modal, Form } from 'antd';
import Papa from 'papaparse';
import staticModal from '@/hoc/staticModal';
import { PermissionTransfer } from '@/components';

function DepartmentPage() {
    /* 测试数据START */
    let dataSource = [
        { id: '1', name: '教务处', tel: '123456', email: '123@123.com' },
        { id: '2', name: '交通学院', tel: '123456', email: '123@123.com' },
        { id: '1', name: '教务处', tel: '123456', email: '123@123.com' },
        { id: '2', name: '交通学院', tel: '123456', email: '123@123.com' },
        { id: '1', name: '教务处', tel: '123456', email: '123@123.com' },
        { id: '2', name: '交通学院', tel: '123456', email: '123@123.com' },
        { id: '1', name: '教务处', tel: '123456', email: '123@123.com' },
        { id: '2', name: '交通学院', tel: '123456', email: '123@123.com' },
        { id: '1', name: '教务处', tel: '123456', email: '123@123.com' },
        { id: '2', name: '交通学院', tel: '123456', email: '123@123.com' },
        { id: '1', name: '教务处', tel: '123456', email: '123@123.com' },
        { id: '2', name: '交通学院', tel: '123456', email: '123@123.com' },
        { id: '1', name: '教务处', tel: '123456', email: '123@123.com' },
        { id: '2', name: '交通学院', tel: '123456', email: '123@123.com' },
        { id: '1', name: '教务处', tel: '123456', email: '123@123.com' },
        { id: '2', name: '交通学院', tel: '123456', email: '123@123.com' },
        { id: '1', name: '教务处', tel: '123456', email: '123@123.com' },
        { id: '2', name: '交通学院', tel: '123456', email: '123@123.com' },
        { id: '1', name: '教务处', tel: '123456', email: '123@123.com' },
        { id: '2', name: '交通学院', tel: '123456', email: '123@123.com' },
        { id: '1', name: '教务处', tel: '123456', email: '123@123.com' },
        { id: '2', name: '交通学院', tel: '123456', email: '123@123.com' },
    ];
    /* 测试数据END */

    return (
        <React.Fragment>
            <div className="toolkit clearfix">
                <div className="toolkit-left">
                    <Input.Search></Input.Search>
                </div>
                <div className="toolkit-right">
                    <Dropdown.Button
                        type="primary"
                        trigger={['click']}
                        overlay={
                            <Menu>
                                <Menu.Item onClick={DepartmentNewModal.show}>批量添加...</Menu.Item>
                            </Menu>
                        }
                        onClick={DepartmentEditorModal.show}
                    >
                        添加...
                    </Dropdown.Button>
                </div>
            </div>
            <DepartmentTable dataSource={dataSource} operable />
        </React.Fragment>
    );
}

/**
 * 部门表格
 * @param {{ dataSource: { id: string, name: string, tel: string, email: string}, operable: boolean}} props
 */
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
            <Table.Column title="部门名称" dataIndex="name" editable={true} />
            <Table.Column title="电话" dataIndex="tel" editable={true} />
            <Table.Column title="email" dataIndex="email" editable={true} />
            <If condition={operable}>
                <Table.Column
                    title="操作"
                    key="handlers"
                    render={(text, record) => (
                        <React.Fragment>
                            <Button
                                type="link"
                                onClick={() => {
                                    DepartmentEditorModal.show({ data: record });
                                }}
                            >
                                编辑
                            </Button>
                            <Button type="link" onClick={PermissionAssignmentModal.show}>
                                分配权限
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

/**
 * 添加或编辑单个部门的表单对话框
 * @param {{data: {id: string, name: string, tel: string, email: string}}} props
 */
function DepartmentEditorModal({ data = { id: '', name: '', tel: '', email: '' }, container = document.body }) {
    /**
     * 若调用组件时未传入data是添加，否则是编辑
     */
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
            maskClosable={false}
            onCancel={handleModalHide}
        >
            <Form form={form} initialValues={data} labelCol={{ span: 4 }}>
                <Form.Item name="name" label="部门名称">
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
DepartmentEditorModal = staticModal(DepartmentEditorModal);

/**
 * 批量添加部门的表格对话框
 * @param {*} props
 */
function DepartmentNewModal({ container = document.body }) {
    let [dataSource, setDataSource] = React.useState();

    let handleModalHide = () => {
        ReactDOM.unmountComponentAtNode(container);
    };
    /**
     * 导出模板
     */
    let handleExportCSV = () => {
        let csv = 'id,部门名称,联系电话,email\n';
        let download = document.createElement('a');
        download.href = 'data:text/csv;utf-8,' + csv;
        download.download = '部门表.csv';
        download.click();
    };
    /**
     * 从模板中导入
     */
    let handleImportCSV = () => {
        let upload = document.createElement('input');
        upload.type = 'file';
        /* 只接受csv类型 */
        upload.accept = 'text/csv';
        upload.onchange = () => {
            Papa.parse(upload.files[0], {
                header: true,
                skipEmptyLines: true,
                dynamicTyping: true,
                encoding: 'UTF-8',
                complete: (results) => {
                    let resultsData = results.data.map((result) => {
                        let { id, 部门名称: name, 联系电话: tel, email } = result;
                        return { id, name, tel, email };
                    });
                    setDataSource(resultsData);
                },
            });
        };
        upload.click();
    };

    return (
        <Modal
            title="添加部门"
            visible={true}
            getContainer={container}
            onCancel={handleModalHide}
            maskClosable={false}
            style={{ minWidth: '60vw' }}
        >
            <div className="toolkit clearfix">
                <div className="toolkit-left"></div>
                <div className="toolkit-right">
                    <Button onClick={handleExportCSV}>导出模板</Button>
                    <Button onClick={handleImportCSV}>从模板中导入</Button>
                </div>
            </div>
            <DepartmentTable dataSource={dataSource} />
        </Modal>
    );
}
DepartmentNewModal = staticModal(DepartmentNewModal);

function PermissionAssignmentModal({ container = document.body }) {
    let [form] = Form.useForm();

    let handleHide = () => {
        ReactDOM.unmountComponentAtNode(container);
    };

    return (
        <Modal
            title="权限分配"
            visible={true}
            getContainer={container}
            onCancel={handleHide}
            maskClosable={false}
            style={{ minWidth: '50vw' }}
        >
            <Form form={form} layout="inline">
                <Form.Item name="admin.username" label="负责人账号">
                    <Input />
                </Form.Item>
                <Form.Item name="admin.name" label="负责人名字">
                    <Input disabled />
                </Form.Item>
                <Form.Item name="permission" label="部门权限">
                    <PermissionTransfer />
                </Form.Item>
            </Form>
        </Modal>
    );
}
PermissionAssignmentModal = staticModal(PermissionAssignmentModal);

export default DepartmentPage;
export { DepartmentTable, DepartmentEditorModal, DepartmentNewModal };