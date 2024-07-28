import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthProvider from "./authantication/AuthProvider";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import NoMatch from "./pages/NoMatch";
import ProtectedRoute from "./authantication/ProtectedRoute";
import Userdashboard from "./pages/users/Userdashboard";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Forget from "./pages/Forgot";
import Otp from "./pages/Otp";
import ChangePassword from "./pages/ChangePassword";

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
           <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<Forget />} />
            <Route path="/varify-otp" element={<Otp />} />
            <Route path="/change-password" element={<ChangePassword />} />
            <Route element={<ProtectedRoute requiredRole="user" />}>
              <Route path="/user-account" element={<Userdashboard />} />
            </Route>
            <Route path="*" element={<NoMatch />} />
          </Routes>
        </AuthProvider>
        <Footer />
      </Router>
    </>
  );
}
export default App;
