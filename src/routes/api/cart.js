import { Router } from 'express';
import {
  addProductToCart, getCartItems, deleteCartItem, updateCartItem
} from '../../controllers/cart.controller';
import { checkAuth } from '../../middlewares/auth';
import { validateAddProductToCart, validateUpdateCart } from '../../middlewares/cartValidation';

const cart = Router();

cart.post('/:productId', checkAuth, validateAddProductToCart, addProductToCart);
cart.get('/', checkAuth, getCartItems);
cart.delete('/:cartId', checkAuth, deleteCartItem);
cart.patch('/:cartId', checkAuth, validateUpdateCart, updateCartItem);

export default cart;
