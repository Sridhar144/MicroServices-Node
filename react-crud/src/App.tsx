import React from 'react';
import logo from './logo.svg';
import './App.css';
import Nav from './admin/components/Nav';
import Menu from './admin/components/Menu';
import Products from './admin/Products';
import {BrowserRouter, 
  Routes, 
  Route} from 'react-router-dom';
import Main from './main/Main';
import ProductsCreate from './admin/ProductsCreate';
import ProductsEdit from './admin/ProductsEdit';

function App() {
  return (
    <div className="App">
     
            <BrowserRouter>
                <Routes>
                <Route path='/' element={<Main/>}/>
                <Route path='/admin/products' element={<Products/>}/>
                <Route path='/admin/products/create' element={<ProductsCreate/>}/>
                <Route path='/admin/products/:id/edit' element={<ProductsEdit/>}/>
                </Routes>
            </BrowserRouter>
    </div>
  );
}

export default App;