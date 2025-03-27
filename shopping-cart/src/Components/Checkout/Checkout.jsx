import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../../features/slices/cartSlice";
import { addOrder } from "../../features/slices/orderSlice";
import { Button } from "@material-tailwind/react";
import Navbar from "../Navbar/Navbar";

const Checkout = () => {
  const cartItems = useSelector((state) => state.cart.cart);
  const user = useSelector((state) => state.user.user);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [details, setDetails] = useState({
    name: "",
    phone: "",
    address: "",
  });
  const [savedAddresses, setSavedAddresses] = useState([]);

  useEffect(() => {
    if (user?.email) {
      fetch("http://localhost:3000/getAddresses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user.email }),
      })
        .then((res) => res.json())
        .then((data) => setSavedAddresses(data))
        .catch((err) => console.error("Error fetching addresses:", err));
    }
  }, [user?.email]);

  const handleInputChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const handleOrder = async () => {
    if (!details.name || !details.phone || !details.address) {
      alert("Please fill in all delivery details.");
      return;
    }

    if (cartItems.length > 0) {
      const orderData = {
        items: cartItems,
        details,
        user: {
          name: user?.name,
          email: user?.email,
        },
        totalPrice,
        paymentMethod: "COD",
      };

      try {
        // Save order
        const response = await fetch("http://localhost:3000/saveOrder", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
        });

        const data = await response.json();
        console.log(data.message);

        const orderWithId = {
          ...orderData,
          orderId: data.orderId,
          orderPlacedAt: data.orderPlacedAt,
        };

        // Save new address
        await fetch("http://localhost:3000/saveAddress", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: user.email,
            address: details.address,
          }),
        });

        dispatch(addOrder(orderWithId));
        dispatch(clearCart());
        navigate("/orders");
      } catch (error) {
        console.error("Error saving order on server:", error);
      }
    } else {
      alert("Add some items in your cart to place order");
    }
  };

  const handleAddressSelect = (e) => {
    setDetails({ ...details, address: e.target.value });
  };

  return (
    <>
      <Navbar />
      <hr />
      <div className="max-w-3xl mx-auto p-6">
        <h2 className="text-2xl font-bold text-center mb-4">Checkout</h2>

        {/* Cart Summary */}
        <div className="border p-4 rounded-lg mb-6">
          <h3 className="text-lg font-semibold">Your Cart Items</h3>
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center border-b py-2"
              >
                <p>
                  {item.name} ({item.quantity} x ${item.price})
                </p>
                <p className="font-semibold">${item.quantity * item.price}</p>
              </div>
            ))
          ) : (
            <p>No items in cart.</p>
          )}
          <div className="mt-4 text-right">
            <p className="text-lg font-bold">Total: ${totalPrice}</p>
          </div>
        </div>

        {/* Delivery Details */}
        <div className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="w-full p-2 border rounded"
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            className="w-full p-2 border rounded"
            onChange={handleInputChange}
          />
          <div className="flex gap-2">
            <textarea
              name="address"
              placeholder="Write new address"
              className="w-2/3 p-2 border rounded"
              onChange={handleInputChange}
              value={details.address}
            ></textarea>
            <select
              onChange={handleAddressSelect}
              className="w-1/3 p-2 border rounded"
            >
              <option value="">Select saved address</option>
              {savedAddresses.map((addr, index) => (
                <option key={index} value={addr}>
                  {addr}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Payment Method */}
        <div className="mt-4 flex flex-wrap justify-between">
          <div>
            <h3 className="text-lg font-semibold">Payment Method:</h3>
            <p className="text-md">Cash on Delivery (COD)</p>
          </div>
          <Button
            size="lg"
            color="yellow"
            ripple={true}
            variant="filled"
            onClick={handleOrder}
          >
            Place Order
          </Button>
        </div>
      </div>
    </>
  );
};

export default Checkout;
