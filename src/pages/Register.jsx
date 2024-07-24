import axios from "axios";
import Swal from "sweetalert2";
import SignupTab from "../components/SignupTab";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Register = () => {
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
  // console.log(state);

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
      .matches(
        /[^A-Za-z0-9]/,
        "Password must contain at least one special character"
      )
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
  const ngoSignupSchema = Yup.object().shape({
    ngoGovtId: Yup.string()
    .matches(/^\S.*$/, 'NGO Govt. ID cannot start with a space')
    .required('NGO Govt. ID is required'),

    ngoName: Yup.string()
      .matches(/^\S.*$/, "NGO Name cannot start with a space")
      .required("NGO Name is required"),

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
    document1: Yup.mixed()
      .required("Document 1 is required")
      .test(
        "fileSize",
        "File size too large",
        (value) => !value || (value && value.size <= 5 * 1024 * 1024)
      ), // Example for 5MB limit
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
    },
    validationSchema: userSignupSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/users/sign_up`,
          {
            values,
          }
        );
        Swal.fire({
          title: "Success!",
          text: "You have register successfully.",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          navigate("/login");
        });
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: error.response?.data?.message,
          icon: "error",
          confirmButtonText: "Try Again",
        });
      }
    },
  });
  const ngoFormik = useFormik({
    initialValues: {
      ngoGovtId: "",
      ngoName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      state: "",
      district: "",
      pinCode: "",
      document1: null,
    },
    validationSchema: ngoSignupSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/v1/ngo/register`,
          values
        );
        console.log("NGO registration successful:", response.data);
      } catch (error) {
        console.error("NGO registration error:", error);
      }
    },
  });
  const handleChange = async (e) => {
    formik.handleChange(e); // Update formik state
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
  return (
    <>
      <SignupTab />
      <section className="sign-account-sec py_100">
        <div className="container">
          <div className="login-wrapper">
            <div className="tab-content" id="pills-tabContent">
              <div
                className="tab-pane fade show active"
                id="pills-home"
                role="tabpanel"
                aria-labelledby="pills-home-tab"
              >
                <form
                  className="sign-form user-signup"
                  onSubmit={formik.handleSubmit}
                >
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
                    <div className="col-md-12">
                      <div className="d-flex justify-content-between">
                        <label>
                          Confirm Password{" "}
                          <span className="text-danger">*</span>
                        </label>
                        <span
                          id="confirm_error_msg"
                          className="small fw-bold text-muted"
                        />
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
                      {formik.touched.confirmPassword &&
                      formik.errors.confirmPassword ? (
                        <div className="error">
                          {formik.errors.confirmPassword}
                        </div>
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
                        // onChange={formik.handleChange}
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
                      <button
                        type="submit"
                        className="btn aid-btn px-5"
                        id="btn-signup"
                      >
                        Sign Up
                      </button>
                    </div>
                  </div>
                </form>
              </div>
              <div
                className="tab-pane fade"
                id="pills-profile"
                role="tabpanel"
                aria-labelledby="pills-profile-tab"
              >
                <form
                  onSubmit={ngoFormik.handleSubmit}
                  className="sign-form ngo-signup"
                >
                  <div className="row g-3">
                    <div className="col-md-12" id="signup-ngo-govt-name">
                      <label>
                        NGO Govt. ID <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="ngoGovtId"
                        name="ngoGovtId"
                        value={ngoFormik.values.ngoGovtId}
                        onChange={ngoFormik.handleChange}
                        onBlur={ngoFormik.handleBlur}
                      />
                      {ngoFormik.errors.ngoGovtId && ngoFormik.touched.ngoGovtId && (
                        <div className="text-danger">
                          {ngoFormik.errors.ngoGovtId}
                        </div>
                      )}
                    </div>
                    <div className="col-md-12" id="signup-ngo-name">
                      <label>
                        NGO Name <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control aid-input"
                        id="ngoName"
                        name="ngoName"
                        value={ngoFormik.values.ngoName}
                        onChange={ngoFormik.handleChange}
                        onBlur={ngoFormik.handleBlur}
                      />
                      {ngoFormik.errors.ngoName && ngoFormik.touched.ngoName && (
                        <div className="text-danger">
                          {ngoFormik.errors.ngoName}
                        </div>
                      )}
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
                          value={ngoFormik.values.email}
                          onChange={ngoFormik.handleChange}
                          onBlur={ngoFormik.handleBlur}
                        />
                        {ngoFormik.errors.email && ngoFormik.touched.email && (
                          <div className="text-danger">
                            {ngoFormik.errors.email}
                          </div>
                        )}
                        {/* The rest of the icon elements and styles can be left as is */}
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
                        value={ngoFormik.values.phone}
                        onChange={ngoFormik.handleChange}
                        onBlur={ngoFormik.handleBlur}
                      />
                      {ngoFormik.errors.phone && ngoFormik.touched.phone && (
                        <div className="text-danger">{ngoFormik.errors.phone}</div>
                      )}
                    </div>
                    <div className="col-md-12">
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
                        value={ngoFormik.values.password}
                        onChange={ngoFormik.handleChange}
                        onBlur={ngoFormik.handleBlur}
                      />
                      {ngoFormik.errors.password && ngoFormik.touched.password && (
                        <div className="text-danger">
                          {ngoFormik.errors.password}
                        </div>
                      )}
                    </div>
                    <div className="col-md-12">
                      <div className="d-flex justify-content-between">
                        <label>
                          Confirm Password{" "}
                          <span className="text-danger">*</span>
                        </label>
                        <span
                          id="confirm_error_msg"
                          className="small fw-bold text-muted"
                        />
                      </div>
                      <input
                        type="password"
                        className="form-control aid-input"
                        id="confirm-password"
                        name="confirmPassword"
                        value={ngoFormik.values.confirmPassword}
                        onChange={ngoFormik.handleChange}
                        onBlur={ngoFormik.handleBlur}
                      />
                      {ngoFormik.errors.confirmPassword &&
                        ngoFormik.touched.confirmPassword && (
                          <div className="text-danger">
                            {ngoFormik.errors.confirmPassword}
                          </div>
                        )}
                    </div>
                    <div className="col-md-12" id="signup-state">
                      <label>
                        State <span className="text-danger">*</span>
                      </label>
                      <select
                        className="form-select aid-input"
                        id="ngo_state"
                        name="state"
                        value={ngoFormik.values.state}
                        onChange={ngoFormik.handleChange}
                        onBlur={ngoFormik.handleBlur}
                      >
                        <option value="" label="-- Choose State --" />
                      </select>
                      {ngoFormik.errors.state && ngoFormik.touched.state && (
                        <div className="text-danger">{ngoFormik.errors.state}</div>
                      )}
                    </div>
                    <div className="col-md-12" id="signup-district">
                      <label>
                        District <span className="text-danger">*</span>
                      </label>
                      <select
                        className="form-select aid-input"
                        disabled
                        id="ngo_district"
                        name="district"
                        value={ngoFormik.values.district}
                        onChange={ngoFormik.handleChange}
                        onBlur={ngoFormik.handleBlur}
                      />
                      {ngoFormik.errors.district && ngoFormik.touched.district && (
                        <div className="text-danger">
                          {ngoFormik.errors.district}
                        </div>
                      )}
                    </div>
                    <div className="col-md-12">
                      <label>
                        PIN Code <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control aid-input"
                        id="pin-code"
                        name="pinCode"
                        value={ngoFormik.values.pinCode}
                        onChange={ngoFormik.handleChange}
                        onBlur={ngoFormik.handleBlur}
                      />
                      {ngoFormik.errors.pinCode && ngoFormik.touched.pinCode && (
                        <div className="text-danger">
                          {ngoFormik.errors.pinCode}
                        </div>
                      )}
                    </div>
                    <div className="col-md-12" id="ngo-files-one">
                      <label>
                        Document 1 <span className="text-danger">*</span>
                      </label>
                      <input
                        className="form-control aid-input"
                        type="file"
                        id="ngo_docOne"
                        name="document1"
                        onChange={(event) =>
                          ngoFormik.setFieldValue(
                            "document1",
                            event.currentTarget.files[0]
                          )
                        }
                      />
                      {ngoFormik.errors.document1 && ngoFormik.touched.document1 && (
                        <div className="text-danger">
                          {ngoFormik.errors.document1}
                        </div>
                      )}
                    </div>
                    <div className="col-md-12 mt-5 px-2">
                      <button
                        type="submit"
                        className="btn aid-btn px-5"
                        id="btn-signup"
                      >
                        Sign Up
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
