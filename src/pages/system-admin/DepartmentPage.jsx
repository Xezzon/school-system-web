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
                            <Button type="link">编辑</Button>
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

function DepartmentEditModal({ container = document.body }) {
    let [dataSource, setDataSource] = React.useState();

    let handleModalHide = () => {
        ReactDOM.unmountComponentAtNode(container);
    };
    let handleExportCSV = () => {
        let csv = 'id,部门名称,英文名,联系电话,email\n';
        let download = document.createElement('a');
        download.href = 'data:text/csv;utf-8,' + csv;
        download.download = '部门表.csv';
        download.click();
    };
    let handleImportCSV = () => {
        let upload = document.createElement('input');
        upload.type = 'file';
        upload.onchange = () => {
            Papa.parse(upload.files[0], {
                header: true,
                complete: (results) => {
                    let resultsData = results.data.map((result) => {
                        let { id, 部门名称: cname, 英文名: name, 联系电话: tel, email } = result;
                        return { id, name, cname, tel, email };
                    });
                    setDataSource(resultsData);
                },
            });
        };
        upload.click();
    };

    return (
        <Modal title="添加部门" visible={true} getContainer={container} onCancel={handleModalHide} width="80vw">
            <div className="table-toolkit clearfix">
                <div className="table-toolkit-left"></div>
                <div className="table-toolkit-right">
                    <Button onClick={handleExportCSV}>导出模板</Button>
                    <Button onClick={handleImportCSV}>从模板中导入</Button>
                </div>
            </div>
            <DepartmentTable dataSource={dataSource} />
        </Modal>
    );
}
DepartmentEditModal = staticModal(DepartmentEditModal);

export default DepartmentPage;
