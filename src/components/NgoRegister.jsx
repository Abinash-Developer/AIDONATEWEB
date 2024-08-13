import axios from "axios";
import Swal from "sweetalert2";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
const NgoRegister = () => {
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

  const ngoSignupSchema = Yup.object().shape({
    ngoGovtId: Yup.string()
      .matches(/^\S.*$/, "NGO Govt. ID cannot start with a space")
      .required("NGO Govt. ID is required"),

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
    documents: Yup.array()
      .min(1, "At least one document is required")
      .of(
        Yup.mixed().test(
          "fileSize",
          "File size too large",
          (value) => !value || (value && value.size <= 5 * 1024 * 1024)
        )
      ),
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
      role: "ngo",
      documents: [],
    },
    validationSchema: ngoSignupSchema,
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        formData.append("ngoGovtId", values.ngoGovtId);
        formData.append("ngoName", values.ngoName);
        formData.append("email", values.email);
        formData.append("phone", values.phone);
        formData.append("password", values.password);
        formData.append("state", values.state);
        formData.append("district", values.district);
        formData.append("pinCode", values.pinCode);
        formData.append("role", values.role);

        // Append each document to formData
        values.documents.forEach((file) => {
          formData.append("documents", file);
        });
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/users/ngo_register`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
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

  const handleChange = async (e) => {
    ngoFormik.handleChange(e);
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
      <form onSubmit={ngoFormik.handleSubmit} className="sign-form ngo-signup">
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
              <div className="text-danger">{ngoFormik.errors.ngoGovtId}</div>
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
              <div className="text-danger">{ngoFormik.errors.ngoName}</div>
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
                <div className="text-danger">{ngoFormik.errors.email}</div>
              )}
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
              <span id="strengthMessage" className="small fw-bold text-muted" />
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
              <div className="text-danger">{ngoFormik.errors.password}</div>
            )}
          </div>
          <div className="col-md-12">
            <div className="d-flex justify-content-between">
              <label>
                Confirm Password <span className="text-danger">*</span>
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
              onChange={handleChange}
              onBlur={ngoFormik.handleBlur}
            >
              <option value="" label="-- Choose State --" />
              {state.map((state) => (
                <option key={state._id} value={state._id}>
                  {state.name}
                </option>
              ))}
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
              id="ngo_district"
              name="district"
              value={ngoFormik.values.district}
              onChange={ngoFormik.handleChange}
              onBlur={ngoFormik.handleBlur}
            >
              <option value="">-- Choose District --</option>
              {city.map((city) => (
                <option key={city._id} value={city._id}>
                  {city.name}
                </option>
              ))}
            </select>
            {ngoFormik.errors.district && ngoFormik.touched.district && (
              <div className="text-danger">{ngoFormik.errors.district}</div>
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
              <div className="text-danger">{ngoFormik.errors.pinCode}</div>
            )}
          </div>
          <div className="col-md-12" id="ngo-files-one">
            <label>
              Official Documents<span className="text-danger">*</span>
            </label>
            <input
              className="form-control aid-input"
              type="file"
              id="ngo_docOne"
              name="documents"
              multiple
              onChange={(event) =>
                ngoFormik.setFieldValue(
                  "documents",
                  Array.from(event.currentTarget.files)
                )
              }
            />
            {ngoFormik.errors.documents && ngoFormik.touched.documents && (
              <div className="text-danger">{ngoFormik.errors.documents}</div>
            )}
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
export default NgoRegister;
