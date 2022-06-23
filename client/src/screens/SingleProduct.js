import React, { useEffect, useState } from "react";
import Header from "./../components/Header";
import Rating from "../components/homeComponents/Rating";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { listProductDetails } from '../redux/actions/ProductActions';
import Loading from '../components/LoadingError/Loading';
import Message from "./../components/LoadingError/Error.js";
import { PRODUCT_CREATE_REVIEW_RESET } from "../redux/constants/ProductConstants";
import moment from 'moment';
import { createProductReview } from '../redux/actions/ProductActions';

const SingleProduct = () => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const history = useHistory();
  const match = useRouteMatch();

  const productId = match.params.id;
  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const {loading, error, product} = productDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const {userInfo} = userLogin;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    loading: loadingCreateReview,
    error: errorCreateReview,
    success: successCreateReview,
  } = productReviewCreate;
  
  useEffect(() => {
    if(successCreateReview) {
      alert("Bình luận thành công");
      setRating(0);
      setComment("");
      dispatch({type: PRODUCT_CREATE_REVIEW_RESET});
    }
    dispatch(listProductDetails(productId));
  }, [dispatch, productId, successCreateReview]);

  const addToCartHandle = (e) => {
    e.preventDefault();
    history.push(`/cart/${productId}?qty=${qty}`)
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createProductReview(productId, {
      rating, comment, 
    }))
  };

  return (
    <>
      <Header />
      <div className="container single-product">
        {
          loading ? (
            <Loading />
          )
          : error ? (
            <Message variant="alert-danger">{error}</Message>
          )
          :
          (
            <>
              <div className="row">
          <div className="col-md-6">
            <div className="single-image">
              <img src={product.image} alt={product.name} />
            </div>
          </div>
          <div className="col-md-6">
            <div className="product-dtl">
              <div className="product-info">
                <div className="product-name">{product.name}</div>
              </div>
              <p>{product.description}</p>

              <div className="product-count col-lg-7 ">
                <div className="flex-box d-flex justify-content-between align-items-center">
                  <h6>Giá</h6>
                  <span>${product.price}</span>
                </div>
                <div className="flex-box d-flex justify-content-between align-items-center">
                  <h6>Tình trạng</h6>
                  {product.countInStock > 0 ? (
                    <span>Còn sản phẩm</span>
                  ) : (
                    <span>Không có sẵn</span>
                  )}
                </div>
                <div className="flex-box d-flex justify-content-between align-items-center">
                  <h6>Bình luận</h6>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} bình luận`}
                  />
                </div>
                {product.countInStock > 0 ? (
                  <>
                    <div className="flex-box d-flex justify-content-between align-items-center">
                      <h6>Số lượng</h6>
                      <select
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                      >
                        {[...Array(product.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </div>
                    <button onClick={addToCartHandle} className="round-black-btn">THÊM VÀO GIỎ HÀNG</button>
                  </>
                ) : null}
              </div>
            </div>
          </div>
              </div>

              {/* RATING */}
              <div className="row my-5">
                <div className="col-md-6">
                <h6 className="mb-3">BÌNH LUẬN</h6>
                {
                  product.reviews.length === 0 && (
                    <Message variant={"alert-info mt-3"}>Không có bình luận nào</Message>
                  )
                }
                {
                  product.reviews.map((review) =>(
                    <div 
                      className="mb-5 mb-md-3 bg-light p-3 shadow-sm rounded"
                      key={review._id}
                    >
                      <strong>{review.name}</strong>
                      <Rating value={review.rating} />
                      <span>{moment(review.createdAt).format("LLL")}</span>
                      <div className="alert alert-info mt-3">
                        {review.comment}
                      </div>
                    </div>
                  ))
                }
                
                </div>
                <div className="col-md-6">
                  <h6>MỜI BẠN ĐỂ LẠI BÌNH LUẬN</h6>
                  <div className="my-4">
                    {loadingCreateReview && <Loading />}
                    {errorCreateReview && (
                      <Message variant="alert-danger">
                        {errorCreateReview}
                      </Message>
                    )}
                  </div>
                  {
                    userInfo ? (
                      <form onSubmit={submitHandler}>
                        <div className="my-4">
                          <strong>Chọn sao</strong>
                          <select 
                            value={rating} 
                            className="col-12 bg-light p-3 mt-2 border-0 rounded"
                            onChange={(e) => setRating(e.target.value)}
                          >
                            <option value="">Lựa chọn...</option>
                            <option value="1">1 - Tệ</option>
                            <option value="2">2 - Bình thường</option>
                            <option value="3">3 - Tốt</option>
                            <option value="4">4 - Rất tốt</option>
                            <option value="5">5 - Tuyệt vời</option>
                          </select>
                        </div>
                        <div className="my-4">
                          <strong>Nội dung</strong>
                          <textarea
                            row="3"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            className="col-12 bg-light p-3 mt-2 border-0 rounded"
                          ></textarea>
                        </div>
                        <div className="my-3">
                          <button 
                            disabled={loadingCreateReview}
                            className="col-12 bg-black border-0 p-3 rounded text-white"
                          >
                            GỬI
                          </button>
                        </div>
                      </form>
                    )
                    :
                    (
                      <div className="my-3">
                        <Message variant={"alert-warning"}>
                          Vui lòng{" "}
                          <Link to="/login">
                            " <strong>Đăng nhập</strong> "
                          </Link>{" "}
                          để viết bình luận{" "}
                        </Message>
                      </div>
                    )
                  }
                </div>
              </div>
            </>
          )
        }
      </div>
    </>
  );
};

export default SingleProduct;
