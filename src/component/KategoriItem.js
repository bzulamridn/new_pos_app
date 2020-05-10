import React, { useState, useEffect } from 'react';
import { Layout, PageHeader, Row, Col, Button, Divider, Modal, Input, Table, Card, Popconfirm, notification } from 'antd';
import {
    TagOutlined,
    SaveOutlined,
    DeleteOutlined
} from '@ant-design/icons';
import 'antd/dist/antd.css';
import axios from 'axios';


const { Header, Sider, Content } = Layout;



function KategoriItem() {
    const [showmodal, setShowmodal] = useState(false)
    const [saveLoading, setSaveloading] = useState(false)
    const [namakategori, setNamakategori] = useState('')
    const [kategorilist, setKategorilist] = useState([])
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    // =========== 


    useEffect(() => {
        listkategori()
    },[])

    function show(value) {
        if (value === 1) {
            setShowmodal(true)
        } else {
            setShowmodal(false)
        }
    }

    function openNotif(type){
        notification[type]({
            message: title,
            description:
                desc,
        });
    }

    async function setMessage(type) {
        console.log(type)
        if (await type === 'success') {
            setTitle('Berhasil Menambah Data')
            setDesc('Kategori beru berhasil di masukan ke Database')
        } else {
            setTitle('Berhasil Menghapus Data')
            setDesc('Kategori berhasil di hapus dari Database')
        }
        openNotif(type)
    }

    function simpan() {
        setSaveloading(true)
        axios.post('http://localhost:3000/create_kategori', {
            nama_kategori: namakategori
        })
            .then(res => {
                if (res.data.status === 'sukses') {
                    setSaveloading(false)
                    listkategori()
                } else {
                    setSaveloading(false)
                    show(0)
                }

            })
            setMessage('success')
    }

    function listkategori() {
        axios.get('http://localhost:3000/list_kategori')
            .then(res => {
                if (res.data.status === 200) {
                    setKategorilist(res.data.data)
                }
            })
    }


    function hapus(id) {
        axios.get('http://localhost:3000/hapus_kategori/' + id)
            .then(res => {
                if (res.data.status === 'success') {
                    setMessage('error')
                    listkategori()
                } else {
                    alert("gagal di hapus")
                }
            })
        // alert(id)
    }

    const columns = [
        {
            title: 'No',
            dataIndex: 'nomor',
            key: 'index',
            //render: text => {text}
        },
        {
            title: 'Kategori',
            dataIndex: 'nama_kategori',
            key: 'name',
        },
        {
            title: 'Jumlah',
            dataIndex: '',
            key: 'jumlah',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <span>
                    <Popconfirm
                        title="Anda yakin menghapus Data ini?"
                        onConfirm={() => hapus(record.id)}
                        // onCancel={cancel}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button key="hapus_kategori" type="danger" icon={<DeleteOutlined />} >Hapus {record.id}</Button>
                    </Popconfirm>
                </span>
            ),
        },
    ];

    return (
        <Content
            className="site-layout-background"
            style={{
                margin: '24px 16px',
                padding: 24,
                minHeight: 280,
            }}
        >
            <PageHeader
                className="site-page-header"
                onBack={() => window.history.back()}
                title="Kategori"
                subTitle="Tambahkan kategori item memudahkan manajemen toko anda"

            />
            <Divider />
            <Modal
                title="Tambah Kategori Item"
                visible={showmodal}
                onOk={simpan}
                confirmLoading={saveLoading}
                onCancel={() => show(0)}
            >

                <br />
            </Modal>
            <Row>
                <Col span={12} style={{ padding: 5 }}>
                    <Card title="Tambah Kategori" bordered={true}>
                        <Input placeholder="contoh : baju anak anak, baju dewasa" value={namakategori} onChange={({ target }) => setNamakategori(target.value)} prefix={<TagOutlined />} />
                        <Row style={{ flex: 1, alignItems: 'flex-end' }}>
                            <Col span={24} style={{ marginTop: 10 }}>
                                <Button key="1" type="primary" icon={<SaveOutlined />} onClick={() => simpan()} style={{ float: 'right' }} >Tambah Kategori</Button>
                            </Col>
                        </Row>
                    </Card>
                </Col>
                <Col span={12} style={{ padding: 5 }}>
                    <Table columns={columns} loading={saveLoading} dataSource={kategorilist} />
                </Col>
            </Row>
        </Content>
    )
}

export default KategoriItem;