const AboutSection = () => {
  return (
    <>
      <section className="about-us-sec py_100">
        <div className="container">
          <div className="about-us-upr-content">
            <div className="row">
              <div className="col-lg-6">
                <div className="about-us-content-left">
                  <div className="about-us-left-img">
                    <img src="img/about-img.png" className="img-fluid" />
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="about-us-content-right">
                  <div className="about-us-right-text">
                    <h3 className="grn lgt-hd">About Us</h3>
                    <h2>Our Highest Ambition is to Help People</h2>
                    <p>
                      Our programs contribute to peace and development through
                      volunteerism worldwide. Take part in changing the lives of
                      young people across the world.
                    </p>
                    <p>
                      We’re focused on providing affordable volunteer travel
                      experiences that are responsible. Our programs heighten
                      global awareness and cultural understanding{" "}
                    </p>
                  </div>
                  <div className="about-goal">
                    <div className="donation-goal">
                      <p>Donation Goal</p>
                      <h3>₹56,000</h3>
                    </div>
                    <div className="donation-goal">
                      <p>Donation Raised</p>
                      <h3>₹34,000</h3>
                    </div>
                  </div>
                  <div className="cta-btn">
                    <a className="cta-grn" href="#">
                      Donate Now
                    </a>
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
export default AboutSection;
