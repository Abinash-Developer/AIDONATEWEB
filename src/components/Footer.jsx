import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <>
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
                        <Link href="javascript:void(0)">About Us</Link>
                      </li>
                      <li>
                        <Link href="javascript:void(0)">Our Mission</Link>
                      </li>
                      <li>
                        <Link href="javascript:void(0)">Our Vision</Link>
                      </li>
                      <li>
                        <Link href="javascript:void(0)">Our Certificates</Link>
                      </li>
                      <li>
                        <Link href="javascript:void(0)">Invoice</Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-2 col-md-4">
                  <div className="menu-link">
                    <p>Explore</p>
                    <ul>
                      <li>
                        <Link href="javascript:void(0)">Lists</Link>
                      </li>
                      <li>
                        <Link href="javascript:void(0)">Maps</Link>
                      </li>
                      <li>
                        <Link href="javascript:void(0)">Investor Relations</Link>
                      </li>
                      <li>
                        <Link href="javascript:void(0)">AiDonate Circle</Link>
                      </li>
                      <li>
                        <Link href="javascript:void(0)">AiDonate Frames</Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-2 col-md-4">
                  <div className="menu-link">
                    <p>Media</p>
                    <ul>
                      <li>
                        <Link href="javascript:void(0)">News</Link>
                      </li>
                      <li>
                        <Link href="javascript:void(0)">Events</Link>
                      </li>
                      <li>
                        <Link href="javascript:void(0)">Gallery</Link>
                      </li>
                      <li>
                        <Link href="javascript:void(0)">Videos</Link>
                      </li>
                      <li>
                        <Link href="javascript:void(0)">Alumni Network</Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6">
                  <div className="menu-link">
                    <p>Documents</p>
                    <ul>
                      <li>
                        <Link href="javascript:void(0)">Privacy Policy</Link>
                      </li>
                      <li>
                        <Link href="javascript:void(0)">Terms and Conditions</Link>
                      </li>
                      <li>
                        <Link href="javascript:void(0)">Refund Policy</Link>
                      </li>
                      <li>
                        <Link href="javascript:void(0)">Safeguarding Policy</Link>
                      </li>
                      <li>
                        <Link href="javascript:void(0)">Guest Policies</Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6">
                  <div className="menu-link">
                    <p>Accountability</p>
                    <ul>
                      <li>
                        <Link href="javascript:void(0)">Financial Statement</Link>
                      </li>
                      <li>
                        <Link href="javascript:void(0)">Annual Report</Link>
                      </li>
                      <li>
                        <Link href="javascript:void(0)">FCRA Compliance</Link>
                      </li>
                      <li>
                        <Link href="javascript:void(0)">Compliance</Link>
                      </li>
                      <li>
                        <Link href="javascript:void(0)">Sources of Fund</Link>
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
              <img src="img/ftr-logo.png" />
              <p>Copyright © 2023-2024 AiDonate. All Rights Reserved</p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};
export default Footer;
