import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap-icons/font/bootstrap-icons.css';


import { Route, Routes } from 'react-router';

import MainLayout from './layout/MainLayout';
import DashboardLayout from './layout/DashboardLayout';
import Navbar from './components/Navigate/Navbar';
import PageNotFound from './pages/PageNotFound';
import HomePage from './pages/HomePage';
import Vehicles from './pages/Vehicles';
import VehicleDetails from './pages/VehicleDetails';
import Booking from './pages/Booking';

import './app.css'

function App() {

  return (
    <>
      <Routes>

        {/* Public */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/vehicles" element={<Vehicles />} />
          <Route path="/vehicle-details/:vehicleId" element={<VehicleDetails />} />
        </Route>

        {/* Dashboard */}

        {/* <Route element={<ProtectedRoute />}> */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            {/* <Route index element={<DashboardHome />} />
            <Route path="profile" element={<Profile />} />
            <Route path="favorites" element={<Favorites />} />
            <Route path="bookings" element={<Bookings />} />
            <Route path="vehicles" element={<Vehicles />} />
            <Route path="employees" element={<Employees />} />
            <Route path="customers" element={<Customers />} />
            <Route path="reports" element={<Reports />} />
            <Route path="branch" element={<Branch />} />
            <Route path="settings" element={<BranchSettings />} />
            <Route path="pricing" element={<Pricing />} />
            <Route path="categories" element={<Categories />} /> */}
          </Route>

        <Route path="*" element={<PageNotFound />} />

      </Routes>
    </>
  )
}

export default App
