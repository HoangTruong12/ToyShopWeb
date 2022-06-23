import React from "react";
import { useRouteMatch } from 'react-router-dom';
import Sidebar from "./../components/sidebar";
import Header from "./../components/Header";
import OrderDetailmain from "../components/orders/OrderDetailmain";

const OrderDetailScreen = () => {
  const match = useRouteMatch();
  const orderId = match.params.id
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <OrderDetailmain orderId={orderId}/>
      </main>
    </>
  );
};

export default OrderDetailScreen;
