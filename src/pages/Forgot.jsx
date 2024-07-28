import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useFormik } from "formik";
import { useNavigate} from "react-router-dom";
import * as Yup from "yup";
const Forget = () => {
    const navigate = useNavigate();
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Please enter valid email address")
      .required("Please enter email address"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      const { email } = values;
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/v1/checkemail`,
          {
            email,
          }
        );
        Swal.fire({
          title: "Success!",
          text: "OTP has sent to your email,Please check and varify",
          icon: "success",
          confirmButtonText: "OK",
        }).then((results) => {
          if (results.isConfirmed) {
            navigate("/varify-otp");
          }
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
  return (
    <>
      <section className="login-sec">
        <div className="container">
          <div className="login-wrapper">
            <h3>Forget your password</h3>
            <form onSubmit={formik.handleSubmit}>
              <div className="form-group">
                <label>Email address </label>
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
              <div className="form-group">
                <button type="submit">Send OTP</button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};
export default Forget;
