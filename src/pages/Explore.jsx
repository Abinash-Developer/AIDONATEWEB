import axios from "axios";
import { useEffect, useState, useContext } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import queryString from "query-string";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AuthContext } from "../authantication/AuthProvider";

const Explore = () => {
  const { userRole, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [explore, setExplore] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [amount, setAmount] = useState("");

  useEffect(() => {
    // Get Query parameter
    const queryParams = queryString.parse(location.search);
    const priceFilter = queryParams.price || "";
    const dateFilter = queryParams.date || "";
    // Fetch NGO
    fetchExplore(priceFilter, dateFilter);
  }, [location.search]);

  // Fetch NGO Records
  const fetchExplore = async (priceFilter = "", dateFilter = "") => {
    const exploreResponse = await axios.get(
      `${process.env.REACT_APP_API_URL}/users/get_ngo`,
      {
        params: {
          price: priceFilter,
          date: dateFilter, // Include date filter
        },
      }
    );
    setExplore(await exploreResponse?.data?.data);
  };
  // Validation for user payment with register
  const handleNormalSubmit = async (e) => {
    e.preventDefault();
    if (!amount) {
      alert("Please add your donate amount");
      return;
    }
    const token = localStorage.getItem("token");
    try {
      // Register the user
      const registerResponse = await axios.get(
        `${process.env.REACT_APP_API_URL}/users/get_user_detail`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      localStorage.setItem("userID", registerResponse?.data?.data?._id);
      localStorage.setItem(
        "first_name",
        registerResponse?.data?.data?.first_name
      );
      localStorage.setItem(
        "last_name",
        registerResponse?.data?.data?.last_name
      );
      localStorage.setItem("email", registerResponse?.data?.data?.email);
      localStorage.setItem(
        "phoneNumber",
        registerResponse?.data?.data?.phoneNumber
      );
      const closeButton = document.getElementsByClassName("btn-close")[0];
      if (closeButton) {
        closeButton.click();
      }
      // Create the Razorpay order
      const createOrderResponse = await axios.post(
        `${process.env.REACT_APP_API_URL}/users/create-order`,
        { amount: amount }
      );
      // Define Razorpay options
      const options = {
        key: "rzp_test_g4ALmVfn2IXdaU",
        amount: amount * 100,
        currency: "INR",
        name: "NGO Donation",
        description: "Thank you for your generous donation",
        order_id: createOrderResponse.data.orderId,
        handler: async function (response) {
          const paymentDetails = {
            user_id: localStorage.getItem("userID"),
            charity_id: localStorage.getItem("charityID"),
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
            amount: amount,
          };

          try {
            await axios.post(
              `${process.env.REACT_APP_API_URL}/users/save-paymet-details`,
              paymentDetails
            );
            navigate("/thank-you");
          } catch (error) {
            console.log("Error saving payment details:", error);
          }
        },
        prefill: {
          name: `${localStorage.getItem("first_name")} ${localStorage.getItem(
            "last_name"
          )}`,
          email: localStorage.getItem("email"),
          contact: localStorage.getItem("phoneNumber"),
        },
        notes: {
          address: "aidonate",
        },
        theme: {
          color: "#3399cc",
        },
      };

      // Initialize Razorpay
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.response?.data?.message,
        icon: "error",
        confirmButtonText: "Try Again",
      });
    }
  };
  const charityID = (id) => {
    localStorage.setItem("charityID", id);
  };
  const handlePriceFilter = (order) => {
    const queryParams = queryString.parse(location.search);
    const dateFilter = queryParams.date || "";
    const newQueryParams = { ...queryParams, price: order };
    if (dateFilter) {
      newQueryParams.date = dateFilter;
    }
    const newQueryString = queryString.stringify(newQueryParams);
    navigate(`/explore?${newQueryString}`);
  };
  const handleDateFilter = (order) => {
    const date = new Date(order);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    const queryParams = queryString.parse(location.search);
    const priceFilter = queryParams.price || "";
    const newQueryParams = { ...queryParams, date: formattedDate };
    if (priceFilter) {
      newQueryParams.price = priceFilter;
    }
    const newQueryString = queryString.stringify(newQueryParams);
    navigate(`/explore?${newQueryString}`);
  };

  const handleAddToWishlist = async (ngoId) => {
    const token = localStorage.getItem('token');
    try {
      await axios.get(
        `${process.env.REACT_APP_API_URL}/users/add-to-wishlist/${ngoId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      Swal.fire({
        title: 'Success!',
        text: 'Added to wishlist',
        icon: 'success',
        confirmButtonText: 'OK',
      });
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'Failed to add to wishlist',
        icon: 'error',
        confirmButtonText: 'Try Again',
      });
    }
  };
  return (
    <>
      <section className="explore-sec">
        <div className="container">
          <div className="explore-wrapper">
            <div className="explore-head">
              <div className="explore-head-text">
                <h2>Explore</h2>
                <p>Where do you want to help</p>
              </div>
              <div className="explore-head-filter">
                <div className="explore-head-price-date">
                  <ul>
                    <li onClick={() => handlePriceFilter("asc")}>
                      <span>
                        <i className="fa-solid fa-arrow-up" />
                      </span>
                      Price (Low to High)
                    </li>
                    <li onClick={() => handlePriceFilter("desc")}>
                      <span>
                        <i className="fa-solid fa-arrow-down" />
                      </span>
                      Price (High to Low)
                    </li>
                    <li>
                      <span>
                        <i className="fa-solid fa-calendar-day" />
                      </span>
                      Date
                      <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        onCalendarClose={() => handleDateFilter(startDate)}
                        className="date-picker"
                        placeholderText="Select a date"
                      />
                    </li>
                  </ul>
                  <div className="filter-btn">
                    <Link href="#">
                      <span>
                        <img src="img/filter-bar.svg" alt="" />
                      </span>
                      Show filters
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="explore-btm-filter">
              <div className="explore-btm-filter-categ">
                <ul>
                  <li className="active">All views</li>
                  <li>
                    <span>
                      <img src="img/file-signature.svg" alt="" />
                    </span>
                    Petitions
                  </li>
                  <li>
                    <span>
                      <img src="img/piggy-bank.svg" alt="" />
                    </span>
                    Donations
                  </li>
                </ul>
              </div>
              <div className="filter-btm-grid-map">
                <ul>
                  <li>
                    <img src="img/list.svg" alt="" />
                  </li>
                  <li>
                    <img src="img/loc.svg" alt="" />
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="explore-list">
            <div className="explore-sec-content">
              <div className="row">
                {explore.length > 0 ? (
                  explore.map((ngo, index) => (
                    <div className="col-lg-4" key={index}>
                      <div className="explore-box">
                        <div className="explore-img">
                          <img src="img/list-gallery-img.png" alt="" />
                          <div className="explore-img-icons">
                            <div className="explore-img-icon-i">
                              <i className="fa-solid fa-arrow-up-from-bracket" />
                            </div>
                            <div className="explore-img-icon-i" >
                              <i className="fa-regular fa-heart" onClick={() => handleAddToWishlist(ngo._id)}/>
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
                            <h3>{ngo.ngoname}</h3>
                            <p>
                              I would like nothing more than to continue baking
                              bread for you, to be able to ...
                            </p>
                          </div>
                          <div className="explore-donate">
                            <div
                              className="explore-donate-bar"
                              style={{
                                "--donation-width": `${ngo.percentage}%`,
                              }}
                            ></div>
                            <div className="explore-donate-amount-list">
                              <div className="campgin-donate-amount">
                                <div className="cta-btn">
                                  {isAuthenticated && userRole === "user" ? (
                                    <Link
                                      onClick={() => charityID(ngo._id)}
                                      className="explore_donate_btn"
                                      to=""
                                      data-bs-toggle="modal"
                                      data-bs-target="#donatePaymentModal"
                                    >
                                      Donate Now
                                    </Link>
                                  ) : (
                                    <Link
                                      to="/login"
                                      className="explore_donate_btn"
                                    >
                                      Donate Now
                                    </Link>
                                  )}
                                </div>
                              </div>
                              <div className="explore-donate-percentage">
                                <p>{ngo.percentage}%</p>
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
      <div
        className="modal fade"
        id="donatePaymentModal"
        tabIndex="-1"
        aria-labelledby="donatePaymentLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="text-center mb-4">
                <img
                  src="img/Logo.png"
                  alt="Razorpay"
                  style={{ maxWidth: "150px" }}
                />
              </div>

              <form onSubmit={handleNormalSubmit}>
                <div className="mb-3">
                  <label>
                    Donation Amount (INR) <span className="text-danger">*</span>
                  </label>
                  <input
                    type="number"
                    className="form-control aid-input"
                    id="amount"
                    name="amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn btn-primary donate_btn">
                  Donate Now
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Explore;
