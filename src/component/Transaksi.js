import React, { useState, useEffect, useRef } from 'react';
import { Layout, PageHeader, Row, Col, Card, Tabs, Divider, Modal, InputNumber, Button, notification } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    PlusOutlined,
    MinusOutlined,
    SkinOutlined,
    ShoppingCartOutlined,
    CarOutlined,
    UsergroupAddOutlined,
    CodeSandboxOutlined,
    SaveOutlined,
    DeleteOutlined,
    DollarCircleOutlined
} from '@ant-design/icons';
import 'antd/dist/antd.css';
import axios from 'axios'
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Item from 'antd/lib/list/Item';
import './assets/style.css'
import NumberFormat from 'react-number-format';

const options = [
    { value: 'Burns Bay Road' },
    { value: 'Downing Street' },
    { value: 'Wall Street' },
];


const { Header, Sider, Content } = Layout;
const { TabPane } = Tabs;

function Transaksi() {
    const [namaitem, setNamaitem] = useState([])
    const [indekx, setIndex] = useState('')
    const [keranjang, setKeranjang] = useState([])
    const [namaitemkeranjang, setNamaitemkeranjang] = useState([])
    const [jumlahitem, setJumlahitem] = useState(1)
    const [total, setTotal] = useState('')
    const [showmodal, setShowmodal] = useState(false)
    const [grandtotal, setGrandtotal] = useState(0)
    const [hapus, setHapus] = useState('')

    useEffect(() => {
        list_item()
    }, [namaitemkeranjang])

    function callback(key) {
        console.log(key);
    }

    function show(value) {
        if (value === 1) {
            setShowmodal(true)
        } else {
            setShowmodal(false)
        }
    }

    function plusMinus(val) {
        if (val === 1) {
            setJumlahitem(jumlahitem + 1)
        } else {
            setJumlahitem(jumlahitem - 1)
        }
    }

    async function list_item() {
        await axios.get('http://localhost:3000/list_item_fortx')
            .then(res => {
                if (res.data.status === 200) {
                    setNamaitem(res.data.data)
                    console.log(res.data.data)
                }
            })
    }

    async function substrindex() {
        if (indekx === '') {

        } else {
            let str = indekx;
            let batas = str.indexOf('-');
            let indexitem = await indekx.substring(0, batas)
            cariItem(indexitem)
        }
    }

    async function cariItem(val) {
        let id_itemx = await namaitem[val].id_item
        let lengthx = await namaitemkeranjang.length
        console.log(lengthx + " ini panjang")
        if (lengthx !== 0) {
            let indexKeranjang = namaitemkeranjang.findIndex(item => item.id_item === id_itemx)
            console.log(indexKeranjang)
            if (indexKeranjang < 0) {
                console.log("Baru")
                let id_item = namaitem[val].id_item
                let nama_item = namaitem[val].nama_item
                let harga_jual = namaitem[val].harga_jual
                let harga_modal = namaitem[val].harga_modal
                let total = namaitem[val].harga_jual * jumlahitem
                setGrandtotal(grandtotal + total)
                show(0)
                setJumlahitem(1)
                setNamaitemkeranjang([...namaitemkeranjang, { id_item, nama_item, harga_modal, harga_jual, jumlahitem, total }])
            } else {
                console.log("Updated")
                namaitemkeranjang[indexKeranjang].jumlahitem = namaitemkeranjang[indexKeranjang].jumlahitem + jumlahitem
                namaitemkeranjang[indexKeranjang].total = namaitemkeranjang[indexKeranjang].jumlahitem * namaitem[val].harga_jual
                let total = namaitem[val].harga_jual * jumlahitem
                setGrandtotal(grandtotal + total)
                show(0)
                setJumlahitem(1)
            }
        } else {
            console.log("Baru index ke 0")
            let id_item = await namaitem[val].id_item
            let nama_item = await namaitem[val].nama_item
            let harga_jual = await namaitem[val].harga_jual
            let harga_modal = await namaitem[val].harga_modal
            let total = await namaitem[val].harga_jual * jumlahitem
            show(0)
            setJumlahitem(1)
            setGrandtotal(grandtotal + total)
            setNamaitemkeranjang([...namaitemkeranjang, { id_item, nama_item, harga_modal ,harga_jual, jumlahitem, total }])
        }
    }

    function deleteItem(iditem) {
        console.log(iditem)
        namaitemkeranjang.filter((item) => item.id_item != iditem)
        //let hapus = delete namaitemkeranjang[indextodelete]
        console.log("Terhapus")
        setHapus('Terhapus')
    }

    function hapusTrx() {
        setNamaitemkeranjang([])
        setGrandtotal(0)
    }

    const addDelQtt = async (id_item, val) => {
        let indexKeranjang = namaitemkeranjang.findIndex(item => item.id_item === id_item)
        if (val === 1) {
            console.log(indexKeranjang)
            let newjumlah = await namaitemkeranjang[indexKeranjang].jumlahitem + 1
            let newTotal = namaitemkeranjang[indexKeranjang].harga_jual * newjumlah
            namaitemkeranjang[indexKeranjang].jumlahitem = newjumlah
            namaitemkeranjang[indexKeranjang].total = newTotal
            console.log(newjumlah)
            let total = namaitemkeranjang[indexKeranjang].harga_jual
            setGrandtotal(grandtotal + parseInt(total))
            show(0)
            setJumlahitem(1)
        } else {
            console.log(0)
            console.log(indexKeranjang)
            let newjumlah = await namaitemkeranjang[indexKeranjang].jumlahitem - 1
            let newTotal = namaitemkeranjang[indexKeranjang].harga_jual * newjumlah
            namaitemkeranjang[indexKeranjang].jumlahitem = newjumlah
            namaitemkeranjang[indexKeranjang].total = newTotal
            console.log(newjumlah)
            let total = namaitemkeranjang[indexKeranjang].harga_jual
            setGrandtotal(grandtotal - parseInt(total))
            show(0)
            setJumlahitem(1)
        }
    }

    function simpanTrx(){
        axios.post('http://localhost:3000/create_trx',{
            transaksi: namaitemkeranjang
        })
        .then(res => {
            if(res.data.status === 200){
                setNamaitemkeranjang([])
                setGrandtotal(0)
                notification['success']({
                    message: "Sukses",
                    description:
                        "Transaksi Berhasil di Simpan",
                });
            }else{
                notification['danger']({
                    message: "Gagal",
                    description:
                        "Transaksi Gagal di Simpan",
                });
            }
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
                title="Transaksi"
                //breadcrumb={{ routes }}
                subTitle="Transaksi Page Content Here"
                extra={[
                    <h1 style={{ fontSize: 50 }}><NumberFormat thousandSeparator={true} displayType={'text'} value={grandtotal} /></h1>
                ]}
            />
            <Row>
                {/* <Col span={12} style={{ padding: 10 }}>
               
                </Col> */}
                <Col span={24} style={{ padding: 10 }}>
                    <Card>
                        <Autocomplete
                            id="free-solo-demo"
                            freeSolo
                            options={namaitem.map((option, index) => +index + "- " + option.id_item + " " + option.nama_item)}
                            onChange={(e, v) => setIndex(v)}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="ID Item / Barang / Nama Item / Barang"
                                    margin="normal"
                                    variant="outlined"
                                    onChange={({ target }) => setIndex(target.value)}
                                    onKeyPress={event => {
                                        if (event.key === 'Enter') {
                                            substrindex()
                                        }
                                    }}
                                />
                            )}
                        />
                        <Row>
                            <Col span={8}>
                                <Button type="danger" style={{ height:60 }} icon={<DeleteOutlined />} block>
                                    Hapus / Clear Trx
                            </Button>
                            </Col>
                            <Col span={8}>
                                <Button type="primary" ghost style={{  height:60 }} onClick={()=> hapusTrx()} icon={<SaveOutlined />} block>
                                    Hold Trx
                                </Button>
                            </Col>
                            <Col span={8}>
                                <Button style={{  height:60 }} type="primary" onClick={() => simpanTrx()} icon={<DollarCircleOutlined />} block>
                                    Bayar / Simpan
                                </Button>
                            </Col>
                        </Row>
                        <Divider />
                        <table border='1' style={{ width: '100%', borderColor: 'grey' }}>
                            <thead style={{ borderBottomWidth: 1, borderBottomColor: 'grey' }}>
                                <tr>
                                    <th><center>No</center></th>
                                    <th>Nama Item</th>
                                    <th>Harga Jual</th>
                                    <th><center>Jumlah</center></th>
                                    <th>Total</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {namaitemkeranjang.map((item, index) =>
                                    <tr key={index}>
                                        <td><center>{index + 1}</center></td>
                                        <td>{item.nama_item}</td>
                                        <td><NumberFormat thousandSeparator={true} displayType={'text'} value={item.harga_jual} /></td>
                                        <td><center><Button type="danger" shape="circle" onClick={() => addDelQtt(item.id_item, 0)} size="small" icon={<MinusOutlined />} ></Button><span style={{ margin: 10 }} >{item.jumlahitem}</span><Button type="primary" onClick={() => addDelQtt(item.id_item, 1)} shape="circle" size="small" icon={<PlusOutlined />} ></Button></center></td>
                                        <td><NumberFormat thousandSeparator={true} displayType={'text'} value={item.total} /></td>
                                        <td><center><Button type="danger" size="small" onClick={() => deleteItem(item.id_item)} icon={<DeleteOutlined />} ></Button></center></td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </Card>
                </Col>
            </Row>
            <Modal
                title="Tambah Barang / Item"
                visible={showmodal}
                onOk={substrindex}
                //confirmLoading={saveLoading}
                onCancel={() => show(0)}
            >
                <table style={{ width: '100%' }}>
                    <tr>
                        <td><center><Button type="danger" size="large" onClick={() => plusMinus(0)}>-</Button></center></td>
                        <td><center><h1 style={{ fontSize: 100, fontWeight: 'bold' }}>{jumlahitem}</h1></center></td>
                        <td><center><Button type="primary" size="large" onClick={() => plusMinus(1)}>+</Button></center></td>
                    </tr>
                </table>
                {/* <InputNumber placeholder="Jumlah Barang / Item" value={jumlahitem} onChange={value => setJumlahitem(value)} style={{ width: '100%' }} allowClear prefix={<SkinOutlined />} autoFocus /> */}
            </Modal>
        </Content>
    )
}

export default Transaksi;