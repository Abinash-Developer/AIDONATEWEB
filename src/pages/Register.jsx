import SignupTab from "../components/SignupTab";
import UserRegister from "../components/UserRegister";
import NgoRegister from "../components/NgoRegister";
const Register = () => {
  
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
                <UserRegister/>
              </div>
              <div
                className="tab-pane fade"
                id="pills-profile"
                role="tabpanel"
                aria-labelledby="pills-profile-tab"
              >
                <NgoRegister/>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
