import React, { useState, useEffect } from 'react';
import { Layout, PageHeader, Row, Col, Modal, Button, Input, InputNumber, Typography, notification, Table, Tag, Descriptions, Divider } from 'antd';
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
    DeleteOutlined,
    FlagTwoTone
} from '@ant-design/icons';
import 'antd/dist/antd.css';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import NumberFormat from 'react-number-format';
import Moment from 'moment';
//import 'moment-timezone';
import 'moment/locale/id'  // without this line it didn't work
Moment.locale('id');

const URL = 'http://36.89.246.26:4442'
const { Header, Sider, Content } = Layout;
const { Text } = Typography



function Invmodal() {
    const counter = useSelector(state => state.counter)
    const [showmodal, setShowmodal] = useState(false)
    const [modal, setInvmodal] = useState('')
    const [keterangan, setKeterangan] = useState('')
    const [log, setLog] = useState([])
    const [totalinv, setTotalinv] = useState(0)

    useEffect(() => {
        modalLog()
        //list_item()
    }, [])

    function show(value) {
        if (value === 1) {
            setShowmodal(true)
        } else {
            setShowmodal(false)
        }
    }

    async function modalLog() {
        await axios.get(URL+'/log_modal')
            .then(res => {
                // if (res.data.status === 200) {
                //     let key = 1
                //     setListitem(res.data.data)
                //     console.log(res.data.data)
                // }
                const data = []
                let data_length = res.data.data.length
                for (let i = 0; i < data_length; i++) {
                    data.push({
                        no: i + 1,
                        status: res.data.data[i].status,
                        sumber: res.data.data[i].sumber,
                        jumlah: res.data.data[i].jumlah,
                        total_modal: res.data.data[i].jumlah_modal,
                        keterangan: res.data.data[i].keterangan,
                        tanggal : res.data.data[i].created_at
                    })

                }
                setLog(data)
            })
    }

    function simpan() {
        axios.post(URL+'/add_invest', {
            invest: modal,
            keterangan: keterangan
        })
            .then(res => {
                show(0)
                modalLog()
                notification['success']({
                    message: "Sukses",
                    description:
                        "Transaksi Berhasil di Simpan",
                });
            })
    }

    const columns = [
        {
            title: 'Nomor',
            key: 'action',
            dataIndex: 'no'
        },
        {
            title : "Waktu",
            render: (text, record) => (
                <p>{Moment(record.tanggal).format('LLLL')}</p>
            )
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (tetx, record) => {
                if (record.status === 'in') {
                    return (
                        <Tag color={'green'} >
                            {record.status.toUpperCase()}
                        </Tag>
                    )
                } else {
                    return (
                        <Tag color={"volcano"}>
                            {record.status.toUpperCase()}
                        </Tag>
                    )
                }
            }
        },
        {
            title: 'Sumber',
            dataIndex: 'sumber',
            key: 'status',
            render: (text, record) => {
                if(record.sumber === 'inv'){
                    return( <><FlagTwoTone />  <Tag color={'blue'} >{record.sumber.toUpperCase()} </Tag>  </> )
                }else{
                    return( <> {record.sumber.toUpperCase()}  </> )
                }
            }
        },
        {
            title: 'Jumlah',
            dataIndex: 'jumlah',
            key: 'jumlah',
            render: (tetx, record) => {
                if (record.status === 'in') {
                    return (
                        <Tag color={'green'} >
                           + <NumberFormat thousandSeparator={true} displayType={'text'} value={record.jumlah} />
                        </Tag>
                    )
                } else {
                    return (
                        <Tag color={"volcano"}>
                           - <NumberFormat thousandSeparator={true} displayType={'text'} value={record.jumlah} />
                        </Tag>
                    )
                }
            }
            // render: (text, record) => (
            //     
            // )
        },
        {
            title: 'Total Modal',
            dataIndex: 'total_modal',
            key: 'Total Modal',
            render: (text, record) => (
                <NumberFormat thousandSeparator={true} displayType={'text'} value={record.total_modal} />
            )
        },
        {
            title: 'Keterangan',
            dataIndex: 'keterangan',
            key: 'keterangan',
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
                title="Modal"
                //breadcrumb={{ routes }}
                subTitle="Kas Modal"
                extra={[
                    <Button key="1" type="primary" onClick={() => show(1)}>
                        Tambah Modal
                    </Button>,
                ]}
            >
               
            </PageHeader>
            <Divider />
            <div style={{ padding: 20 }}>
                <Table columns={columns} dataSource={log} />
            </div>
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
                    value={modal}
                    onChange={value => setInvmodal(value)}
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

export default Invmodal

