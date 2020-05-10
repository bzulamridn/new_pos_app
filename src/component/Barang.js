import React, { useState, useEffect } from 'react';
import { Layout, PageHeader, Row, Col, Divider, Modal, Button, Input, Select, InputNumber, Typography, Popconfirm, Table } from 'antd';
import axios from 'axios'
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
    DeleteOutlined
} from '@ant-design/icons';
import 'antd/dist/antd.css';
import Barcode from 'react-barcode'
import NumberFormat from 'react-number-format';

const { Text } = Typography
const { Option } = Select;
const { Header, Sider, Content } = Layout;


function Barang() {
    const [showmodal, setShowmodal] = useState(false)
    const [saveLoading, setSaveloading] = useState(false)
    const [selectedItems, setSelectedItems] = useState([])
    const [kategorilist, setKategorilist] = useState([])
    const [idkategori, setIdkategori] = useState('')
    const [nama_item, setNamaitem] = useState('')
    const [jumlah_item, setJumlahitem] = useState('')
    const [harga_modal, setHargamodal] = useState('')
    const [harga_jual, setHargajual] = useState('')
    const [listitem, setListitem] = useState([])
    //const filteredOptions = kategorilist.filter(kategorilist => );

    useEffect(() => {
        listkategori()
        list_item()
    }, [])

    function listkategori() {
        axios.get('http://localhost:3000/list_kategori')
            .then(res => {
                if (res.data.status === 200) {
                    setKategorilist(res.data.data)
                    console.log(res.data.data)
                }
            })
    }


    function show(value) {
        if (value === 1) {
            setShowmodal(true)
        } else {
            setShowmodal(false)
        }
    }

    function simpan() {
        axios.post('http://localhost:3000/create_item', {
            id_kategori: '#',
            nama_item: nama_item,
            jumlah_item: jumlah_item,
            harga_modal: harga_modal,
            harga_jual: harga_jual
        })
            .then(res => {
                if (res.data.status === 'success') {
                    alert("sukses")
                    list_item()
                    show(0)
                    setHargajual('')
                    setHargamodal('')
                    setNamaitem('')
                    setJumlahitem('')
                } else {
                    alert("Gagal")
                }
            })
    }

    function handleChange(value) {
        console.log(`selected ${value}`);
        setIdkategori(value)
    }


    const columns = [
        {
            title: 'Nomor',
            key: 'key',
            dataIndex: 'no',
        },
        {
            title: 'Barcode',
            key: 'id',
            render: (text, record) => (
                <span>
                    <Barcode value={record.id} />
                </span>
            ),
        },
        {
            title: 'Nama Item',
            dataIndex: 'nama',
            key: 'nama',
        },
        {
            title: 'Jumlah / Stok',
            dataIndex: 'jumlah',
            key: 'jumlah',
        },
        {
            title: 'Harga Modal',
            dataIndex: 'modal',
            key: 'modal',
            render : (rext, record, index) => (
                <NumberFormat thousandSeparator={true} displayType={'text'}  value={record.modal}/>
            )
        },
        {
            title: 'Harga Jual',
            dataIndex: 'jual',
            key: 'jual',
            render : (rext, record, index) => (
                <NumberFormat thousandSeparator={true} displayType={'text'}  value={record.jual}/>
            )
        },
        {
            title: 'Laba / Untung',
            key: 'jual',
            dataIndex: 'laba',
            render : (rext, record, index) => (
                <NumberFormat thousandSeparator={true} displayType={'text'}  value={record.laba}/>
            )
        },
        {
            title: 'Total Laba / Untung',
            key: 'jual',
            dataIndex: 'total',
            render : (rext, record, index) => (
                <NumberFormat thousandSeparator={true} displayType={'text'}  value={record.total}/>
            )
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <span>
                    <Popconfirm
                        title="Anda yakin menghapus Data ini?"
                        //onConfirm={() => hapus(record.id)}
                        // onCancel={cancel}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button key="hapus_kategori" type="danger" icon={<DeleteOutlined />} >Hapus</Button>
                    </Popconfirm>
                </span>
            ),
        },
    ];

    async function list_item() {
        await axios.get('http://localhost:3000/list_item')
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
                        id: res.data.data[i].id_item,
                        nama: res.data.data[i].nama_item,
                        jumlah : res.data.data[i].jumlah_item,
                        modal: res.data.data[i].harga_modal,
                        laba : parseInt(res.data.data[i].harga_jual) - parseInt(res.data.data[i].harga_modal), 
                        jual: res.data.data[i].harga_jual,
                        total : res.data.data[i].total_laba
                    })

                }
                setListitem(data)
            })
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
                title="Barang"
                //breadcrumb={{ routes }}
                subTitle="Barang Page Content Here"
                extra={[
                    <Button key="1" type="primary" onClick={() => show(1)}>
                        Tambah Barang / Item
                    </Button>,
                ]}
            />
            <Divider />
            <Modal
                title="Tambah Barang / Item"
                visible={showmodal}
                onOk={simpan}
                confirmLoading={saveLoading}
                onCancel={() => show(0)}
            >
                <Text>Nama Barang / Item</Text>
                <Input placeholder="Nama Barang / Item" value={nama_item} onChange={e => setNamaitem(e.target.value)} allowClear />
                <br />
                <br />
                <Text>Jumlah Barang / Item</Text>
                <InputNumber placeholder="Jumlah Barang / Item" value={jumlah_item} onChange={value => setJumlahitem(value)} style={{ width: '100%' }} allowClear prefix={<SkinOutlined />} />
                {/* <br />
                <br />
                <Text>Kategori</Text>
                <Select
                    mode="multiple"
                    placeholder="Kategori"
                    onChange={handleChange}
                    style={{ width: '100%' }}
                >
                    {kategorilist.map((kategori, index) =>
                        <Option key={index} value={kategori.id}>{kategori.nama_kategori}</Option>
                    )}
                </Select> */}
                <br />
                <br />
                <Text>Harga Modal</Text>
                <InputNumber
                    defaultValue={100000}
                    formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                    style={{ width: '100%' }}
                    value={harga_modal}
                    onChange={value => setHargamodal(value)}
                />
                <br />
                <br />
                <Text>Harga Jual</Text>
                <InputNumber
                    defaultValue={100000}
                    formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                    style={{ width: '100%' }}
                    value={harga_jual}
                    onChange={value => setHargajual(value)}
                />
                <br />
                <br />

            </Modal>
            <Table columns={columns} dataSource={listitem} />
        </Content>
    )
}

export default Barang;