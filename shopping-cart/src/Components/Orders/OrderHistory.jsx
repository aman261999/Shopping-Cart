import { useEffect, useState } from "react";
import OrderList from "./OrderList";
import { useSelector } from "react-redux";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5;
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    if (user?.email) {
      fetchOrders();
    }
  }, [user?.email]);

  const fetchOrders = async () => {
    try {
      const response = await fetch("http://localhost:3000/getOrders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: user.email }),
      });

      if (response.ok) {
        const data = await response.json();
        const sortedOrders = data.sort(
          (a, b) => new Date(b.orderPlacedAt) - new Date(a.orderPlacedAt)
        );
        setOrders(sortedOrders);
      } else {
        console.error("Error fetching orders:", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Calculate pagination-related values
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(orders.length / ordersPerPage);

  // Pagination handler
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <OrderList
      orders={currentOrders}
      title="Order History"
      pagination={{
        currentPage,
        totalPages,
        paginate,
      }}
    />
  );
};

export default OrderHistory;