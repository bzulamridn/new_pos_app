import React, { useState } from 'react';
import { Link, browserHistory } from 'react-router';
import { Layout, Menu } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    HomeOutlined,
    SkinOutlined,
    ShoppingCartOutlined,
    CarOutlined,
    UsergroupAddOutlined,
    CodeSandboxOutlined,
    DollarCircleOutlined
} from '@ant-design/icons';
import 'antd/dist/antd.css';
import './Master.css';

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;

export default function Master(props) {
    const [collapsed, setCollapsed] = useState(true);
    const [marginleft, setMarginleft] = useState('')
    const toggle = () => {
        setCollapsed(!collapsed)
    }

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider trigger={null} collapsible collapsed={collapsed}
                style={{
                    overflow: 'auto',
                    height: '100vh',
                    position: 'fixed',
                    left: 0,
                }}>
                <div className="logo" />
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1" onClick={() => browserHistory.push('/')}>
                        <HomeOutlined />
                        <span>Beranda</span>
                    </Menu.Item>
                    <Menu.Item key="2" onClick={() => browserHistory.push('/transaksi')}>
                        <ShoppingCartOutlined />
                        <span>Transaksi</span>
                    </Menu.Item>
                    <SubMenu
                        key="4"
                        title={
                            <span>
                                <SkinOutlined />
                                <span>Item / Barang</span>
                            </span>
                        }
                    >
                        <Menu.Item key="5" onClick={() => browserHistory.push('/kategoriitem')}>
                            <span>Kategori Item</span>
                        </Menu.Item>
                        <Menu.Item key="6" onClick={() => browserHistory.push('/barang')}>
                            <span>Inventori Item</span>
                        </Menu.Item>
                        <Menu.Item key="7" onClick={() => browserHistory.push('/barang')}>
                            <span>Pesan Item</span>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu
                        key="8"
                        title={
                            <span>
                                <DollarCircleOutlined />
                                <span>Keuangan</span>
                            </span>
                        }
                    >
                        <Menu.Item key="9" onClick={() => browserHistory.push('/modal')}>
                            <span>Modal </span>
                        </Menu.Item>
                        <Menu.Item key="12" onClick={() => browserHistory.push('/keuntungan')}>
                            <span>Laba/ Untung </span>
                        </Menu.Item>
                        <Menu.Item key="13" onClick={() => browserHistory.push('/pengeluaran')}>
                            <span>Pengeluaran</span>
                        </Menu.Item>
                        <Menu.Item key="14" onClick={() => browserHistory.push('/penarikan')}>
                            <span>Penarikan</span>
                        </Menu.Item>
                        <Menu.Item key="9" onClick={() => browserHistory.push('/modal')}>
                            <span>Saving (Cooming Soon) </span>
                        </Menu.Item>
                    </SubMenu>
                    {/* <Menu.Item key="12" onClick={() => browserHistory.push('/paket')}>
                        <CodeSandboxOutlined />
                        <span>Paket On</span>
                    </Menu.Item> */}
                </Menu>
            </Sider>
            <Layout className="site-layout" style={{ marginLeft:80 }}>
                <Header className="site-layout-background" style={{ padding: 0 }}>

                </Header>
                {props.children}
            </Layout>
        </Layout>
    )
}


