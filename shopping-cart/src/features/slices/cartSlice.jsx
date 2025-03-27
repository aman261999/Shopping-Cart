import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cart: [],
        wishList: [],
        totalQuantity: 0,
        totalPrice: 0,
        totalWishListQuantity: 0
    },
    reducers: {
      addToCart(state, action) {
          const productId = action.payload;
          try {
            const exist = state.cart.find(
              (product) =>
                product.id === productId.id
            );
            if (exist) {
              exist.quantity++;
              exist.totalPrice += productId.price;
              state.totalQuantity++;
              state.totalPrice += productId.price;
            } else {
              state.cart.push({...productId, quantity: 1, totalPrice: productId.price});
              state.totalQuantity++;
              state.totalPrice += productId.price;
            }
          } catch (err) {
              return err;
          }
      },
      removeProductFromCart(state, action) {
        try {
          const productId = action.payload;
          state.cart = state.cart.filter((product) => product.id !== productId.id);
          state.totalQuantity -= productId.quantity;
          state.totalPrice -= productId.totalPrice;
        } catch (err) {
            return err;
        }
      },
      updateQuantity(state, action) {
        const { id, type } = action.payload;
        const exist = state.cart.find((product) => product.id === id);
        if (exist) {
            if (type === "increase") {
                exist.quantity++;
                exist.totalPrice += exist.price;
                state.totalQuantity++;
                state.totalPrice += exist.price;
            } else if (type === "decrease" && exist.quantity > 1) {
                exist.quantity--;
                exist.totalPrice -= exist.price;
                state.totalQuantity--;
                state.totalPrice -= exist.price;
            }
        }
      },
      addToWishList(state, action) {
        const productId = action.payload;
        const exist = state.wishList.find((product) => product.id === productId.id);
        if (!exist) {
            state.wishList.push({...productId});
            state.totalWishListQuantity++;
        }
      },
      removeFromWishList(state, action) {
        const productId = action.payload;
        state.wishList = state.wishList.filter((product) => product.id !== productId.id);
        state.totalWishListQuantity--;
      },
      clearCart(state) {
        state.cart = [];
        state.totalQuantity = 0;
        state.totalPrice = 0;
      }, 
      clearWishlist(state) {
        state.wishList = [];
        state.totalWishListQuantity = 0;
      }     
    }
})

export const { addToCart, removeProductFromCart, updateQuantity, addToWishList, removeFromWishList, clearCart, clearWishlist } = cartSlice.actions;
export default cartSlice.reducer;