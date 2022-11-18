import { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";
import { uiActions } from "./store/ui-slice";

let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const cartIsVisible = useSelector((state) => state.ui.cartIsVisible);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const notificationStatus = useSelector(
    (state) => state.ui.notificationStatus
  );

  useEffect(() => {
    if(isInitial){
      isInitial = false;
      return;
    }

    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Sending...",
        message: "Sending cart data",
      })
    );
    const sendCartData = async () => {
      const response = await fetch(
        "https://react-http-e781c-default-rtdb.firebaseio.com/cart.jso",
        { method: "PUT", body: JSON.stringify(cartItems) }
      );

      if (response.ok) {
        dispatch(
          uiActions.showNotification({
            status: "success",
            title: "Success!",
            message: "Sent cart data successfully",
          })
        );
      } else {
        dispatch(
          uiActions.showNotification({
            status: "error",
            title: "Error!",
            message: "Sending cart data failed.",
          })
        );
        throw new Error("Sending cart data failed.");
      }
    };

    sendCartData().catch((error) => {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Sending cart data failed.",
        })
      );
    });
  }, [cartItems, dispatch]);
  return (
    <Fragment>
      {notificationStatus && <Notification status={notificationStatus.status} title={notificationStatus.title} message={notificationStatus.message}/>}
      <Layout>
        {cartIsVisible && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
