import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap-icons/font/bootstrap-icons.css';


import { Route, Routes } from 'react-router';

import MainLayout from './pages/MainLayout';
import Navbar from './components/Navbar';
import PageNotFound from './pages/PageNotFound';

function App() {

  return (
    <>
    <Routes>
      <Route path = "/" element={<MainLayout/>}/>
      <Route path = "*" element={<PageNotFound/>}/>
    </Routes>
    </>
  )
}

export default App
