import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { savePaymentMethod } from "../redux/actions/CartActions";
import Header from "./../components/Header";

const PaymentScreen = () => {
  window.scrollTo(0, 0);

  const cart = useSelector((state) => state.cart)
  const {shippingAddress} = cart;

  const history = useHistory();

  if(!shippingAddress) {
    history.push("/shipping");
  }

  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push("/placeorder");
  };

  return (
    <>
      <Header />
      <div className="container d-flex justify-content-center align-items-center login-center">
        <form
          className="Login2 col-md-8 col-lg-4 col-11"
          onSubmit={submitHandler}
        >
          <h6>CHỌN PHƯƠNG THỨC THANH TOÁN</h6>
          <div className="payment-container">
            <div className="radio-container">
              <input 
                className="form-check-input" 
                type="radio" 
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <label className="form-check-label">PayPal or Credit Card</label>
            </div>
          </div>

          <button type="submit">
              Tiếp tục
          </button>
        </form>
      </div>
    </>
  );
};

export default PaymentScreen;
