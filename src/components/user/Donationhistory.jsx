import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../authantication/AuthProvider";
import DataTable from "./DataTable";
const Donationhistory = () => {
  const { userID } = useContext(AuthContext);
  const [donation,setDonations]=useState([]);
  const token  = localStorage.getItem('token');
  // get donation history

  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = async () => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/users/get-donation-history/${userID}`,{
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
            setDonations(response.data.data);
      } catch (error) {
        console.log("Error fetching donation history:", error);
      } 
  };
  
  return (
    <>
      <div
        className="tab-pane fade show active"
        id="v-pills-dashboard"
        role="tabpanel"
        aria-labelledby="v-pills-dashboard-tab"
      >
        <div className="change-authentication tab-content-box">
          <h5>Donation History</h5>
          <div className="My-dasboard tab-content-tab">
            <DataTable data={donation} />
          </div>
        </div>
      </div>
    </>
  );
};
export default Donationhistory;
