import React, { useState, useEffect } from 'react';
import { Layout, PageHeader, Row, Col, Button, Modal, Typography, Input, InputNumber, notification, Card, Table } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    HomeOutlined,
    SkinOutlined,
    ShoppingCartOutlined,
    CarOutlined,
    UsergroupAddOutlined,
    CodeSandboxOutlined,
    TransactionOutlined,
    SaveOutlined
} from '@ant-design/icons';
import 'antd/dist/antd.css';
import axios from 'axios';
import Moment from 'moment';
//import 'moment-timezone';
import NumberFormat from 'react-number-format';
import 'moment/locale/id'  // without this line it didn't work
Moment.locale('id');

const { Text } = Typography
const { Header, Sider, Content } = Layout;

function Pengeluaran() {
    const [showmodal, setShowmodal] = useState(false)
    const [keluar, setKeluar] = useState('')
    const [keterangan, setKeterangan] = useState('')
    const [log, setLog] = useState([])

    useEffect(() => {
        logPengeluaran()
    }, [])


    function show(value) {
        if (value === 1) {
            setShowmodal(true)
        } else {
            setShowmodal(false)
        }
    }

    async function logPengeluaran() {
        await axios.get('http://localhost:3000/log_pengeluaran')
            .then(res => {
                // if (res.data.status === 200) {
                const data = []
                let data_length = res.data.data.length
                for (let i = 0; i < data_length; i++) {
                    data.push({
                        no: i + 1,
                        jumlah: res.data.data[i].jumlah,
                        keterangan: res.data.data[i].keterangan,
                        tanggal: res.data.data[i].created_at
                    })

                }
                setLog(data)
            })
    }

    function simpan() {
        axios.post('http://localhost:3000/add_pengeluaran', {
            jumlah: keluar,
            keterangan: keterangan
        })
            .then(res => {
                setKeluar('')
                setKeterangan('')
                logPengeluaran()
                notification['success']({
                    message: "Sukses",
                    description:
                        "Pengelauran Berhasil di Simpan",
                });
            })
    }

    const columns = [
        {
            title: 'Nomor',
            dataIndex: 'no',
            key: 'index',
        },
        {
            title: 'Jumlah Pengeluaran',
            dataIndex: 'jumlah',
            key: 'name',
            render: (text, record) => (
                <NumberFormat thousandSeparator={true} displayType={'text'} value={record.jumlah} />
            )
        },
        {
            title: 'Keterangan',
            dataIndex: 'keterangan',
            key: 'jumlah',
        },
        {
            title: 'Waktu',
            dataIndex: 'tanggal',
            key: 'jumlah',
            render: (text, record) => (
                <p>{Moment(record.tanggal).format('LL')}</p>
            )
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
                title="Pengeluaran"
                //breadcrumb={{ routes }}
                subTitle="Pengeluaran"
            extra={[
                <Button key="1" type="primary" onClick={() => show(1)}>
                    Buat Pengeluaran
                </Button>,
            ]}
            />
            <Row>
                <Col span={12} style={{ padding: 5 }}>
                    <Row>
                        <Col span={24}>
                          
                        </Col>
                       
                    </Row>

                </Col>
                <Col span={12} style={{ padding: 5 }}>
                    <Card style={{ padding: 5 }}>
                        <Table columns={columns} dataSource={log} />
                    </Card>
                </Col>
            </Row>
            <Modal
                title="Tambah Modal"
                visible={showmodal}
                onOk={simpan}
                //confirmLoading={saveLoading}
                onCancel={() => show(0)}
            >

                <Text>Investasi Modal</Text>
                <InputNumber
                    //defaultValue={100000000}
                    formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                    style={{ width: '100%' }}
                    value={keluar}
                    onChange={value => setKeluar(value)}
                />
                <br />
                <br />
                <Text>Keterangan</Text>
                <Input placeholder="Keterangan" value={keterangan} onChange={e => setKeterangan(e.target.value)} allowClear />
                <br />
                <br />

            </Modal>
        </Content>
    )
}

export default Pengeluaran;