import { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";
import { fetchCartData, sendCartData } from "./store/cart-actions";

let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const cartIsVisible = useSelector((state) => state.ui.cartIsVisible);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const notificationStatus = useSelector(
    (state) => state.ui.notificationStatus
  );

  useEffect(() => {dispatch(fetchCartData())}, [dispatch]);

  useEffect(() => {
    if(isInitial){
      isInitial = false;
      return;
    }
    dispatch(sendCartData(cartItems));
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
