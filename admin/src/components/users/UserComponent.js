import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { listUser } from '../../redux/actions/UserActions';
import Message from "../LoadingError/Error";
import Loading from '../LoadingError/Loading';

const UserComponent = () => {
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.userList);
  const {loading, error, users} = userList;

  useEffect(() => {
    dispatch(listUser());
  }, [dispatch])

  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Tài khoản</h2>
        <div>
          <Link to="#" className="btn btn-primary">
            <i className="material-icons md-plus"></i> Tạo mới
          </Link>
        </div>
      </div>

      <div className="card mb-4">
        <header className="card-header">
          <div className="row gx-3">
            <div className="col-lg-4 col-md-6 me-auto">
              <input
                type="text"
                placeholder="Tìm kiếm..."
                className="form-control"
              />
            </div>
          </div>
        </header>

        {/* Card */}
        <div className="card-body">
         {
            loading ? (
               <Loading />
             ) : error ? (
              <Message variant="alert-danger">{error}</Message>
             ) : (
                <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4">
                  {
                    users.map((user) => (
                      <div className="col" key={user._id}>
                        <div className="card card-user shadow-sm">
                          <div className="card-header">
                            <img
                              className="img-md img-avatar"
                              src="images/favicon.jfif"
                              alt="User pic"
                            />
                          </div>
                          <div className="card-body">
                            <h5 className="card-title mt-5">{user.name}</h5>
                            <div className="card-text text-muted">
                              {
                                user.isAdmin === true ? (
                                  <p className="m-0">Admin</p>
                                ) : (
                                  <p className="m-0">Khách hàng</p>
                                )
                              }
                              <p>
                                <a href={`mailto:${user.email}`}>{user.email}</a>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  }
                </div>
             )
          }
        </div>
      </div>
    </section>
  );
};

export default UserComponent;
