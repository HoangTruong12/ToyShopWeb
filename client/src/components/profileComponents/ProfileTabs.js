import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Toast from './../LoadingError/Toast';
import Message from '../LoadingError/Error';
import Loading from './../LoadingError/Loading';
import { toast } from 'react-toastify';
import { updateUserProfile } from "../../redux/actions/UserActions";

const ProfileTabs = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const toastId = React.useRef(null)

  const toastObjects = {
    pauseOnFocusLoss: false,
    draggable: false,
    pauseOnHover: false,
    autoClose: 2000
  }

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const {loading, error, user} = userDetails;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const {loading: updateLoading} = userUpdateProfile;

  useEffect(() => {
    if(user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [dispatch, user]);

  const submitHandler = (e) => {
    e.preventDefault();
    // Password match
    if(password !== confirmPassword) {
      if(!toast.isActive(toastId.current)) {
        toastId.current = toast.error("Mật khẩu không trùng khớp", toastObjects);
      }
      } else {
      // UPDATE PROFILE
        dispatch(updateUserProfile({id: user._id, name, email, password}))
        if(!toast.isActive(toastId.current)) {
          toastId.current = toast.success("Cập nhật thành công", toastObjects);
        }  
    }
  }

  return (
    <>
      <Toast />
      {error && <Message variant="alert-danger">{error}</Message>}
      {loading && <Loading />}
      {updateLoading && <Loading />}
      <form className="row  form-container" onSubmit={submitHandler}>
        <div className="col-md-6">
          <div className="form">
            <label for="account-fn">Tên tài khoản</label>
            <input 
              className="form-control" 
              type="text" 
              required 
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>

        <div className="col-md-6">
          <div className="form">
            <label for="account-email">Email</label>
            <input 
              className="form-control" 
              type="email" 
              value={email}
              disabled
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form">
            <label for="account-pass">Mật khẩu mới</label>
            <input 
              className="form-control" 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form">
            <label for="account-confirm-pass">Nhập lại mật khẩu</label>
            <input 
              className="form-control" 
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)} 
            />
          </div>
        </div>
        <button type="submit">Cập nhật</button>
      </form>
    </>
  );
};

export default ProfileTabs;
