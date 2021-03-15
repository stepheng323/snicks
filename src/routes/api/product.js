import { Router } from 'express';
import { addProduct, getPresignedUrl } from '../../controllers/product.controller';
import { checkAuth, restrictTo } from '../../middlewares/auth';
import { validateAddProduct } from '../../middlewares/productValidation';

const product = Router();

product.post('/presignUrl', checkAuth, restrictTo('admin'), getPresignedUrl);
product.post('/', checkAuth, restrictTo('admin'), validateAddProduct, addProduct);

export default product;
