import { Router } from 'express';
import { addProductToCart, getCartItems } from '../../controllers/cart.controller';
import { checkAuth } from '../../middlewares/auth';
import { validateAddProductToCart } from '../../middlewares/cartValidation';

const cart = Router();

cart.post('/:productId', checkAuth, validateAddProductToCart, addProductToCart);
cart.get('/', checkAuth, getCartItems);

export default cart;
