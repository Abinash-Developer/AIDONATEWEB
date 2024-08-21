import axios from "axios";
import Swal from "sweetalert2";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";


const UserRegister = () => {
  const navigate = useNavigate();
  const [state, setState] = useState([]);
  const [city, setCity] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {  
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/v1/state`
        );
        if (response.data && response.data.data) {
          setState(response.data.data);
        } else {
          setError("Data does not exist");
        }
      } catch (error) {
        setError("An error occurred while fetching data");
      }
    }

    fetchData();
  }, []);

  const userSignupSchema = Yup.object().shape({
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
      .matches(/[^A-Za-z0-9]/, "Password must contain at least one special character")
      .required("Password is required"),

    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Please confirm your password"),

    country: Yup.string()
      .trim("Country Name cannot contain leading or trailing spaces")
      .required("Country Name is required"),

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

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      country: "India",
      state: "",
      district: "",
      pinCode: "",
      role: "user"
    },
    validationSchema: userSignupSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/users/sign_up`,
           values
        );
        Swal.fire({
          title: "Success!",
          text: "You have registered successfully.",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          navigate("/login");
        });
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: error.response?.data?.message || error.message,
          icon: "error",
          confirmButtonText: "Try Again",
        });
      }
    },
  });

  const handleChange = async (e) => {
    formik.handleChange(e);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/city/${e.target.value}`
      );
      setCity(response?.data?.data || []);
    } catch (err) {
      setError("Error fetching cities");
      console.error(err);
    }
  };

  const handleAddressChange = (event) => {
    const address = event.target.value;
    formik.setFieldValue("ngo_address", address);
  };

  return (
    <>
      <form className="sign-form user-signup" onSubmit={formik.handleSubmit}>
        <div className="row g-3">
          <div className="col-md-12">
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
          <div className="col-md-12">
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
          <div className="col-md-12">
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
          <div className="col-md-12">
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
          <div className="col-md-12">
            <div className="d-flex justify-content-between">
              <label>
                Password <span className="text-danger">*</span>
              </label>
              <span id="strengthMessage" className="small fw-bold text-muted" />
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
          <div className="col-md-12">
            <div className="d-flex justify-content-between">
              <label>
                Confirm Password <span className="text-danger">*</span>
              </label>
              <span id="confirm_error_msg" className="small fw-bold text-muted" />
            </div>
            <input
              type="password"
              className="form-control aid-input"
              id="confirmPassword"
              name="confirmPassword"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <div className="error">{formik.errors.confirmPassword}</div>
            ) : null}
          </div>
          <div className="col-md-12">
            <label>
              Country Name <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control aid-input"
              disabled
              defaultValue="India"
              id="country"
              name="country"
            />
          </div>
          <div className="col-md-12" id="signup-state">
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
          <div className="col-md-12" id="signup-district">
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
          {/* <div className="col-md-12">
            <label>
              NGO Address <span className="text-danger">*</span>
            </label>
            {isLoaded && (
              <Autocomplete
                onLoad={(autocomplete) => setAutocomplete(autocomplete)}
                onPlaceChanged={() => {
                  const place = autocomplete.getPlace();
                  if (place.geometry) {
                    const address = place.formatted_address;
                    formik.setFieldValue("ngo_address", address);
                  }
                }}
              >
                <input
                  type="text"
                  className="form-control aid-input"
                  id="ngo_address"
                  name="ngo_address"
                  value={formik.values.ngo_address}
                  onChange={handleAddressChange}
                />
              </Autocomplete>
            )}
            {formik.touched.ngo_address && formik.errors.ngo_address ? (
              <div className="error">{formik.errors.ngo_address}</div>
            ) : null}
          </div> */}
          <div className="col-md-12">
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
          <div className="col-md-12 mt-5 px-2">
            <button type="submit" className="btn aid-btn px-5" id="btn-signup">
              Sign Up
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default UserRegister;
