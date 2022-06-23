import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Product from "./Product";
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../../redux/actions/ProductActions'
import Message from '../LoadingError/Error';
import Loading from '../LoadingError/Loading';


const MainProducts = () => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const {loading, error, products} = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const {error: errorDelete, success: successDelete} = productDelete;

  useEffect(() => {
    dispatch(listProducts())
  }, [dispatch, successDelete])

  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Sản phẩm</h2>
        <div>
          <Link to="/addproduct" className="btn btn-primary">
            Tạo mới
          </Link>
        </div>
      </div>

      <div className="card mb-4 shadow-sm">
        <header className="card-header bg-white ">
          <div className="row gx-3 py-3">
            <div className="col-lg-4 col-md-6 me-auto ">
              <input
                type="search"
                placeholder="Tìm kiếm sản phẩm..."
                className="form-control p-2"
              />
            </div>
          </div>
        </header>

        <div className="card-body">
          {errorDelete && (<Message variant="alert-danger">{errorDelete}</Message>)}
          {
            loading ? (<Loading />)
            : error ? (<Message variant="alert-danger">{error}</Message>)
            : (
              <div className="row">
                {/* Products */}
                {products.map((product) => (
                  <Product product={product} key={product._id} />
                ))}
              </div>
            )
          }
        </div>
      </div>
    </section>
  );
};

export default MainProducts;
