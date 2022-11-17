import { createSlice } from "@reduxjs/toolkit";

const initialCartState = {
    cartItems:[],
    items: [
      { id: 1, title: "Test Item", price: 6 ,description:'This is a first product - amazing!'},
      { id: 2, title: "Leather Boots", price: 12,description:'Now 10% less smelly!'},
      { id: 3, title: "Rain Jacket", price: 10,description:'Who\'s soaked? Not you!'},
      { id: 4, title: "Wool Slippers", price: 20, description:'Unparalleled warmth'},
  ],
  };

const cartSlice = createSlice({
    initialState: initialCartState,
    name: "cart",
    reducers: {
        addItemToCart(state, action){
            const itemId = action.payload;
            const item = state.items.find(item => item.id === itemId);
    
            const cartItem = state.cartItems.find(cartItem => cartItem.id === itemId);
            if(cartItem){
                cartItem.quantity += 1;
                cartItem.total += cartItem.price
            }else{
                const newCartItem = {
                    id: item.id,
                    title: item.title,
                    quantity: 1,
                    price: item.price,
                    total: item.price
                }
                state.cartItems.push(newCartItem);
            }
        },
        removeItemFromCart(state, action){
            const itemId = action.payload;
            const item = state.items.find(item => item.id === itemId);
            for (let index = 0; index < state.cartItems.length; index++) {
                const cartItem = state.cartItems[index];
                if(cartItem.id === itemId){
                    if(cartItem.quantity <= 1){
                        state.cartItems.splice(index,1);
                        break;
                    }else{
                        cartItem.quantity -=1;
                        cartItem.total -=item.price;
                    }
                }
            }
        }
    }
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;