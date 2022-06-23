import React from "react";

const CalltoActionSection = () => {
  return (
    <div className="subscribe-section bg-with-black">
      <div className="container">
        <div className="row">
          <div className="col-xs-12">
            <div className="subscribe-head">
              <h2>Đăng ký nhận thông tin khuyến mãi</h2>
              {/* <p>Sign up free and get the latest tips.</p> */}
              <form className="form-section">
                <input placeholder="Nhập địa chỉ email..." name="email" type="email" />
                <input value="Đăng ký" name="subscribe" type="submit" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalltoActionSection;
