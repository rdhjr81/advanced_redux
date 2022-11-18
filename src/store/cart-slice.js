import { createSlice } from "@reduxjs/toolkit";
import { uiActions } from "./ui-slice";

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
                        state.cartItems = state.cartItems.filter(cartItem => cartItem.id != itemId);
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

export const sendCartData = (cartItems) => {
    return async (dispatch) => { 
        //perform async code here 
        dispatch(uiActions.showNotification({
            status: "pending",
            title: "Sending...",
            message: "Sending cart data",
            }));

        const sendRequest = async () => {
        const response = await fetch(
            "https://react-http-e781c-default-rtdb.firebaseio.com/cart.json",
            { method: "PUT", body: JSON.stringify(cartItems) }
            );
            
            if (!response.ok) {
            throw new Error("Sending cart data failed.");
            }
        };

        try{
            await sendRequest();
            dispatch(
                uiActions.showNotification({
                    status: "success",
                    title: "Success!",
                    message: "Sent cart data successfully",
                })
            );
        }catch(err){
            dispatch(
                uiActions.showNotification({
                    status: "error",
                    title: "Error!",
                    message: "Sending cart data failed.",
                })
            );
        }   
    };  
};

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;