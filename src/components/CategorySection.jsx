
import { Link } from "react-router-dom";
const CategorySection = () => {
  return (
    <>
      <section className="category-sec py_100">
        <div className="container">
          <div className="category-upr-content">
            <div className="row">
              <div className="col-lg-6">
                <div className="category-content-left">
                  <div className="category-right-text">
                    <h3 className="grn lgt-hd">Categories</h3>
                    <h2>
                      Several donation programs that can make it casier for you
                    </h2>
                    <p>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Loremas been the industry's standard
                      dummy text
                    </p>
                  </div>
                  <div className="cta-btn">
                    <Link className="cta-grn" to="/explore">
                      Donate Now
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="category-content-right">
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="category-step-box">
                        <div className="category-step-box-img">
                          <img src="img/cat1.png" alt=""/>
                        </div>
                        <h3 className="lgt-hd">Human</h3>
                        <p>
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting
                        </p>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="category-step-box">
                        <div className="category-step-box-img">
                          <img src="img/cat2.png" alt=""/>
                        </div>
                        <h3 className="lgt-hd">Medicine</h3>
                        <p>
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting
                        </p>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="category-step-box">
                        <div className="category-step-box-img">
                          <img src="img/cat3.png" alt=""/>
                        </div>
                        <h3 className="lgt-hd">Study</h3>
                        <p>
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting
                        </p>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="category-step-box">
                        <div className="category-step-box-img">
                          <img src="img/cat1.png" alt=""/>
                        </div>
                        <h3 className="lgt-hd">Food</h3>
                        <p>
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting
                        </p>
                      </div>
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
export default CategorySection;
