import Charitytab from "../../components/charity/Charitytab";
const Myaccount = ()=>{
 return(<>
<section className="myaccount-sec py_60">
  <div className="container">
    <div className="myaccount-sec-content">
      <div className="my-account-tab d-flex align-items-start">
        <Charitytab/>
        <div className="tab-content" id="v-pills-tabContent">
          <div
            className="tab-pane fade show active"
            id="v-pills-dashboard"
            role="tabpanel"
            aria-labelledby="v-pills-dashboard-tab"
          >
            <div className="change-authentication tab-content-box">
              <h5>Dashboard</h5>
              <div className="My-dasboard tab-content-tab">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Labore repudiandae fugiat dignissimos soluta esse amet animi
                  quibusdam modi veritatis est.
                </p>
              </div>
            </div>
          </div>
          <div
            className="tab-pane fade"
            id="v-pills-profile"
            role="tabpanel"
            aria-labelledby="v-pills-profile-tab"
          >
            <div className="account-profile tab-content-box">
              <h5>Profile</h5>
              <form className="sign-form user-signup tab-content-tab">
                <div className="row g-3">
                  <div className="col-md-6">
                    <label>
                      First Name <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control aid-input"
                      id="first-name"
                    />
                  </div>
                  <div className="col-md-6">
                    <label>
                      Last Name <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control aid-input"
                      id="last-name"
                    />
                  </div>
                  <div className="col-md-6">
                    <label>
                      Email <span className="text-danger">*</span>
                    </label>
                    <div className="position-relative">
                      <input
                        type="email"
                        className="form-control aid-input rounded-end-0"
                        id="email"
                        data-email-exists="false"
                        defaultValue=""
                      />
                      <div
                        id="email-checker-icon"
                        className="position-absolute d-none"
                        style={{ right: 7, bottom: 0, fontSize: 23 }}
                      >
                        <i className="bi bi-check-circle-fill text-success" />
                      </div>
                      <div
                        id="edit-email"
                        className="position-absolute d-none"
                        style={{ right: 36, bottom: 6 }}
                      >
                        <i
                          className="bi bi-pencil-square"
                          style={{ color: "#114ead" }}
                        />
                      </div>
                      <div
                        data-lastpass-icon-root=""
                        style={{
                          position: "relative !important",
                          height: "0px !important",
                          width: "0px !important",
                          float: "left !important"
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <label>
                      Phone Number <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control aid-input"
                      id="phone"
                    />
                  </div>
                  <div className="col-md-6">
                    <label>
                      Country Name <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control aid-input"
                      disabled="disabled"
                      defaultValue="India"
                      id="signup-country-name"
                    />
                  </div>
                  <div className="col-md-6" id="signup-Origin">
                    <label>
                      Origin <span className="text-danger">*</span>
                    </label>
                    <select
                      className="form-control form-select aid-input"
                      id="ngo_Origin"
                    >
                      <option value="" selected="">
                        India
                      </option>
                      <option value={1}>Andhra Pradesh</option>
                      <option value={2}>Assam</option>
                      <option value={3}>Andhra Pradesh</option>
                      <option value={4}>Bihar</option>
                      <option value={5}>Gujarat</option>
                      <option value={6}>Haryana</option>
                      <option value={7}>Himachal Pradesh</option>
                      <option value={8}>JAMMU &amp; KASHMIR</option>
                      <option value={9}>KARNATAKA</option>
                      <option value={10}>KERALA</option>
                      <option value={11}>MADHYA PRADESH</option>
                      <option value={12}>MAHARASHTRA</option>
                      <option value={13}>MANIPUR</option>
                      <option value={14}>MEGHALAYA</option>
                      <option value={15}>MIZORAM</option>
                      <option value={16}>NAGALAND</option>
                      <option value={17}>ODISHA</option>
                      <option value={18}>PUNJAB</option>
                      <option value={19}>RAJASTHAN</option>
                      <option value={20}>SIKKIM</option>
                      <option value={21}>TAMIL NADU</option>
                      <option value={22}>TRIPURA</option>
                      <option value={23}>UTTAR PRADESH</option>
                      <option value={24}>WEST BENGAL</option>
                      <option value={25}>DELHI</option>
                      <option value={26}>GOA</option>
                      <option value={27}>PONDICHERY</option>
                      <option value={28}>LAKSHDWEEP</option>
                      <option value={29}>DAMAN &amp; DIU</option>
                      <option value={30}>DADRA &amp; NAGAR</option>
                      <option value={31}>Chandigarh</option>
                      <option value={32}>ANDAMAN &amp; NICOBAR</option>
                      <option value={33}>UTTARANCHAL</option>
                      <option value={34}>JHARKHAND</option>
                      <option value={35}>Chhattisgarh</option>
                    </select>
                  </div>
                  <div className="col-md-6" id="signup-state">
                    <label>
                      State <span className="text-danger">*</span>
                    </label>
                    <select
                      className="form-control form-select aid-input"
                      id="ngo_state"
                    >
                      <option value="" selected="">
                        Odisa
                      </option>
                      <option value={1}>Andhra Pradesh</option>
                      <option value={2}>Assam</option>
                      <option value={3}>Andhra Pradesh</option>
                      <option value={4}>Bihar</option>
                      <option value={5}>Gujarat</option>
                      <option value={6}>Haryana</option>
                      <option value={7}>Himachal Pradesh</option>
                      <option value={8}>JAMMU &amp; KASHMIR</option>
                      <option value={9}>KARNATAKA</option>
                      <option value={10}>KERALA</option>
                      <option value={11}>MADHYA PRADESH</option>
                      <option value={12}>MAHARASHTRA</option>
                      <option value={13}>MANIPUR</option>
                      <option value={14}>MEGHALAYA</option>
                      <option value={15}>MIZORAM</option>
                      <option value={16}>NAGALAND</option>
                      <option value={17}>ODISHA</option>
                      <option value={18}>PUNJAB</option>
                      <option value={19}>RAJASTHAN</option>
                      <option value={20}>SIKKIM</option>
                      <option value={21}>TAMIL NADU</option>
                      <option value={22}>TRIPURA</option>
                      <option value={23}>UTTAR PRADESH</option>
                      <option value={24}>WEST BENGAL</option>
                      <option value={25}>DELHI</option>
                      <option value={26}>GOA</option>
                      <option value={27}>PONDICHERY</option>
                      <option value={28}>LAKSHDWEEP</option>
                      <option value={29}>DAMAN &amp; DIU</option>
                      <option value={30}>DADRA &amp; NAGAR</option>
                      <option value={31}>Chandigarh</option>
                      <option value={32}>ANDAMAN &amp; NICOBAR</option>
                      <option value={33}>UTTARANCHAL</option>
                      <option value={34}>JHARKHAND</option>
                      <option value={35}>Chhattisgarh</option>
                    </select>
                  </div>
                  <div className="col-md-6" id="signup-district">
                    <label>
                      District <span className="text-danger">*</span>
                    </label>
                    <select
                      className="form-control form-select aid-input"
                      id="ngo_district"
                    >
                      <option value="" selected="">
                        Bhadak
                      </option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label>
                      PIN Code <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control aid-input"
                      id="pin-code"
                    />
                  </div>
                  <div className="col-md-6 mt-5 px-2">
                    <button
                      type="button"
                      className="btn cta-grn aid-btn px-5"
                      id="btn-signup"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div
            className="tab-pane fade"
            id="v-pills-Ngo"
            role="tabpanel"
            aria-labelledby="v-pills-Ngo-tab"
          >
            <div className="ngo-account tab-content-box">
              <h5>My NGO Account</h5>
              <form className="My-ngo-form tab-content-tab">
                <div className="row g-3">
                  <div className="col-md-6">
                    <label>NGO Name</label>
                    <input
                      type="text"
                      className="form-control aid-input"
                      id="ngo-name"
                    />
                  </div>
                  <div className="col-md-6">
                    <label>NGO Govt. ID</label>
                    <input
                      type="text"
                      className="form-control aid-input"
                      id="ngo-govt-id"
                    />
                  </div>
                  <div className="col-md-12">
                    <label
                      htmlFor="exampleFormControlTextarea1"
                      className="form-label"
                    >
                      Example textarea
                    </label>
                    <textarea
                      className="form-control"
                      id="exampleFormControlTextarea1"
                      rows={3}
                      defaultValue={""}
                    />
                  </div>
                  <div className="col-md-12 mt-5 px-2">
                    <button
                      type="button"
                      className="btn cta-grn px-5"
                      id="btn-ngo-save"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div
            className="tab-pane fade"
            id="v-pills-Bank-Account"
            role="tabpanel"
            aria-labelledby="v-pills-Bank-Account-tab"
          >
            <div className="bank-account tab-content-box">
              <h5>Bank Account</h5>
              <form className="bank-account tab-content-tab">
                <div className="row g-3">
                  <div className="col-md-6">
                    <label>Name</label>
                    <input
                      type="text"
                      className="form-control aid-input"
                      id="bank-name"
                    />
                  </div>
                  <div className="col-md-6">
                    <label>Bank Name</label>
                    <input
                      type="text"
                      className="form-control aid-input"
                      id="bank-name1"
                    />
                  </div>
                  <div className="col-md-6">
                    <label>Account No</label>
                    <input
                      type="text"
                      className="form-control aid-input"
                      id="acc-no"
                    />
                  </div>
                  <div className="col-md-6">
                    <label>Confirm Account No</label>
                    <input
                      type="text"
                      className="form-control aid-input"
                      id="confrm-acc-no"
                    />
                  </div>
                  <div className="col-md-6">
                    <label>IFSC Code</label>
                    <input
                      type="text"
                      className="form-control aid-input"
                      id="acc-ifsc"
                    />
                  </div>
                  <div className="col-md-6">
                    <div className="apprv-acc">
                      <p>
                        <label>Bank Account Status</label>
                      </p>
                      <p>
                        <span>
                          <i className="fa-solid fa-circle-check" />
                        </span>
                        Approved
                      </p>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div
            className="tab-pane fade"
            id="v-pills-account-setting"
            role="tabpanel"
            aria-labelledby="v-pills-account-setting-tab"
          >
            <div className="account-setting tab-content-box">
              <h5>Account Settings</h5>
              <div className="account-setting tab-content-tab">
                <p>
                  <b>NOTE: </b>Lorem ipsum dolor sit amet consectetur
                  adipisicing elit. Dolore quae ipsum natus quod dolores ratione
                  iure rem labore sit cum?
                </p>
                <button
                  type="button"
                  className="btn cta-grn red-btn px-5"
                  id="btn-ngo-save"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
          <div
            className="tab-pane fade"
            id="v-pills-password-change-setting"
            role="tabpanel"
            aria-labelledby="v-pills-password-change-setting-tab"
          >
            <div className="change-authentication tab-content-box">
              <h5>Change Authentication Credentials</h5>
              <form className="My-ngo-form tab-content-tab">
                <div className="row g-3">
                  <div className="col-md-6">
                    <label>Old Password</label>
                    <input
                      type="password"
                      className="form-control aid-input"
                      id="old-pswd"
                    />
                  </div>
                  <div className="col-md-6">
                    <label>New Password</label>
                    <input
                      type="password"
                      className="form-control aid-input"
                      id="new-pswd"
                    />
                  </div>
                  <div className="col-md-12 mt-5 px-2">
                    <button
                      type="button"
                      className="btn cta-grn px-5"
                      id="btn-ngo-save"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div
            className="tab-pane fade"
            id="v-pills-term-condition-setting"
            role="tabpanel"
            aria-labelledby="v-pills-term-condition-setting-tab"
          >
            <div className="account-setting tab-content-box">
              <h5>Terms And Conditions</h5>
              <div className="account-setting tab-content-tab">
                <p>
                  <b>NGO's Terms and conditions</b>
                </p>
                <ul>
                  <li>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Expedita, facilis.
                  </li>
                  <li>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Expedita, facilis.
                  </li>
                  <li>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Expedita, facilis.
                  </li>
                  <li>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Expedita, facilis.
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div
            className="tab-pane fade"
            id="v-pills-query-setting"
            role="tabpanel"
            aria-labelledby="v-pills-query-setting-tab"
          >
            <div className="account-setting tab-content-box">
              <h5>Your Query</h5>
              <div className="account-setting tab-content-tab">
                <textarea
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows={3}
                  defaultValue={""}
                />
                <p>
                  <b>Token ID: </b>11484572
                </p>
                <button
                  type="button"
                  className="btn cta-grn px-5"
                  id="btn-ngo-save"
                >
                  Request
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

 </>)
}
export default Myaccount;