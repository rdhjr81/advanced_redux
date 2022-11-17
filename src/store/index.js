import { createSlice, createStore } from "@reduxjs/toolkit";

const initialCartState ={
    displayCart: false,
    items:[]
}

const cartSlice = createSlice({
    initialState: initialCartState,
    name: 'cart',
    reducers:{
        toggleDisplayCart(state){
            state.displayCart = !state.displayCart
        }
    }
});

const store = createStore(cartSlice.reducer);
export const cartActions = cartSlice.actions;
export default store;