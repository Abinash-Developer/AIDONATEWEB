const HomeBanner = () => {
  return (
    <>
      <section className="banner-sec py_100">
  <div className="container">
    <div className="banner-sec-content">
      <div className="row">
        <div className="col-lg-6">
          <div className="banner-left-content">
            <h1>
              <span className="grn">Fundrasing</span> for the people and causes
              you care.
            </h1>
          </div>
        </div>
        <div className="col-lg-5 offset-lg-1">
          <div className="banner-right-content">
            <p>
              Take Advatage of This Amazing Exclusive Offer Don’t Miss This
              Opportunity For Your Non Profit.
            </p>
            <div className="cta-btn">
              <a className="cta-grn" href="#">
                Donate Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="banner-btm-content">
      <div className="banner-img">
        <img src="img/bann-img.png" className="img-fluid" />
      </div>
      <div className="banner-counter">
        <div className="wrapper">
          <div className="row">
            <div className="col-lg-3 col-md-6">
              <div className="counter col_fourth">
                <div className="counter-text">
                  <h2 className="grn currecy-rs" />
                  <h2
                    className="timer grn count-title count-number"
                    data-to={594}
                    data-speed={1700}
                  >
                    <span>+</span>
                  </h2>
                  <h2 className="grn currnt-sgn">+</h2>
                </div>
                <h3 className="count-text">Donation Received</h3>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="counter col_fourth">
                <div className="counter-text">
                  <h2 className="grn currecy-rs">₹</h2>
                  <h2
                    className="timer grn count-title count-number"
                    data-to={49}
                    data-speed={1700}
                  />
                  <h2 className="grn currnt-sgn">M</h2>
                </div>
                <h3 className="count-text">Money Donated</h3>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="counter col_fourth">
                <div className="counter-text">
                  <h2 className="grn currecy-rs" />
                  <h2
                    className="timer grn count-title count-number"
                    data-to={34}
                    data-speed={1700}
                  />
                  <h2 className="grn currnt-sgn">+</h2>
                </div>
                <h3 className="count-text">Active Compaigns</h3>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="counter col_fourth">
                <div className="counter-text">
                  <h2 className="grn currecy-rs">₹</h2>
                  <h2
                    className="timer grn count-title count-number"
                    data-to={34}
                    data-speed={1700}
                  />
                  <h2 className="grn currnt-sgn">M</h2>
                </div>
                <h3 className="count-text">Charity in last year</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

    </>
  );
};
export default HomeBanner;
