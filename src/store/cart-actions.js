import { cartActions } from "./cart-slice";
import { uiActions } from "./ui-slice";

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

export const fetchCartData = () => {
    return async(dispatch) => {
        const fetchData = async () => {
            const response = await fetch("https://react-http-e781c-default-rtdb.firebaseio.com/cart.json");
            if(!response.ok){
                throw new Error('Error when fetching cart data');
            }
            const data = await response.json();
            return data;
        };

        try{
           const cartData =  await fetchData();
            dispatch(cartActions.replaceCart(cartData));
        }catch(error){
            dispatch(
                uiActions.showNotification({
                    status: "error",
                    title: "Error!",
                    message: "Fetching cart data failed."
                })
            );
        }
    };
}