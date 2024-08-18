import React, { useContext,useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AuthContext } from "../authantication/AuthProvider";
const Login = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useContext(AuthContext);

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Please enter valid email address")
      .required("Please enter email address"),
    password: Yup.string().required("Please enter password"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      const { email, password } = values;
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/users/sign_in`,
          {
            email,
            password,
          }
        );
        login(response);
        Swal.fire({
          title: "Success!",
          text: "You have logged in successfully.",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          navigate("/");
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

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <section className="login-sec">
        <div className="container">
          <div className="login-wrapper">
            <h3>Log in</h3>
            <form onSubmit={formik.handleSubmit}>
              <div className="form-group">
                <label>Email address or user name</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="error">{formik.errors.email}</div>
                ) : null}
              </div>
              <div className="form-group password">
                <div className="pass-block">
                  <div className="pass-content">
                    <label>Password</label>
                  </div>
                   <div className="pass-img" onClick={togglePasswordVisibility}>
                    <img src={showPassword ? "img/hide.png" : "img/hide.png"} alt="" />
                    <span>{showPassword ? "Hide" : "Show"}</span>
                  </div>
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.password && formik.errors.password ? (
                  <div className="error">{formik.errors.password}</div>
                ) : null}
              </div>
              <div className="form-group">
                {/* <span data-bs-toggle="modal" data-bs-target="#exampleModal"> */}
                 <Link to ="/forgot-password">Forget your password</Link>
                {/* </span> */}
              </div>
              <div className="checkbox_box">
                <input type="checkbox" id="html" />
                <label htmlFor="html">Remember me</label>
              </div>
              <div className="form-group">
                <button type="submit">Log in</button>
              </div>
              <div className="first_line text">
                <span>OR</span>
              </div>
              {/* <div className="apply-btn">
                <div className="btn-play">
                  <Link to="">
                    <img src="img/google.png" alt="" />
                    Continue with Google
                  </Link>
                </div>
                <div className="btn-play">
                  <Link to="">
                    <img src="img/fb.png" alt="" />
                    Continue with Facebook
                  </Link>
                </div>
                <div className="btn-play">
                  <Link to="">
                    <img src="img/apple.png" alt="" />
                    Continue with Apple
                  </Link>
                </div>
              </div> */}
              <div className="account-txt">
                <p>Don’t have an account?</p>
              </div>
              <div className="btn-play">
                <Link to="/register">Sign up</Link>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};
export default Login;
