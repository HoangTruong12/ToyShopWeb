import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import Header from "./../components/Header";
import { login } from './../redux/actions/UserActions';
import Loading from '../components/LoadingError/Loading';
import Message from "./../components/LoadingError/Error";

const Login = () => {
  window.scrollTo(0, 0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();
  const location = useLocation();

  const dispatch = useDispatch();
  const redirect = location.search ? location.search.split("=")[1] : "/";

  const userLogin = useSelector((state) => state.userLogin);
  const {error, loading, userInfo} = userLogin;

  useEffect(() => {
    if(userInfo) {
      history.push(redirect);
    }
  }, [userInfo, history, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  }

  return (
    <>
      <Header />
      <div className="container d-flex flex-column justify-content-center align-items-center login-center">

          {error && <Message variant="alert-danger">{error}</Message>}
          {loading && <Loading />}

        <form 
          className="Login col-md-8 col-lg-4 col-11"
          onSubmit={submitHandler}
        >
          <input 
            type="email" 
            placeholder="Email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input 
            type="password" 
            placeholder="Mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Đăng nhập</button>
          <p>
            <Link to={redirect ? `/register?redirect={redirect}` : "/register"}>
              Tạo tài khoản
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
