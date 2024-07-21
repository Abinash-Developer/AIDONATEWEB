import { useState } from "react";
import axios from "axios";
const CategorySection = async () => {
  const [category,setCategory] = useState([]);
  const categoyResult = await axios.get(`${process.env.REACT_APP_API_URL}/admin/get_category`);
  console.log('categoyResult = ', categoyResult);
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
                    <a className="cta-grn" href="#">
                      Donate Now
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="category-content-right">
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="category-step-box">
                        <div className="category-step-box-img">
                          <img src="img/cat1.png" />
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
                          <img src="img/cat2.png" />
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
                          <img src="img/cat3.png" />
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
                          <img src="img/cat1.png" />
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
