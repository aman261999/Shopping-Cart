import { describe, it, expect } from "vitest";
import orderReducer, { addOrder } from "./orderSlice";

describe("orderSlice", () => {
  it("should return the initial state", () => {
    const initialState = { orderList: [] };
    expect(orderReducer(undefined, { type: undefined })).toEqual(initialState);
  });

  it("should handle addOrder action", () => {
    const initialState = { orderList: [] };
    const order = { id: 1, product: "T-Shirt", quantity: 2 };

    const newState = orderReducer(initialState, addOrder(order));

    expect(newState.orderList).toHaveLength(1);
    expect(newState.orderList[0]).toEqual(order);
  });

  it("should add multiple orders", () => {
    const initialState = { orderList: [{ id: 1, product: "T-Shirt", quantity: 2 }] };
    const secondOrder = { id: 2, product: "Shoes", quantity: 1 };

    const newState = orderReducer(initialState, addOrder(secondOrder));

    expect(newState.orderList).toHaveLength(2);
    expect(newState.orderList[1]).toEqual(secondOrder);
  });
});
