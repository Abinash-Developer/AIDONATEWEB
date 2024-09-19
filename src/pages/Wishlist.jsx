import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../authantication/AuthProvider";  
const Wishlist = () => {
    const { userRole, isAuthenticated } = useContext(AuthContext);
    const [wishlist, setWishlist] = useState([]);
    useEffect(() => {
          try {
              fetchWishlist();
          } catch (error) {
            console.error("Error fetching data:", error);
          }
      },[]);
      const fetchWishlist = async () => {
        try {
          const wishlistResponse = await axios.get(
            `${process.env.REACT_APP_API_URL}/users/fetch-wishlist-ByIndividualUser`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                  },
            }
          );
          setWishlist(wishlistResponse.data.data);
        } catch (error) {
          Swal.fire({
            title: "Error!",
            text: "Server not started yet !!",
            icon: "error",
            confirmButtonText: "Okay",
          });
        }
      };
      //Remove wishlist 

      const handleRemoveFromWishlist = async ()=>{
        
      }
  return (
    <>
      <section className="explore-sec">
        <div className="container">
        <div className="explore-list">
            <div className="explore-sec-content">
              <div className="row">
                {wishlist.length > 0 ? (
                  wishlist.map((wishlist, index) => (
                    <div className="col-lg-4" key={index}>
                      <div className="explore-box">
                        <div className="explore-img">
                          <img src="img/list-gallery-img.png" alt="" />
                          <div className="explore-img-icons">
                            <div className="explore-img-icon-i">
                              <i className="fa-solid fa-arrow-up-from-bracket" />
                            </div>
                            <div className="explore-img-icon-i">
                           
                                  <i
                                    className="fa-solid fa-heart" onClick={()=>{handleRemoveFromWishlist()}}
                                   />
                             
                            </div>
                          </div>
                        </div>
                        <div className="explore-box-btm">
                          <div className="explore-box-btm-user">
                            <div className="explore-box-btm-user-img">
                              <img src="img/Avatar.svg" alt="" />
                            </div>
                            <div className="explore-box-btm-user-name">
                              <p>Jakob Septimus</p>
                            </div>
                          </div>
                          <div className="explore-text">
                            <h3>{wishlist.ngo_id.ngoname}</h3>
                            <p>
                              I would like nothing more than to continue baking
                              bread for you, to be able to ...
                            </p>
                          </div>
                          <div className="explore-donate">
                            <div
                              className="explore-donate-bar"
                              style={{
                                "--donation-width": `30%`,
                              }}
                            >
                                
                            </div>
                            <div className="explore-donate-amount-list">
                              <div className="campgin-donate-amount">
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-12">
                    <h5>No data found</h5>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default Wishlist;
