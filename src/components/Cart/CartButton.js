import { useDispatch, useSelector } from 'react-redux';
import {cartActions} from '../../store'
import classes from './CartButton.module.css';

const getNumberOfItemsInCart = (cartItems) => {
  let total = 0;
  cartItems.forEach(cartItem => {
    total+= cartItem.quantity;
  });
  return total;
}

const CartButton = (props) => {
  const dispatch = useDispatch();

  const cartItems = useSelector(state => state.cartItems);
  const totalNumberOfItems = getNumberOfItemsInCart(cartItems);

  const clickHandler = () => {
    dispatch(cartActions.toggleDisplayCart())
  }
  return (
    <button className={classes.button} onClick={clickHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{totalNumberOfItems}</span>
    </button>
  );
};

export default CartButton;
