import { Router } from 'express';
import { addProduct, getPresignedUrl, getAllProducts } from '../../controllers/product.controller';
import { checkAuth, restrictTo } from '../../middlewares/auth';
import { validateAddProduct } from '../../middlewares/productValidation';

const product = Router();

product.post('/', checkAuth, restrictTo('admin'), validateAddProduct, addProduct);
product.get('/', getAllProducts);
product.get('/presignUrl', checkAuth, restrictTo('admin'), getPresignedUrl);
export default product;
