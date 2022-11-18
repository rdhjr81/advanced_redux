import { useEffect } from "react";
import { useSelector } from "react-redux";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";

function App() {
    const cartIsVisible = useSelector(state => state.ui.cartIsVisible);
    const cartItems = useSelector(state => state.cart.cartItems);
    useEffect(()=>{
      fetch('https://react-http-e781c-default-rtdb.firebaseio.com/cart.json', {method:'PUT', body: JSON.stringify(cartItems)});
    },[cartItems]);
  return (
      <Layout>
        {cartIsVisible && <Cart />}
        <Products />
      </Layout>
  );
}

export default App;
