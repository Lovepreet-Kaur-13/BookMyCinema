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
import UserProfile from './pages/UserProfile';
import SingleMovie from './pages/Home/SingleMovie';


function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          <Route path="/admin" element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          } />
          <Route path="/partner" element={
            <ProtectedRoute>
              <Partner />
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
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
