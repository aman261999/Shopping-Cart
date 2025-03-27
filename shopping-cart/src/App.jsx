import "./App.css";
import Home from "./Components/Home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SingleProduct from "./Components/FilteredProducts/SingleProduct";
import { useEffect, useState } from "react";
import { setProducts } from "./features/slices/productsSlice";
import { useDispatch, useSelector } from "react-redux";
import Cart from "./Components/Cart/Cart";
import WishList from "./Components/WishList/WishList";
import Login from "./Components/Login/Login";
// import useFetch from "./CustomHook/FetchData";
import SessionTimeout from "./Components/Login/SessionTimeout";
import Orders from "./Components/Orders/Orders";
import Checkout from "./Components/Checkout/Checkout";
import OrderHistory from "./Components/Orders/OrderHistory";


function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user) || {};
  console.log("user", user);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3000/getProducts")
      .then((res) => res.json())
      .then((data) => {
        dispatch(setProducts(data));
        setLoaded(true);
      });
  }, []);

  return (
    <div>
      {loaded ? (
        <BrowserRouter>
          <SessionTimeout />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/filteredproducts/:type" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<WishList />} />
            <Route path="/:id" element={<SingleProduct />} />
            <Route path="/checkout" element={<Checkout />} />
            {user?.authUser ? (<>
              <Route path="/orders" element={<Orders />} />
              <Route path="/order-history" element={<OrderHistory />} />
            </>) : ""}
          </Routes>
        </BrowserRouter>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default App;


