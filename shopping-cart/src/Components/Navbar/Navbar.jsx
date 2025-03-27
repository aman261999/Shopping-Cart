import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { logout } from '../../features/slices/authSlice';
import { Button } from "@material-tailwind/react";
import { useState, useEffect, useRef } from 'react';
import { clearCart, clearWishlist } from '../../features/slices/cartSlice';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cart);
  const totalWishListQuantity = useSelector((state) => state.cart.totalWishListQuantity);
  const user = useSelector((state) => state.user.user);
  const { name, email, authUser } = user;
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);

  // Function to determine if a nav item is active
  const isActive = (path) => location.pathname === path ? 'bg-gray-200' : '';

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className='bg-black p-2 w-full'>
        <h3 className='text-white text-2xl font-bold tracking-normal leading-none text-center'>
          Shopping Store
        </h3>
      </div>
      
      {/* Main Navbar Container - flex row with space between */}
      <div className="flex items-center justify-between sm:px-8 lg:px-12 py-2 w-full max-w-5xl mx-auto">
        <div 
          onClick={() => navigate('/')} 
          className="cursor-pointer flex-shrink-0 ml-2 sm:ml-4"
        >
          <img className='h-15 w-auto' src="\images\logo.png" alt="store logo"></img>
        </div>

        {/* Spacer - creates gap between logo and nav items */}
        <div className="flex-grow"></div>

        {/* Navigation items - aligned to right with margin */}
        <div className='flex items-center space-x-2 sm:space-x-4 mr-2 sm:mr-4'>
          {/* Wishlist */}
          <div className={`relative flex flex-col items-center cursor-pointer py-1 px-2 rounded-md ${isActive('/wishlist')}`} 
              onClick={() => navigate('/wishlist')}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="red" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
            </svg>
            {totalWishListQuantity > 0 && <span className='absolute top-0 right-0 transform translate-x-1 -translate-y-1 bg-red-500 text-white rounded-full text-xs px-1'>{totalWishListQuantity}</span>}
            <p className='text-xs sm:text-sm tracking-normal text-center'>Wishlist</p>
          </div>

          {/* Cart */}
          <div className={`relative flex flex-col items-center cursor-pointer py-1 px-2 rounded-md ${isActive('/cart')}`} 
              onClick={() => navigate('/cart')}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="yellow" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
            </svg>
            {cartItems.length > 0 && <span className='absolute top-0 right-0 transform translate-x-1 -translate-y-1 bg-red-500 text-white rounded-full text-xs px-1'>{cartItems.length}</span>}
            <p className='text-xs sm:text-sm tracking-normal text-center'>Cart</p>
          </div>

          {/* Orders - only shown when logged in */}
          {authUser && (
            <div className={`flex flex-col items-center cursor-pointer py-1 px-2 rounded-md ${isActive('/orders')}`} 
                onClick={() => navigate('/orders')}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="gray" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
              </svg>
              <p className='text-xs sm:text-sm tracking-normal text-center'>Orders</p>
            </div>
          )}

          {/* Profile Dropdown */}
          <div className="relative flex-shrink-0" ref={profileRef}>
            <div 
              className="flex flex-col items-center cursor-pointer py-1 px-2 rounded-md hover:bg-gray-200"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              </svg>
              <p className='text-xs sm:text-sm tracking-normal text-center'>Profile</p>
            </div>
            
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-52 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-300">
                <div className="px-4 py-2 border-b">
                  <p title={authUser ? (name || email) : 'Guest'} className="text-sm font-medium text-gray-700 truncate">
                    {authUser ? (name || email) : 'Guest'}
                  </p>
                </div>
                
                {authUser && (
                  <>
                    <Button
                      variant="text"
                      onClick={() => {
                        navigate('/order-history');
                        setIsProfileOpen(false);
                      }}
                      className="w-full flex px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 rounded-none cursor-pointer"
                    >
                      Order History
                    </Button>
                    <Button
                      variant="text"
                      onClick={() => {
                        dispatch(logout());
                        setIsProfileOpen(false);
                        dispatch(clearCart());
                        dispatch(clearWishlist());
                        navigate('/')

                      }}
                      className="w-full flex px-4 py-2 text-sm text-red-600 hover:bg-gray-200 rounded-none cursor-pointer"
                    >
                      Logout
                    </Button>
                  </>
                )}

                {!authUser && (
                  <Button
                    variant="text"
                    onClick={() => {
                      navigate('/login');
                      setIsProfileOpen(false);
                    }}
                    className="w-full flex px-4 py-2 text-sm text-blue-600 hover:bg-gray-200 rounded-none cursor-pointer"
                  >
                    Login
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;