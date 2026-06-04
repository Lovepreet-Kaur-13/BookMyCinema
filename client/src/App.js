import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import { Provider } from "react-redux";
import store from './redux/store';
import Admin from './pages/Admin';
import Partner from './pages/Partner';
import UserProfile from './pages/UserProfile/index';
import SingleMovie from './pages/Home/SingleMovie';
import BookShow from './pages/Home/BookShow';
import MyBookings from "./pages/Home/MyBookings";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import ForgotPassword from './pages/Login/ForgotPassword';
import ResetPassword from './pages/Login/ResetPassword';
import LandingPage from './pages/Landing/LandingPage';

const stripePromise = loadStripe(
  process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY
);

function App() {
  return (
    
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          <Route path="/admin" element={
            <ProtectedRoute role="admin">
              <Admin />
            </ProtectedRoute>
          } />
          <Route path="/partner" element={
            <ProtectedRoute role="partner">
              <Partner />
            </ProtectedRoute>
          } />
          <Route path="/my-bookings" element={
            <ProtectedRoute role="user">
              <MyBookings />
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          } />
          <Route path="/movie/:id" element={
            <ProtectedRoute>
              <SingleMovie />
            </ProtectedRoute>
          } />
          <Route
            path="/book-show/:id"
            element={
              <ProtectedRoute role="user">
                <Elements stripe={stripePromise}>
                  <BookShow />
                </Elements>
              </ProtectedRoute>
            }
          />
          <Route path="/" element ={<LandingPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
