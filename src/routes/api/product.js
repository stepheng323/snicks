import { Router } from 'express';
import { addProduct } from '../../controllers/product.controller';
import { checkAuth, restrictTo } from '../../middlewares/auth';

const product = Router();

product.post('/', checkAuth, restrictTo('admin'), addProduct);

export default product;
