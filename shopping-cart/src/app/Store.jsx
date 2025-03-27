import { configureStore } from '@reduxjs/toolkit';
import sliderReducer from '../features/slices/sliderSlice';
import productReducer from '../features/slices/productsSlice';
import cartReducer from '../features/slices/cartSlice';
import authReducer from '../features/slices/authSlice';
import orderReducer from '../features/slices/orderSlice';

export const store = configureStore({
    reducer: {
        slider: sliderReducer,
        products: productReducer,
        cart: cartReducer,
        user: authReducer,
        orders: orderReducer,
    }
})
