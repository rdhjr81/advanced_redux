import { useSelector } from "react-redux";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";

function App() {
    const displayCart = useSelector(state => state.displayCart);
  return (
      <Layout>
        {displayCart && <Cart />}
        <Products />
      </Layout>
  );
}

export default App;
