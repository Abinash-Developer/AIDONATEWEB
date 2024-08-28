import axios from "axios";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { fetchStates } from "../utils/dataFetchers";
import Thankyou from "./Thankyou";
import { useNavigate,useLocation  } from "react-router-dom";
import queryString from 'query-string';

const Explore = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [explore, setExplore] = useState([]);
  const [state, setState] = useState([]);
  const [city, setCity] = useState([]);


  useEffect(() => {
    // Get Query parameter
    const queryParams = queryString.parse(location.search);
    const priceFilter = queryParams.price || '';
    const dateFilter = queryParams.date || '';
    // Fetch NGO
    fetchExplore(priceFilter,dateFilter);

    // Fetch state
    fetchStatesData();
  }, [location.search]);

  // Fetch NGO Records
  const fetchExplore = async (priceFilter = '',dateFilter='') => {
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

  // Fetch State Records
  const fetchStatesData = async () => {
    try {
      const stateData = await fetchStates();
      setState(stateData);
    } catch (error) {
      console.error(error.message);
    }
  };

  //get cities
  const handleChange = async (e) => {
    formik.handleChange(e);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/city/${e.target.value}`
      );
      setCity(response?.data?.data || []);
    } catch (err) {
      console.error(err);
    }
  };
  // Validation for user payment with register
  const userSignupSchema = Yup.object().shape({
    amount: Yup.number()
      .required("Donation amount is required")
      .min(1, "Amount must be at least 1 INR"),
    firstName: Yup.string()
      .matches(/^\S.*$/, "First Name cannot start with a space")
      .required("First Name is required"),
    lastName: Yup.string()
      .matches(/^\S.*$/, "Last Name cannot start with a space")
      .required("Last Name is required"),
    email: Yup.string()
      .email("Enter a valid email address")
      .required("Email is required"),
    phone: Yup.string()
      .matches(/^[0-9]{10}$/, "Phone Number must be 10 digits")
      .required("Phone Number is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters long")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(
        /[^A-Za-z0-9]/,
        "Password must contain at least one special character"
      )
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Please confirm your password"),
    state: Yup.string()
      .notOneOf([""], "State is required")
      .required("State is required"),
    district: Yup.string()
      .notOneOf([""], "District is required")
      .required("District is required"),
    pinCode: Yup.string()
      .matches(/^[0-9]{6}$/, "PIN Code must be exactly 6 digits")
      .required("PIN Code is required"),
  });

  // Formik for form handling
  const formik = useFormik({
    initialValues: {
      amount: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      state: "",
      district: "",
      pinCode: "",
      password: "",
    },
    validationSchema: userSignupSchema,
    onSubmit: async (values) => {
      console.log("Not work");
    },
  });
  const handleNormalSubmit = async (e) => {
    e.preventDefault();
   
    try {
      // Register the user
      const registerResponse = await axios.post(
        `${process.env.REACT_APP_API_URL}/users/sign_up`,
        formik.values
      );
      localStorage.setItem('userID',registerResponse.data.data._id);
      const closeButton = document.getElementsByClassName('btn-close')[0];
      if (closeButton) {
        closeButton.click();
      }
      // Create the Razorpay order
      const createOrderResponse = await axios.post(
        `${process.env.REACT_APP_API_URL}/users/create-order`,
        { amount: formik.values.amount }
      );
      // Define Razorpay options
      const options = {
        key: "rzp_test_g4ALmVfn2IXdaU",
        amount: formik.values.amount * 100,
        currency: "INR",
        name: "NGO Donation",
        description: "Thank you for your generous donation",
        order_id: createOrderResponse.data.orderId,
        handler: async function (response) {
          const paymentDetails = {
            user_id: localStorage.getItem('userID'),
            charity_id: localStorage.getItem('charityID'),
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
            amount: formik.values.amount,
          };

          try {
            const savePaymentResponse = await axios.post(
              `${process.env.REACT_APP_API_URL}/users/save-paymet-details`,
              paymentDetails
            );
            navigate("/thank-you");
          } catch (error) {
            console.log("Error saving payment details:", error);
          }
        },
        prefill: {
          name: `${formik.values.firstName} ${formik.values.lastName}`,
          email: formik.values.email,
          contact: formik.values.phone,
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
      console.log("Error in payment: ", error);
    }
  };
  const charityID =(id)=>{
    localStorage.setItem('charityID',id);
  }
  const handlePriceFilter = (order) => {
  const queryParams = queryString.parse(location.search);
  const dateFilter = queryParams.date || '';
  const newQueryParams = { ...queryParams, price: order };
  if (dateFilter) {
    newQueryParams.date = dateFilter;
  }
  const newQueryString = queryString.stringify(newQueryParams);
  navigate(`/explore?${newQueryString}`);
  };
  const handleDateFilter = (order)=>{
  const queryParams = queryString.parse(location.search);
  const priceFilter = queryParams.price || '';
  const newQueryParams = { ...queryParams, date: order };
  if (priceFilter) {
    newQueryParams.price = priceFilter;
  }
  const newQueryString = queryString.stringify(newQueryParams);
  navigate(`/explore?${newQueryString}`);
  }
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
                  <li onClick={() => handlePriceFilter('asc')}>
                      <span>
                        <i className="fa-solid fa-arrow-up" />
                      </span>
                      Price (Low to High)
                    </li>
                    <li onClick={() => handlePriceFilter('desc')}>
                      <span>
                        <i className="fa-solid fa-arrow-down" />
                      </span>
                      Price (High to Low)
                    </li>
                    <li onClick={() => handleDateFilter('asc')}>
                      <span>
                        <i className="fa-solid fa-calendar-day" />
                      </span>
                      Date (Old to New)
                    </li>
                    <li onClick={() => handleDateFilter('desc')}>
                      <span>
                        <i className="fa-solid fa-calendar-day" />
                      </span>
                      Date (New to Old)
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
                {explore.map((ngo, index) => (
                  <div className="col-lg-4" key={index}>
                    <div className="explore-box">
                      <div className="explore-img">
                        <img src="img/list-gallery-img.png" alt="" />
                        <div className="explore-img-icons">
                          <div className="explore-img-icon-i">
                            <i className="fa-solid fa-arrow-up-from-bracket" />
                          </div>
                          <div className="explore-img-icon-i">
                            <i className="fa-regular fa-heart" />
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
                          <div className="explore-donate-bar" style={{ "--donation-width": `${ngo.percentage}%` }}></div>
                          <div className="explore-donate-amount-list">
                            <div className="campgin-donate-amount">
                              <p>
                                <div className="cta-btn">
                                  <Link
                                    onClick={()=>{charityID(ngo._id)}}
                                    className="explore_donate_btn"
                                    to=""
                                    data-bs-toggle="modal"
                                    data-bs-target="#donatePaymentModal"
                                  >
                                    Donate Now
                                  </Link>
                                </div>
                              </p>
                            </div>
                            <div className="explore-donate-percentage">
                              <p>{ngo.percentage}%</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
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
                    value={formik.values.amount}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.amount && formik.errors.amount ? (
                    <div className="error">{formik.errors.amount}</div>
                  ) : null}
                </div>

                <div className="mb-3">
                  <label>
                    First Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control aid-input"
                    id="firstName"
                    name="firstName"
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.firstName && formik.errors.firstName ? (
                    <div className="error">{formik.errors.firstName}</div>
                  ) : null}
                </div>

                <div className="mb-3">
                  <label>
                    Last Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control aid-input"
                    id="lastName"
                    name="lastName"
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.lastName && formik.errors.lastName ? (
                    <div className="error">{formik.errors.lastName}</div>
                  ) : null}
                </div>

                <div className="mb-3">
                  <label>
                    Email <span className="text-danger">*</span>
                  </label>
                  <div className="position-relative">
                    <input
                      type="email"
                      className="form-control aid-input rounded-end-0"
                      id="email"
                      name="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.email && formik.errors.email ? (
                      <div className="error">{formik.errors.email}</div>
                    ) : null}
                  </div>
                </div>

                <div className="mb-3">
                  <label>
                    Phone Number <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control aid-input"
                    id="phone"
                    name="phone"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.phone && formik.errors.phone ? (
                    <div className="error">{formik.errors.phone}</div>
                  ) : null}
                </div>

                <div className="mb-3">
                  <label>
                    State <span className="text-danger">*</span>
                  </label>
                  <select
                    className="form-select aid-input"
                    id="state"
                    name="state"
                    value={formik.values.state}
                    onChange={handleChange}
                    onBlur={formik.handleBlur}
                  >
                    <option value="">-- Choose State --</option>
                    {state.map((state) => (
                      <option key={state._id} value={state._id}>
                        {state.name}
                      </option>
                    ))}
                  </select>
                  {formik.touched.state && formik.errors.state ? (
                    <div className="error">{formik.errors.state}</div>
                  ) : null}
                </div>

                <div className="mb-3">
                  <label>
                    District <span className="text-danger">*</span>
                  </label>
                  <select
                    className="form-select aid-input"
                    id="district"
                    name="district"
                    value={formik.values.district}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    <option value="">-- Choose District --</option>
                    {city.map((city) => (
                      <option key={city._id} value={city._id}>
                        {city.name}
                      </option>
                    ))}
                  </select>
                  {formik.touched.district && formik.errors.district ? (
                    <div className="error">{formik.errors.district}</div>
                  ) : null}
                </div>

                <div className="mb-3">
                  <label>
                    PIN Code <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control aid-input"
                    id="pinCode"
                    name="pinCode"
                    value={formik.values.pinCode}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.pinCode && formik.errors.pinCode ? (
                    <div className="error">{formik.errors.pinCode}</div>
                  ) : null}
                </div>

                <div className="mb-3">
                  <div className="d-flex justify-content-between">
                    <label>
                      Password <span className="text-danger">*</span>
                    </label>
                    <span
                      id="strengthMessage"
                      className="small fw-bold text-muted"
                    />
                  </div>
                  <input
                    type="password"
                    className="form-control aid-input"
                    id="password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <div className="error">{formik.errors.password}</div>
                  ) : null}
                </div>

                <button type="submit" className="btn btn-primary">
                  Donate
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
