import { Router } from 'express';
import user from './api/user';
import product from './api/product';
import cart from './api/cart';

const apiRouter = Router();

apiRouter.use('/api/v1/user', user);
apiRouter.use('/api/v1/product', product);
apiRouter.use('/api/v1/cart', cart);

export default apiRouter;
