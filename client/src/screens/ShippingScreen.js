import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import Header from "../components/Header";
import { saveShippingAddress } from '../redux/actions/CartActions';

const ShippingScreen = () => {
  window.scrollTo(0, 0);

  const history = useHistory();
  const cart = useSelector((state) => state.cart)
  const {shippingAddress} = cart;

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [district, setDistrict] = useState(shippingAddress.district);
  const [phoneNumber, setPhoneNumber] = useState(shippingAddress.phoneNumber);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({address, city, district, phoneNumber}));
    history.push("/payment");
  };
  
  return (
    <>
      <Header />
      <div className="container d-flex justify-content-center align-items-center login-center">
        <form
          className="Login col-md-8 col-lg-4 col-11"
          onSubmit={submitHandler}
        >
          <h6>THÔNG TIN GIAO HÀNG</h6>
          <input 
            type="text" 
            placeholder="Số nhà và tên đường"
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)} 
          />
          <input 
            type="text" 
            placeholder="Quận / huyện"
            required
            value={district}
            onChange={(e) => setDistrict(e.target.value)}  
          />
           <input 
            type="text" 
            placeholder="Tỉnh / thành"
            required
            value={city}
            onChange={(e) => setCity(e.target.value)}  
          />
          <input 
            type="text" 
            placeholder="Số điện thoại" 
            required
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)} 
          />
          <button type="submit">Tiếp tục</button>
        </form>
      </div>
    </>
  );
};

export default ShippingScreen;
