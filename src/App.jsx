import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Toaster } from 'react-hot-toast';

import { Route, Routes } from 'react-router';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { loadAuth } from './utils/authStorage';
import './app.css'

import MainLayout from './layout/MainLayout';
import DashboardLayout from './layout/DashboardLayout';
import Navbar from './components/Navigate/Navbar';
import PageNotFound from './pages/PageNotFound';
import HomePage from './pages/HomePage';
import Vehicles from './pages/Vehicles';
import VehicleDetails from './pages/VehicleDetails';
import Booking from './pages/Booking';
import VehicleSearch from './pages/AvailableVehicle';
import AvailableVehicle from './pages/AvailableVehicle';
import AuthPage from './pages/AuthPage';
import BookingReview from './pages/BookingReview';
import MyBookings from './pages/MyBookings';
import MyBookingDetails from './pages/MyBookingDetails';
import CustomerProfile from './pages/Customer/CustomerProfile';
import RecordPickup from './pages/Employee/RecordPickup';
import RecordReturn from './pages/Employee/RecordReturn';
import CompleteBookingSummary from './pages/Employee/CompleteBookingSummary';
import MyVehicles from './pages/Employee/MyVehicles';
import MyVehicleDetails from './pages/Employee/MyVehiclesDetails';
import Dashboard from './pages/Dashboard';
import AuthenticateUser from './pages/AuthenticateUser';
import AddVehicle from './pages/Employee/AddVehicle';

function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    const auth = loadAuth()

    if (auth.token) {
      dispatch({
        type: "AUTH/RESTORE",
        payload: auth
      });
    } else {
      dispatch({
        type: "AUTH/NO_SESSION"
      });
    }
  }, [dispatch]);

  return (
    <>
      <Toaster position='top-right' />
      <Routes>

        {/* Public */}
        <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/vehicles" element={<Vehicles />} />
            <Route path="/available-vehicle" element={<AvailableVehicle />} />
            <Route path="/vehicle-details/:vehicleId" element={<VehicleDetails />} />
            <Route path="/booking/:vehicleId" element={<Booking />} />
        </Route>

        <Route path="/review-booking" element={<BookingReview />} />

        <Route path="/auth" element={<AuthPage />} />

        {/* Dashboard */}

        <Route element={<AuthenticateUser />}>
          <Route path="/dashboard" element={<DashboardLayout />}>

          <Route index element={<Dashboard />} />

          <Route path="my-bookings" element={<MyBookings />}/>
          <Route path="my-bookings/:bookingId" element={<MyBookingDetails />}/>
          <Route path="customer-profile" element={<CustomerProfile />}/>
          <Route path="my-bookings/:bookingId/pickup" element={<RecordPickup />}/>
          <Route path="my-bookings/:bookingId/return" element={<RecordReturn />}/>
          <Route path="my-bookings/:bookingId/summary" element={<CompleteBookingSummary />}/>

          <Route path="my-vehicles" element={<MyVehicles />}/>
          <Route path="my-vehicles/:vehicleId" element={<MyVehicleDetails />}/>
          <Route path="my-vehicles/add" element={<AddVehicle />} />
            </Route>
        </Route>

        <Route path="*" element={<PageNotFound />} />

      </Routes>
    </>
  )
}

export default App
