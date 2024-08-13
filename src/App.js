import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthProvider from "./authantication/AuthProvider";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import NoMatch from "./pages/NoMatch";
import ProtectedRoute from "./authantication/ProtectedRoute";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Forget from "./pages/Forgot";
import Otp from "./pages/Otp";
import ChangePassword from "./pages/ChangePassword";
import Explore from "./pages/Explore";
import Dashboard from "./pages/Dashboard";
import CommingSoon from "./pages/CommingSoon";

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
           <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<CommingSoon />} />
            <Route path="/login" element={<CommingSoon />} />
            <Route path="/register" element={<CommingSoon />} />
            <Route path="/forgot-password" element={<CommingSoon />} />
            <Route path="/varify-otp" element={<CommingSoon />} />
            <Route path="/change-password" element={<CommingSoon />} />
            <Route element={<ProtectedRoute requiredRole="user" />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
            <Route element={<ProtectedRoute requiredRole="ngo" />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
            <Route path="*" element={<CommingSoon />} />
          </Routes>
        </AuthProvider>
        <Footer />
      </Router>
    </>
  );
}
export default App;
