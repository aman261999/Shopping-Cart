import PropTypes from "prop-types";
import Navbar from "../Navbar/Navbar";

const OrderList = ({ orders, title, pagination }) => {
  return (
    <>
      <Navbar />
      <hr />
      <div className="max-w-7xl mx-auto p-6">
        <h2 className="text-3xl font-bold text-center mb-8">{title}</h2>
        {orders.length > 0 ? (
          <>
            <div className="flex flex-wrap justify-center gap-6">
              {orders.map((order, index) => (
                <div
                  key={index}
                  className="w-full sm:w-[48%] lg:w-[30%] bg-white shadow-lg rounded-xl p-5 border border-gray-200 hover:shadow-xl transition-shadow"
                >
                  <h3 className="text-xl font-semibold mb-3 flex justify-between items-center">
                    <span className="text-blue-800">Order-ID: {order.orderId}</span>
                    <span className="text-sm text-gray-500">
                      {new Date(order.orderPlacedAt).toLocaleString()}
                    </span>
                  </h3>
                  <div className="text-sm text-gray-700 mb-3 space-y-1">
                    <p>
                      <span className="font-medium">Name:</span> {order.details.name}
                    </p>
                    <p>
                      <span className="font-medium">Phone:</span> {order.details.phone}
                    </p>
                    <p>
                      <span className="font-medium">Address:</span> {order.details.address}
                    </p>
                    <p>
                      <span className="font-medium">Payment:</span> {order.paymentMethod}
                    </p>
                  </div>
                  <h4 className="font-semibold mb-2 text-gray-800">Items:</h4>
                  <ul className="list-disc pl-5 text-gray-800 text-sm mb-2 space-y-1">
                    {order.items.map((item) => (
                      <li key={item.id}>
                        {item.name} - {item.quantity} x ${item.price}
                      </li>
                    ))}
                  </ul>
                  <p className="font-bold text-right text-green-600 mt-4">
                    Total: ${order.totalPrice}
                  </p>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            {pagination && (
              <div className="flex justify-center mt-8 space-x-2">
                {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(
                  (pageNumber) => (
                    <button
                      key={pageNumber}
                      onClick={() => pagination.paginate(pageNumber)}
                      className={`px-4 py-2 rounded-md ${
                        pageNumber === pagination.currentPage
                          ? "bg-blue-600 text-white"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                    >
                      {pageNumber}
                    </button>
                  )
                )}
              </div>
            )}
          </>
        ) : (
          <p className="text-center mt-4 text-gray-600 text-lg">
            No orders found.
          </p>
        )}
      </div>
    </>
  );
};

OrderList.propTypes = {
  orders: PropTypes.arrayOf(
    PropTypes.shape({
      details: PropTypes.shape({
        name: PropTypes.string.isRequired,
        phone: PropTypes.string.isRequired,
        address: PropTypes.string.isRequired,
      }).isRequired,
      paymentMethod: PropTypes.string.isRequired,
      items: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
          name: PropTypes.string.isRequired,
          quantity: PropTypes.number.isRequired,
          price: PropTypes.number.isRequired,
        })
      ).isRequired,
      totalPrice: PropTypes.number.isRequired,
    })
  ).isRequired,
  title: PropTypes.string.isRequired,
  pagination: PropTypes.shape({
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    paginate: PropTypes.func.isRequired,
  }),
};

export default OrderList;