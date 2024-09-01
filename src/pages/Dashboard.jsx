import React, { useContext,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../authantication/AuthProvider";
import Myaccount from "./charity/Myaccount";
import Useraccount from "./user/Useraccount";
const Dashboard = ()=>{
  const { userRole, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null; 
  }
  
  switch (userRole) {
    case 'ngo':
      return <Myaccount />;
    case 'user':
      return <Useraccount />;
    default:
      return  <div>Unauthorized Access</div>;
  }
}
export default Dashboard;