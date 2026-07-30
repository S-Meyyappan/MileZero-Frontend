import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap-icons/font/bootstrap-icons.css';


import { Route, Routes } from 'react-router';

import MainLayout from './pages/MainLayout';
import Navbar from './components/Navbar';
import PageNotFound from './pages/PageNotFound';
import HomePage from './pages/HomePage';
import Vehicles from './pages/Vehicles';
import VehicleDetails from './pages/VehicleDetails';
import Booking from './pages/Booking';

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/vehicles" element={<Vehicles />} />
            <Route path="/vehicle-details/:vehicleId" element={<VehicleDetails />} />
        </Route>
        <Route path="/booking/:vehicleId" element={<Booking />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  )
}

export default App
