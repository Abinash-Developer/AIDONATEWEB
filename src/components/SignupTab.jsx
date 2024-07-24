const SignupTab = () => {
  return (
    <>
      <div className="account-tab">
        <div className="container">
          <div className="account-head">
            <h2>Create your New AiDonate Account Here!</h2>
          </div>
          <div className="account-tabs">
            <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link active"
                  id="pills-home-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-home"
                  type="button"
                  role="tab"
                  aria-controls="pills-home"
                  aria-selected="true"
                >
                  User
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="pills-profile-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-profile"
                  type="button"
                  role="tab"
                  aria-controls="pills-profile"
                  aria-selected="false"
                >
                  NGO
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
export default SignupTab;
