import { useSelector, useDispatch } from "react-redux";
import { removeFromWishList, removeProductFromCart, updateQuantity } from "../../features/slices/cartSlice";
import { Button, Tooltip } from "@material-tailwind/react";
import Navbar from "../Navbar/Navbar";
import { useNavigate } from 'react-router-dom';
import { logout } from '../../features/slices/authSlice';
import PropTypes from 'prop-types';

const CartList = ({ cartType }) => {
  const list = useSelector((state) => state.cart[cartType]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const { authUser } = user;
  const totalPrice = useSelector((state) => state.cart.totalPrice);

  const handleRemove = (item) => {
    if (cartType === "wishList") {
      dispatch(removeFromWishList(item));
    } else {
      dispatch(removeProductFromCart(item));
    }
  };

  return (
    <>
      <Navbar />
      <hr />
      <div className="max-w-4xl mx-auto p-6">
        <h2 className="text-2xl font-bold text-center">
          {cartType === "wishList" ? "Your Wishlist" : "Shopping Cart"}
        </h2>
        {list.length > 0 ? (
          <>
            {list.map((item) => (
              <div key={item.id} className="flex justify-between items-center bg-gray-100 rounded-lg p-4 mb-4 mt-4">
                <div className="flex items-center">
                  <img className="h-24 w-24 object-cover rounded-md" src={item.img} alt={item.name} />
                  <div className="ml-4">
                    <h6 className="font-medium">{item.name}</h6>
                    <p className="text-sm">Price: <span className="font-semibold">${item.price}</span></p>
                    {cartType === "cart" && (
                      <>
                        <p className="text-sm">Total: <span className="font-semibold">${item.totalPrice}</span></p>
                        <div className="flex items-center space-x-2">
                          <h5 className="gap-2">Quantity</h5>
                          <Button 
                            className="px-3 py-1 text-xs" 
                            color="gray" 
                            variant="outlined" 
                            onClick={() => dispatch(updateQuantity({ id: item.id, type: "decrease" }))} 
                            disabled={item.quantity === 1}
                          >
                            -
                          </Button>
                          <span className="px-2 font-medium text-sm">{item.quantity}</span>
                          <Button 
                            className="px-3 py-1 text-xs" 
                            color="gray" 
                            variant="outlined" 
                            onClick={() => dispatch(updateQuantity({ id: item.id, type: "increase" }))}
                          >
                            +
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
                <Tooltip content={`Remove from ${cartType === "wishList" ? "Wishlist" : "Cart"}`} placement="bottom">
                  <Button
                    size="sm"
                    color="red"
                    ripple={true}
                    variant="filled"
                    onClick={() => handleRemove(item)}
                  >
                    Remove
                  </Button>
                </Tooltip>
              </div>
            ))}
            {cartType === "cart" && (
              <>
                <hr />
                <div className="flex justify-between items-center mt-4">
                  <p className="text-lg font-semibold">Total Price: <span className="ml-2">${totalPrice}</span></p>
                  <Button color="blue" onClick={() => {
                    if (authUser) {
                      navigate('/checkout');
                    } else {
                      dispatch(logout());
                      navigate('/login');
                    }
                  }}>Checkout</Button>
                </div>
              </>
            )}
          </>
        ) : (
          <div className="text-center py-10">
            <h1 className="text-2xl font-bold">{cartType === "wishList" ? "Your Wishlist is Empty!!" : "Your Cart is Empty!"}</h1>
            <p className="text-lg">{cartType === "wishList" ? "Add your favorite products to the wishlist." : "Add some products to your cart."}</p>
          </div>
        )}
      </div>
    </>
  );
};

CartList.propTypes = {
    cartType: PropTypes.oneOf(['wishList', 'cart']).isRequired,
};

export default CartList;