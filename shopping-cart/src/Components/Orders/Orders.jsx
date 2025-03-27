import { useSelector } from "react-redux";
import OrderList from "./OrderList";

const Orders = () => {
  const orders = useSelector((state) => state.orders.orderList);
  
  return <OrderList orders={orders} title="Your Orders" />;
};

export default Orders;
