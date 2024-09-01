import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <>
    <div className="loading-indicator">
      <div className="lds-hourglass"></div>
    </div>
      <footer className="site-ftr pt-100">
        <div className="footer-links">
          <div className="container">
            <div className="footer-heading">
              <p>AiDonate - Afnity innovation Donate Foundation</p>
            </div>
            <div className="newsletter-ftr">
              <div className="newsletter-left">
                <h4>Join our newsletter</h4>
                <p>We’ll send you a nice letter once per week. No spam.</p>
              </div>
              <div className="newsletter-right">
                <div className="form-box">
                  <div className="input-main">
                    <input type="email" name="email" placeholder="Email" />
                  </div>
                  <button className="submit" type="submit">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
            <div className="links-list-bx">
              <div className="row">
                <div className="col-lg-2 col-md-4">
                  <div className="menu-link">
                    <p>Home</p>
                    <ul>
                      <li>
                        <Link to="/">About Us</Link>
                      </li>
                      <li>
                        <Link to="/">Our Mission</Link>
                      </li>
                      <li>
                        <Link to="/">Our Vision</Link>
                      </li>
                      <li>
                        <Link to="/">Our Certificates</Link>
                      </li>
                      <li>
                        <Link to="/">Invoice</Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-2 col-md-4">
                  <div className="menu-link">
                    <p>Explore</p>
                    <ul>
                      <li>
                        <Link to="/">Lists</Link>
                      </li>
                      <li>
                        <Link to="/">Maps</Link>
                      </li>
                      <li>
                        <Link to="/">Investor Relations</Link>
                      </li>
                      <li>
                        <Link to="/">AiDonate Circle</Link>
                      </li>
                      <li>
                        <Link to="/">AiDonate Frames</Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-2 col-md-4">
                  <div className="menu-link">
                    <p>Media</p>
                    <ul>
                      <li>
                        <Link to="/">News</Link>
                      </li>
                      <li>
                        <Link to="/">Events</Link>
                      </li>
                      <li>
                        <Link to="/">Gallery</Link>
                      </li>
                      <li>
                        <Link to="/">Videos</Link>
                      </li>
                      <li>
                        <Link to="/">Alumni Network</Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6">
                  <div className="menu-link">
                    <p>Documents</p>
                    <ul>
                      <li>
                        <Link to="/">Privacy Policy</Link>
                      </li>
                      <li>
                        <Link to="/">Terms and Conditions</Link>
                      </li>
                      <li>
                        <Link to="/">Refund Policy</Link>
                      </li>
                      <li>
                        <Link to="/">Safeguarding Policy</Link>
                      </li>
                      <li>
                        <Link to="/">Guest Policies</Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6">
                  <div className="menu-link">
                    <p>Accountability</p>
                    <ul>
                      <li>
                        <Link to="/">Financial Statement</Link>
                      </li>
                      <li>
                        <Link to="/">Annual Report</Link>
                      </li>
                      <li>
                        <Link to="/">FCRA Compliance</Link>
                      </li>
                      <li>
                        <Link to="/">Compliance</Link>
                      </li>
                      <li>
                        <Link to="/">Sources of Fund</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-btm">
          <div className="container">
            <div className="cpy-rt">
              <img src="img/ftr-logo.png" alt=""/>
              <p>Copyright © 2023-2024 AiDonate. All Rights Reserved</p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};
export default Footer;
