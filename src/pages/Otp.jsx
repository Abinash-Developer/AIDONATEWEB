import React from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate} from "react-router-dom";

const Otp = () => {
    const navigate = useNavigate();
  const validationSchema = Yup.object({
    otp: Yup.string()
      .matches(/^\d{6}$/, "Please enter a valid 6-digit OTP")
      .required("OTP is required"),
  });

  const formik = useFormik({
    initialValues: {
      otp: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      const { otp } = values;
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/v1/verify-otp`,
          { otp }
        );
        
            localStorage.setItem('otp_user',response?.data?.result?.userId?._id)
            Swal.fire({
              title: "Success!",
              text: "OTP has been verified successfully",
              icon: "success",
              confirmButtonText: "OK",
            }).then((results) => {
              if (results.isConfirmed) {
                navigate("/change-password");
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
    <section className="login-sec">
      <div className="container">
        <div className="login-wrapper">
          <h3>Verify OTP</h3>
          <form onSubmit={formik.handleSubmit}>
            <div className="form-group">
              <label>OTP</label>
              <input
                type="text"
                className="form-control"
                name="otp"
                value={formik.values.otp}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.otp && formik.errors.otp ? (
                <div className="error">{formik.errors.otp}</div>
              ) : null}
            </div>
            <div className="form-group">
              <button type="submit">Verify OTP</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Otp;
