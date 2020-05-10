import React from 'react';
import { Layout, PageHeader, Row, Col, Card, Typography, Divider } from 'antd';
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
import { useSelector, useDispatch } from 'react-redux';
import Chart from "react-apexcharts";


const { Header, Sider, Content } = Layout;
const { Title } = Typography;

const options = {
    chart: {
      id: "basic-bar"
    },
    xaxis: {
      categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
    }
  }

const series =  [
    {
      name: "series-1",
      data: [30, 40, 45, 50, 49, 60, 70, 91]
    }
  ]

function Dashboard() {
    const counter = useSelector(state => state.counter)
    const dispatch = useDispatch();

    return (
        <Content
            //className="site-layout-background"
            style={{
                margin: '24px 16px',
                padding: 24,
                minHeight: 280,
            }}
        >
            <PageHeader
                className="site-page-header"
                title="Dashboard"
                //breadcrumb={{ routes }}
                subTitle="Dashboard Page Content Here"
                extra={[
                    <><Title level={1}> 10,500,000</Title></>
                ]}
            />
            {/* <h1>Counter : {counter}</h1>
            <button onClick={()=>dispatch({type:"TAMBAH"})}>Tambah</button> */}
            <Row>
                <Col span={6} style={{ padding: 10 }}>
                    <Card bordered={false} style={{ width: '100%' }}>
                        <Row>
                            <Col span={12} style={{ paddingRight: 30 }}>
                                <center>
                                    <img src="https://image.flaticon.com/icons/svg/766/766538.svg" width='50' />
                                </center>
                            </Col>
                            <Col span={12}>
                                <h1 style={{ fontSize: 20, marginBottom: 0 }}>10,520,000</h1>
                                <p>Kas Modal</p>
                            </Col>
                        </Row>
                    </Card>
                </Col>
                <Col span={6} style={{ padding: 10 }}>
                    <Card bordered={false} style={{ width: '100%' }}>
                        <Row>
                            <Col span={12} style={{ paddingRight: 30 }}>
                                <center>
                                    <img src="https://image.flaticon.com/icons/svg/766/766545.svg" width='50' />
                                </center>
                            </Col>
                            <Col span={12}>
                                <h1 style={{ fontSize: 20, marginBottom: 0 }}>1,200,000</h1>
                                <p>Keuntungan</p>
                            </Col>
                        </Row>
                    </Card>
                </Col>
                <Col span={6} style={{ padding: 10 }}>
                    <Card bordered={false} style={{ width: '100%' }}>
                        <Row>
                            <Col span={12} justify='center' align='center' style={{ paddingRight: 30 }}>
                                <center>
                                    <img src="https://image.flaticon.com/icons/svg/766/766544.svg" width='50' />

                                </center>
                            </Col>
                            <Col span={12}>
                                <h1 style={{ fontSize: 20, marginBottom: 0 }}>800,000</h1>
                                <p>Pengeluaran</p>
                            </Col>
                        </Row>
                    </Card>
                </Col>
                <Col span={6} style={{ padding: 10 }}>
                    <Card bordered={false} style={{ width: '100%' }}>
                        <Row>
                            <Col span={12} style={{ paddingRight: 30 }}>
                                <center>
                                    <img src="https://image.flaticon.com/icons/svg/766/766551.svg" width='50' />
                                </center>
                            </Col>
                            <Col span={12}>
                                <h1 style={{ fontSize: 20, marginBottom: 0 }}>1,200,000</h1>
                                <p>Penarikan</p>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col span={24} style={{ padding: 10 }}>
                    <Card bordered={false} style={{ width: '100%' }}>
                        <Row>
                            <Col span={18} >
                                <div className="mixed-chart">
                                    <Chart
                                        options={options}
                                        series={series}
                                        type="line"
                                        width="750"
                                    />
                                </div>
                            </Col>
                            <Col span={6}>
                                <h1 style={{ fontSize: 20, marginBottom: 0 }}>1,200,000</h1>
                                <p>Penarikan</p>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </Content>
    )
}

export default Dashboard;