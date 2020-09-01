import React, { useState, useEffect } from 'react';
import { Layout, PageHeader, Row, Col, Button, Modal, Typography, Input, InputNumber, notification, Card, Table, Divider } from 'antd';
import {
    WalletTwoTone,
    HeartTwoTone,
    CreditCardTwoTone,
    CloudTwoTone,
    CalendarTwoTone
} from '@ant-design/icons';
import 'antd/dist/antd.css';
import axios from 'axios';
import Moment from 'moment';
import Chart from "react-apexcharts";
//import 'moment-timezone';
import NumberFormat from 'react-number-format';
import 'moment/locale/id'  // without this line it didn't work
Moment.locale('id');

const URL = 'http://36.89.246.26:4442'
const { Text } = Typography
const { Header, Sider, Content } = Layout;

function Keuntungan() {
    const [showmodal, setShowmodal] = useState(false)
    const [log, setLog] = useState([])
    const [totalLifeTime, setTotalLifeTime] = useState('')
    const [totalTatik, setTotalTarik] = useState('')
    const [kasLaba, setKasLaba] = useState('')
    const [labaTunda, setLabatunda] = useState('')
    const [grafBulan, setGrafBulan] = useState([])
    const [grafLaba, setGrafLaba] = useState([])
    const [bulanan, setBulanan] = useState([])
    const [tahunberjalan, setTahunberjalan] = useState('')

    useEffect(() => {
        logKeuntungan()
    }, [])

    async function logKeuntungan() {
        await axios.get(URL+'/log_keuntungan')
            .then(res => {
                // if (res.data.status === 200) {
                console.log(res.data)
                const data = []
                let data_length = res.data.data.data.length
                console.log(data_length)
                for (let i = 0; i < data_length; i++) {
                    data.push({
                        no: i + 1,
                        trx: res.data.data.data[i].id_trx,
                        laba: res.data.data.data[i].total,
                        tanggal: res.data.data.data[i].created_at
                    })

                }
                setLog(data)
                setTotalLifeTime(res.data.data.total[0].total)
                setTotalTarik(res.data.data.tarik[0].jumlah)
                setLabatunda(res.data.data.laba_tunda[0].totalaba)
                setKasLaba(res.data.data.total[0].total - res.data.data.tarik[0].jumlah)
                setBulanan(res.data.data.laba_per_month)
                setTahunberjalan(res.data.data.tahun_berjalan[0].total)
                //setGrafLaba(res.data.data.laba_per_month.total)
                //console.log(res.data.data.laba_per_month[0].month)

                // for(let x = 0; x < res.data.data.laba_per_month.length ; x++){
                //     setGrafBulan(...grafBulan, res.data.data.laba_per_month[x].month)
                //     setGrafLaba(...grafLaba, res.data.data.laba_per_month[x].total)
                //     console.log(grafLaba)
                // }
            })

    }

    // const options = {
    //     chart: {
    //       id: "basic-bar"
    //     },
    //     xaxis: {
    //       categories: grafBulan.map((item) => item.month.month)
    //     }
    //   }

    // const series =  [
    //     {
    //       name: "series-1",
    //       data: [30, 40, 45, 50, 49, 60, 70, 91]
    //     }
    //   ]


    const columns = [
        {
            title: 'Nomor',
            dataIndex: 'no',
            key: 'index',
        },
        {
            title: 'ID Trx',
            dataIndex: 'trx',
            key: 'index',
        },
        {
            title: 'Laba',
            dataIndex: 'laba',
            key: 'laba',
            render: (text, record) => (
                <NumberFormat thousandSeparator={true} displayType={'text'} value={record.laba} />
            )
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

    const colummsbulanan = [
        {
            title: 'Nomor Bulan',
            dataIndex: 'month',
            key: 'index',
        },
        {
            title: 'Bulan',
            dataIndex: 'month',
            key: 'index',
            render : (text, record) => {
                if(record.month === 1){
                    return <p> Januari </p>
                }else if(record.month === 2){
                    return <p> Februari </p>
                }else if(record.month === 3){
                    return <p> Maret </p>
                }else if(record.month === 4){
                    return <p> April </p>
                }else if(record.month === 5){
                    return <p> Mei </p>
                }else if(record.month === 6){
                    return <p> Juni </p>
                }else if(record.month === 7){
                    return <p> Juli </p>
                }else if(record.month === 8){
                    return <p> Agustus </p>
                }else if(record.month === 9){
                    return <p> September </p>
                }else if(record.month === 10){
                    return <p> Oktober </p>
                }else if(record.month === 11){
                    return <p> November </p>
                }else{
                    return <p> Desember </p>
                }
            }
        },
        {
            title: 'Laba / Untung',
            dataIndex: 'total',
            key: 'index',
           render: (text, record) => (
            <NumberFormat thousandSeparator={true} displayType={'text'} value={record.total} />
           )
        },
    ]


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
                title="Laba / Untung"
                //breadcrumb={{ routes }}
                subTitle="Dashboard monitoring Laba / Untung"
                extra={[

                ]}
            />
            <Divider />
            <Row>
                <Col span={24} style={{ padding: 5 }}>
                    <Card>
                        <Row>
                            <Col span={5}>
                                <Row>
                                    <Col style={{ padding: 10 }}>
                                        <HeartTwoTone twoToneColor="#d63031" style={{ fontSize: 35 }} />
                                    </Col>
                                    <Col style={{ padding: 5 }}>
                                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}> <NumberFormat thousandSeparator={true} displayType={'text'} value={totalLifeTime} /> </Text>
                                        <p>Total Laba (Lifetime)</p>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={5}>
                                <Row>
                                    <Col style={{ padding: 10 }}>
                                        <CreditCardTwoTone style={{ fontSize: 35 }} />
                                    </Col>
                                    <Col style={{ padding: 5 }}>
                                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}> <NumberFormat thousandSeparator={true} displayType={'text'} value={totalTatik} /> </Text>
                                        <p>Total Penarikan</p>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={5}>
                                <Row>
                                    <Col style={{ padding: 10 }}>
                                        <CloudTwoTone twoToneColor="#00b894" style={{ fontSize: 35 }} />
                                    </Col>
                                    <Col style={{ padding: 5 }}>
                                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}> <NumberFormat thousandSeparator={true} displayType={'text'} value={labaTunda} /> </Text>
                                        <p>Laba Tunda</p>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={5}>
                                <Row>
                                    <Col style={{ padding: 10 }}>
                                        <CalendarTwoTone twoToneColor="#6c5ce7" style={{ fontSize: 35 }} />
                                    </Col>
                                    <Col style={{ padding: 5 }}>
                                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}> <NumberFormat thousandSeparator={true} displayType={'text'} value={tahunberjalan} /> </Text>
                                        <p>Laba Tahun Berjalan</p>
                                    </Col>
                                </Row>
                            </Col>
                            {/* <Col span={4}>
                                <Text style={{ fontSize: 18, fontWeight: 'bold' }}> <NumberFormat thousandSeparator={true} displayType={'text'} value={labaTunda} /> </Text>
                                <p>Laba Tahun ini</p>
                            </Col> */}
                            <Col span={4}>

                                <Row>
                                    <Col style={{ padding: 10 }}>
                                        <WalletTwoTone twoToneColor="#e84393" style={{ fontSize: 35 }} />
                                    </Col>
                                    <Col style={{ padding: 5 }}>
                                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}> <NumberFormat thousandSeparator={true} displayType={'text'} value={kasLaba} /> </Text>
                                        <p>Saldo Laba</p>
                                    </Col>
                                </Row>

                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col span={12} style={{ padding: 5 }}>
                    <Card title="Grafik Pendapatan Bulanan Tahun 2020">
                        <Table columns={colummsbulanan} dataSource={bulanan} />
                    </Card>
                </Col>
                <Col span={12} style={{ padding: 5 }}>
                    <Card title="Riwayat Transaksi" style={{ padding: 5 }}>
                        <Table columns={columns} dataSource={log} />
                    </Card>
                </Col>
            </Row>

        </Content>
    )
}

export default Keuntungan;