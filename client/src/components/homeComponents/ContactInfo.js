import React from "react";

const ContactInfo = () => {
  return (
    <div className="contactInfo container">
      <div className="row">
        <div className="col-12 col-md-4 contact-Box">
          <div className="box-info">
            <div className="info-image">
              <i className="fas fa-phone-alt"></i>
            </div>
            <h5>HOTLINE CSKH</h5>
            <p>19001208</p>
          </div>
        </div>
        <div className="col-12 col-md-4 contact-Box">
          <div className="box-info">
            <div className="info-image">
              <i className="fas fa-map-marker-alt"></i>
            </div>
            <h5>ĐỊA CHỈ</h5>
            <p>Viện Công Nghệ Cao HUTECH</p>
          </div>
        </div>
        <div className="col-12 col-md-4 contact-Box">
          <div className="box-info">
            <div className="info-image">
              <i className="fas fa-mobile-alt"></i>
            </div>
            <h5>Điện thoại</h5>
            <p>028 5445 2222</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
