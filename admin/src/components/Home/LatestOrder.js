import React from "react";
import { Link } from "react-router-dom";
import Loading from '../LoadingError/Loading';
import Message from '../LoadingError/Error';
import moment from 'moment';

const LatestOrder = (props) => {
  const {loading, error, orders} = props
  return (
    <div className="card-body">
      <h4 className="card-title">Đơn hàng mới</h4>
      {
        loading ? (
          <Loading />
        ) : error ? (
          <Message variant="alert-danger">{error}</Message>
        ) : (
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col" >Tên</th>
                  <th scope="col" >Email</th>
                  <th scope="col" >Giá</th>
                  <th scope="col" >Thanh toán</th>
                  <th scope="col" >Ngày tạo</th>
                  <th scope="col" className="text-end">
                    Xem chi tiết
                  </th>
                </tr>
              </thead>
              <tbody>
                {
                  orders.slice(0, 5).map((order) => (
                    <tr key={order._id}>
                      <td>
                        <b>{order.user.name}</b>
                      </td>
                      <td>{order.user.email}</td>
                      <td>${order.totalPrice}</td>
                      <td>
                        {
                          order.isPaid ? (
                            <span className="badge rounded-pill alert-success">
                              Thanh toán vào {moment(order.paidAt).format("MMM Do YY")}
                            </span>
                          ) : (
                            <span className="badge rounded-pill alert-danger">
                             Chưa thanh toán
                            </span>
                          )
                        }
                        
                      </td>
                      <td>{moment(order.createdAt).calendar()}</td>
                      <td className="d-flex justify-content-end align-item-center">
                        <Link to={`/order/${order._id}`} className="text-success">
                          <i className="fas fa-eye"></i>
                        </Link>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        )
      }
      
    </div>
  );
};

export default LatestOrder;
