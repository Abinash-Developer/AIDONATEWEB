import { Link } from "react-router-dom";
const UserTab = ()=>{
    return (<>
        <div
          className="nav flex-column nav-pills me-3"
          id="v-pills-tab"
          role="tablist"
          aria-orientation="vertical"
        >
          <p>My Account</p>
          <button
            className="nav-link active"
            id="v-pills-dashboard-tab"
            data-bs-toggle="pill"
            data-bs-target="#v-pills-dashboard"
            type="button"
            role="tab"
            aria-controls="v-pills-dashboard"
            aria-selected="true"
          >
            <span /> Dashboard
          </button>
          <button
            className="nav-link"
            id="v-pills-profile-tab"
            data-bs-toggle="pill"
            data-bs-target="#v-pills-profile"
            type="button"
            role="tab"
            aria-controls="v-pills-profile"
            aria-selected="false"
          >
            Profile
          </button>
          <button
            className="nav-link"
            id="v-pills-Ngo-tab"
            data-bs-toggle="pill"
            data-bs-target="#v-pills-Ngo"
            type="button"
            role="tab"
            aria-controls="v-pills-Ngo"
            aria-selected="false"
          >
            NGO List
          </button>
          <button
            className="nav-link"
            id="v-pills-account-setting-tab"
            data-bs-toggle="pill"
            data-bs-target="#v-pills-account-setting"
            type="button"
            role="tab"
            aria-controls="v-pills-account-setting"
            aria-selected="true"
          >
            <span />
            Account Setting
          </button>
          <button
            className="nav-link"
            id="v-pills-password-change-setting-tab"
            data-bs-toggle="pill"
            data-bs-target="#v-pills-password-change-setting"
            type="button"
            role="tab"
            aria-controls="v-pills-password-change-setting"
            aria-selected="false"
          >
            Password Change
          </button>
          <div className="tab-social-links">
            <ul>
              <li>
                <Link to="">
                  <i className="fa-brands fa-facebook" />
                </Link>
              </li>
              <li>
                <Link to="">
                  <i className="fa-brands fa-instagram" />
                </Link>
              </li>
              <li>
                <Link to="">
                  <i className="fa-brands fa-youtube" />
                </Link>
              </li>
              <li>
                <Link to="">
                  <i className="fa-solid fa-envelope" />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </>);
}
export default UserTab;