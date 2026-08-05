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
import ProtectedRoute from './pages/ProtectedRoute';
import BookingReview from './pages/BookingReview';

function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    const auth = loadAuth();

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
            <Route path="/review-booking" element={<BookingReview />} />
        </Route>

        <Route path="/auth" element={<AuthPage />} />

        {/* Dashboard */}

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardLayout />}>
            </Route>
        </Route>

        <Route path="*" element={<PageNotFound />} />

      </Routes>
    </>
  )
}

export default App
