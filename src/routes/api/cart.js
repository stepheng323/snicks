import { Router } from 'express';
import { addProductToCart } from '../../controllers/cart.controller';
import { checkAuth } from '../../middlewares/auth';
import { validateAddProductToCart } from '../../middlewares/cartValidation';

const cart = Router();

cart.post('/:productId', checkAuth, validateAddProductToCart, addProductToCart);

export default cart;
