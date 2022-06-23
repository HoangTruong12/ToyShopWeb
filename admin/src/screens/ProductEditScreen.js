import React from "react";
import { useRouteMatch } from "react-router-dom";
import Sidebar from "./../components/sidebar";
import Header from "./../components/Header";
import EditProductMain from "./../components/products/EditproductMain";


const ProductEditScreen = () => {
  const match = useRouteMatch();
  const productId = match.params.id
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <EditProductMain productId={productId} />
      </main>
    </>
  );
};
export default ProductEditScreen;
