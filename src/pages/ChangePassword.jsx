import React from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

const ChangePassword = () => {
  const navigate = useNavigate();
  
  const validationSchema = Yup.object({
    newPassword: Yup.string()
    .min(6, "Password must be at least 6 characters long")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(/[^A-Za-z0-9]/, "Password must contain at least one special character")
    .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
      .required("Please confirm your new password"),
  });

  const formik = useFormik({
    initialValues: {
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      const { newPassword } = values;
      const userId = localStorage.getItem('otp_user');
      try {
         await axios.post(
          `${process.env.REACT_APP_API_URL}/api/v1/change-password`,
          { userId, newPassword }
        );
        Swal.fire({
          title: "Success!",
          text: "Your password has been changed successfully",
          icon: "success",
          confirmButtonText: "OK",
        }).then((results) => {
          if (results.isConfirmed) {
            navigate("/");
          }
        });
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: error.response?.data?.message || "An error occurred",
          icon: "error",
          confirmButtonText: "Try Again",
        });
      }
    },
  });

  return (
    <>
      <section className="login-sec">
        <div className="container">
          <div className="login-wrapper">
            <h3>Forgot your password</h3>
            <form onSubmit={formik.handleSubmit}>
             
              <div className="form-group">
                <label>New Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="newPassword"
                  value={formik.values.newPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.newPassword && formik.errors.newPassword ? (
                  <div className="error">{formik.errors.newPassword}</div>
                ) : null}
              </div>
              <div className="form-group">
                <label>Confirm New Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="confirmPassword"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                  <div className="error">{formik.errors.confirmPassword}</div>
                ) : null}
              </div>
              <div className="form-group">
                <button type="submit">Change Password</button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default ChangePassword;
