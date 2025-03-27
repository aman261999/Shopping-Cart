import { describe, test, expect } from "vitest";
import cartReducer, {
  addToCart,
  removeProductFromCart,
  updateQuantity,
  addToWishList,
  removeFromWishList,
} from "./cartSlice";

describe("cartSlice Reducer", () => {
  test("should add a product to the cart", () => {
    const initialState = {
      cart: [],
      wishList: [],
      totalQuantity: 0,
      totalPrice: 0,
      totalWishListQuantity: 0,
    };

    const product = { id: "1", name: "Test Product", price: 100, img: "test.jpg" };

    const newState = cartReducer(initialState, addToCart(product));

    expect(newState.cart.length).toBe(1);
    expect(newState.cart[0].id).toBe("1");
    expect(newState.cart[0].quantity).toBe(1);
    expect(newState.totalQuantity).toBe(1);
    expect(newState.totalPrice).toBe(100);
  });

  test("should remove a product from the cart", () => {
    const initialState = {
      cart: [{ id: "1", name: "Test Product", price: 100, quantity: 1, totalPrice: 100 }],
      wishList: [],
      totalQuantity: 1,
      totalPrice: 100,
      totalWishListQuantity: 0,
    };

    const productToRemove = { id: "1", quantity: 1, totalPrice: 100 };

    const newState = cartReducer(initialState, removeProductFromCart(productToRemove));

    expect(newState.cart.length).toBe(0);
    expect(newState.totalQuantity).toBe(0);
    expect(newState.totalPrice).toBe(0);
  });

  test("should increase the quantity of an existing product", () => {
    const initialState = {
      cart: [{ id: "1", name: "Test Product", price: 100, quantity: 1, totalPrice: 100 }],
      wishList: [],
      totalQuantity: 1,
      totalPrice: 100,
      totalWishListQuantity: 0,
    };

    const action = { id: "1", type: "increase" };
    const newState = cartReducer(initialState, updateQuantity(action));

    expect(newState.cart[0].quantity).toBe(2);
    expect(newState.cart[0].totalPrice).toBe(200);
    expect(newState.totalQuantity).toBe(2);
    expect(newState.totalPrice).toBe(200);
  });

  test("should add a product to the wishlist", () => {
    const initialState = {
      cart: [],
      wishList: [],
      totalQuantity: 0,
      totalPrice: 0,
      totalWishListQuantity: 0,
    };

    const product = { id: "1", name: "Test Product", price: 100, img: "test.jpg" };

    const newState = cartReducer(initialState, addToWishList(product));

    expect(newState.wishList.length).toBe(1);
    expect(newState.wishList[0].id).toBe("1");
    expect(newState.totalWishListQuantity).toBe(1);
  });

  test("should remove a product from the wishlist", () => {
    const initialState = {
      cart: [],
      wishList: [{ id: "1", name: "Test Product", price: 100 }],
      totalQuantity: 0,
      totalPrice: 0,
      totalWishListQuantity: 1,
    };

    const productToRemove = { id: "1" };

    const newState = cartReducer(initialState, removeFromWishList(productToRemove));

    expect(newState.wishList.length).toBe(0);
    expect(newState.totalWishListQuantity).toBe(0);
  });
});
