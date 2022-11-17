import { useDispatch } from 'react-redux';
import {cartActions} from '../../store'
import classes from './CartButton.module.css';

const CartButton = (props) => {
  const dispatch = useDispatch();

  const clickHandler = () => {
    dispatch(cartActions.toggleDisplayCart())
  }
  return (
    <button className={classes.button} onClick={clickHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>1</span>
    </button>
  );
};

export default CartButton;
