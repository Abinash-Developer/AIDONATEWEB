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
import PasswordProtect from "./components/PasswordProtect";
import Thankyou from "./pages/Thankyou";

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <PasswordProtect>
           <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/thank-you" element={<Thankyou />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<Forget />} />
            <Route path="/varify-otp" element={<Otp />} />
            <Route path="/change-password" element={<ChangePassword />} />
            <Route path="/dashboard" element={<Dashboard />} /> 
            <Route element={<ProtectedRoute requiredRole="user" />}>
              {/* <Route path="/dashboard" element={<Dashboard />} /> */}
            </Route>
            <Route element={<ProtectedRoute requiredRole="ngo" />}>
              {/* <Route path="/dashboard" element={<Myaccount />} /> */}
            </Route>
            <Route path="*" element={<NoMatch />} />
          </Routes>
          <Footer />
          </PasswordProtect>
         
        </AuthProvider>
       
      </Router>
    </>
  );
}
export default App;
