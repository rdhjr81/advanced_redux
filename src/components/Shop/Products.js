
import { useSelector } from 'react-redux';
import ProductItem from './ProductItem';
import classes from './Products.module.css';

const Products = (props) => {
  const items = useSelector(state => state.cart.items);
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {
          items.map(item => 
            <ProductItem 
              key={item.id} 
              id={item.id}
              title={item.title}
              price={item.price}
              description={item.description}
              />)
        }
      </ul>
    </section>
  );
};

export default Products;
