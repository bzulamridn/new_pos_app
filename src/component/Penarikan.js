import React, {useState, useEffect} from 'react';
import { Layout, PageHeader, Row, Col, Button, Modal, Typography, Input, InputNumber, notification, Select, Card, Table, Tag} from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    HomeOutlined,
    SkinOutlined,
    ShoppingCartOutlined,
    CarOutlined,
    UsergroupAddOutlined,
    CodeSandboxOutlined,
    TransactionOutlined
} from '@ant-design/icons';
import 'antd/dist/antd.css';
import axios from 'axios';
import Moment from 'moment';
//import 'moment-timezone';
import NumberFormat from 'react-number-format';
import 'moment/locale/id'  // without this line it didn't work
Moment.locale('id');

const URL = 'http://36.89.246.26:4442'
const {Text} = Typography
const { Option } = Select;
const { Header, Sider, Content } = Layout;

function Penarikan() {
    const [showmodal, setShowmodal] = useState(false) 
    const [tarik, setTarik] = useState('')
    const [keterangan, setKeterangan] = useState('')
    const [sumber, setSumber] = useState('')
    const [log, setLog] = useState([])

    useEffect(() => {
        logPenarikan()
    }, [])


    function show(value) {
        if (value === 1) {
            setShowmodal(true)
        } else {
            setShowmodal(false)
        }
    }

    function simpan(){
        axios.post(URL+'/add_penarikan',{
            jumlah : tarik,
            sumber : sumber,
            keterangan : keterangan,
        })
        .then(res => {
            show(0)
            logPenarikan()
            notification['success']({
                message: "Sukses",
                description:
                    "Pengelauran Berhasil di Simpan",
            });
        })
    }

    async function logPenarikan(){
        await axios.get(URL+'/log_penarikan')
        .then(res => {
            // if (res.data.status === 200) {
            const data = []
            let data_length = res.data.data.length
            for (let i = 0; i < data_length; i++) {
                data.push({
                    no: i + 1,
                    jumlah: res.data.data[i].jumlah,
                    keterangan: res.data.data[i].keterangan,
                    sumber: res.data.data[i].sumber,
                    tanggal: res.data.data[i].created_at
                })

            }
            setLog(data)
        })
    }

    const columns = [
        {
            title: 'Nomor',
            dataIndex: 'no',
            key: 'index',
        },
        {
            title: 'Jumlah Penarikan',
            dataIndex: 'jumlah',
            key: 'name',
            render: (text, record) => (
                <NumberFormat thousandSeparator={true} displayType={'text'} value={record.jumlah} />
            )
        },
        {
            title: 'Sumber',
            dataIndex: 'sumber',
            key: 'jumlah',
            render: (tetx, record) => {
                if (record.sumber === 'laba') {
                    return (
                        <Tag color={'green'} >
                          {record.sumber}
                        </Tag>
                    )
                } else {
                    return (
                        <Tag color={'volcano'} >
                        {record.sumber}
                      </Tag>
                    )
                }
            }
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

    function handleChange(value) {
        console.log(`selected ${value}`);
        setSumber(value)
    }

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
            />
           
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
                    style={{width:'100%'}}
                    value={tarik}
                    onChange={value => setTarik(value)}
                />
                <br />
                <br />
                <Text>Keterangan</Text>
                <Input placeholder="Keterangan" value={keterangan} onChange={e => setKeterangan(e.target.value)} allowClear  />
                <br />
                <br />
                <Select
                    placeholder="Sumber"
                    onChange={handleChange}
                    style={{ width: '100%' }}
                >
                    <Option  value="modal">Modal</Option>
                    <Option  value="laba">Laba</Option>
                </Select> 
               
            </Modal>
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
        </Content>
    )
}

export default Penarikan;