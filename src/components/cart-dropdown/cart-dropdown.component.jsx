import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
import {
	CartDropdownConteiner,
	EmptyMessage,
	CartItems,
} from './cart-dropdown.styles';
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { selectCartItems } from '../../store/cart/cart.selector';

const CartDropdown = () => {
	const cartItems = useSelector(selectCartItems);
	const navigate = useNavigate();

	const goToCheckoutHandler = () => {
		navigate('/checkout');
	}

	return (
		<CartDropdownConteiner>
			<CartItems >
				{
					cartItems.length
						? (cartItems.map(item =>
							<CartItem key={item.id} cartItem={item} />))
						: (<EmptyMessage>Your cart is empty</EmptyMessage>)
				}

			</CartItems>
			<Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
		</CartDropdownConteiner>
	)
}

export default CartDropdown;