import logo from './logo.svg';
import './App.css';
import Chart from 'chart.js/auto';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Wrapper from './Pages/Wrapper';
import Home from './Pages/Home';
import Company from './Pages/Company/Company';
import AddCompany from './Pages/Company/AddCompany';
import Login from './Pages/Login';
import Product from './Pages/Product/Product';
import AddProduct from './Pages/Product/AddProduct';
import OpenMap from './Components/OpenMap';
import MapContext from './Components/MapContext';
import { useState } from 'react';
import { toastConfig } from 'react-simple-toasts';
import 'react-simple-toasts/dist/theme/dark.css'; // choose your theme
import EditCompany from './Pages/Company/EditCompany';
import EditProduct from './Pages/Product/EditProduct';
import Employe from './Pages/Employe/Employe';
import AddEmploye from './Pages/Employe/AddEmploye';
import EditEmploye from './Pages/Employe/EditEmploye';
import Brand from './Pages/Brand/Brand';
import AddBrand from './Pages/Brand/AddBrand';
import EditBrand from './Pages/Brand/EditBrand';



function App() {

  toastConfig({ theme: 'dark' });

  const [mapValue, setMapValue] = useState(null)

  return (
    <>
      <MapContext.Provider value={{ mapValue: mapValue, setMapValue: setMapValue }}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/openMap' element={<OpenMap />} />
            <Route element={<Wrapper />}>
              <Route path='/home' element={<Home />} />
              <Route path='/company' element={<Company />} />
              <Route path='/addcompany' element={<AddCompany />} />
              <Route path='/editcompany/:id' element={<EditCompany />} />
              <Route path='/product' element={<Product />} />
              <Route path='/addproduct' element={<AddProduct />} />
              <Route path='/editproduct/:id' element={<EditProduct />} />
              <Route path='/team' element={<Employe />} />
              <Route path='/addteam' element={<AddEmploye />} />
              <Route path='/editteam/:id' element={<EditEmploye />} />
              <Route path='/brand' element={<Brand />} />
              <Route path='/addbrand' element={<AddBrand />} />
              <Route path='/editbrand/:id' element={<EditBrand />} />
            </Route>
          </Routes>  
        </BrowserRouter>
      </MapContext.Provider>
    </>
  );
}

export default App;
