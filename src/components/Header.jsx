import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../authantication/AuthProvider";
const Header = () => {
  const { isAuthenticated,logout } = useContext(AuthContext);
  return (
    <>
      <header className="hearder_wrapper">
        <nav className="navbar navbar-expand-xl navbar-light">
          <div className="container">
            <Link className="navbar-brand" to="/">
              <img src="img/Logo.png" className="img-fluid" alt="" />
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link " aria-current="" to="#">
                    Explore
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link " aria-current="" to="#">
                    Maps
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link " aria-current="" to="#">
                    Campaigns
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link " aria-current="" href="#">
                    Media
                  </Link>
                </li>
              </ul>
              <ul className="contact ms-auto">
                <li className="search-bar d-flex">
                  <div className="icon-input">
                    <input className="icon-input__text-field" type="text" />
                    <i className="fas fa-search">
                      <span>Search</span>
                    </i>
                  </div>
                  <button className="search-btn">
                    <img src="img/srch-hrt.png" />
                  </button>
                </li>
                <li className=" user-img">
                  <img src="img/Avatar.png" />
                </li>
                {!isAuthenticated ? (
                  <li>
                    <Link to="/login">Sign In</Link>
                  </li>
                ) : (
                  <li>
                    <Link to="/" onClick={logout}>
                      Sign Out
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};
export default Header;
