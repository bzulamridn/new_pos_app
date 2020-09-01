import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import Master from './Master';
import Dashboard from './component/Dashboard';
import Barang from './component/Barang';
import Penarikan from './component/Penarikan';
import Paket from './component/Paket';
import Modal from './component/Modal';
import Transaksi from './component/Transaksi';
import KetegoriItem from './component/KategoriItem';
import KategoriItem from './component/KategoriItem';
import Pengeluaran from './component/Pengeluaran';
import Keuntungan from './component/Keuntungan';

function Routemain(){
    return(
        <Router history={browserHistory} basename={'/newpos'}>
            <Route component={Master}>
                <Route path={`${process.env.PUBLIC_URL}/`} component={Dashboard} />
                <Route path={`${process.env.PUBLIC_URL}/barang`} component={Barang} />
                <Route path={`${process.env.PUBLIC_URL}/kategoriitem`} component={KategoriItem} />
                <Route path={`${process.env.PUBLIC_URL}/modal`} component={Modal} />
                <Route path={`${process.env.PUBLIC_URL}/paket`} component={Paket} />
                <Route path={`${process.env.PUBLIC_URL}/pengeluaran`} component={Pengeluaran} />
                <Route path={`${process.env.PUBLIC_URL}/transaksi`} component={Transaksi} />
                <Route path={`${process.env.PUBLIC_URL}/penarikan`} component={Penarikan} />
                <Route path={`${process.env.PUBLIC_URL}/keuntungan`} component={Keuntungan} />
            </Route>
            {/* <Route component={Master}>
                <Route path='/' component={Dashboard} />
                <Route path='/barang' component={Barang} />
                <Route path='/kategoriitem' component={KategoriItem} />
                <Route path='/modal' component={Modal} />
                <Route path='/paket' component={Paket} />
                <Route path='/pengeluaran' component={Pengeluaran} />
                <Route path='/transaksi' component={Transaksi} />
                <Route path='/penarikan' component={Penarikan} />
                <Route path='/keuntungan component={Keuntungan} />
            </Route> */}
        </Router>
    );
}

export default Routemain