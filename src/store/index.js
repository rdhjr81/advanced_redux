import { createSlice, createStore } from "@reduxjs/toolkit";

const initialCartState = {
  displayCart: false,
  cart:[],
  items: [
    { id: 1, title: "Test Item", price: 6 ,description:'This is a first product - amazing!'},
    { id: 2, title: "Leather Boots", price: 12,description:'Now 10% less smelly!'},
    { id: 3, title: "Rain Jacket", price: 10,description:'Who\'s soaked? Not you!'},
    { id: 3, title: "Wool Slippers", price: 20, description:'Unparalleled warmth'},
],
};

const cartSlice = createSlice({
  initialState: initialCartState,
  name: "cart",
  reducers: {
    toggleDisplayCart(state) {
      state.displayCart = !state.displayCart;
    },
  },
});

const store = createStore(cartSlice.reducer);
export const cartActions = cartSlice.actions;
export default store;
