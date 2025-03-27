import { createSlice } from "@reduxjs/toolkit";

export const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orderList: [],
  },
  reducers: {
    addOrder(state, action) {
      state.orderList.push(action.payload);
    },
  },
});

export const { addOrder } = orderSlice.actions;
export default orderSlice.reducer;
